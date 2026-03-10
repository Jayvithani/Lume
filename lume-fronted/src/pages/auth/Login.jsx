import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/user/signin", { email, password });

      const token = res?.data?.token;
      const user = res?.data?.user;

      if (token) {
        localStorage.setItem("token", token);
        if (user?.name) localStorage.setItem("userName", user.name);

        toast.success("Login successful");
        navigate("/home");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          className="object-cover w-full h-full"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center">
            Fashion That <br /> Defines You
          </h1>
        </div>
      </div>

      {/* RIGHT LOGIN */}
      <div className="flex flex-1 items-center justify-center bg-white">

        <div className="w-full max-w-md bg-black p-10 rounded-2xl shadow-2xl">

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-emerald-600">LUME</h2>
            <p className="text-gray-500 mt-2">
              Login to continue shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
<label className="text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
  className="w-full mt-1 px-4 py-2 border border-slate-700 bg-slate-900 text-white rounded-lg focus:border-emerald-500 outline-none"
                placeholder="jayyy@gmail.com"
              />
            </div>

            <div>
<label className="text-sm text-slate-300">Password</label>              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
  className="w-full mt-1 px-4 py-2 border border-slate-700 bg-slate-900 text-white rounded-lg focus:border-emerald-500 outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="text-center mt-6 text-sm">

           <Link
  to="/forgot-password"
  className="text-emerald-400 hover:text-emerald-300"
>
  Forgot password?
</Link>

           <p className="text-slate-400">
  Don't have an account?{" "}
  <Link to="/signup" className="text-emerald-400 font-medium">
    Sign up
  </Link>
</p>

          </div>

        </div>

      </div>
    </div>
  );
}