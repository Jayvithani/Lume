import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/reducer/cartSlice"
import { toast } from "react-toastify"

export default function Shop() {

  const dispatch = useDispatch()

  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const categories = ["All", "New In", "Casual", "Street", "Formal", "Sport"]

  const products = [
    {
      _id: 1,
      name: "Midnight Aura Hoodie",
      price: 2499,
      tag: "New",
      category: "Street",
      image:
        "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg"
    },
    {
      _id: 2,
      name: "Soft Glow Oversized Tee",
      price: 1299,
      tag: "Trending",
      category: "Casual",
      image:
        "https://images.pexels.com/photos/7671181/pexels-photo-7671181.jpeg"
    },
    {
      _id: 3,
      name: "Neon Flow Track Jacket",
      price: 2799,
      tag: "Hot",
      category: "Sport",
      image:
        "https://images.pexels.com/photos/7676400/pexels-photo-7676400.jpeg"
    },
    {
      _id: 4,
      name: "Moonlight Linen Shirt",
      price: 1899,
      tag: "Classic",
      category: "Formal",
      image:
        "https://images.pexels.com/photos/3738089/pexels-photo-3738089.jpeg"
    },
    {
      _id: 5,
      name: "Cloud Drift Joggers",
      price: 1599,
      tag: "New",
      category: "Casual",
      image:
        "https://images.pexels.com/photos/7671168/pexels-photo-7671168.jpeg"
    },
    {
      _id: 6,
      name: "Prism Runner Sneakers",
      price: 3299,
      tag: "Limited",
      category: "Sport",
      image:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
    }
  ]

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      activeCategory === "All" || product.category === activeCategory

    const matchSearch =
      search.trim() === "" ||
      product.name.toLowerCase().includes(search.toLowerCase())

    return matchCategory && matchSearch
  })

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-black to-slate-950 text-white">

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              LUME <span className="text-emerald-400">Shop</span>
            </h1>

            <p className="text-slate-400 mt-2">
              Discover premium fashion with modern style
            </p>
          </div>
                    <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search product..."
            className="w-full md:w-64 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-400 outline-none"
          />

        </div>
        <div className="flex flex-wrap gap-3 mb-10">

          {categories.map((category)=>(
            <button
              key={category}
              onClick={()=>setActiveCategory(category)}
              className={`px-4 py-1 rounded-full text-sm transition
              ${
                activeCategory === category
                ?
                "bg-emerald-500 text-black shadow-lg"
                :
                "border border-slate-700 text-slate-300 hover:border-emerald-400"
              }
              `}
            >
              {category}
            </button>
          ))}

        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {filteredProducts.map((product)=>(
            
            <div
              key={product._id}
              className="group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg hover:shadow-emerald-500/30 transition hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">

                <img
                  src={product.image}
                  className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent"/>

                <span className="absolute top-3 left-3 bg-emerald-400 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                  {product.tag}
                </span>

              </div>
              <div className="p-5 space-y-3">

                <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition">
                  {product.name}
                </h3>

                <p className="text-emerald-400 text-xl font-bold">
                  ₹{product.price}
                </p>

                <button
                  onClick={()=>{
                    dispatch(addToCart(product))
                    toast.success("Added to cart")
                  }}
                  className="w-full bg-linear-to-r from-emerald-500 to-emerald-400 text-black py-2 rounded-xl font-semibold hover:scale-105 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center mt-20 text-slate-400">
            No products found
          </div>
        )}
      </div>
    </main>
  )
}