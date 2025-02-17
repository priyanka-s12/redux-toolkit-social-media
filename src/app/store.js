import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../features/posts/postSlice';

const store = configureStore({
  reducer: {
    posts: postSlice,
  },
});

export default store;
