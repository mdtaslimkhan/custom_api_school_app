import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";
import axios from "axios";

export const guestDataFetch = createAsyncThunk("fetchguestList", async(dt) => {
    const res = await fetch(API_URL + "guestList/"+dt);
    const data = await res.json();
    console.log("user post id: "+dt);
    return data;
});



const GuestListSlice = createSlice({
        name: "guestList",
        initialState: {
            data: null,
            isLoader: false,
            isError: false
        },
        extraReducers: builder => {
            builder.addCase(guestDataFetch.pending, (state, action) => {
                state.isLoader = true;
            });
            builder.addCase(guestDataFetch.fulfilled, (state, action) => {
                state.isLoader = false;
                state.data = action.payload;
            });
            builder.addCase(guestDataFetch.rejected, (state, action) => {
                state.isError = true;
            });
        }
    });


export default GuestListSlice.reducer;

