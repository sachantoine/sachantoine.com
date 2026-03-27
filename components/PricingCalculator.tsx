"use client"
import { useState, useCallback } from "react"

const FILAMENT_TYPES = ["PLA", "PETG", "ABS", "TPU", "ASA", "Nylon", "Resin", "Other"]

interface Inputs {
  filamentType: string
  costPerKg: string
  weightG: string
  printTimeHr: string
  electricityRate: string
  wattage: string
  hourlyRate: string
  markupPct: string
}

function parseNum(val: string, fallback = 0): number {
  const n = parseFloat(val)
  return isNaN(n) ? fallback : n
}

function fmt(n: number): string {
  return n.toFixed(2)
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {})
}

export default function PricingCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    filamentType: "PLA",
    costPerKg: "25",
    weightG: "",
    printTimeHr: "",
    electricityRate: "0.13",
    wattage: "150",
    hourlyRate: "",
    markupPct: "",
  })
  const [copied, setCopied] = useState(false)

  const set = useCallback((field: keyof Inputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }, [])

  const costPerKg = parseNum(inputs.costPerKg)
  const weightG = parseNum(inputs.weightG)
  const printTimeHr = parseNum(inputs.printTimeHr)
  const electricityRate = parseNum(inputs.electricityRate, 0.13)
  const wattage = parseNum(inputs.wattage, 150)
  const hourlyRate = parseNum(inputs.hourlyRate)
  const markupPct = parseNum(inputs.markupPct)

  const filamentCost = (weightG / 1000) * costPerKg
  const electricityCost = (printTimeHr * wattage) / 1000 * electricityRate
  const laborCost = hourlyRate > 0 ? printTimeHr * hourlyRate : 0
  const totalCost = filamentCost + electricityCost + laborCost

  const sell50 = totalCost * 1.5
  const sell100 = totalCost * 2.0
  const sell150 = totalCost * 2.5
  const sellCustom = markupPct > 0 ? totalCost * (1 + markupPct / 100) : null

  const hasData = weightG > 0 && printTimeHr > 0

  function getVerdict(): string {
    if (!hasData || totalCost === 0) return ""
    if (sell50 < 2) return "Very low value — only worth it in bulk."
    if (hourlyRate > 0) {
      const effectiveHourly = (sell100 - filamentCost - electricityCost) / printTimeHr
      if (effectiveHourly < 10) return "Low return on your time. Consider charging more."
      if (effectiveHourly < 20) return "Viable for custom orders."
      return "Strong margins — worth taking on."
    }
    return "Looks viable. Add your hourly rate for a full picture."
  }

  function getQuote(): string {
    if (!hasData) return ""
    let msg = `Custom ${inputs.filamentType} print quote: $${fmt(sell100)}`
    msg += ` — includes materials ($${fmt(filamentCost)}), electricity ($${fmt(electricityCost)})`
    if (laborCost > 0) msg += `, labor ($${fmt(laborCost)})`
    msg += ". Reply to confirm."
    return msg
  }

  function handleCopy() {
    copyToClipboard(getQuote())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-white/30"
  const labelClass = "block text-xs font-medium text-neutral-400 mb-1.5"

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500">Free Tool</div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Pricing Calculator</h1>
        <p className="mt-3 max-w-xl text-neutral-400">
          Figure out what to charge for a custom print job or price a new product. Results update as you type — no submit button needed.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">Print Details</h2>

            <div>
              <label className={labelClass}>Filament Type</label>
              <select
                value={inputs.filamentType}
                onChange={(e) => set("filamentType", e.target.value)}
                className={inputClass + " cursor-pointer"}
              >
                {FILAMENT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#0a0a0a]">{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Filament Cost ($/kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 25"
                  value={inputs.costPerKg}
                  onChange={(e) => set("costPerKg", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Print Weight (g)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="From your slicer"
                  value={inputs.weightG}
                  onChange={(e) => set("weightG", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Print Time (hours)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="From your slicer"
                value={inputs.printTimeHr}
                onChange={(e) => set("printTimeHr", e.target.value)}
                className={inputClass}
              />
            </div>

            <h2 className="pt-2 text-sm font-semibold uppercase tracking-widest text-neutral-500">Power & Labor</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Electricity Rate ($/kWh)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.13"
                  value={inputs.electricityRate}
                  onChange={(e) => set("electricityRate", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Printer Wattage (W)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="150"
                  value={inputs.wattage}
                  onChange={(e) => set("wattage", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Your Hourly Rate ($/hr) <span className="text-neutral-600">optional</span></label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="e.g. 15"
                  value={inputs.hourlyRate}
                  onChange={(e) => set("hourlyRate", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Custom Markup (%) <span className="text-neutral-600">optional</span></label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 80"
                  value={inputs.markupPct}
                  onChange={(e) => set("markupPct", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-500">Cost Breakdown</h2>

            {!hasData ? (
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8 text-center text-neutral-500 text-sm">
                Enter print weight and time to see your costs
              </div>
            ) : (
              <div className="space-y-3">
                {/* Cost breakdown */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] divide-y divide-white/5">
                  <CostRow label="Filament" value={filamentCost} />
                  <CostRow label="Electricity" value={electricityCost} />
                  {laborCost > 0 && <CostRow label="Labor" value={laborCost} />}
                  <CostRow label="Total cost" value={totalCost} bold />
                </div>

                {/* Sell price suggestions */}
                <h2 className="pt-2 text-sm font-semibold uppercase tracking-widest text-neutral-500">Suggested Sell Price</h2>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] divide-y divide-white/5">
                  <SellRow label="50% markup" value={sell50} />
                  <SellRow label="100% markup" value={sell100} highlight />
                  <SellRow label="150% markup" value={sell150} />
                  {sellCustom !== null && (
                    <SellRow label={`${fmt(markupPct)}% markup (custom)`} value={sellCustom} />
                  )}
                </div>

                {/* Verdict */}
                {getVerdict() && (
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-neutral-300">
                    {getVerdict()}
                  </div>
                )}

                {/* Copy quote */}
                <button
                  onClick={handleCopy}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-neutral-300 transition-all hover:border-white/20 hover:text-white active:scale-[0.98]"
                >
                  {copied ? "Copied!" : "Copy Quote to Clipboard"}
                </button>
                <p className="text-xs text-neutral-600 text-center">Copies a formatted message at 100% markup</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function CostRow({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${bold ? "bg-white/[0.03]" : ""}`}>
      <span className={`text-sm ${bold ? "font-semibold text-white" : "text-neutral-400"}`}>{label}</span>
      <span className={`font-mono text-sm ${bold ? "font-semibold text-white" : "text-neutral-300"}`}>
        ${value.toFixed(4) === "0.0000" ? "0.00" : value < 0.01 ? value.toFixed(4) : value.toFixed(2)}
      </span>
    </div>
  )
}

function SellRow({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${highlight ? "bg-white/[0.04]" : ""}`}>
      <span className={`text-sm ${highlight ? "text-white" : "text-neutral-400"}`}>{label}</span>
      <span className={`font-mono text-sm font-semibold ${highlight ? "text-white" : "text-neutral-300"}`}>
        ${value.toFixed(2)}
      </span>
    </div>
  )
}
