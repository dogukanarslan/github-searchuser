import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { octokit } from 'api/api';

type ArgsType = {
  q: string;
};

type SliceState = {
  data: any;
  status: string;
};

export const fetchSearchRepository = createAsyncThunk(
  'search/fetchSearchRepository',
  async (args: ArgsType = { q: '' }, thunkApi) => {
    const { q } = args;
    try {
      const response = await octokit.rest.search.repos({ q });
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
        if (action.payload) {
          state.status = 'succeeded';
          state.data = action.payload.data;
        }
      });
  },
});

export default searchRepositorySlice.reducer;
