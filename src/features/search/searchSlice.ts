import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISearch } from 'models';
import { getSearch } from '../../constants';

type ArgsType = {
  type: string;
  q: string;
};

type SliceState = {
  data: ISearch | null | undefined;
  status: string;
};

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async (args: ArgsType = { type: '', q: '' }) => {
    const { type, q } = args;

    const response = await getSearch(type, q);
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
