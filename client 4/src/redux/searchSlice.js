import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        search: {
            city: "",
            timeRange: [],
            people: 0,
        }
    },
    reducers: {
        updateDataSearch: (state, action) => {
            console.log(action.payload);
            state.search = { ...action.payload }
        }

    }
});

export const {
    updateDataSearch
} = searchSlice.actions;

export default searchSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// export const loginAction = createAsyncThunk(
//     'auth/login',
//     async (data) => {
//         const response = await axios({
//             method: "POST",
//             url: "http://localhost:5000/admin/login",
//             data: data.loginData,
//         })

//         if (response.data) {
//             data.navigate('/')
//             localStorage.setItem("admin", JSON.stringify(response.data))
//         }

//         return response.data
//     }
// )


// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         currentUser: null,
//         isFetching: false,
//         error: false,
//     },
//     reducers: {
//         updateUser: (state, action) => {
//             state.currentUser = action.payload
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(loginAction.pending, (state, action) => {
//             state.isFetching = true
//         })
//         builder.addCase(loginAction.fulfilled, (state, action) => {
//             state.isFetching = false;
//             state.currentUser = action.payload
//         })
//         builder.addCase(loginAction.rejected, (state, action) => {
//             state.isFetching = false;
//             state.error = true
//         })
//     }
// })

// export const { updateUser } = authSlice.actions

// export default authSlice.reducer;