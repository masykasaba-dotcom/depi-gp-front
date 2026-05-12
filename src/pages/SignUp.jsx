import { Link } from "react-router";
import SingUpForm from "../components/SingUpForm";

export default function SignUp() {
  return (
    <section className="bg-base-100 px-2  pt-4 pb-12 flex items-center justify-center">
      <div className="grid lg:grid-cols-7 w-full md:w-4/5 mx-auto rounded-3xl overflow-hidden shadow-2xl bg-base-100 border border-base-300  ">
        {/* LEFT PART */}
        <div
          id="sign-up-leftPart"
          className="relative hidden lg:col-span-4 lg:flex items-center justify-center overflow-hidden bg-base-100"
        >
          {/* Soft Light Gradient */}
          <div className="absolute inset-0  to-base-200"></div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl px-8 text-center md:text-left">
            <p className="text-neutral-500 font-medium tracking-[0.25em] bg-white/70 backdrop-blur-sm text-[10px] rounded-full w-fit py-1.5 px-4 mb-6 uppercase shadow-sm">
              The Clinical Curator
            </p>

            <h1 className="text-neutral-800 font-light leading-tight text-4xl sm:text-5xl md:text-6xl mb-6">
              The science of <br />
              <span className="font-semibold text-neutral-900">radiance</span>
            </h1>

            <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed max-w-md">
              Where molecular precision meets sensory luxury. Discover formulas
              designed for the skin's biological clock.
            </p>
          </div>
        </div>

        {/* RIGHT PART */}
        <div className="py-12 md:py-16 px-6 md:px-12 lg:col-span-3 flex flex-col justify-center bg-base-100  min-h-full overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <h2 className="font-serif text-4xl text-base-content mb-2">
              Create Account
            </h2>
            <p className="text-base-content/70 text-base font-normal mb-2">
              Join the clinical inner circle for curated regimens.
            </p>

            <SingUpForm />

            <div className="bg-base-300 h-px relative mb-6"></div>

            <p className="text-sm font-light text-center text-base-content/70">
              Already part of LUMIÈRE?{" "}
              <Link
                to="/sign-in"
                className="text-sm font-semibold text-base-content hover:text-primary transition underline underline-offset-4 ms-2"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
