import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { loading: Record<string, boolean> } = {
  loading: {},
};

export const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: PayloadAction) => {
          return action.type.endsWith('pending');
        },
        (state, action) => {
          const name = action.type.substring(0, action.type.lastIndexOf('/'));
          state.loading[name] = true;
        }
      )
      .addMatcher(
        (action: PayloadAction) => {
          return action.type.endsWith('fulfilled');
        },
        (state, action) => {
          const name = action.type.substring(0, action.type.lastIndexOf('/'));
          state.loading[name] = false;
        }
      )
      .addMatcher(
        (action: PayloadAction) => {
          return action.type.endsWith('error');
        },
        (state, action) => {
          const name = action.type.substring(0, action.type.lastIndexOf('/'));
          state.loading[name] = false;
        }
      );
  },
});

export default loadingSlice.reducer;
