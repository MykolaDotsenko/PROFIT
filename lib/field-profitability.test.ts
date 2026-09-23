import { describe, expect, it } from "vitest";
import { calculateFieldProfitability, type FieldProfitabilityInput } from "@/lib/field-profitability";

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

  it("cannot improve profit when a cost increases and everything else is unchanged", () => {
    const first = calculateFieldProfitability(base);
    const second = calculateFieldProfitability({
      ...base,
      costItems: [...base.costItems, { label: "Extra cost", type: "variable", amount: 1000 }]
    });
    expect(second.operatingProfit).toBeLessThan(first.operatingProfit);
  });

  it("returns null break-even price when yield is zero", () => {
    expect(calculateFieldProfitability({ ...base, yieldTPerHa: 0 }).breakEvenPricePerT).toBeNull();
  });
});
