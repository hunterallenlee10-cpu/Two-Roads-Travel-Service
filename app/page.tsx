import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { MeetTheTeam } from "@/components/home/MeetTheTeam";
import { HowWeGetYou } from "@/components/home/HowWeGetYou";
import { WaysToTravel } from "@/components/home/WaysToTravel";
import { Atlas } from "@/components/home/Atlas";
import { FeaturedJourneys } from "@/components/home/FeaturedJourneys";
import { WhyAdvisor } from "@/components/home/WhyAdvisor";
import { MatchmakerTeaser } from "@/components/home/MatchmakerTeaser";
import { Reviews } from "@/components/home/Reviews";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <MeetTheTeam />
      <HowWeGetYou />
      <WaysToTravel />
      <Atlas />
      <FeaturedJourneys />
      <WhyAdvisor />
      <MatchmakerTeaser />
      <Reviews />
      <Faq />
      <FinalCta />
    </>
  );
}
