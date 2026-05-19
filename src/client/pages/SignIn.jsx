import { Link } from "react-router";
import SignInForm from "../features/auth/SignInForm";
import logo from "../../assets/logo-removebg-preview.png";

export default function SignIn() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7f9] px-4 md:px-6 font-sans py-12">
      
      {/* Header Logo Area */}
      <div className="text-center mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-center mb-4">
          <img src={logo} alt="DermaCare Logo" className="h-16 md:h-20 w-auto object-contain" />
        </div>
        <p className="text-[#555a5b] text-[10px] md:text-xs tracking-[0.2em] uppercase">
          Science-meets-Beauty.
        </p>
      </div>

      {/* Main Card */}
      <div 
        className="w-full max-w-[440px] bg-white rounded-xl shadow-[0px_8px_30px_rgba(0,0,0,0.04)] border border-[#e8ecee] p-6 md:p-10 animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-serif text-[24px] md:text-[28px] text-[#06373A]">
            Welcome Back
          </h2>
        </div>

        <SignInForm />

        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-4 text-[13px] text-gray-500">
              New to DermaCare?
            </span>
          </div>

          <Link
            to="/sign-up"
            className="block w-full py-3 border border-[#04362E] text-[#04362E] font-medium rounded-lg hover:bg-[#f4f7f9] transition-colors text-sm"
          >
            Create an Account
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-10 flex justify-center gap-6 text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <Link to="#" className="hover:text-gray-800 transition-colors">Privacy</Link>
        <Link to="#" className="hover:text-gray-800 transition-colors">Terms</Link>
        <Link to="#" className="hover:text-gray-800 transition-colors">Help</Link>
      </div>

    </main>
  );
}
