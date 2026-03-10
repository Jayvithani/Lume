import { useState } from "react"
import api from "../../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
export default function VerifyOtp(){

  const [email,setEmail] = useState("")
  const [otp,setOtp] = useState("")
      const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    try{

      const res = await api.post("/user/verify",{
        email,
        otp
      })

      toast.success(res.data.message)
    navigate("/reset-password")
    }catch(err){
      toast.error(err?.response?.data?.message)
    }
  }

  return(
    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
      />

      <button type="submit">
        Verify OTP
      </button>

    </form>
  )
}