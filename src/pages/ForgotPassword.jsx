import { useState } from "react";
import { Link } from "react-router";
import apiUrl from "../lib/apiUrl";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${apiUrl}auth/forgot-password`, { email });
      setStatus("success");
      setMessage("A reset link has been sent to your email address.");
    } catch (err) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-screen w-full bg-[#f4f7f9] font-sans flex flex-col items-center justify-center px-4 overflow-hidden">

      {/* Logo */}
      <div className="mb-8 text-center animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
        <h1 className="font-serif text-[28px] md:text-[34px] text-[#06373A] font-medium tracking-wide">
          LUMINA SKIN
        </h1>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-[480px] bg-white rounded-2xl border border-[#e8ecee] shadow-[0px_4px_24px_rgba(0,0,0,0.06)] px-8 md:px-12 py-10 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        {/* Card Header */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-[22px] md:text-[26px] text-[#1a1c1c] mb-2">
            Reset Password
          </h2>
          <p className="text-[#04362E] text-sm leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Success / Error Message */}
        {status === "success" && (
          <div className="mb-4 flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {message}
          </div>
        )}
        {status === "error" && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            <label htmlFor="email" className="text-sm font-medium text-[#06373A]">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder-gray-400 focus:border-[#04362E] focus:ring-1 focus:ring-[#04362E]"
            />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#04362E] text-white font-medium py-2.5 rounded-lg hover:bg-[#03241e] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(4,54,46,0.3)] text-sm"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        {/* Back to Login */}
        <div className="mt-5 text-center animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <Link
            to="/sign-in"
            className="inline-flex items-center gap-1.5 text-sm text-[#04362E] border border-dashed border-[#04362E]/40 rounded-lg px-4 py-2 hover:bg-[#04362E]/5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>

    </main>
  );
}
