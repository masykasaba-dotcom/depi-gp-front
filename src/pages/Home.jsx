import React from "react";
import HeroSection from "./../components/HeroSection";
import LaboratoryFavorites from "./../components/LaboratoryFavorites";
import StartQuizSection from "../components/StartQuizSection";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <LaboratoryFavorites />
      <StartQuizSection />
    </section>
  );
}
