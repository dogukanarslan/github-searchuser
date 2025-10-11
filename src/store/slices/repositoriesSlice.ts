import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Endpoints } from '@octokit/types';
import { parseLinkHeader } from '../../constants';
import { octokit } from 'lib/api';

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (since: string | undefined, { rejectWithValue }) => {
    let response;
    if (since) {
      response = await octokit.rest.repos.listPublic({
        since: parseInt(since),
      });
    } else {
      response = await octokit.rest.repos.listPublic();
    }

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
      link: parseLinkHeader(response.headers.link || ''),
    };
  }
);

export const searchRepositories = createAsyncThunk(
  'repositories/searchRepositories',
  async (
    { repositoryName, page }: { repositoryName: string; page?: number },
    { rejectWithValue }
  ) => {
    const response = await octokit.rest.search.repos({
      q: repositoryName,
      ...(page && { page }),
    });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
      ...(response.headers.link && {
        link: parseLinkHeader(response.headers.link),
      }),
    };
  }
);

export const fetchBranches = createAsyncThunk(
  'repositories/fetchBranches',
  async (args: { login: string; repo: string }, { rejectWithValue }) => {
    const response = await octokit.rest.repos.listBranches({
      repo: args.repo,
      owner: args.login,
    });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
    };
  }
);

export const fetchLabels = createAsyncThunk(
  'repositories/fetchLabels',
  async (args: { login: string; repo: string }, { rejectWithValue }) => {
    const response = await octokit.request('GET /repos/{owner}/{repo}/labels', {
      owner: args.login,
      repo: args.repo,
    });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
    };
  }
);

type SliceState = {
  data: Endpoints['GET /repositories']['response']['data'];
  searchResults: Endpoints['GET /search/repositories']['response']['data']['items'];
  branches: Record<
    string,
    Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data']
  >;
  labels: Record<
    string,
    Endpoints['GET /repos/{owner}/{repo}/labels']['response']['data']
  >;
  link?: Record<string, string>;
  totalCount: number | null;
  status: string;
};

const initialState: SliceState = {
  data: [],
  searchResults: [],
  branches: {},
  labels: {},
  totalCount: null,
  status: 'idle',
};

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setRepositories: (
      state,
      action: PayloadAction<{
        repositories: Endpoints['GET /repositories']['response']['data'];
        link?: Endpoints['GET /repositories']['response']['headers']['link'];
      }>
    ) => {
      state.data = action.payload.repositories;
      if (action.payload.link) {
        state.link = parseLinkHeader(action.payload.link);
      }
    },
    setSearchResults: (
      state,
      action: PayloadAction<
        Endpoints['GET /search/repositories']['response']['data']['items']
      >
    ) => {
      state.searchResults = action.payload;
    },
    setLink: (state, action: PayloadAction<string>) => {
      state.link = parseLinkHeader(action.payload);
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
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
        state.link = action.payload.link;
        state.data = [...state.data, ...action.payload.data];
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        const { repo } = action.meta.arg;
        state.branches[repo] = action.payload.data;
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        const { repo } = action.meta.arg;
        state.labels[repo] = action.payload.data;
      })
      .addCase(searchRepositories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchRepositories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = [
          ...state.searchResults,
          ...action.payload.data.items,
        ];
        state.totalCount = action.payload.data.total_count;

        if (action.payload.link) {
          state.link = action.payload.link;
        }
      });
  },
});

export const {
  setRepositories,
  resetRepositories,
  setTotalCount,
  setSearchResults,
  setLink,
} = repositoriesSlice.actions;

export default repositoriesSlice.reducer;
