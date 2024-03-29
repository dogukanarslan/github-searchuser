import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSearch } from '../../constants';

type ArgsType = {
  type: string;
  q: string;
};

type SliceState = {
  data: any;
  status: string;
};

export const fetchSearchCommit = createAsyncThunk(
  'search/fetchSearchCommit',
  async (args: ArgsType = { type: '', q: '' }, thunkApi) => {
    const { type, q } = args;
    try {
      const response = await getSearch(type, q);
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
