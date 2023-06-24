import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const loginAction = createAsyncThunk(
    'auth/login',
    async (data) => {
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:5000/admin/login",
                data: data.loginData,
            })

            if (response.data) {
                data.navigate('/')
                localStorage.setItem("admin", JSON.stringify(response.data))
            }

            return response.data
        } catch (error) {
            throw error.response.data.message
        }

    }
)


const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        updateUser: (state, action) => {
            state.currentUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.isFetching = false;
            state.error = action.error.message;
        })
    }
})

export const { updateUser } = authSlice.actions

export default authSlice.reducer;