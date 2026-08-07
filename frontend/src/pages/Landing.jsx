
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import CategoryPreview from "@/components/landing/CategoryPreview";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Landing(){
  return(
    <main>

      <Hero/>
      <Stats/>
      <CategoryPreview/>
      <Features/>
      <HowItWorks/>
      <CTASection/>
      <LandingFooter/>
    </main>
  );
}