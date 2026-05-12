import { Link } from "react-router";
import SingInForm from "../components/SingInForm";
export default function SignIn() {
  return (
    <section className="bg-base-100 min-h-screen pt-4 pb-12 flex items-center justify-center px-2">
      <div className="grid lg:grid-cols-7 w-full md:w-4/5 mx-auto rounded-3xl overflow-hidden shadow-2xl bg-base-100 border border-base-300 ">
        {/* LEFT PART */}
        <div
          id="sign-in-leftPart"
          className="relative hidden lg:col-span-4 lg:flex items-center justify-center overflow-hidden bg-base-100"
        >
          {/* Soft Gradient Background */}
          <div className="absolute inset-0  to-base-200"></div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl px-8 text-center md:text-left">
            <p className="text-neutral-500 tracking-[0.4em] uppercase text-xs md:text-sm mb-6">
              LUMIÈRE
            </p>

            <h1 className="text-neutral-800 font-light leading-tight text-4xl sm:text-5xl md:text-6xl mb-6">
              Precision meets{" "}
              <span className="font-semibold text-neutral-900">poetry.</span>
            </h1>

            <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed max-w-md">
              Clinically proven results, curated through the lens of aesthetic
              excellence.
            </p>
          </div>

          {/* Bottom Label */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <div className="bg-neutral-300 w-16 h-[1px]"></div>
            <p className="text-neutral-400 tracking-[0.25em] font-light text-[11px] uppercase">
              Clinical Excellence Series
            </p>
          </div>
        </div>

        {/* RIGHT PART */}
        <div className="py-16 md:py-24 px-6 md:px-16 lg:col-span-3 flex flex-col justify-center bg-base-100 h-full overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <h2 className="font-serif text-4xl text-base-content mb-3">
              Welcome Back
            </h2>
            <p className="text-base-content/70 text-base font-normal mb-8">
              Access your personalized clinical regimen.
            </p>

            <SingInForm />

            <div className="bg-base-300 h-px relative mb-8">
              <span className="bg-base-100 text-[10px] uppercase font-semibold px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base-content/40">
                OR
              </span>
            </div>
            <p className="text-sm font-light text-center text-base-content/70">
              New to Lumière?{" "}
              <Link
                to="/sign-up"
                className="text-sm font-semibold text-base-content hover:text-primary transition underline underline-offset-4 ms-2"
              >
                Create Account
              </Link>
            </p>

            <div className="flex justify-center mt-12 flex-wrap gap-3">
              <div className="py-2 px-4 text-base-content/60 text-[10px] font-semibold tracking-wider bg-base-200 rounded-xl uppercase">
                Safe for all skins
              </div>
              <div className="py-2 px-4 text-base-content/60 text-[10px] font-semibold tracking-wider bg-base-200 rounded-xl uppercase">
                Dermatologist Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
