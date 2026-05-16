import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#04362E] text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1440px] px-6 lg:px-16 mx-auto">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/15 pb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link to="/" className="font-serif text-[28px] text-white tracking-wide no-underline mb-6">
              LUMINA SKIN
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-8">
              Advanced dermatological science meets clean, potent botanicals. 
              Elevating your skincare regimen with clinically proven, highly personalized formulations.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#04362E] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#04362E] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#a8d5b5] mb-2">Shop</h3>
              <Link to="/products" className="text-sm text-white/70 hover:text-white transition-colors w-fit">All Formulations</Link>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Best Sellers</Link>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">New Arrivals</Link>
              <Link to="/profile/survey" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Skin Quiz</Link>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#a8d5b5] mb-2">Clinical</h3>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Our Research</Link>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Ingredient Glossary</Link>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Dermatologist Panel</Link>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Sustainability</Link>
            </div>
            
            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#a8d5b5] mb-2">Support</h3>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">FAQ</Link>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Shipping & Returns</Link>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Track Order</Link>
              <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors w-fit">Contact Us</Link>
            </div>
          </div>

        </div>
        
        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} LUMINA SKIN. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
