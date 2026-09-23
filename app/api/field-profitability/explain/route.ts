import { generateText } from "ai";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { deterministicExplanation } from "@/lib/field-profitability";

const bodySchema = z.object({ recordId: z.string().uuid() });

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  if (!auth?.claims) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data: record, error } = await supabase
    .from("field_profitability_records")
    .select("id,organization_id,field_name,crop,season,currency,area_ha,yield_t_ha,price_per_t,cost_items,revenue,variable_costs,allocated_fixed_costs,operating_costs,gross_margin,operating_profit,revenue_per_ha,cost_per_ha,operating_profit_per_ha,operating_margin_pct,roi_pct,break_even_price_per_t,break_even_yield_t_ha")
    .eq("id", parsed.data.recordId)
    .single();

  if (error || !record) return Response.json({ error: "Record not found" }, { status: 404 });

  const input = {
    organizationId: record.organization_id,
    fieldName: record.field_name,
    crop: record.crop,
    season: record.season,
    currency: record.currency,
    areaHa: Number(record.area_ha),
    yieldTPerHa: Number(record.yield_t_ha),
    pricePerT: Number(record.price_per_t),
    costItems: record.cost_items
  };
  const metrics = {
    revenue: Number(record.revenue), variableCosts: Number(record.variable_costs),
    allocatedFixedCosts: Number(record.allocated_fixed_costs), operatingCosts: Number(record.operating_costs),
    grossMargin: Number(record.gross_margin), operatingProfit: Number(record.operating_profit),
    revenuePerHa: Number(record.revenue_per_ha), costPerHa: Number(record.cost_per_ha),
    operatingProfitPerHa: Number(record.operating_profit_per_ha),
    operatingMarginPct: record.operating_margin_pct === null ? null : Number(record.operating_margin_pct),
    roiPct: record.roi_pct === null ? null : Number(record.roi_pct),
    breakEvenPricePerT: record.break_even_price_per_t === null ? null : Number(record.break_even_price_per_t),
    breakEvenYieldTPerHa: record.break_even_yield_t_ha === null ? null : Number(record.break_even_yield_t_ha)
  };
  const fallback = deterministicExplanation(input, metrics);
  const model = process.env.AI_MODEL;
  if (!model) return Response.json({ explanation: fallback, source: "deterministic" });

  try {
    const result = await generateText({
      model,
      maxOutputTokens: 220,
      system: "You explain field economics to a farmer. Treat supplied figures as authoritative. Do not recalculate or invent values. Explicitly say this is field operating profitability, not statutory net profit. Be concise and practical.",
      prompt: JSON.stringify({ input, metrics })
    });
    return Response.json({ explanation: result.text, source: "ai" });
  } catch (err) {
    console.error(JSON.stringify({ event: "field_profitability_ai_failed", recordId: record.id, error: err instanceof Error ? err.message : String(err) }));
    return Response.json({ explanation: fallback, source: "deterministic_fallback" });
  }
}
