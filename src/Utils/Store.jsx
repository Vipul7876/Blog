import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import blogsReducer from './BlogSlice';

const store = configureStore( {
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
  }
} );

export default store;