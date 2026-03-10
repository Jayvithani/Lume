import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Shop from "./Shop"
import Cart from "./Cart"

const User = () => {
  return (
    <Routes>
    <Route path="/" element={<Navigate to="home"/>} />
    <Route path="home" element={<Home />} />
    <Route path="shop" element={<Shop />} />
    <Route path="cart" element={<Cart />} />
  </Routes>
  )
}

export default User