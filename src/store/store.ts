import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import usersReducer from './slices/usersSlice';
import singleUserReducer from './slices/singleUserSlice';
import repositoriesReducer from './slices/repositoriesSlice';
import loadingReducer from './slices/loadingSlice';
import repositoryDetailReducer from './slices/repositoryDetailSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      loading: loadingReducer,
      users: usersReducer,
      singleUser: singleUserReducer,
      repositories: repositoriesReducer,
      repositoryDetail: repositoryDetailReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
