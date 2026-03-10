import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 sm:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-emerald-400">LUME</h2>
          <p className="mt-2 text-sm text-gray-400">
            Light up your style. Discover modern fashion and elevate your look
            with Lume collections.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/home" className="hover:text-emerald-400">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/user/shop" className="hover:text-emerald-400">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/user/cart" className="hover:text-emerald-400">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-emerald-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-emerald-400 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-emerald-400 cursor-pointer">
              Contact Support
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center text-sm py-4 text-gray-400">
        © {new Date().getFullYear()} LUME. All rights reserved.
      </div>
    </footer>
  );
}