import { Link } from "react-router";
import SignInForm from "../features/auth/SignInForm";

export default function SignIn() {
  return (
    <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#F9F9F9]">
      <div className="w-full max-w-[1440px] px-6 lg:px-16 mx-auto">
        <div className="flex flex-col lg:flex-row bg-white overflow-hidden border border-[#c4c7c7] shadow-[0px_10px_30px_rgba(0,0,0,0.03)] rounded-lg md:rounded-none">
          {/* Left: Visual Hero */}
          <div className="w-full lg:w-1/2 relative bg-[#eeeeee] aspect-[4/3] lg:aspect-auto h-auto lg:min-h-[720px]">
            <img
              alt="Clinical Serum Bottle"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPWZ19Ohgzf441uzHqtG8f-TWliwvXgYkt_8BgW4qbrA8dF9LtMAZyrcHWDx7JeMw1RRrOAEtxiA0M4wfm3pgI1vB781xMcroYaDk1KOj1gFk2sedD0VCZZHw54sKn5SB2rweX55RqgvBTK7KqFLeA45hFZtxcsIv3pnJ7sOR2uWlIjsFXkvr7x0a_WErqLex7JLl8p_ClD8U4upf7tdTHn_kCmMZLT1PLHiW3-CGx9LhCaxnzpKYg1c26zJTlO6fFO-1pRZ9McLAz"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/5 flex flex-col justify-center px-10 md:px-16">
              <div className="mb-4">
                <span className="font-sans text-[10px] md:text-[11px] font-bold text-white tracking-[0.3em] uppercase opacity-90">
                  LUMIÈRE
                </span>
              </div>
              <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] text-white mix-blend-difference mb-4">
                Precision meets
                <br />
                <span className="italic font-normal">poetry.</span>
              </h1>
              <p className="font-sans text-sm md:text-base text-white/90 max-w-sm leading-relaxed mix-blend-difference">
                Clinically proven results, curated through the lens of aesthetic
                excellence.
              </p>
              <div className="absolute bottom-10 md:bottom-16 left-10 md:left-16 border-l border-white/40 pl-6">
                <span className="font-sans text-[10px] font-bold text-white/80 tracking-[0.2em] uppercase">
                  Clinical Excellence Series
                </span>
              </div>
            </div>
          </div>

          {/* Right: Sign In Form */}
          <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-8 md:p-16 lg:px-24">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-10 lg:mb-12">
                <h2 className="font-serif text-3xl md:text-[40px] text-black mb-3">
                  Welcome Back
                </h2>
                <p className="font-sans text-base text-[#444748]">
                  Access your personalized clinical regimen.
                </p>
              </div>

              <SignInForm />

              {/* Divider */}
              <div className="relative my-8 lg:my-10 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#c4c7c7]"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 font-sans text-[10px] text-[#747878] tracking-[0.2em] uppercase">
                    OR
                  </span>
                </div>
              </div>

              <div className="text-center space-y-8">
                <p className="font-sans text-sm text-[#444748]">
                  New to Lumière?{" "}
                  <Link
                    to="/sign-up"
                    className="text-black font-bold border-b border-black ml-1 pb-0.5"
                  >
                    Create Account
                  </Link>
                </p>

                {/* Verification Badges */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <div className="bg-[#f9f9f9] px-4 py-3 border border-[#e2e2e2]">
                    <span className="font-sans text-[9px] md:text-[10px] font-bold text-[#444748] tracking-[0.15em] uppercase">
                      Safe For All Skins
                    </span>
                  </div>
                  <div className="bg-[#f9f9f9] px-4 py-3 border border-[#e2e2e2]">
                    <span className="font-sans text-[9px] md:text-[10px] font-bold text-[#444748] tracking-[0.15em] uppercase">
                      Dermatologist Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
