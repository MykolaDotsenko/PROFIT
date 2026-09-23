"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { calculateFieldProfitability, fieldProfitabilityInputSchema } from "@/lib/field-profitability";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/login?error=invalid_credentials");
  redirect("/");
}

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) redirect("/login?error=signup_failed");
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createOrganization(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const supabase = await createClient();
  const { error } = await supabase.rpc("create_organization_with_owner", { p_name: name });
  if (error) throw new Error("Could not create farm organization.");
  revalidatePath("/");
}

export async function saveFieldProfitability(formData: FormData) {
  const raw = {
    organizationId: formData.get("organizationId"),
    fieldName: formData.get("fieldName"),
    crop: formData.get("crop"),
    season: formData.get("season"),
    currency: formData.get("currency"),
    areaHa: formData.get("areaHa"),
    yieldTPerHa: formData.get("yieldTPerHa"),
    pricePerT: formData.get("pricePerT"),
    costItems: JSON.parse(String(formData.get("costItems") ?? "[]"))
  };
  const input = fieldProfitabilityInputSchema.parse(raw);
  const metrics = calculateFieldProfitability(input);
  const supabase = await createClient();
  const { error } = await supabase.rpc("save_field_profitability", {
    p_organization_id: input.organizationId,
    p_field_name: input.fieldName,
    p_crop: input.crop,
    p_season: input.season,
    p_currency: input.currency,
    p_area_ha: input.areaHa,
    p_yield_t_ha: input.yieldTPerHa,
    p_price_per_t: input.pricePerT,
    p_cost_items: input.costItems,
    p_metrics: metrics
  });
  if (error) throw new Error("Could not save field profitability record.");
  revalidatePath("/");
}
