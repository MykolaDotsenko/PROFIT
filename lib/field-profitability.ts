import { z } from "zod";
import { roundMetric, roundMoney, safeDivide } from "@/lib/money";

export const costItemSchema = z.object({
  label: z.string().trim().min(1).max(80),
  type: z.enum(["variable", "allocated_fixed"]),
  amount: z.coerce.number().min(0).max(100000000)
});

export const fieldProfitabilityInputSchema = z.object({
  organizationId: z.string().uuid(),
  fieldName: z.string().trim().min(1).max(120),
  crop: z.string().trim().min(1).max(80),
  season: z.string().trim().min(1).max(40),
  currency: z.string().trim().length(3).transform((value) => value.toUpperCase()),
  areaHa: z.coerce.number().positive().max(1000000),
  yieldTPerHa: z.coerce.number().min(0).max(1000),
  pricePerT: z.coerce.number().min(0).max(10000000),
  costItems: z.array(costItemSchema).max(50)
});

export type FieldProfitabilityInput = z.infer<typeof fieldProfitabilityInputSchema>;

export type FieldProfitabilityMetrics = {
  revenue: number;
  variableCosts: number;
  allocatedFixedCosts: number;
  operatingCosts: number;
  grossMargin: number;
  operatingProfit: number;
  revenuePerHa: number;
  costPerHa: number;
  operatingProfitPerHa: number;
  operatingMarginPct: number | null;
  roiPct: number | null;
  breakEvenPricePerT: number | null;
  breakEvenYieldTPerHa: number | null;
};

export function calculateFieldProfitability(input: FieldProfitabilityInput): FieldProfitabilityMetrics {
  const variableCosts = roundMoney(input.costItems.filter((x) => x.type === "variable").reduce((sum, x) => sum + x.amount, 0));
  const allocatedFixedCosts = roundMoney(input.costItems.filter((x) => x.type === "allocated_fixed").reduce((sum, x) => sum + x.amount, 0));
  const revenue = roundMoney(input.areaHa * input.yieldTPerHa * input.pricePerT);
  const operatingCosts = roundMoney(variableCosts + allocatedFixedCosts);
  const grossMargin = roundMoney(revenue - variableCosts);
  const operatingProfit = roundMoney(revenue - operatingCosts);

  return {
    revenue,
    variableCosts,
    allocatedFixedCosts,
    operatingCosts,
    grossMargin,
    operatingProfit,
    revenuePerHa: roundMoney(revenue / input.areaHa),
    costPerHa: roundMoney(operatingCosts / input.areaHa),
    operatingProfitPerHa: roundMoney(operatingProfit / input.areaHa),
    operatingMarginPct: safeDivide(operatingProfit, revenue) === null ? null : roundMetric((operatingProfit / revenue) * 100),
    roiPct: safeDivide(operatingProfit, operatingCosts) === null ? null : roundMetric((operatingProfit / operatingCosts) * 100),
    breakEvenPricePerT: input.areaHa * input.yieldTPerHa === 0 ? null : roundMoney(operatingCosts / (input.areaHa * input.yieldTPerHa)),
    breakEvenYieldTPerHa: input.areaHa * input.pricePerT === 0 ? null : roundMetric(operatingCosts / (input.areaHa * input.pricePerT))
  };
}

export function deterministicExplanation(input: FieldProfitabilityInput, metrics: FieldProfitabilityMetrics): string {
  const direction = metrics.operatingProfit >= 0 ? "profitable" : "loss-making";
  return [
    `${input.fieldName} is ${direction} on the costs currently allocated to this field.`,
    `Operating profit is ${metrics.operatingProfit.toFixed(2)} ${input.currency} (${metrics.operatingProfitPerHa.toFixed(2)} ${input.currency}/ha).`,
    `Break-even price is ${metrics.breakEvenPricePerT?.toFixed(2) ?? "n/a"} ${input.currency}/t and break-even yield is ${metrics.breakEvenYieldTPerHa?.toFixed(2) ?? "n/a"} t/ha.`,
    "This is field operating profitability, not statutory net profit; unallocated farm-level costs, financing and tax are excluded."
  ].join(" ");
}
