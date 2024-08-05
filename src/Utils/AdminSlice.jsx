import { createSlice } from "@reduxjs/toolkit";


const AdminSlice = createSlice( {
  name: 'admin',
  initialState: {
    allUsers: null,
  },
  reducers: {
    addUsers: ( state, action ) => {
      state.allUsers = action.payload;
    },
    removeUsers: ( state ) => {
      state.allUsers = null;
    },
  }
} );

export const { addUsers, removeUsers } = AdminSlice.actions;

export default AdminSlice.reducer;