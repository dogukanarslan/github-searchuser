import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { paths } from '@octokit/openapi-types';

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
  per_page?: number;
};

export const fetchFollowers = createAsyncThunk(
  'singleUser/fetchFollowers',
  async (
    args: argsType = { login: '', page: '', per_page: undefined },
    { rejectWithValue }
  ) => {
    const { login, page = '1', per_page = 40 } = args;
    const followers = await octokit.rest.users.listFollowersForUser({
      username: login,
      page: parseInt(page),
      per_page,
    });

    if (!followers) {
      return rejectWithValue('rejected');
    }

    return {
      data: followers.data,
      links: followers.headers.link
        ? parseLinkHeader(followers.headers.link)
        : null,
    };
  }
);

export const fetchFollowing = createAsyncThunk(
  'singleUser/fetchFollowing',
  async (
    args: argsType = { login: '', page: '', per_page: undefined },
    { rejectWithValue }
  ) => {
    const { login, page = '1', per_page = 40 } = args;
    const following = await octokit.rest.users.listFollowingForUser({
      username: login,
      page: parseInt(page),
      per_page,
    });

    if (!following) {
      return rejectWithValue('rejected');
    }

    return {
      data: following.data,
      links: following.headers.link
        ? parseLinkHeader(following.headers.link)
        : null,
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
        paths['/users/{username}/starred']['get']['responses']['200']['content']['application/json'],
        {
          id: number;
        }[]
      >,
    };
  }
);

export const fetchAuthenticatedUser = createAsyncThunk(
  'singleUser/fetchAuthenticatedUser',
  async (_, { rejectWithValue }) => {
    const response = await octokit.rest.users.getAuthenticated();

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
    };
  }
);

type SliceState = {
  authenticatedUser:
    | paths['/user']['get']['responses']['200']['content']['application/json']
    | null;
  user:
    | paths['/users/{username}']['get']['responses']['200']['content']['application/json']
    | null;
  followersLinks: any | null;
  followingLinks: any | null;
  starredLinks: any | null;
  followers: paths['/users/{username}/followers']['get']['responses']['200']['content']['application/json'];
  following: paths['/users/{username}/following']['get']['responses']['200']['content']['application/json'];
  starred: Extract<
    paths['/users/{username}/starred']['get']['responses']['200']['content']['application/json'],
    {
      id: number;
    }[]
  >;
  status: string;
};

const initialState: SliceState = {
  authenticatedUser: null,
  user: null,
  followersLinks: null,
  followingLinks: null,
  starredLinks: null,
  followers: [],
  following: [],
  starred: [],
  status: 'loading',
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
        state.status = 'succeeded';
        state.followersLinks = action.payload.links || {};
        state.followers = action.payload.data;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.followingLinks = action.payload.links || {};
        state.following = action.payload.data;
      })
      .addCase(fetchStarred.fulfilled, (state, action) => {
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
      })
      .addCase(fetchAuthenticatedUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data;
      });
  },
});

export default singleUserSlice.reducer;
