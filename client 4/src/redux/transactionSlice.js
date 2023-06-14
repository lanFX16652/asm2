import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        // transaction: {
        //     user: null,
        //     hotel: null,
        //     room: null, 
        //     roomNumber: null,  
        //     dateStart: null,
        //     dateEnd: null,
        //     price: null,
        //     payment: null,
        //     status: null
        // }

        transaction: []
    },
    reducers: {
        createTransaction: (state, action) => {
            state.transaction = [...state.transaction, action.payload]
        }

    }
});

export const {
    createTransaction
} = transactionSlice.actions;

export default transactionSlice.reducer;