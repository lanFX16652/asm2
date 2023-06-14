import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice"
import transactionReducer from "./transactionSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        transaction: transactionReducer,
    }
})