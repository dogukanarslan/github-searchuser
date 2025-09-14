import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseLinkHeader } from '../../constants';
import { octokit } from 'lib/api';

type ArgsType = {
  q: string;
  page?: number;
};

export const fetchSearchRepository = createAsyncThunk(
  'search/fetchSearchRepository',
  async (args: ArgsType = { q: '', page: 1 }, { rejectWithValue }) => {
    const { q, page } = args;

    const response = await octokit.rest.search.repos({ q, page });

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
  data: any;
  link?: any;
  currentPage: number | null;
  status: string;
};

const initialState: SliceState = {
  data: null,
  status: 'idle',
  currentPage: null,
};

export const searchRepositorySlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchRepository.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchRepository.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.currentPage = action.meta.arg.page || 1;
        if (action.payload.link) {
          state.link = action.payload.link;
        }
      });
  },
});

export default searchRepositorySlice.reducer;
