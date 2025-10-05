import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { octokit } from 'lib/api';
import { components } from '@octokit/openapi-types';
import { parseLinkHeader } from '../../constants';

type argsType = {
  startingId?: number;
  resultsPerPage?: string;
};

type SliceState = {
  data: components['schemas']['simple-user'][];
  link?: Record<string, string>;
  status: string;
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

    const users = await octokit.rest.search.users({
      q: username,
      ...(page && { page }),
    });

    if (!users) {
      return rejectWithValue('rejected');
    }

    return {
      data: users.data,
      ...(users.headers.link && { link: parseLinkHeader(users.headers.link) }),
    };
  }
);

const initialState: SliceState = {
  data: [],
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
      if (action.payload.link) {
        state.link = parseLinkHeader(action.payload.link);
      }
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
        state.data = [...state.data, ...action.payload.data.items];
        if (action.payload.link) {
          state.link = action.payload.link;
        }
      });
  },
});

export const { resetUsers, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
