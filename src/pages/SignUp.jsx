import { Link } from "react-router";
import SignUpForm from "../features/auth/SignUpForm";
import bgImage from "../assets/elsa-olofsson-Pm0K9Y3EPUc-unsplash.jpg";
import logo from "../assets/logo-removebg-preview.png";

export default function SignUp() {
  return (
    <main className="h-screen w-full bg-[#f4f7f9] font-sans flex items-center justify-center overflow-hidden">

      {/* Centered wrapper — 90% wide, leaves 5% on each side */}
      <div className="w-[90%] h-[88vh] flex items-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

        {/* LEFT — Image card */}
        <div className="relative h-full w-[55%] rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
          <img
            alt="DermaCare Editorial"
            className="absolute inset-0 w-full h-full object-cover"
            src={bgImage}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Bottom text */}
          <div className="absolute bottom-10 left-10 text-white">
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1 border border-white/40 bg-white/10 backdrop-blur-md rounded-sm mb-4">
              <img src={logo} alt="DermaCare Logo" className="h-8 scale-150 w-auto object-contain brightness-0 invert" />
            </span>
            <h2 className="font-serif text-[32px] leading-snug">
              The science of <br />
              <span className="italic">radiance.</span>
            </h2>
          </div>
        </div>

        {/* RIGHT — Form card */}
        <div className="bg-white rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] border border-[#e8ecee] flex-1 h-full flex flex-col justify-center px-8 lg:px-12 py-6 overflow-hidden">
          <div className="w-full max-w-[380px] mx-auto">

            {/* Header */}
            <div className="mb-5">
              <h1 className="font-serif text-[28px] md:text-[32px] text-[#06373A] leading-tight mb-1">
                Create Account
              </h1>
              <p className="text-[#555a5b] text-sm">
                Join our ecosystem for personalized, science-backed routines.
              </p>
            </div>

            <SignUpForm />

            <div className="mt-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-[#04362E] font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

