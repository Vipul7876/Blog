import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice( {
  name: 'user',
  initialState: {
    isLoggedIn: false,
    User: null,
    isAdmin: false,
    userBio: null,
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
    addUserBio: ( state, action ) => {
      state.userBio = action.payload;
    },
    removeUser: ( state ) => {
      state.isLoggedIn = false;
      state.userBio = null;
      state.User = null;
    },
    removeAdmin: ( state ) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.userBio = null;
      state.User = null;
    },
    removeUserBio: ( state ) => {
      state.userBio = null;
    },
  }
} );

export const { addUser, removeUser, removeAdmin, addAdmin, addUserBio, removeUserBio } = userSlice.actions;
export default userSlice.reducer;