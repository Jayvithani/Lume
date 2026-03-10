import { useState } from "react"
import api from "../../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
export default function ForgotPassword() {

  const [email,setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const res = await api.post("/user/forgot",{email})
      toast.success(res.data.message)
    navigate("/verify-otp")
    } catch(err){
      toast.error(err?.response?.data?.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <button type="submit">
        Send OTP
      </button>
    </form>
  )
}