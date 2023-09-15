import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRepositories } from '../../constants';
import { IRepository } from '../../models';

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async () => {
    const response = await getRepositories();
    return response;
  }
);

type SliceState = {
  data: IRepository[];
  links?: any;
  status: string;
};

const initialState: SliceState = {
  data: [],
  status: 'idle',
};

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.links = action.payload.links;
        state.data = [...state.data, ...action.payload.data];
      });
  },
});

export default repositoriesSlice.reducer;
