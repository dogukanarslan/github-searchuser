import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Endpoints } from '@octokit/types';
import { octokit } from 'api/api';

type ArgsType = {
  q: string;
};

type SliceState = {
  data: Endpoints['GET /search/users']['response']['data'] | null | undefined;
  status: string;
};

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async (args: ArgsType = { q: '' }, { rejectWithValue }) => {
    const { q } = args;

    const response = await octokit.rest.search.users({ q });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return response;
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
      });
  },
});

export default searchSlice.reducer;
