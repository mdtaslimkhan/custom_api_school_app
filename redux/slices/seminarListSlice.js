import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";


export const getSeminarList = createAsyncThunk("seminarList", async(id) =>{
    const res = await fetch(API_URL + "seminarList/"+id);
    const data = await res.json();
    return data;
});


const SeminarListSlice = createSlice({
    name: "seminarList",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(getSeminarList.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getSeminarList.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getSeminarList.rejected, (state, action) => {
            state.isError = true;
        });
    }
});


export default SeminarListSlice.reducer;