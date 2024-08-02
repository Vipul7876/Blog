import { createSlice } from "@reduxjs/toolkit";

const BlogSlice = createSlice( {
  name: 'blogs',
  initialState: {
    allBlogs: null,
    userBlogs: null,
  },
  reducers: {
    addBlogs: ( state, action ) => {
      state.allBlogs = action.payload;
    },
    addUserblogs: ( state, action ) => {
      state.userBlogs = action.payload ;
    },
    removeUserBlogs: ( state ) => {
      state.userBlogs = null;
    },
    removeBlogs: ( state ) => {
      state.allBlogs = null;
    },
  }
} );

export const { addBlogs, addUserblogs, removeUserBlogs, removeBlogs } = BlogSlice.actions;

export default BlogSlice.reducer;

