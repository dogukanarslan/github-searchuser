import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Endpoints } from '@octokit/types';

import { octokit } from 'lib/api';

type ArgsType = {
  q: string;
};

type SliceState = {
  data: Endpoints['GET /search/commits']['response']['data'] | null;
  status: string;
};

export const fetchSearchCommit = createAsyncThunk(
  'search/fetchSearchCommit',
  async (args: ArgsType = { q: '' }, thunkApi) => {
    const { q } = args;
    try {
      const response = await octokit.rest.search.commits({ q });
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);

const initialState: SliceState = {
  data: null,
  status: 'idle',
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
        if (action.payload) {
          state.status = 'succeeded';
          state.data = action.payload.data;
        }
      });
  },
});

export default searchCommitSlice.reducer;
