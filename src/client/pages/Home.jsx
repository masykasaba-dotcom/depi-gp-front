import React from "react";
import HeroSection from "../features/home/HeroSection";
import LaboratoryFavorites from "../features/home/LaboratoryFavorites";
import StartQuizSection from "../features/home/StartQuizSection";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <LaboratoryFavorites />
      <StartQuizSection />
    </section>
  );
}
