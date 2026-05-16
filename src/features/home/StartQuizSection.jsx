import { Link } from "react-router";
import labImage from "../../assets/laboratory-science.png";

export default function StartQuizSection() {
  return (
    <section className="mb-16 md:mb-24 max-w-[1440px] px-6 lg:px-16 mx-auto">
      <div className="relative bg-[#dadada] min-h-[400px] md:h-[500px] lg:h-[600px] flex items-center overflow-hidden">
        <img
          alt="Laboratory test tubes"
          className="absolute inset-0 w-full h-full object-cover"
          src={labImage}
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>
        <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-xl md:max-w-2xl w-full">
          <span className="font-sans text-[9px] md:text-[10px] text-white/80 font-bold tracking-[0.2em] md:tracking-widest uppercase mb-3 md:mb-4 block">
            Personalized Regimen
          </span>
          <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            Mirror of Science
          </h2>
          <p className="font-sans text-sm md:text-base lg:text-lg text-white/90 mb-8 md:mb-10 max-w-sm md:max-w-md leading-relaxed">
            Data is the foundation of beauty. Take our advanced Skin Quiz to
            find your personalized clinical regimen tailored to your unique
            microbiome and environmental factors.
          </p>
          <Link to="/profile/survey" className="inline-block">
            <button className="bg-white text-black px-6 md:px-8 py-3 md:py-4 font-sans text-[10px] font-bold hover:bg-[#f3f3f4] transition-all uppercase tracking-[0.2em]">
              START SKIN QUIZ
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
