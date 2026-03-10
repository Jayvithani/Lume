import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchClothes } from "../../redux/reducer/clothesSlice";
import { fetchCategory } from "../../redux/reducer/catagorySlice";
import { addToCart } from "../../redux/reducer/cartSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { clothes, loading, error } = useSelector((state) => state.clothes);
  const { categories } = useSelector((state) => state.category);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchClothes());
    dispatch(fetchCategory());
  }, [dispatch]);

  const clothesList = Array.isArray(clothes) ? clothes : clothes?.data || [];
  const categoryList = Array.isArray(categories)
    ? categories
    : categories?.data || [];

  const filteredClothes = selectedCategoryId
    ? clothesList.filter((item) => {
        const cat = item.category;
        const id = typeof cat === "object" ? cat?._id : cat;
        return id === selectedCategoryId;
      })
    : clothesList;

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="space-y-14">
      {/* HERO SECTION */}
      <div className="relative h-87.5 w-full overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center">
          <h1 className="text-4xl font-bold text-white">Discover Your Style</h1>
          <p className="mt-2 text-slate-200">
            Latest fashion collections available now
          </p>
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <h2 className="mb-6 px-10 text-2xl font-bold">Shop by Category</h2>

        <div className="px-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {categoryList.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedCategoryId(item._id)}
              className={`group cursor-pointer overflow-hidden rounded-xl bg-slate-900 shadow-lg transition hover:-translate-y-1 hover:shadow-xl
              
              ${selectedCategoryId === item._id ? "ring-2 ring-emerald-400" : ""}`}
            >
              <img
                src={`http://localhost:3000/${item.image}`}
                className="h-40 w-full object-cover transition group-hover:scale-110"
              />

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-xs text-slate-400 uppercase">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold px-10">Latest Products</h2>

          <button
            onClick={() => setSelectedCategoryId(null)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 mx-10"
          >
            All Products
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {filteredClothes.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >
              <img
                src={`http://localhost:3000/${item.images?.[0]}`}
                className="h-56 w-full object-cover group-hover:scale-105 transition"
              />

              <div className="p-4">
                <h3 className="text-gray-800 font-semibold truncate">
                  {item.name}
                </h3>

                <p className="text-xl font-bold text-emerald-600 mt-1">
                  ₹{item.price}
                </p>

                {/* COLORS */}

                <div className="flex gap-1 mt-2 flex-wrap">
                  {item.colors?.map((color, i) => (
                    <span
                      key={i}
                      className="text-xs border px-2 py-1 rounded-md text-gray-600"
                    >
                      {color}
                    </span>
                  ))}
                </div>

                {/* SIZES */}

                <div className="flex gap-2 mt-2">
                  {item.sizes?.map((size, i) => (
                    <span
                      key={i}
                      className="text-xs border px-2 py-1 rounded text-gray-600"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    dispatch(addToCart(item));
                    toast.success("Added to cart");
                  }}
                  className="w-full mt-4 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
