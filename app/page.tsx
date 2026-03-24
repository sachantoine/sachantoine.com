import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import RightNow from "@/components/RightNow"
import About from "@/components/About"
import Portfolio from "@/components/Portfolio"
import PrintGallery from "@/components/PrintGallery"
import Store from "@/components/Store"
import Gear from "@/components/Gear"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <RightNow />
        <About />
        <Portfolio />
        <PrintGallery />
        <Store />
        <Gear />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
