import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDash = createAsyncThunk("fetchDash", async(val) => {
    console.log('dash result '+val);
    const res = await fetch(val);
    const data = await res.json();
    return data;
});


const DashSlice = createSlice({
    name: "userList",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(getDash.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getDash.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getDash.rejected, (state, action) => {
            state.isError = true;
        })
    }
});

export default DashSlice.reducer;