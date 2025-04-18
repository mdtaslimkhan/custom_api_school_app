import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";

export const targetAndAchiveFetch = createAsyncThunk("fethcTargetAndAchive", async(id) => {
    const res = await fetch(API_URL + "targetList/"+id);
    const data = await res.json();
    return data;
});

const TargetAndAchiveSlice = createSlice({
    name: "targetAndAchive",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(targetAndAchiveFetch.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(targetAndAchiveFetch.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(targetAndAchiveFetch.rejected, (state, action) => {
            state.isError = true;
        });
    }
});

export default TargetAndAchiveSlice.reducer;