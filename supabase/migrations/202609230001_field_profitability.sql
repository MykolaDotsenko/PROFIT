create extension if not exists pgcrypto;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','manager','viewer')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.field_profitability_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  field_name text not null check (char_length(field_name) between 1 and 120),
  crop text not null check (char_length(crop) between 1 and 80),
  season text not null check (char_length(season) between 1 and 40),
  currency char(3) not null,
  area_ha numeric(14,4) not null check (area_ha > 0),
  yield_t_ha numeric(14,4) not null check (yield_t_ha >= 0),
  price_per_t numeric(16,2) not null check (price_per_t >= 0),
  cost_items jsonb not null default '[]'::jsonb check (jsonb_typeof(cost_items) = 'array'),
  revenue numeric(18,2) not null,
  variable_costs numeric(18,2) not null,
  allocated_fixed_costs numeric(18,2) not null,
  operating_costs numeric(18,2) not null,
  gross_margin numeric(18,2) not null,
  operating_profit numeric(18,2) not null,
  revenue_per_ha numeric(18,2) not null,
  cost_per_ha numeric(18,2) not null,
  operating_profit_per_ha numeric(18,2) not null,
  operating_margin_pct numeric(12,4),
  roi_pct numeric(12,4),
  break_even_price_per_t numeric(18,2),
  break_even_yield_t_ha numeric(14,4),
  calculation_version text not null default 'field-profitability-v1',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index organization_members_user_idx on public.organization_members(user_id, organization_id);
create index field_profitability_org_created_idx on public.field_profitability_records(organization_id, created_at desc);
create index field_profitability_org_field_idx on public.field_profitability_records(organization_id, field_name);

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.field_profitability_records enable row level security;

grant select on public.organizations, public.organization_members, public.field_profitability_records to authenticated;
revoke insert, update, delete on public.organizations, public.organization_members, public.field_profitability_records from anon, authenticated;

create policy "members read organizations" on public.organizations for select to authenticated
using (exists (select 1 from public.organization_members m where m.organization_id = id and m.user_id = (select auth.uid())));

create policy "members read memberships" on public.organization_members for select to authenticated
using (user_id = (select auth.uid()) or exists (
  select 1 from public.organization_members m
  where m.organization_id = organization_members.organization_id
    and m.user_id = (select auth.uid())
    and m.role in ('owner','manager')
));

create policy "members read profitability" on public.field_profitability_records for select to authenticated
using (exists (select 1 from public.organization_members m where m.organization_id = organization_id and m.user_id = (select auth.uid())));

create or replace function public.create_organization_with_owner(p_name text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_org uuid;
begin
  if v_user is null then raise exception 'not_authenticated'; end if;
  if p_name is null or char_length(trim(p_name)) not between 1 and 120 then raise exception 'invalid_name'; end if;
  insert into public.organizations(name) values (trim(p_name)) returning id into v_org;
  insert into public.organization_members(organization_id, user_id, role) values (v_org, v_user, 'owner');
  return v_org;
end;
$$;
revoke all on function public.create_organization_with_owner(text) from public, anon;
grant execute on function public.create_organization_with_owner(text) to authenticated;

create or replace function public.save_field_profitability(
  p_organization_id uuid,
  p_field_name text,
  p_crop text,
  p_season text,
  p_currency text,
  p_area_ha numeric,
  p_yield_t_ha numeric,
  p_price_per_t numeric,
  p_cost_items jsonb,
  p_metrics jsonb
) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_id uuid;
  v_variable numeric;
  v_fixed numeric;
  v_revenue numeric;
  v_operating_costs numeric;
  v_profit numeric;
begin
  if v_user is null then raise exception 'not_authenticated'; end if;
  if not exists (
    select 1 from public.organization_members
    where organization_id = p_organization_id and user_id = v_user and role in ('owner','manager')
  ) then raise exception 'forbidden'; end if;
  if p_area_ha <= 0 or p_yield_t_ha < 0 or p_price_per_t < 0 then raise exception 'invalid_input'; end if;
  if jsonb_typeof(p_cost_items) <> 'array' then raise exception 'invalid_cost_items'; end if;

  select coalesce(sum((item->>'amount')::numeric) filter (where item->>'type' = 'variable'),0),
         coalesce(sum((item->>'amount')::numeric) filter (where item->>'type' = 'allocated_fixed'),0)
    into v_variable, v_fixed
  from jsonb_array_elements(p_cost_items) item
  where (item->>'amount') ~ '^[0-9]+(\.[0-9]+)?$' and (item->>'amount')::numeric >= 0;

  v_revenue := round(p_area_ha * p_yield_t_ha * p_price_per_t, 2);
  v_operating_costs := round(v_variable + v_fixed, 2);
  v_profit := round(v_revenue - v_operating_costs, 2);

  if round((p_metrics->>'revenue')::numeric,2) <> v_revenue
     or round((p_metrics->>'variableCosts')::numeric,2) <> round(v_variable,2)
     or round((p_metrics->>'allocatedFixedCosts')::numeric,2) <> round(v_fixed,2)
     or round((p_metrics->>'operatingProfit')::numeric,2) <> v_profit then
    raise exception 'calculation_mismatch';
  end if;

  insert into public.field_profitability_records (
    organization_id, field_name, crop, season, currency, area_ha, yield_t_ha, price_per_t, cost_items,
    revenue, variable_costs, allocated_fixed_costs, operating_costs, gross_margin, operating_profit,
    revenue_per_ha, cost_per_ha, operating_profit_per_ha, operating_margin_pct, roi_pct,
    break_even_price_per_t, break_even_yield_t_ha, created_by
  ) values (
    p_organization_id, trim(p_field_name), trim(p_crop), trim(p_season), upper(p_currency)::char(3),
    p_area_ha, p_yield_t_ha, p_price_per_t, p_cost_items,
    (p_metrics->>'revenue')::numeric, (p_metrics->>'variableCosts')::numeric,
    (p_metrics->>'allocatedFixedCosts')::numeric, (p_metrics->>'operatingCosts')::numeric,
    (p_metrics->>'grossMargin')::numeric, (p_metrics->>'operatingProfit')::numeric,
    (p_metrics->>'revenuePerHa')::numeric, (p_metrics->>'costPerHa')::numeric,
    (p_metrics->>'operatingProfitPerHa')::numeric,
    nullif(p_metrics->>'operatingMarginPct','')::numeric,
    nullif(p_metrics->>'roiPct','')::numeric,
    nullif(p_metrics->>'breakEvenPricePerT','')::numeric,
    nullif(p_metrics->>'breakEvenYieldTPerHa','')::numeric,
    v_user
  ) returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public.save_field_profitability(uuid,text,text,text,text,numeric,numeric,numeric,jsonb,jsonb) from public, anon;
grant execute on function public.save_field_profitability(uuid,text,text,text,text,numeric,numeric,numeric,jsonb,jsonb) to authenticated;
