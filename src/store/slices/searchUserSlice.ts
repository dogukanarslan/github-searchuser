import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Endpoints } from '@octokit/types';
import { octokit } from 'lib/api';
import { parseLinkHeader } from '../../constants';

type ArgsType = {
  q: string;
  page?: number;
};

export const fetchSearchUser = createAsyncThunk(
  'search/fetchSearchUser',
  async (args: ArgsType = { q: '', page: 1 }, { rejectWithValue }) => {
    const { q, page } = args;

    const response = await octokit.rest.search.users({ q, page });

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
  data: Endpoints['GET /search/users']['response']['data'] | null;
  link?: Record<string, string>;
  status: string;
  currentPage: number | null;
};

const initialState: SliceState = {
  data: null,
  status: 'idle',
  currentPage: null,
};

export const searchUserSlice = createSlice({
  name: 'searchUserSlice',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.data = null;
      state.currentPage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.currentPage = action.meta.arg.page || 1;
        if (action.payload.link) {
          state.link = action.payload.link;
        }
      });
  },
});

export const { resetUsers } = searchUserSlice.actions;

export default searchUserSlice.reducer;
