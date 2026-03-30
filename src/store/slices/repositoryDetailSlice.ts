import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Endpoints } from '@octokit/types';

import { octokit } from 'lib/api';

export const fetchRepositoryDetail = createAsyncThunk(
  'repositoryDetail/fetchRepositoryDetail',
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue }
  ) => {
    const response = await octokit.rest.repos.get({
      owner,
      repo,
    });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
    };
  }
);

export const fetchRepositoryLanguages = createAsyncThunk(
  'repositoryDetail/fetchRepositoryLanguages',
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue }
  ) => {
    const response = await octokit.rest.repos.listLanguages({
      owner,
      repo,
    });

    if (!response) {
      return rejectWithValue('rejected');
    }

    return {
      data: response.data,
    };
  }
);

export const starRepo = createAsyncThunk(
  'repositoryDetail/starRepo',
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue }
  ) => {
    const response = await fetch(`/api/repositories/${owner}/${repo}/star`, {
      method: 'PUT',
    });

    if (!response.ok) {
      return rejectWithValue('rejected');
    }

    return {
      data: null,
    };
  }
);

export const unstarRepo = createAsyncThunk(
  'repositoryDetail/unstarRepo',
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue }
  ) => {
    const response = await fetch(`/api/repositories/${owner}/${repo}/star`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return rejectWithValue('rejected');
    }

    return {
      data: null,
    };
  }
);

type SliceState = {
  data: Endpoints['GET /repos/{owner}/{repo}']['response']['data'] | null;
  languages:
    | Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data']
    | null;
  isStarred: boolean;
};

const initialState: SliceState = {
  data: null,
  languages: null,
  isStarred: false,
};

export const repositoryDetailSlice = createSlice({
  name: 'repositoryDetail',
  initialState,
  reducers: {
    setRepositoryDetail: (
      state,
      action: PayloadAction<
        Endpoints['GET /repos/{owner}/{repo}']['response']['data']
      >
    ) => {
      state.data = action.payload;
    },
    setRepositoryLanguages: (
      state,
      action: PayloadAction<
        Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data']
      >
    ) => {
      state.languages = action.payload;
    },
    setIsStarred: (state, action: PayloadAction<boolean>) => {
      state.isStarred = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoryDetail.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchRepositoryLanguages.fulfilled, (state, action) => {
        state.languages = action.payload.data;
      })
      .addCase(starRepo.fulfilled, (state) => {
        state.isStarred = true;
      })
      .addCase(unstarRepo.fulfilled, (state) => {
        state.isStarred = false;
      });
  },
});

export const { setRepositoryDetail, setRepositoryLanguages, setIsStarred } =
  repositoryDetailSlice.actions;

export default repositoryDetailSlice.reducer;
