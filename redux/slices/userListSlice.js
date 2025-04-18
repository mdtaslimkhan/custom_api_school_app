import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserList = createAsyncThunk("fetchUserList", async(val) => {
    console.log('userlist result '+val);
    const res = await fetch(val);
    const data = await res.json();
    return data;
});


const UserListSlice = createSlice({
    name: "userList",
    initialState: {
        data: null,
        isLoader: false,
        isError: false
    },
    extraReducers: builder => {
        builder.addCase(getUserList.pending, (state, action) => {
            state.isLoader = true;
        });
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(getUserList.rejected, (state, action) => {
            state.isError = true;
        })
    }
});

export default UserListSlice.reducer;