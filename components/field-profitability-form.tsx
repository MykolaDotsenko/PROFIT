"use client";

import { useMemo, useState } from "react";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { saveFieldProfitability } from "@/app/actions";
import { calculateFieldProfitability, type FieldProfitabilityInput } from "@/lib/field-profitability";

type CostItem = FieldProfitabilityInput["costItems"][number];

export function FieldProfitabilityForm({ organizationId }: { organizationId: string }) {
  const [fieldName, setFieldName] = useState("");
  const [crop, setCrop] = useState("");
  const [season, setSeason] = useState(String(new Date().getFullYear()));
  const [currency, setCurrency] = useState("EUR");
  const [areaHa, setAreaHa] = useState(100);
  const [yieldTPerHa, setYield] = useState(0);
  const [pricePerT, setPrice] = useState(0);
  const [costItems, setCostItems] = useState<CostItem[]>([
    { label: "Seed", type: "variable", amount: 0 },
    { label: "Fertiliser", type: "variable", amount: 0 },
    { label: "Crop protection", type: "variable", amount: 0 },
    { label: "Machinery & fuel", type: "variable", amount: 0 },
    { label: "Allocated overhead", type: "allocated_fixed", amount: 0 }
  ]);

  const preview = useMemo(() => calculateFieldProfitability({
    organizationId, fieldName: fieldName || "Field", crop: crop || "Crop", season, currency,
    areaHa: Math.max(areaHa, 0.0001), yieldTPerHa, pricePerT, costItems
  }), [organizationId, fieldName, crop, season, currency, areaHa, yieldTPerHa, pricePerT, costItems]);

  return (
    <form action={saveFieldProfitability} className="grid gap-6 lg:grid-cols-[1.4fr_.8fr]">
      <input type="hidden" name="organizationId" value={organizationId} />
      <input type="hidden" name="costItems" value={JSON.stringify(costItems)} />
      <section className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2"><Calculator size={20}/><h2 className="text-xl font-semibold">New field calculation</h2></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Field" name="fieldName" value={fieldName} onChange={setFieldName} />
          <Field label="Crop" name="crop" value={crop} onChange={setCrop} />
          <Field label="Season" name="season" value={season} onChange={setSeason} />
          <Field label="Currency" name="currency" value={currency} onChange={setCurrency} maxLength={3} />
          <NumberField label="Area (ha)" name="areaHa" value={areaHa} onChange={setAreaHa} min={0.0001} />
          <NumberField label="Yield (t/ha)" name="yieldTPerHa" value={yieldTPerHa} onChange={setYield} min={0} />
          <NumberField label="Price / t" name="pricePerT" value={pricePerT} onChange={setPrice} min={0} />
        </div>

        <div className="mt-7 flex items-center justify-between"><h3 className="font-semibold">Costs</h3><button type="button" onClick={() => setCostItems([...costItems, { label: "Other", type: "variable", amount: 0 }])} className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm"><Plus size={16}/>Add cost</button></div>
        <div className="mt-3 space-y-3">
          {costItems.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_150px_130px_40px] gap-2">
              <input aria-label="Cost label" value={item.label} onChange={(e) => updateCost(i, { label: e.target.value })} className="rounded-lg border p-2" />
              <select aria-label="Cost type" value={item.type} onChange={(e) => updateCost(i, { type: e.target.value as CostItem["type"] })} className="rounded-lg border p-2">
                <option value="variable">Variable</option><option value="allocated_fixed">Allocated fixed</option>
              </select>
              <input aria-label="Cost amount" type="number" min="0" step="0.01" value={item.amount} onChange={(e) => updateCost(i, { amount: Number(e.target.value) })} className="rounded-lg border p-2 text-right" />
              <button aria-label="Remove cost" type="button" onClick={() => setCostItems(costItems.filter((_, idx) => idx !== i))} className="grid place-items-center rounded-lg border"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[var(--muted)]">Only costs you enter or allocate to this field are included. Financing, tax, owner drawings and unallocated whole-farm overhead are excluded.</p>
        <button type="submit" className="mt-6 w-full rounded-lg bg-[var(--accent)] px-4 py-3 font-semibold text-white">Save profitability snapshot</button>
      </section>

      <aside className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:self-start">
        <p className="text-sm font-semibold text-[var(--accent)]">LIVE PREVIEW</p>
        <Metric label="Operating profit" value={money(preview.operatingProfit, currency)} strong />
        <Metric label="Operating profit / ha" value={money(preview.operatingProfitPerHa, currency)} />
        <Metric label="Revenue" value={money(preview.revenue, currency)} />
        <Metric label="Variable costs" value={money(preview.variableCosts, currency)} />
        <Metric label="Allocated fixed costs" value={money(preview.allocatedFixedCosts, currency)} />
        <Metric label="Gross margin" value={money(preview.grossMargin, currency)} />
        <Metric label="Operating margin" value={preview.operatingMarginPct === null ? "—" : `${preview.operatingMarginPct.toFixed(1)}%`} />
        <Metric label="ROI on allocated cost" value={preview.roiPct === null ? "—" : `${preview.roiPct.toFixed(1)}%`} />
        <Metric label="Break-even price" value={preview.breakEvenPricePerT === null ? "—" : `${money(preview.breakEvenPricePerT, currency)}/t`} />
        <Metric label="Break-even yield" value={preview.breakEvenYieldTPerHa === null ? "—" : `${preview.breakEvenYieldTPerHa.toFixed(2)} t/ha`} />
      </aside>
    </form>
  );

  function updateCost(index: number, patch: Partial<CostItem>) {
    setCostItems(costItems.map((item, i) => i === index ? { ...item, ...patch } : item));
  }
}

function Field({ label, name, value, onChange, maxLength }: { label: string; name: string; value: string; onChange: (v: string) => void; maxLength?: number }) {
  return <label className="text-sm font-medium">{label}<input name={name} value={value} maxLength={maxLength} required onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border p-3" /></label>;
}
function NumberField({ label, name, value, onChange, min }: { label: string; name: string; value: number; onChange: (v: number) => void; min: number }) {
  return <label className="text-sm font-medium">{label}<input name={name} type="number" step="0.0001" min={min} value={value} required onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full rounded-lg border p-3" /></label>;
}
function Metric({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className="flex items-baseline justify-between gap-4 border-b py-3"><span className="text-sm text-[var(--muted)]">{label}</span><span className={strong ? "text-xl font-bold" : "font-semibold"}>{value}</span></div>;
}
function money(value: number, currency: string) {
  try { return new Intl.NumberFormat("en", { style: "currency", currency }).format(value); } catch { return `${value.toFixed(2)} ${currency}`; }
}
