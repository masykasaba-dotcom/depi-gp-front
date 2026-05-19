import { useActionState, useState } from "react";
import { Link } from "react-router";
import useSignUp from "../../hooks/useSignUp";
import { useFormStatus } from "react-dom";

export default function SignUpForm() {
  const { formAction, formState, errorMessage } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-2.5">
      {errorMessage && (
        <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-2 animate-fade-in">
          {errorMessage}
        </div>
      )}

      {/* Name Fields (Side by side on desktop, stacked on mobile) */}
      <div className="flex flex-col sm:flex-row gap-2.5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="first_name" className="text-xs font-medium text-[#06373A]">
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            placeholder="Jane"
            defaultValue={formState?.savedValues?.firstName}
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder-gray-400
              ${formState?.errors?.firstNameError 
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                : "border-gray-200 focus:border-[#04362E] focus:ring-1 focus:ring-[#04362E]"}`}
          />
          {formState?.errors?.firstNameError && (
            <p className="text-red-500 text-xs mt-1">{formState.errors.firstNameError}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="last_name" className="text-xs font-medium text-[#06373A]">
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            placeholder="Doe"
            defaultValue={formState?.savedValues?.lastName}
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder-gray-400
              ${formState?.errors?.lastNameError 
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                : "border-gray-200 focus:border-[#04362E] focus:ring-1 focus:ring-[#04362E]"}`}
          />
          {formState?.errors?.lastNameError && (
            <p className="text-red-500 text-xs mt-1">{formState.errors.lastNameError}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <label htmlFor="email" className="text-xs font-medium text-[#06373A]">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="jane.doe@example.com"
          defaultValue={formState?.savedValues?.email}
          className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder-gray-400
            ${formState?.errors?.emailError 
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
              : "border-gray-200 focus:border-[#04362E] focus:ring-1 focus:ring-[#04362E]"}`}
        />
        {formState?.errors?.emailError && (
          <p className="text-red-500 text-xs mt-1">{formState.errors.emailError}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="flex flex-col gap-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <label htmlFor="phone" className="text-xs font-medium text-[#06373A]">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="01013625625"
          defaultValue={formState?.savedValues?.phone}
          className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder-gray-400
            ${formState?.errors?.phoneError 
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
              : "border-gray-200 focus:border-[#04362E] focus:ring-1 focus:ring-[#04362E]"}`}
        />
        {formState?.errors?.phoneError && (
          <p className="text-red-500 text-xs mt-1">{formState.errors.phoneError}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <label htmlFor="password" className="text-xs font-medium text-[#06373A]">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            defaultValue={formState?.savedValues?.password}
            className={`w-full border rounded-lg px-3 py-2 pr-10 text-sm outline-none transition-all placeholder-gray-400 tracking-wide
              ${formState?.errors?.passwordError 
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                : "border-gray-200 focus:border-[#04362E] focus:ring-1 focus:ring-[#04362E]"}`}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
               </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-1">Must be at least 8 characters long.</p>
        {formState?.errors?.passwordError && (
          <p className="text-red-500 text-xs mt-1">{formState.errors.passwordError}</p>
        )}
      </div>

      {/* Checkbox */}
      <div className="flex items-start gap-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <input 
          type="checkbox" 
          id="subscribe" 
          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#04362E] focus:ring-[#04362E] accent-[#04362E]"
        />
        <label htmlFor="subscribe" className="text-xs text-gray-700 leading-snug">
          Subscribe to receive clinical insights, exclusive offers, and personalized skincare tips.
        </label>
      </div>

      {/* Terms & Privacy */}
      <div className="text-center text-xs text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        By creating an account, you agree to our <Link to="#" className="text-[#04362E] font-medium">Terms of Service</Link> and <Link to="#" className="text-[#04362E] font-medium">Privacy Policy</Link>.
      </div>

      {/* Submit Button */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <SubmitButton tempTitle="Creating..." tile="Create Account" />
      </div>
    </form>
  );
}

function SubmitButton({ tempTitle, tile }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#04362E] text-white font-medium py-2.5 rounded-lg hover:bg-[#03241e] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(4,54,46,0.39)]"
    >
      {pending ? tempTitle : tile}
    </button>
  );
}
