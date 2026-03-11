import { useState } from "react"
import api from "../../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function ResetPassword(){

  const [email,setEmail] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try{

      const res = await api.post("/user/reset",{
        email,
        newPassword
      })

      toast.success(res.data.message)
      navigate("/login")

    }catch(err){
      toast.error(err?.response?.data?.message)
    }
  }

  return(

    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-emerald-900">

      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-87.5"
      >

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md mb-4 outline-none focus:border-emerald-500"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md mb-6 outline-none focus:border-emerald-500"
        />

        <button 
          type="submit"
          className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition"
        >
          Reset Password
        </button>

      </form>

    </div>

  )
}