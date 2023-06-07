import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        search: {
            place: "",
            timeRange: [],
            people: 0,
        }
    },
    reducers: {
        updateDataSearch: (state, action) => {
            state.search = [...state.search, action.payload]
        }

    }
});

export const {
    updateDataSearch
} = searchSlice.actions;

export default searchSlice.reducer;