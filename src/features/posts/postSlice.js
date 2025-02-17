import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//make api calls in redux toolkit

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(
    'https://social-media-cw-server-student-neog.replit.app/posts'
  );
  console.log(response);
  return response.data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    //reducer function
    likeButtonPressed: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts[postIndex].likes = state.posts[postIndex].likes + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'success';
      state.posts = action.payload.posts;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.message;
      // state.error = action.error.message;
    });
  },
});

export const { likeButtonPressed } = postSlice.actions;
export default postSlice.reducer;
