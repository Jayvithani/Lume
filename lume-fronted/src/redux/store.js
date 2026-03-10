import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducer/catagorySlice";
import clothesReducer from "./reducer/clothesSlice";
import cartReducer from './reducer/cartSlice'
export const store = configureStore({
    reducer:{
        cart:cartReducer,
        category:categoryReducer,
        clothes:clothesReducer
    },
})
export default store;