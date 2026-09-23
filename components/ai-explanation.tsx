"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export function AiExplanation({ recordId }: { recordId: string }) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function explain() {
    setLoading(true);
    try {
      const response = await fetch("/api/field-profitability/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId })
      });
      const data = await response.json();
      setText(data.explanation ?? "Explanation is unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3">
      <button type="button" onClick={explain} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium disabled:opacity-50">
        <Sparkles size={16}/>{loading ? "Explaining…" : "Explain drivers"}
      </button>
      {text ? <p className="mt-3 rounded-xl bg-[var(--accent-soft)] p-4 text-sm leading-6">{text}</p> : null}
    </div>
  );
}
