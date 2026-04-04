import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { paths } from '@octokit/openapi-types';
import { Endpoints } from '@octokit/types';

import { parseLinkHeader } from '../../constants';
import { octokit } from 'lib/api';

type argsType = {
  login: string;
  page?: string;
  per_page?: number;
};

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
      link: followers.headers.link
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
      links: response.headers.link
        ? parseLinkHeader(response.headers.link)
        : null,
    };
  }
);

export const fetchAuthenticatedUser = createAsyncThunk(
  'singleUser/fetchAuthenticatedUser',
  async (_, { rejectWithValue }) => {
    const response = await fetch('/api/authenticated-user');

    if (!response.ok) {
      return rejectWithValue('rejected');
    }

    const payload = await response.json();

    return {
      data: payload.data,
    };
  }
);

export const getIsFollowedByAuthenticatedUser = createAsyncThunk(
  'singleUser/isFollowedByAuthenticatedUser',
  async (username: string, { rejectWithValue }) => {
    const response = await fetch(`/api/users/${username}/follow`);

    if (!response.ok) {
      return rejectWithValue('rejected');
    }

    const payload = await response.json();

    return { data: payload.isFollowed };
  }
);

export const followUser = createAsyncThunk(
  'singleUser/followUser',
  async (username: string, { rejectWithValue }) => {
    const response = await fetch(`/api/users/${username}/follow`, {
      method: 'PUT',
    });

    if (!response.ok) {
      return rejectWithValue('rejected');
    }

    return { data: null };
  }
);

export const unfollowUser = createAsyncThunk(
  'singleUser/unfollowUser',
  async (username: string, { rejectWithValue }) => {
    const response = await fetch(`/api/users/${username}/follow`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return rejectWithValue('rejected');
    }

    return { data: null };
  }
);

export const getAuthenticated = createAsyncThunk(
  'singleUser/authenticatedUser',
  async (_, { rejectWithValue }) => {
    const response = await fetch('/api/authenticated-user');

    if (!response.ok) {
      return rejectWithValue('rejected');
    }

    const payload = await response.json();

    return { data: payload.data };
  }
);

export const fetchRepositores = createAsyncThunk(
  'singleUser/fetchRepositories',
  async (args: { username: string; page: number }, { rejectWithValue }) => {
    const response = await octokit.rest.repos.listForUser({
      username: args.username,
      page: args.page,
    });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
      links: response.headers.link
        ? parseLinkHeader(response.headers.link)
        : null,
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
  isFollowedByAuthenticatedUser?: boolean;
  followersLinks: Record<string, string> | null;
  followingLinks: Record<string, string> | null;
  starredLinks: Record<string, string> | null;
  repositoriesLinks: Record<string, string> | null;
  followers: paths['/users/{username}/followers']['get']['responses']['200']['content']['application/json'];
  following: paths['/users/{username}/following']['get']['responses']['200']['content']['application/json'];
  starred: Extract<
    paths['/users/{username}/starred']['get']['responses']['200']['content']['application/json'],
    {
      id: number;
    }[]
  >;
  repositories: paths['/users/{username}/repos']['get']['responses']['200']['content']['application/json'];
  status: string;
};

const initialState: SliceState = {
  authenticatedUser: null,
  user: null,
  followersLinks: null,
  followingLinks: null,
  starredLinks: null,
  repositoriesLinks: null,
  followers: [],
  following: [],
  starred: [],
  repositories: [],
  status: 'loading',
};

export const singleUserSlice = createSlice({
  name: 'singleUser',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Endpoints['GET /user']['response']['data']>
    ) => {
      state.user = action.payload;
    },
    setAuthenticatedUser: (
      state,
      action: PayloadAction<Endpoints['GET /user']['response']['data']>
    ) => {
      state.authenticatedUser = action.payload;
    },
    setIsFollowedByAuthenticatedUser: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isFollowedByAuthenticatedUser = action.payload;
    },
    setFollowers: (
      state,
      action: PayloadAction<
        Endpoints['GET /user/followers']['response']['data']
      >
    ) => {
      state.followers = action.payload;
    },
    setFollowersLink: (
      state,
      action: PayloadAction<
        Endpoints['GET /user/followers']['response']['headers']['link']
      >
    ) => {
      if (action.payload) {
        state.followersLinks = parseLinkHeader(action.payload);
      }
    },
    setFollowing: (
      state,
      action: PayloadAction<
        Endpoints['GET /user/following']['response']['data']
      >
    ) => {
      state.following = action.payload;
    },
    setFollowingLinks: (
      state,
      action: PayloadAction<
        Endpoints['GET /user/following']['response']['headers']['link']
      >
    ) => {
      if (action.payload) {
        state.followingLinks = parseLinkHeader(action.payload);
      }
    },
    setStarred: (
      state,
      action: PayloadAction<
        Extract<
          paths['/users/{username}/starred']['get']['responses']['200']['content']['application/json'],
          {
            id: number;
          }[]
        >
      >
    ) => {
      state.starred = action.payload;
    },
    setStarredLinks: (
      state,
      action: PayloadAction<
        Endpoints['GET /user/starred']['response']['headers']['link']
      >
    ) => {
      if (action.payload) {
        state.starredLinks = parseLinkHeader(action.payload);
      }
    },
  },
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
        state.followersLinks = action.payload.link || {};
        state.followers = [...state.followers, ...action.payload.data];
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.followingLinks = action.payload.links || {};
        state.following = [...state.following, ...action.payload.data];
      })
      .addCase(fetchStarred.fulfilled, (state, action) => {
        state.starredLinks = action.payload.links || {};
        state.starred = [...state.starred, ...action.payload.data];
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
        state.authenticatedUser = action.payload.data;
      })
      .addCase(getIsFollowedByAuthenticatedUser.fulfilled, (state, action) => {
        state.isFollowedByAuthenticatedUser = action.payload.data;
      })
      .addCase(followUser.fulfilled, (state) => {
        if (state.user) {
          state.isFollowedByAuthenticatedUser = true;
        }
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        if (state.user) {
          state.isFollowedByAuthenticatedUser = false;
        }
      })
      .addCase(getAuthenticated.fulfilled, (state, action) => {
        state.authenticatedUser = action.payload.data;
      })
      .addCase(fetchRepositores.fulfilled, (state, action) => {
        state.repositories = [...state.repositories, ...action.payload.data];
        state.repositoriesLinks = action.payload.links || {};
      });
  },
});

export const {
  setUser,
  setAuthenticatedUser,
  setIsFollowedByAuthenticatedUser,
  setFollowers,
  setFollowersLink,
  setFollowing,
  setFollowingLinks,
  setStarred,
  setStarredLinks,
} = singleUserSlice.actions;

export default singleUserSlice.reducer;
