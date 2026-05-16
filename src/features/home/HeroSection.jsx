import { Link } from "react-router";
import heroImage from "../../assets/hero-flatlay.png";

export default function HeroSection() {
  return (
    <header className="relative min-h-screen flex items-center overflow-hidden">

      {/* ─── Full-screen background image ─── */}
      <img
        alt="Lumina Skin Clinical Serum Collection"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        src={heroImage}
      />

      {/* ─── Gradient overlay: strong green on left, fades right ─── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04362E]/88 via-[#04362E]/55 to-transparent" />
      {/* Top & bottom subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/15" />

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 pt-28 pb-16 flex items-center min-h-screen">

        <div className="flex flex-col gap-6 max-w-[540px]">

          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 w-fit text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 border border-white/25 rounded-full px-4 py-1.5 backdrop-blur-sm bg-white/5 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#a8d5b5] inline-block" />
            Science-meets-Beauty
          </span>

          {/* Headline */}
          <h1
            className="font-serif text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] text-white animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Clinical Excellence,
            <br />
            <span className="italic font-normal text-[#c8e6d0]">
              Formulated for You.
            </span>
          </h1>

          {/* Body */}
          <p
            className="text-white/70 text-base md:text-lg leading-relaxed max-w-[420px] animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Advanced dermatological science meets clean, potent botanicals.
            Discover skin health engineered for visible, lasting results.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 mt-2 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/profile/survey">
              <button className="bg-white text-[#04362E] px-7 py-3 rounded-lg font-semibold text-sm hover:bg-[#f4f7f9] transition-colors shadow-[0_4px_20px_rgba(255,255,255,0.25)] w-full sm:w-auto">
                Take the Skin Quiz
              </button>
            </Link>
            <Link to="/products">
              <button className="border border-white/30 text-white px-7 py-3 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors backdrop-blur-sm w-full sm:w-auto">
                Shop Collection →
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap items-center gap-8 mt-4 pt-6 border-t border-white/15 animate-fade-in"
            style={{ animationDelay: "0.55s" }}
          >
            {[
              { value: "98%", label: "Clinically Proven" },
              { value: "10k+", label: "Happy Clients" },
              { value: "100%", label: "Clean Formula" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-serif text-2xl text-[#c8e6d0] font-medium">{value}</span>
                <span className="text-[10px] text-white/50 tracking-wide">{label}</span>
              </div>
            ))}
          </div>

          {/* Formula badge */}
          <div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 w-fit animate-fade-in"
            style={{ animationDelay: "0.65s" }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#a8d5b5]/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#a8d5b5]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.698-1.352 2.698H4.15c-1.382 0-2.352-1.698-1.352-2.698L4.2 15.3" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Formula ID: LM-042</p>
              <p className="text-[11px] text-white/70 leading-tight">pH-Optimized Epidermal Restoration</p>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Floating badge bottom-right ─── */}
      <div
        className="absolute bottom-12 right-10 bg-white/90 backdrop-blur-md border border-[#e8ecee] rounded-2xl px-5 py-4 shadow-xl hidden md:block animate-fade-in"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#06373A] mb-0.5">Dermatologist</p>
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#06373A]">Verified ✓</p>
      </div>

    </header>
  );
}
