import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRepository, IUser } from 'models';
import { getFollowers, getFollowing, getStarred, getUser } from '../../constants';

export const fetchSingleUser = createAsyncThunk(
  'singleUser/fetchSingleUser',
  async (args: { login: string }) => {
    const response = await getUser(args.login);

    return response;
  }
);

type argsType = {
  login: string;
  page?: string;
};

export const fetchFollowers = createAsyncThunk(
  'singleUser/fetchFollowers',
  async (args: argsType = { login: '', page: '' }) => {
    const { login, page } = args;
    const response = await getFollowers(login, page || '');

    return response;
  }
);

export const fetchFollowing = createAsyncThunk(
  'singleUser/fetchFollowing',
  async (args: argsType = { login: '', page: '' }) => {
    const { login, page } = args;
    const response = await getFollowing(login, page || '');

    return response;
  }
);

export const fetchStarred = createAsyncThunk(
  'singleUser/fetchStarred',
  async (args: argsType = { login: '', page: '' }) => {
    const { login, page } = args;
    const response = await getStarred(login, page || '');

    return response;
  }
);

type SliceState = {
  user: IUser | null;
  followersLinks: any | null;
  followingLinks: any | null;
  starredLinks: any | null;
  followers: IUser[];
  following: IUser[];
  starred: IRepository[];
  status: string;
};

const initialState: SliceState = {
  user: null,
  followersLinks: null,
  followingLinks: null,
  starredLinks: null,
  followers: [],
  following: [],
  starred: [],
  status: 'idle',
};

export const singleUserSlice = createSlice({
  name: 'singleUser',
  initialState,
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
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followersLinks = action.payload.links || {};
        state.followers = action.payload.data;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.followingLinks = action.payload.links || {};
        state.following = action.payload.data;
      })
      .addCase(fetchStarred.fulfilled, (state, action) => {
        state.starredLinks = action.payload.links || {};
        state.starred = action.payload.data;
      });
  },
});

export default singleUserSlice.reducer;
