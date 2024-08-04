import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import blogsReducer from './BlogSlice';
import searchReducer from './SearchSlice';

const store = configureStore( {
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
    search: searchReducer,
  }
} );

export default store;