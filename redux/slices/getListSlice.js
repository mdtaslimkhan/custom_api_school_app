import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";


export const getList = createAsyncThunk("fetchGetListSlice", async(url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
});

const GetListSlice = createSlice({
    name: "GetListSlice",
    initialState:  {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(getList.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getList.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getList.rejected, (state, action) => {
            state.isError = true;
        });

    }
});

export default GetListSlice.reducer;