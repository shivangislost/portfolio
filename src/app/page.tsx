import HeroSection from "@/components/HeroSection";
import CoreCapabilities from "@/components/CoreCapabilities";
import TechStack from "@/components/TechStack";
import SelectedWork from "@/components/SelectedWork";
import AwardsRecognition from "@/components/AwardsRecognition";
import AboutMe from "@/components/AboutMe";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white/30">
      <HeroSection />
      <CoreCapabilities />
      <TechStack />
      <SelectedWork />
      <AwardsRecognition />
      <AboutMe />
      <ExperienceTimeline />
      <ContactCTA />
    </main>
  );
}
