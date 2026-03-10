import { useState } from "react";
import axios from "axios";
import AddCategory from "./admincagegory";
import api from "../../services/api";
import { toast } from "react-toastify"
const Admin = () => {

    const [image,setImage] = useState([])
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState("")
    const [success,setSuccess]= useState("")
    const [form,setForm] = useState({
      name:"",
      price:"",
      category:"",
      type:"",
      sizes:"",
      colors:"",
      stock:"",
      description:"",
    })
    const handleChange = (e) => {
      const { name, value } = e.target
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files || [])
      setImage(files)
    }
    const addProducts = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")
      
        try {
          const formData = new FormData()
          formData.append("name", form.name)
          formData.append("price", form.price)
          formData.append("category", form.category)
          formData.append("type", form.type)
          formData.append("stock", form.stock)
          formData.append("description", form.description)
          formData.append("sizes", JSON.stringify(form.sizes.split(",")))
          formData.append("colors", JSON.stringify(form.colors.split(",")))
      
          for (let i = 0; i < image.length; i++) {
            formData.append("images", image[i])
          }
      
          await api.post("/clothes/add", formData, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
      
          toast.success("Product added successfully")
          setForm({
            name:"",
            price:"",
            category:"",
            type:"",
            sizes:"",
            colors:"",
            stock:"",
            description:"",
          })
          setImage([])
      
        } catch (err) {
          toast.error(err?.response?.data?.message || "Something went wrong")
        } finally {
          setLoading(false)
        }
      }


      return (
        <>
        <div className="min-h-screen bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center p-6">
          <div className="w-full max-w-xl bg-white border border-gray-300 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin • Add Product</h2>
            {error && (<p className="mb-4 bg-red-100 text-red-700 px-3 py-2 rounded">{error}</p>)}
            {success && (<p className="mb-4 bg-green-100 text-green-700 px-3 py-2 rounded">{success}</p>)}
            <form onSubmit={addProducts} className="space-y-4">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"/>
              <input type="number" className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500" placeholder="Price" name="price" value={form.price} onChange={handleChange}/>
              <input className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500" placeholder="Category" name="category" value={form.category} onChange={handleChange}/>
              <input className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500" placeholder="Type (MEN / WOMEN)" name="type" value={form.type} onChange={handleChange}/>
              <input className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"placeholder="Sizes (S,M,L)"name="sizes"value={form.sizes}onChange={handleChange}          />
              <input className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"placeholder="Colors (red,blue)"name="colors" value={form.colors}onChange={handleChange}/>
              <input type="number" className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500" placeholder="Stock" name="stock" value={form.stock} onChange={handleChange}/>
              <textarea className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"placeholder="Description"name="description"value={form.description}onChange={handleChange}/>
              <input type="file" multiple onChange={handleFileChange} className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"/>
              <button type="submit" disabled={loading} className="w-full bg-gray-100 border border-gray-400 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500">
                {loading ? "Saving..." : "Add Product"}
              </button>
            </form>
          </div>

        </div>
        <AddCategory/>
        </>
      )
}
export default Admin;

