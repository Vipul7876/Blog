import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice( {
  name: 'search',
  initialState: null,
  reducers: {
    addSearch: ( state, action ) => {
      state = action.payload;
    },
    removeSearch: ( state ) => {
      state = null;
    },
  }
} );

export const { addSearch, removeSearch } = SearchSlice.actions;

export default SearchSlice.reducer;

