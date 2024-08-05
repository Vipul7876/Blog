import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice( {
  name: 'user',
  initialState: {
    isLoggedIn: false,
    User: null,
    isAdmin: false,
  },
  reducers: {
    addUser: ( state, action ) => {
      state.isLoggedIn = true;
      state.User = action.payload;
    },
    addAdmin: ( state, action ) => {
      state.isLoggedIn = true;
      state.isAdmin = true;
      state.User = action.payload;
    },
    removeUser: ( state ) => {
      state.isLoggedIn = false;
      state.User = null;
    },
    removeAdmin: ( state ) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.User = null;
    },
  }
} );

export const { addUser, removeUser, removeAdmin, addAdmin } = userSlice.actions;
export default userSlice.reducer;