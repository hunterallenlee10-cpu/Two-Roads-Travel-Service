import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { DestinationsGrid } from "@/components/pages/DestinationsGrid";
import { CtaBand } from "@/components/pages/CtaBand";

export const metadata: Metadata = {
  title: "Destinations",
  description: "From the Caribbean to Antarctica. Explore every destination Two Roads Travel Service plans, filtered by region and by road.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        image="atlas/south-america"
        eyebrow="Destinations"
        title={
          <>
            Pick a place. <em className="italic">Or let it pick you.</em>
          </>
        }
        intro="Thirty-six places on one page. Filter by region or by road, then tap any of them to start planning."
        preset={{ interest: "Help me choose a destination" }}
        short
      />
      <DestinationsGrid />
      <CtaBand preset={{ interest: "Help me choose a destination" }} heading={["Still deciding?", "That is what we are for."]} />
    </>
  );
}
