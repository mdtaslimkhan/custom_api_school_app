import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";

export const wrokDataFetch = createAsyncThunk("fetchworkSheet", async(id) => {
    const res = await fetch(API_URL + "workSheetList/"+id);
    const data = await res.json();
    return data;
});

const WorkSheetSlice = createSlice({
    name: "workSheet",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(wrokDataFetch.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(wrokDataFetch.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(wrokDataFetch.rejected, (state, action) => {
            state.isError = true;
        });
    }
});

export default WorkSheetSlice.reducer;