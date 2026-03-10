import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/reducer/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg">
        
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          🛒 Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="mb-4 flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-gray-600">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <button
                  onClick={() => {
                    try {
                      dispatch(removeFromCart(item._id));
                      toast.info("Removed from cart");
                    } catch (err) {
                      toast.error(
                        err?.response?.data?.message ||
                          "Error removing item from cart"
                      );
                    }
                  }}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <h3 className="text-xl font-bold text-gray-800">
                Total
              </h3>

              <p className="text-xl font-bold text-green-600">
                ₹{total}
              </p>
            </div>

            <button className="mt-6 w-full rounded-lg bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;