import Navbar from "@/components/landing/navbar";
import HeroSection from "@/components/landing/heroSection/heroSection";
import WhyRafeeqSection from "@/components/landing/whyRafeeq/whyRafeeqSection";
import Solutions from "@/components/landing/solutions";
import Advantage from "@/components/landing/adventage";
import Footer from "@/components/landing/footer";

export function LandingPage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <HeroSection />
      <WhyRafeeqSection />
      <Solutions />
      <Advantage />
      <Footer />
    </main>
  );
}
