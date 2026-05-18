import { useState } from "react";
import { useFormStatus } from "react-dom";
import useAdminLogin from "../../hooks/useAdminLogin";
import logo from "../../assets/logo-removebg-preview.png";
import "./admin.css";

export default function AdminLogin() {
  const { formState, formAction, errorMessage } = useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="admin-login-root">
      <div className="admin-login-bg" />

      <div className="admin-login-card">
        {/* Logo & Brand */}
        <div className="admin-login-brand">
          <img src={logo} alt="DermaCare Logo" className="admin-login-logo" />
          <span className="admin-login-badge">Admin Portal</span>
        </div>

        <div className="admin-login-header">
          <h1 className="admin-login-title">Welcome back</h1>
          <p className="admin-login-subtitle">Sign in to your admin dashboard</p>
        </div>

        {/* Server Error */}
        {errorMessage && (
          <div className="admin-login-error-banner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </div>
        )}

        <form action={formAction} className="admin-login-form">
          {/* Email */}
          <div className="admin-login-field">
            <label htmlFor="admin-email" className="admin-login-label">
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="admin@dermacare.com"
              defaultValue={formState?.savedValues?.email}
              className={`admin-login-input ${formState?.errors?.emailError ? "is-error" : ""}`}
            />
            {formState?.errors?.emailError && (
              <p className="admin-login-field-error">{formState.errors.emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="admin-login-field">
            <label htmlFor="admin-password" className="admin-login-label">
              Password
            </label>
            <div className="admin-login-password-wrap">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                defaultValue={formState?.savedValues?.password}
                className={`admin-login-input ${formState?.errors?.passwordError ? "is-error" : ""}`}
              />
              <button
                type="button"
                className="admin-login-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {formState?.errors?.passwordError && (
              <p className="admin-login-field-error">{formState.errors.passwordError}</p>
            )}
          </div>

          <SubmitButton />
        </form>

        <p className="admin-login-footer">
          DermaCare Admin &mdash; Restricted Access
        </p>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="admin-login-submit"
    >
      {pending ? (
        <>
          <span className="admin-login-spinner" />
          Signing in…
        </>
      ) : (
        "Sign In"
      )}
    </button>
  );
}
