import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

  const navigate = useNavigate()
  const [open,setOpen] = useState(false)

  const token = localStorage.getItem("token")
  const userName = localStorage.getItem("userName")

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : ""

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <Link to="/home" className="text-2xl font-bold text-emerald-600">
          LUME
        </Link>

        <nav className="flex items-center gap-6 text-gray-700 font-medium">

          <Link to="/home" className="hover:text-emerald-600">Shop</Link>
          <Link to="/user/shop" className="hover:text-emerald-600">Collections</Link>
          <Link to="/admin" className="hover:text-emerald-600">Admin</Link>

          <Link to="/user/cart" className="flex items-center gap-1 hover:text-emerald-600">
            <ShoppingCart size={20}/>
            Cart
          </Link>

          {token ? (

            <div className="relative">

              {/* PROFILE CIRCLE */}
              <div
                onClick={()=>setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white font-semibold cursor-pointer"
              >
                {firstLetter || "U"}
              </div>

              {/* DROPDOWN */}
              {open && (

                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-xl border border-gray-200">

                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {userName}
                    </p>
                  </div>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-100 rounded-b-xl"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          ) : (

            <Link
              to="/login"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
            >
              Login
            </Link>

          )}

        </nav>
      </div>
    </header>
  )
}