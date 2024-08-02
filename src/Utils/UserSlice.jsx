import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice( {
  name: 'user',
  initialState: {
    isLoggedIn: false,
    User: null,
  },
  reducers: {
    addUser: ( state, action ) => {
      state.isLoggedIn = true;
      state.User = action.payload;
    },
    removeUser: ( state ) => {
      state.isLoggedIn = false;
      state.User = null;
    }
  }
} );

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;