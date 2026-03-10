import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import api from "../../services/api"

export const fetchCategory = createAsyncThunk("category/fetchCategory", async () => {
 const response = await api.get("/category/all")
 return response.data
});

const categorySlice = createSlice({
    name:"category",
    initialState:{
        categories:[],
        loading:false,
        error:null
    },
    extraReducers:(builder) => {
        builder.addCase(fetchCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.categories = action.payload.data
            state.loading = false
        })
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })
    }
});
export default categorySlice.reducer;