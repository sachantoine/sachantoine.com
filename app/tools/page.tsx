import type { Metadata } from "next"
import Nav from "@/components/Nav"
import PricingCalculator from "@/components/PricingCalculator"
import CalculatorFeedback from "@/components/CalculatorFeedback"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Pricing Calculator — Sach Antoine",
  description: "Free 3D print pricing calculator. Figure out what to charge for custom print jobs using material cost, electricity, and your time.",
}

export default function ToolsPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <PricingCalculator />
        <CalculatorFeedback />
      </main>
      <Footer />
    </>
  )
}
