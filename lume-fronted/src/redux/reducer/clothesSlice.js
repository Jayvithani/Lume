import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";   
import api from "../../services/api";   
export const fetchClothes = createAsyncThunk("clothes/fetchClothes", async () => {
    const response = await api.get("clothes/all");
    return response.data;                   
});

const clothesSlice = createSlice({
    name:"clothes",
    initialState:{
        clothes:[],
        loading:false,
        error:null,
    },
    extraReducers:(builder) => {
        builder.addCase(fetchClothes.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchClothes.fulfilled, (state, action) => {
            state.clothes = action.payload.data
            state.loading = false
        })
        builder.addCase(fetchClothes.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })
    }
});

export default clothesSlice.reducer;