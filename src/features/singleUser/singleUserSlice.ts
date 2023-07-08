import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'models';
import { getFollowers, getUser } from '../../constants';

export const fetchSingleUser = createAsyncThunk(
  'singleUser/fetchSingleUser',
  async (args: { login: string }) => {
    const response = await getUser(args.login);

    return response;
  }
);

export const fetchFollowers = createAsyncThunk(
  'singleUser/fetchFollowers',
  async (login: string) => {
    const response = await getFollowers(login);

    return response;
  }
);

export const singleUserSlice = createSlice({
  name: 'singleUser',
  initialState: {
    user: {} as IUser,
    followers: [] as IUser[],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data;
      })
      .addCase(fetchFollowers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.followers = action.payload.data;
      });
  },
});

export default singleUserSlice.reducer;
