import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../services/api"
import { toast } from "react-toastify"

export default function Signup() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)

    try{

      await api.post("/user/signup",{name,email,password})

      toast.success("Signup successful")
      navigate("/login")

    }catch(err){

      toast.error(err?.response?.data?.message || "Signup failed")

    }finally{
      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-black to-slate-900 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-900 bg-slate-900/70 p-10 shadow-2xl backdrop-blur-xl transition hover:shadow-emerald-300/50">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-emerald-400 tracking-wider">
            LUME
          </h1>
          <p className="mt-3 text-slate-300 text-sm">
            Create your account and start shopping
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-slate-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Your name"
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
          <div>
            <label className="text-sm text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Create password"
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
          <button
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-emerald-500 to-emerald-400 py-2 text-black font-semibold shadow-lg transition hover:scale-[1.02] hover:shadow-emerald-500/40 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}