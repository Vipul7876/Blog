import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import blogsReducer from './BlogSlice';
import searchReducer from './SearchSlice';
import adminReducer from './AdminSlice';

const store = configureStore( {
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
    search: searchReducer,
    admin: adminReducer,
  }
} );

export default store;