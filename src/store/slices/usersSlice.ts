import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { octokit } from 'lib/api';
import { Endpoints } from '@octokit/types';
import { parseLinkHeader } from '../../constants';

type argsType = {
  startingId?: number;
  resultsPerPage?: string;
};

type SliceState = {
  data: Endpoints['GET /users']['response']['data'];
  links?: any;
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
      links: parseLinkHeader(users.headers.link || ''),
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.links = action.payload.links;
        state.data = [...state.data, ...action.payload.data];
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
