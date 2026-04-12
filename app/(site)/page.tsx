import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Team from "../components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
