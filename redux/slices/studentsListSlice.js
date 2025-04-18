import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStudentsList = createAsyncThunk("fetchNoticeList", async(val) => {
    console.log("data students list " + " from fiteld: " + "studentlist");
    const res = await fetch(val.url + "studentlist"+val.param);
    const data = await res.json();
    return data;
});


const StudentsListSlice = createSlice({
    name: "studentsList",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(getStudentsList.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getStudentsList.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getStudentsList.rejected, (state, action) => {
            state.isError = true;
        })
    }
});

export default StudentsListSlice.reducer;