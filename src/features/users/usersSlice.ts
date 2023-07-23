import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../constants';
import { IUser } from '../../models';

type argsType = {
  startingId: string;
  resultsPerPage: string;
};

type SliceState = {
  data: IUser[];
  links?: any;
  status: string;
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (args: argsType = { startingId: '', resultsPerPage: '' }) => {
    const { startingId, resultsPerPage } = args;

    const response = await getUsers(startingId, resultsPerPage);
    return response;
  }
);

const initialState: SliceState = {
  data: [],
  status: 'idle',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.links = action.payload.links;
        state.data = [...state.data, ...action.payload.data];
      });
  },
});

export const { resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
