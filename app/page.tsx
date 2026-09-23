import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createOrganization, signOut } from "@/app/actions";
import { FieldProfitabilityForm } from "@/components/field-profitability-form";
import { AiExplanation } from "@/components/ai-explanation";

export default async function Home() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  if (!auth?.claims) redirect("/login");

  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id, role, organizations(id,name)")
    .order("created_at", { ascending: true });

  const membership = memberships?.[0] as any;
  if (!membership?.organization_id) {
    return (
      <main className="min-h-screen grid place-items-center p-6">
        <section className="w-full max-w-lg rounded-2xl border bg-white p-8">
          <p className="text-sm font-semibold text-[var(--accent)]">PROFIT</p>
          <h1 className="mt-2 text-3xl font-semibold">Create your farm workspace</h1>
          <form action={createOrganization} className="mt-6 flex gap-3">
            <input name="name" required placeholder="Farm name" className="flex-1 rounded-lg border p-3" />
            <button className="rounded-lg bg-[var(--accent)] px-4 py-3 font-semibold text-white">Create</button>
          </form>
        </section>
      </main>
    );
  }

  const organizationId = membership.organization_id as string;
  const organizationName = membership.organizations?.name ?? "Farm";
  const { data: records } = await supabase
    .from("field_profitability_records")
    .select("id,field_name,crop,season,currency,area_ha,operating_profit,operating_profit_per_ha,operating_margin_pct,created_at")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div><p className="text-sm font-semibold text-[var(--accent)]">PROFIT · {organizationName}</p><h1 className="mt-1 text-3xl font-semibold">Field Profitability</h1><p className="mt-1 text-sm text-[var(--muted)]">See what each field earns after the costs you actually assign to it.</p></div>
        <form action={signOut}><button className="rounded-lg border bg-white px-4 py-2 text-sm font-medium">Sign out</button></form>
      </header>

      <FieldProfitabilityForm organizationId={organizationId} />

      <section className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Saved snapshots</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead><tr className="border-b text-[var(--muted)]"><th className="py-3">Field</th><th>Crop</th><th>Season</th><th>Area</th><th>Operating profit</th><th>Profit / ha</th><th>Margin</th><th>Explanation</th></tr></thead>
            <tbody>{records?.map((record) => <tr key={record.id} className="border-b last:border-0">
              <td className="py-4 font-medium">{record.field_name}</td><td>{record.crop}</td><td>{record.season}</td><td>{Number(record.area_ha).toFixed(1)} ha</td>
              <td>{money(Number(record.operating_profit), record.currency)}</td><td>{money(Number(record.operating_profit_per_ha), record.currency)}</td>
              <td>{record.operating_margin_pct === null ? "—" : `${Number(record.operating_margin_pct).toFixed(1)}%`}</td><td><AiExplanation recordId={record.id}/></td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function money(value: number, currency: string) {
  try { return new Intl.NumberFormat("en", { style: "currency", currency }).format(value); } catch { return `${value.toFixed(2)} ${currency}`; }
}
