"use client"
import { useState, useCallback } from "react"

// Printers: average consumption during printing (not peak)
const PRINTERS: { group: string; models: { label: string; watts: number }[] }[] = [
  {
    group: "Bambu Lab",
    models: [
      { label: "H2D", watts: 220 },
      { label: "X1 Carbon", watts: 130 },
      { label: "X1E", watts: 135 },
      { label: "P1S", watts: 110 },
      { label: "P1P", watts: 90 },
      { label: "A1", watts: 85 },
      { label: "A1 Mini", watts: 65 },
    ],
  },
  {
    group: "Prusa",
    models: [
      { label: "MK4 / MK4S", watts: 80 },
      { label: "MK3S+", watts: 80 },
      { label: "XL", watts: 120 },
      { label: "MINI+", watts: 60 },
      { label: "Core One", watts: 85 },
    ],
  },
  {
    group: "Creality",
    models: [
      { label: "Ender 3 / Pro / V2", watts: 120 },
      { label: "Ender 3 V3 / V3 SE", watts: 100 },
      { label: "Ender 5 Plus", watts: 200 },
      { label: "K1 / K1C", watts: 120 },
      { label: "K1 Max", watts: 150 },
      { label: "K2 Plus", watts: 170 },
    ],
  },
  {
    group: "Voron",
    models: [
      { label: "0.1 / 0.2", watts: 80 },
      { label: "Trident", watts: 350 },
      { label: "2.4", watts: 400 },
    ],
  },
  {
    group: "Anycubic",
    models: [
      { label: "Kobra 2 / Neo", watts: 100 },
      { label: "Kobra 2 Pro / Plus", watts: 110 },
      { label: "Kobra Max", watts: 180 },
      { label: "Kobra 3 Combo", watts: 130 },
    ],
  },
  {
    group: "Sovol",
    models: [
      { label: "SV06 / SV06 Plus", watts: 110 },
      { label: "SV07 / SV07 Plus", watts: 120 },
      { label: "SV08", watts: 130 },
    ],
  },
  {
    group: "FlashForge",
    models: [
      { label: "Adventurer 5M", watts: 90 },
      { label: "Adventurer 5M Pro", watts: 95 },
      { label: "Creator 4S", watts: 160 },
    ],
  },
  {
    group: "Other",
    models: [{ label: "Custom (enter below)", watts: 0 }],
  },
]

const ALL_PRINTERS = PRINTERS.flatMap((g) => g.models.map((m) => ({ ...m, group: g.group })))

// Electricity rates by region ($/kWh, approximate 2024–2025 averages)
const REGIONS: { group: string; places: { label: string; rate: number }[] }[] = [
  {
    group: "United States",
    places: [
      { label: "US National Average", rate: 0.16 },
      { label: "Alabama", rate: 0.13 },
      { label: "Alaska", rate: 0.23 },
      { label: "Arizona", rate: 0.13 },
      { label: "Arkansas", rate: 0.11 },
      { label: "California", rate: 0.25 },
      { label: "Colorado", rate: 0.13 },
      { label: "Connecticut", rate: 0.21 },
      { label: "Florida", rate: 0.13 },
      { label: "Georgia", rate: 0.13 },
      { label: "Hawaii", rate: 0.38 },
      { label: "Idaho", rate: 0.10 },
      { label: "Illinois", rate: 0.14 },
      { label: "Indiana", rate: 0.14 },
      { label: "Iowa", rate: 0.11 },
      { label: "Kansas", rate: 0.13 },
      { label: "Kentucky", rate: 0.11 },
      { label: "Louisiana", rate: 0.11 },
      { label: "Maine", rate: 0.22 },
      { label: "Maryland", rate: 0.15 },
      { label: "Massachusetts", rate: 0.23 },
      { label: "Michigan", rate: 0.17 },
      { label: "Minnesota", rate: 0.14 },
      { label: "Mississippi", rate: 0.12 },
      { label: "Missouri", rate: 0.12 },
      { label: "Montana", rate: 0.11 },
      { label: "Nebraska", rate: 0.11 },
      { label: "Nevada", rate: 0.12 },
      { label: "New Hampshire", rate: 0.22 },
      { label: "New Jersey", rate: 0.17 },
      { label: "New Mexico", rate: 0.13 },
      { label: "New York", rate: 0.21 },
      { label: "North Carolina", rate: 0.12 },
      { label: "North Dakota", rate: 0.11 },
      { label: "Ohio", rate: 0.13 },
      { label: "Oklahoma", rate: 0.11 },
      { label: "Oregon", rate: 0.11 },
      { label: "Pennsylvania", rate: 0.15 },
      { label: "Rhode Island", rate: 0.22 },
      { label: "South Carolina", rate: 0.13 },
      { label: "Tennessee", rate: 0.12 },
      { label: "Texas", rate: 0.12 },
      { label: "Utah", rate: 0.11 },
      { label: "Vermont", rate: 0.19 },
      { label: "Virginia", rate: 0.13 },
      { label: "Washington", rate: 0.10 },
      { label: "West Virginia", rate: 0.12 },
      { label: "Wisconsin", rate: 0.15 },
      { label: "Wyoming", rate: 0.10 },
    ],
  },
  {
    group: "Canada",
    places: [
      { label: "Canada (national avg)", rate: 0.11 },
      { label: "British Columbia", rate: 0.10 },
      { label: "Ontario", rate: 0.13 },
      { label: "Quebec", rate: 0.07 },
      { label: "Alberta", rate: 0.16 },
    ],
  },
  {
    group: "Europe",
    places: [
      { label: "EU Average", rate: 0.27 },
      { label: "UK", rate: 0.29 },
      { label: "Germany", rate: 0.33 },
      { label: "France", rate: 0.23 },
      { label: "Netherlands", rate: 0.28 },
      { label: "Spain", rate: 0.22 },
      { label: "Italy", rate: 0.28 },
      { label: "Sweden", rate: 0.14 },
      { label: "Norway", rate: 0.11 },
    ],
  },
  {
    group: "Other",
    places: [
      { label: "Australia", rate: 0.25 },
      { label: "Japan", rate: 0.22 },
      { label: "South Korea", rate: 0.11 },
      { label: "Custom (enter below)", rate: 0 },
    ],
  },
]

interface Plate {
  id: number
  filamentCost: string
  printTimeHr: string
}

let nextId = 1

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
  const [plates, setPlates] = useState<Plate[]>([{ id: nextId++, filamentCost: "", printTimeHr: "" }])
  const [printerKey, setPrinterKey] = useState("Bambu Lab|X1 Carbon")
  const [customWatts, setCustomWatts] = useState("")
  const [regionKey, setRegionKey] = useState("United States|US National Average")
  const [customRate, setCustomRate] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [markupPct, setMarkupPct] = useState("")
  const [copied, setCopied] = useState(false)

  const selectedPrinter = ALL_PRINTERS.find((p) => `${p.group}|${p.label}` === printerKey)
  const isCustomPrinter = selectedPrinter?.watts === 0
  const wattage = isCustomPrinter ? parseNum(customWatts, 0) : (selectedPrinter?.watts ?? 0)

  const selectedRegion = REGIONS.flatMap((g) => g.places.map((p) => ({ ...p, group: g.group }))).find(
    (p) => `${p.group}|${p.label}` === regionKey
  )
  const isCustomRegion = selectedRegion?.rate === 0
  const electricityRate = isCustomRegion ? parseNum(customRate, 0) : (selectedRegion?.rate ?? 0.16)

  const updatePlate = useCallback((id: number, field: keyof Omit<Plate, "id">, value: string) => {
    setPlates((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }, [])

  const addPlate = useCallback(() => {
    setPlates((prev) => [...prev, { id: nextId++, filamentCost: "", printTimeHr: "" }])
  }, [])

  const removePlate = useCallback((id: number) => {
    setPlates((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const totalFilamentCost = plates.reduce((sum, p) => sum + parseNum(p.filamentCost), 0)
  const totalPrintTime = plates.reduce((sum, p) => sum + parseNum(p.printTimeHr), 0)
  const electricityCost = (totalPrintTime * wattage) / 1000 * electricityRate
  const labor = parseNum(hourlyRate)
  const laborCost = labor > 0 ? totalPrintTime * labor : 0
  const totalCost = totalFilamentCost + electricityCost + laborCost

  const sell50 = totalCost * 1.5
  const sell100 = totalCost * 2.0
  const sell150 = totalCost * 2.5
  const markup = parseNum(markupPct)
  const sellCustom = markup > 0 ? totalCost * (1 + markup / 100) : null

  const hasData = totalFilamentCost > 0 && totalPrintTime > 0

  function getVerdict(): string {
    if (!hasData || totalCost === 0) return ""
    if (sell50 < 2) return "Very low value — only worth it in bulk."
    if (labor > 0) {
      const effectiveHourly = (sell100 - totalFilamentCost - electricityCost) / totalPrintTime
      if (effectiveHourly < 10) return "Low return on your time. Consider charging more."
      if (effectiveHourly < 20) return "Viable for custom orders."
      return "Strong margins — worth taking on."
    }
    return "Looks viable. Add your hourly rate for a full picture."
  }

  function getQuote(): string {
    if (!hasData) return ""
    const plateCount = plates.length
    let msg = `Custom print quote (${plateCount} plate${plateCount > 1 ? "s" : ""}): $${fmt(sell100)}`
    msg += ` — includes materials ($${fmt(totalFilamentCost)}), electricity ($${fmt(electricityCost)})`
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
  const selectClass = inputClass + " cursor-pointer"

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500">Free Tool</div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Pricing Calculator</h1>
        <p className="mt-3 max-w-xl text-neutral-400">
          Figure out what to charge for a custom print job or price a new product. Results update as you type — no submit button needed.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-6">

            {/* Plates */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">Print Plates</h2>
              <div className="space-y-3">
                {plates.map((plate, i) => (
                  <div key={plate.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-neutral-500">Plate {i + 1}</span>
                      {plates.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePlate(plate.id)}
                          className="text-xs text-neutral-600 transition-colors hover:text-red-400"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Filament Cost ($)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="From slicer"
                          value={plate.filamentCost}
                          onChange={(e) => updatePlate(plate.id, "filamentCost", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Print Time (hrs)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="From slicer"
                          value={plate.printTimeHr}
                          onChange={(e) => updatePlate(plate.id, "printTimeHr", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addPlate}
                className="mt-3 w-full rounded-lg border border-dashed border-white/10 py-2.5 text-sm text-neutral-500 transition-colors hover:border-white/20 hover:text-neutral-300"
              >
                + Add plate
              </button>
            </div>

            {/* Printer */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">Printer</h2>
              <div>
                <label className={labelClass}>Printer Model</label>
                <select
                  value={printerKey}
                  onChange={(e) => setPrinterKey(e.target.value)}
                  className={selectClass}
                >
                  {PRINTERS.map((g) => (
                    <optgroup key={g.group} label={g.group}>
                      {g.models.map((m) => (
                        <option key={m.label} value={`${g.group}|${m.label}`} className="bg-[#111]">
                          {m.label}{m.watts > 0 ? ` — ${m.watts}W avg` : ""}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              {isCustomPrinter && (
                <div className="mt-3">
                  <label className={labelClass}>Average Wattage During Print (W)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 120"
                    value={customWatts}
                    onChange={(e) => setCustomWatts(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            {/* Electricity */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">Electricity</h2>
              <div>
                <label className={labelClass}>Region</label>
                <select
                  value={regionKey}
                  onChange={(e) => setRegionKey(e.target.value)}
                  className={selectClass}
                >
                  {REGIONS.map((g) => (
                    <optgroup key={g.group} label={g.group}>
                      {g.places.map((p) => (
                        <option key={p.label} value={`${g.group}|${p.label}`} className="bg-[#111]">
                          {p.label}{p.rate > 0 ? ` — $${p.rate.toFixed(2)}/kWh` : ""}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              {isCustomRegion && (
                <div className="mt-3">
                  <label className={labelClass}>Your Rate ($/kWh)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 0.14"
                    value={customRate}
                    onChange={(e) => setCustomRate(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            {/* Labor */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">Labor & Markup</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Hourly Rate ($/hr) <span className="text-neutral-600">optional</span></label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="e.g. 15"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
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
                    value={markupPct}
                    onChange={(e) => setMarkupPct(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-500">Cost Breakdown</h2>

            {!hasData ? (
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-neutral-500">
                Enter filament cost and print time on at least one plate to see your costs
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] divide-y divide-white/5">
                  <CostRow label={`Filament (${plates.length} plate${plates.length > 1 ? "s" : ""})`} value={totalFilamentCost} />
                  <CostRow label={`Electricity (${wattage}W × ${fmt(totalPrintTime)}hr)`} value={electricityCost} />
                  {laborCost > 0 && <CostRow label={`Labor (${fmt(totalPrintTime)}hr × $${labor}/hr)`} value={laborCost} />}
                  <CostRow label="Total cost" value={totalCost} bold />
                </div>

                <h2 className="pt-2 text-sm font-semibold uppercase tracking-widest text-neutral-500">Suggested Sell Price</h2>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] divide-y divide-white/5">
                  <SellRow label="50% markup" value={sell50} />
                  <SellRow label="100% markup" value={sell100} highlight />
                  <SellRow label="150% markup" value={sell150} />
                  {sellCustom !== null && (
                    <SellRow label={`${fmt(markup)}% markup (custom)`} value={sellCustom} />
                  )}
                </div>

                {getVerdict() && (
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-neutral-300">
                    {getVerdict()}
                  </div>
                )}

                <button
                  onClick={handleCopy}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-neutral-300 transition-all hover:border-white/20 hover:text-white active:scale-[0.98]"
                >
                  {copied ? "Copied!" : "Copy Quote to Clipboard"}
                </button>
                <p className="text-xs text-center text-neutral-600">Copies a formatted message at 100% markup</p>
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
        ${value < 0.01 && value > 0 ? value.toFixed(4) : value.toFixed(2)}
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
