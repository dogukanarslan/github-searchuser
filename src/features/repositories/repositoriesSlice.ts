import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBranches, getRepositories, getLabels } from '../../constants';
import { IBranch, ILabel, IRepository } from '../../models';

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (since: string | undefined, { rejectWithValue }) => {
    let response;
    if (since) {
      response = await getRepositories(since);
    } else {
      response = await getRepositories();
    }

    if (!response) {
      return rejectWithValue('rejected');
    }

    return response;
  }
);

export const fetchBranches = createAsyncThunk(
  'repositories/fetchBranches',
  async (args: { login: string; repo: string }, { rejectWithValue }) => {
    const response = await getBranches(args.login, args.repo);
    if (!response) {
      return rejectWithValue('rejected');
    }

    return response;
  }
);

export const fetchLabels = createAsyncThunk(
  'repositories/fetchLabels',
  async (args: { login: string; repo: string }, { rejectWithValue }) => {
    const response = await getLabels(args.login, args.repo);
    if (!response) {
      return rejectWithValue('rejected');
    }

    return response;
  }
);

type SliceState = {
  data: IRepository[];
  branches: Record<string, IBranch[]>;
  labels: Record<string, ILabel[]>;
  links?: any;
  status: string;
};

const initialState: SliceState = {
  data: [],
  branches: {},
  labels: {},
  status: 'idle',
};

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    resetRepositories: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.links = action.payload.links;
        state.data = [...state.data, ...action.payload.data];
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        const { repo } = action.meta.arg;
        state.branches[repo] = action.payload.data;
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        const { repo } = action.meta.arg;
        state.labels[repo] = action.payload.data;
      });
  },
});

export const { resetRepositories } = repositoriesSlice.actions;

export default repositoriesSlice.reducer;
