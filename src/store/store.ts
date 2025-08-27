import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import usersReducer from './slices/usersSlice';
import searchReducer from './slices/searchSlice';
import searchRepositoryReducer from './slices/searchRepositorySlice';
import commitRepositoryReducer from './slices/searchCommitSlice';
import singleUserReducer from './slices/singleUserSlice';
import repositoriesReducer from './slices/repositoriesSlice';
import loadingReducer from './slices/loadingSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      loading: loadingReducer,
      users: usersReducer,
      search: searchReducer,
      searchRepository: searchRepositoryReducer,
      commitRepository: commitRepositoryReducer,
      singleUser: singleUserReducer,
      repositories: repositoriesReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
