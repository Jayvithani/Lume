import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
const AddCategory = () => {
  const [form, setForm] = useState({ name: "", type: "" })
  const [image, setImage] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setImage(Array.from(e.target.files))
  }

  const addCategory = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("type", form.type)

      image.forEach((file) => {
        formData.append("image", file)
      })
      await axios.post(
        "http://localhost:3000/category/add",formData
)
      toast.success("Category added") 
      setForm({ name: "", type: "" })
      setImage([])
    } catch (err) {
      console.log(err.response?.data)
      toast.error(err.response?.data?.message || "Error adding category")
      setSuccess("")
    }
  }

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={addCategory} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Category name" className="border p-2 w-full"/>
        <select name="type" value={form.type}  onChange={handleChange} className="border p-2 w-full" >
          <option value="">Select type</option>
          <option value="men">men</option>
          <option value="women">women</option>
          <option value="kids">kids</option>
          <option value="unisex">unisex</option>
        </select>
        <input type="file" multiple onChange={handleFileChange} />
        <button className="bg-black text-white px-4 py-2">Add Category</button>
      </form>
    </div>
  )
}

export default AddCategory