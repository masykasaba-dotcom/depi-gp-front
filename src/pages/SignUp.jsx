import { Link } from "react-router";
import SignUpForm from "../features/auth/SignUpForm";

export default function SignUp() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 md:px-16 pt-24 pb-12 bg-[#F9F9F9]">
      <div className="w-full max-w-[1440px] bg-white overflow-hidden flex flex-col md:flex-row min-h-auto md:min-h-[720px] border border-[#c4c7c7] shadow-[0px_10px_30px_rgba(0,0,0,0.03)] md:rounded-none rounded-lg">
        {/* Left Column: Clinical Imagery */}
        <div className="w-full md:w-1/2 relative bg-[#eeeeee] overflow-hidden aspect-[4/3] md:aspect-auto">
          <div className="absolute inset-0 z-0">
            <img
              alt="Lumiere Clinical Serum"
              className="w-full h-full object-cover object-center grayscale-[0.2]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr3gqJW8O5d-os1layKaX6BOluZcNXYzHS9XH9jE0YmBn4511_PcneT1NWREoffsY0GFZp2kMAPKrzGouLW9A53gFIXQ2jbzQ8yKbmah8-PVbWgnmlr8dbT0z0taGZ4w9bpQGfUHHMCY_r33W1u6GDGFCN5FosWPkEHSXfmdDB7Fr8BR4TkqNTGQSy2UhH7ldKt68xbG_Q43eiGmPtAbBmdwoDdwTmbpHWkWKCYNcZ6WkBSo80I7Z1cNKtu62Bql6JnPLKy8NIXRFa"
            />
            <div className="absolute inset-0 bg-black/10 md:bg-black/10 bg-black/5"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 lg:p-16">
            <div className="max-w-sm">
              <span className="inline-block font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 border border-white/30 text-white mb-2 md:mb-6 backdrop-blur-sm">
                THE CLINICAL CURATOR
              </span>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-[64px] text-white mb-0 md:mb-6 leading-tight">
                The science of <br />
                <span className="italic">radiance</span>
              </h1>
              <p className="hidden md:block font-sans text-lg text-white/80 max-w-xs font-light">
                Where molecular precision meets sensory luxury. Discover
                formulas designed for the skin's biological clock.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <h2 className="font-serif text-3xl md:text-[32px] text-black mb-2 leading-tight">
              Create Account
            </h2>
            <p className="font-sans text-sm md:text-base text-[#444748] mb-8 md:mb-12">
              Join the clinical inner circle for curated regimens.
            </p>

            <SignUpForm />

            <div className="mt-8 md:mt-12 text-center">
              <p className="font-sans text-sm text-[#444748]">
                Already part of LUMIÈRE?{" "}
                <Link
                  to="/sign-in"
                  className="text-black font-semibold underline underline-offset-4 decoration-[#c4c7c7] hover:decoration-black transition-all"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
