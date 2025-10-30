import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { octokit } from 'lib/api';
import { components } from '@octokit/openapi-types';
import { parseLinkHeader } from '../../constants';

type argsType = {
  startingId?: number;
  resultsPerPage?: string;
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (args: argsType, { rejectWithValue }) => {
    const { startingId, resultsPerPage } = args;
    const users = await octokit.rest.users.list({
      since: startingId || undefined,
      ...(resultsPerPage && { per_page: parseInt(resultsPerPage) }),
    });

    if (!users) {
      return rejectWithValue('rejected');
    }

    return {
      data: users.data,
      link: parseLinkHeader(users.headers.link || ''),
    };
  }
);

export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async (args: { username: string; page?: number }, { rejectWithValue }) => {
    const { username, page } = args;

    const response = await octokit.rest.search.users({
      q: username,
      ...(page && { page }),
    });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
      ...(response.headers.link && {
        link: parseLinkHeader(response.headers.link),
      }),
    };
  }
);

type SliceState = {
  data: components['schemas']['simple-user'][];
  searchResults: components['schemas']['user-search-result-item'][];
  totalCount: number | null;
  link?: Record<string, string>;
  searchResultsLink?: Record<string, string>;
  status: string;
};

const initialState: SliceState = {
  data: [],
  searchResults: [],
  totalCount: null,
  status: 'idle',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.data = [];
    },
    setUsers: (state, action) => {
      state.data = action.payload.users;
    },
    setSearchResults: (
      state,
      action: PayloadAction<{
        data: components['schemas']['user-search-result-item'][];
        link?: string;
      }>
    ) => {
      state.searchResults = action.payload.data;
    },
    setLink: (state, action: PayloadAction<string | null>) => {
      state.link =
        action.payload === null ? undefined : parseLinkHeader(action.payload);
    },
    setTotalCount: (state, action: PayloadAction<number | null>) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.link = action.payload.link;
        state.data = [...state.data, ...action.payload.data];
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(searchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = [
          ...state.searchResults,
          ...action.payload.data.items,
        ];
        state.totalCount = action.payload.data.total_count;
        if (action.payload.link) {
          state.link = action.payload.link;
        }
      });
  },
});

export const {
  resetUsers,
  setUsers,
  setSearchResults,
  setLink,
  setTotalCount,
} = usersSlice.actions;

export default usersSlice.reducer;
