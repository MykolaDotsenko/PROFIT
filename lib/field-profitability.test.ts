import { describe, expect, it } from "vitest";
import {
  calculateFieldProfitability,
  fieldProfitabilityInputSchema,
  type FieldProfitabilityInput
} from "@/lib/field-profitability";

const base: FieldProfitabilityInput = {
  organizationId: "00000000-0000-4000-8000-000000000001",
  fieldName: "North 40",
  crop: "Wheat",
  season: "2026",
  currency: "EUR",
  areaHa: 100,
  yieldTPerHa: 6,
  pricePerT: 220,
  costItems: [
    { label: "Seed", type: "variable", amount: 12000 },
    { label: "Fertiliser", type: "variable", amount: 30000 },
    { label: "Allocated overhead", type: "allocated_fixed", amount: 10000 }
  ]
};

describe("calculateFieldProfitability", () => {
  it("calculates auditable field economics", () => {
    expect(calculateFieldProfitability(base)).toEqual({
      revenue: 132000,
      variableCosts: 42000,
      allocatedFixedCosts: 10000,
      operatingCosts: 52000,
      grossMargin: 90000,
      operatingProfit: 80000,
      revenuePerHa: 1320,
      costPerHa: 520,
      operatingProfitPerHa: 800,
      operatingMarginPct: 60.6061,
      roiPct: 153.8462,
      breakEvenPricePerT: 86.67,
      breakEvenYieldTPerHa: 2.3636
    });
  });

  it("never improves operating profit when a cost increases", () => {
    for (const extraCost of [0.01, 1, 1000, 100000]) {
      const first = calculateFieldProfitability(base);
      const second = calculateFieldProfitability({
        ...base,
        costItems: [...base.costItems, { label: "Extra cost", type: "variable", amount: extraCost }]
      });
      expect(second.operatingProfit).toBeLessThanOrEqual(first.operatingProfit);
    }
  });

  it("increases revenue and operating profit when price rises with all costs unchanged", () => {
    const lower = calculateFieldProfitability({ ...base, pricePerT: 200 });
    const higher = calculateFieldProfitability({ ...base, pricePerT: 250 });
    expect(higher.revenue).toBeGreaterThan(lower.revenue);
    expect(higher.operatingProfit).toBeGreaterThan(lower.operatingProfit);
    expect(higher.operatingCosts).toBe(lower.operatingCosts);
  });

  it("returns null break-even price when yield is zero", () => {
    expect(calculateFieldProfitability({ ...base, yieldTPerHa: 0 }).breakEvenPricePerT).toBeNull();
  });

  it("returns null break-even yield when price is zero", () => {
    expect(calculateFieldProfitability({ ...base, pricePerT: 0 }).breakEvenYieldTPerHa).toBeNull();
  });

  it("returns null ROI when no costs are allocated", () => {
    expect(calculateFieldProfitability({ ...base, costItems: [] }).roiPct).toBeNull();
  });

  it("supports a loss-making field without masking the negative result", () => {
    const result = calculateFieldProfitability({ ...base, pricePerT: 50 });
    expect(result.operatingProfit).toBeLessThan(0);
    expect(result.operatingMarginPct).toBeLessThan(0);
    expect(result.roiPct).toBeLessThan(0);
  });
});

describe("fieldProfitabilityInputSchema", () => {
  it("rejects negative cost amounts", () => {
    const result = fieldProfitabilityInputSchema.safeParse({
      ...base,
      costItems: [{ label: "Invalid", type: "variable", amount: -1 }]
    });
    expect(result.success).toBe(false);
  });

  it("rejects malformed currency codes", () => {
    const result = fieldProfitabilityInputSchema.safeParse({ ...base, currency: "EURO" });
    expect(result.success).toBe(false);
  });
});
