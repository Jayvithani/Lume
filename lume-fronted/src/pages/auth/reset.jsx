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
    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
      />

      <button type="submit">
        Reset Password
      </button>

    </form>
  )
}