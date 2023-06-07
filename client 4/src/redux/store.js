import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
    }
})