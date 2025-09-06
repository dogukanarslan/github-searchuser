import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Endpoints } from '@octokit/types';
import { octokit } from 'lib/api';
import { parseLinkHeader } from '../../constants';

type ArgsType = {
  q: string;
  page?: number;
};

type SliceState = {
  data: Endpoints['GET /search/users']['response']['data'] | null;
  link?: any;
  status: string;
};

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async (args: ArgsType = { q: '', page: 1 }, { rejectWithValue }) => {
    const { q, page } = args;

    const response = await octokit.rest.search.users({ q, page });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
      link: parseLinkHeader(response.headers.link || ''),
    };
  }
);

const initialState: SliceState = {
  data: null,
  status: 'idle',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        if (action.payload.link) {
          state.link = action.payload.link;
        }
      });
  },
});

export default searchSlice.reducer;
