import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Endpoints } from '@octokit/types';
import { parseLinkHeader } from '../../constants';
import { octokit } from 'api/api';

export const fetchSingleUser = createAsyncThunk(
  'singleUser/fetchSingleUser',
  async (args: { login: string }, { rejectWithValue }) => {
    const user = await octokit.rest.users.getByUsername({
      username: args.login,
    });

    if (!user) {
      return rejectWithValue('rejected');
    }

    return { data: user.data };
  }
);

type argsType = {
  login: string;
  page?: string;
};

export const fetchFollowers = createAsyncThunk(
  'singleUser/fetchFollowers',
  async (args: argsType = { login: '', page: '' }, { rejectWithValue }) => {
    const { login, page = '1' } = args;
    const followers = await octokit.rest.users.listFollowersForUser({
      username: login,
      page: parseInt(page),
    });

    if (!followers) {
      return rejectWithValue('rejected');
    }

    return {
      data: followers.data,
      links: parseLinkHeader(followers.headers.link || ''),
    };
  }
);

export const fetchFollowing = createAsyncThunk(
  'singleUser/fetchFollowing',
  async (args: argsType = { login: '', page: '' }, { rejectWithValue }) => {
    const { login, page = '1' } = args;
    const following = await octokit.rest.users.listFollowingForUser({
      username: login,
      page: parseInt(page),
    });

    if (!following) {
      return rejectWithValue('rejected');
    }

    return {
      data: following.data,
      links: parseLinkHeader(following.headers.link || ''),
    };
  }
);

export const fetchStarred = createAsyncThunk(
  'singleUser/fetchStarred',
  async (args: argsType = { login: '', page: '' }, { rejectWithValue }) => {
    const { login, page } = args;
    const response = await octokit.request('GET /users/{username}/starred', {
      username: login,
      ...(page && { page: parseInt(page) }),
    });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data as Extract<
        Endpoints['GET /users/{username}/starred']['response']['data'],
        {
          id: number;
        }[]
      >,
      links: parseLinkHeader(response.headers.link || ''),
    };
  }
);

type SliceState = {
  user: Endpoints['GET /users/{username}']['response']['data'] | null;
  followersLinks: any | null;
  followingLinks: any | null;
  starredLinks: any | null;
  followers: Endpoints['GET /users/{username}/followers']['response']['data'];
  following: Endpoints['GET /users/{username}/following']['response']['data'];
  starred: Extract<
    Endpoints['GET /users/{username}/starred']['response']['data'],
    {
      id: number;
    }[]
  >;
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
      })
      .addCase(fetchFollowers.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchFollowing.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchStarred.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default singleUserSlice.reducer;
