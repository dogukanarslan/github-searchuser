import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Endpoints } from '@octokit/types';

import { octokit } from 'lib/api';
import { parseLinkHeader } from '../../constants';

type ArgsType = {
  q: string;
  page?: number;
};

export const fetchSearchCommit = createAsyncThunk(
  'search/fetchSearchCommit',
  async (args: ArgsType = { q: '', page: 1 }, { rejectWithValue }) => {
    const { q, page } = args;
    const response = await octokit.rest.search.commits({ q, page });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
      link: parseLinkHeader(response.headers.link || ''),
    };
  }
);

type SliceState = {
  data: Endpoints['GET /search/commits']['response']['data'] | null;
  status: string;
  currentPage: number | null;
  link?: any;
};

const initialState: SliceState = {
  data: null,
  status: 'idle',
  currentPage: null,
};

export const searchCommitSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchCommit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchCommit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.currentPage = action.meta.arg.page || 1;
        if (action.payload.link) {
          state.link = action.payload.link;
        }
      });
  },
});

export default searchCommitSlice.reducer;
