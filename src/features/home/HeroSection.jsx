import { Link } from "react-router";
import HeroImage from "../../assets/Hero-photo.png";

export default function HeroSection() {
  return (
    <header className="pt-32 md:pt-40 pb-12 md:pb-20 px-6 lg:px-16 max-w-[1440px] mx-auto min-h-[calc(100vh-80px)] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
        {/* Left Content */}
        <div className="md:col-span-5 lg:col-span-6 order-2 md:order-1 mt-8 md:mt-0">
          <span className="font-sans text-[10px] md:text-[11px] font-bold text-[#747878] md:text-black tracking-[0.25em] md:tracking-[0.3em] mb-4 md:mb-6 block uppercase">
            Dermatological Precision
          </span>
          <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[84px] leading-tight md:leading-none text-black mb-6 md:mb-8">
            The Clinical
            <br className="hidden md:block" /> Curator
          </h1>
          <p className="font-sans text-base md:text-lg font-light text-[#444748] mb-8 md:mb-12 max-w-md leading-relaxed">
            High-fidelity skincare formulated with precision and backed by the
            rigorous standards of modern dermatological science.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 w-full sm:w-auto">
            <Link to="/products" className="w-full sm:w-auto">
              <button className="w-full bg-black text-white px-8 md:px-10 py-4 md:py-5 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] hover:bg-black/90 transition-all uppercase">
                Shop the Collection
              </button>
            </Link>
            <button className="w-full sm:w-auto font-sans text-[10px] md:text-[11px] font-bold text-black border md:border-0 border-[#c4c7c7] md:border-b md:border-black py-4 md:py-0 md:pb-1 hover:opacity-70 transition-all uppercase tracking-[0.2em]">
              Our Philosophy
            </button>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="md:col-span-7 lg:col-span-6 relative order-1 md:order-2">
          <div className="aspect-[4/5] bg-[#eeeeee] relative overflow-hidden rounded-sm md:rounded-lg group">
            <img
              alt="Lumiere Hero Product"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              src={HeroImage}
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          </div>

          {/* Scientific Annotation Decorative - Desktop Only */}
          <div className="absolute -bottom-8 -left-8 bg-white p-6 border border-[#e8e8e8] hidden lg:block max-w-[200px] shadow-sm z-10">
            <span className="font-sans text-[9px] font-bold tracking-[0.1em] text-[#747878] block mb-2 uppercase">
              FORMULA ID: LM-042
            </span>
            <p className="font-sans text-[12px] text-[#444748] leading-tight">
              Optimized pH balance for epidermal restoration.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
