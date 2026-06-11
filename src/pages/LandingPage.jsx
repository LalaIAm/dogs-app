import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { ManifestoSection } from "../components/ManifestoSection";
import { SmartPoiSection } from "../components/SmartPoiSection";
import { SocialProofSection } from "../components/SocialProofSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { TechCapabilitiesSection } from "../components/TechCapabilitiesSection";
import { CtaSection } from "../components/CtaSection";
import { FieldNotesSection } from "../components/FieldNotesSection";
import { Footer } from "../components/Footer";
import { NoiseOverlay } from "../components/ui/NoiseOverlay";
import { useParallax } from "../hooks/useParallax";

export function LandingPage() {
  useParallax();

  return (
    <div className="text-ink antialiased overflow-x-hidden selection:bg-rust selection:text-white">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <SmartPoiSection />
      <SocialProofSection />
      <FeaturesSection />
      <TechCapabilitiesSection />
      <CtaSection />
      <FieldNotesSection />
      <Footer />
      <NoiseOverlay />
    </div>
  );
}

export default LandingPage;
