import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import apiUrl from "../lib/apiUrl";
import axios from "axios";
import logo from "../assets/logo-removebg-preview.png";

function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0-4
}

const strengthConfig = [
  { label: "Weak", color: "bg-red-500" },
  { label: "Fair", color: "bg-orange-400" },
  { label: "Good", color: "bg-yellow-400" },
  { label: "Strong", color: "bg-green-500" },
];

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const strength = getStrength(newPassword);
  const strengthInfo = newPassword ? strengthConfig[Math.min(strength - 1, 3)] : null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (strength < 2) {
      setError("Password is too weak. Please use at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}auth/reset-password`, {
        token,
        password: newPassword,
      });
      navigate("/sign-in");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const EyeIcon = ({ show }) =>
    show ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );

  return (
    <main className="h-screen w-full bg-[#f4f7f9] font-sans flex flex-col items-center justify-center px-4 overflow-hidden">

      {/* Logo */}
      <div className="mb-8 text-center animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
        <div className="flex justify-center">
          <img src={logo} alt="DermaCare Logo" className="h-16 md:h-20 w-auto object-contain" />
        </div>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-[480px] bg-white rounded-2xl border border-[#e8ecee] shadow-[0px_4px_24px_rgba(0,0,0,0.06)] px-8 md:px-12 py-10 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        {/* Card Header */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-[22px] md:text-[26px] text-[#1a1c1c] mb-2">
            Reset Your Password
          </h2>
          <p className="text-[#04362E] text-sm leading-relaxed">
            Please enter a <span className="font-semibold">new password</span> for your account.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* New Password */}
          <div className="flex flex-col gap-1.5 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            <label htmlFor="new-password" className="text-sm font-medium text-[#06373A]">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-11 text-sm outline-none transition-all placeholder-gray-400 focus:border-[#04362E] focus:ring-1 focus:ring-[#04362E]"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <EyeIcon show={showNew} />
              </button>
            </div>

            {/* Strength Indicator */}
            {newPassword && (
              <div className="mt-1 animate-fade-in">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength ? strengthInfo?.color : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  <span className={`text-xs font-medium ${
                    strength <= 1 ? "text-red-500" : strength === 2 ? "text-orange-400" : strength === 3 ? "text-yellow-500" : "text-green-600"
                  }`}>
                    {strengthInfo?.label} password
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <label htmlFor="confirm-password" className="text-sm font-medium text-[#06373A]">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className={`w-full border rounded-lg px-4 py-2.5 pr-11 text-sm outline-none transition-all placeholder-gray-400 focus:ring-1
                  ${confirmPassword && confirmPassword !== newPassword
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:border-[#04362E] focus:ring-[#04362E]"
                  }`}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <EyeIcon show={showConfirm} />
              </button>
            </div>
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="text-red-500 text-xs">Passwords do not match</p>
            )}
          </div>

          {/* Submit */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#04362E] text-white font-medium py-2.5 rounded-lg hover:bg-[#03241e] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(4,54,46,0.3)] flex items-center justify-center gap-2 text-sm"
            >
              {loading ? "Resetting..." : (
                <>
                  Reset Password
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Return to Sign In */}
        <div className="mt-5 text-center animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
          <Link
            to="/sign-in"
            className="inline-flex items-center gap-1.5 text-sm text-[#04362E] border border-dashed border-[#04362E]/40 rounded-lg px-5 py-2 hover:bg-[#04362E]/5 transition-colors w-full justify-center"
          >
            Return to Sign In
          </Link>
        </div>

        {/* Need help */}
        <div className="mt-4 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Need help?{" "}
            <a href="mailto:support@dermacare.com" className="text-[#04362E] hover:underline font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>

    </main>
  );
}
