import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../components/constants";


export const getClassList = createAsyncThunk("fetchclassList", async(val) => {
    console.log("data check2 " +val + " from fiteld: ");
    const res = await fetch(val + "classlist");
    const data = await res.json();
    return data;
});

const ClassListSlice = createSlice({
    name: "classList",
    initialState:  {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(getClassList.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getClassList.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getClassList.rejected, (state, action) => {
            state.isError = true;
        });

    }
});
// export const { getData } = ClassListSlice.actions;
export default ClassListSlice.reducer;