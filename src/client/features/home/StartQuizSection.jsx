import { Link } from "react-router";
import quizImage from "../../../assets/Image_20260517_011641.png";

export default function StartQuizSection() {
  return (
    <section className="py-20 md:py-32 bg-[#f4f7f9]">
      <div className="max-w-[1440px] px-6 lg:px-16 mx-auto">
        <div className="relative rounded-[32px] overflow-hidden min-h-[460px] md:min-h-[560px] flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          
          {/* ─── Background Image ─── */}
          <img
            alt="Clinical Skin Assessment"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={quizImage}
          />
          
          {/* Subtle neutral gradient for text readability (no colors) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 md:hidden" />

          {/* ─── Content ─── */}
          <div className="relative z-10 p-8 md:p-14 lg:p-20 max-w-xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 w-fit text-[10px] text-white/90 font-bold tracking-[0.3em] uppercase mb-6 border border-white/30 px-4 py-1.5 rounded-full backdrop-blur-md bg-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
              Diagnostic Tool
            </span>

            {/* Headline */}
            <h2 className="font-serif text-white text-4xl md:text-[52px] lg:text-[64px] mb-6 leading-[1.05] drop-shadow-md">
              Discover Your<br />
              <span className="italic font-normal">Skin Profile.</span>
            </h2>

            {/* Description */}
            <p className="font-sans text-sm md:text-base text-white/90 mb-10 max-w-md leading-relaxed drop-shadow-sm">
              Every skin microbiome is entirely unique. Take our comprehensive clinical quiz to unlock a highly personalized formulation regimen tailored to your exact biological needs.
            </p>

            {/* CTA */}
            <Link to="/profile/survey" className="inline-block group">
              <button className="flex items-center gap-4 bg-white text-[#04362E] px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-[#f4f7f9] transition-all duration-300 shadow-xl group-hover:-translate-y-1">
                Start Skin Assessment
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </Link>

            {/* Floating stats */}
            <div className="mt-12 flex gap-8 pt-6">
              <div>
                <p className="text-2xl font-serif text-white drop-shadow-md">2M+</p>
                <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1 font-bold">Analyses</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-white drop-shadow-md">98%</p>
                <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1 font-bold">Accuracy</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

