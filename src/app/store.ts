import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import usersReducer from '../features/users/usersSlice';
import searchReducer from '../features/search/searchSlice';
import searchRepositoryReducer from '../features/search/searchRepositorySlice';
import commitRepositoryReducer from '../features/search/searchCommitSlice';
import singleUserReducer from '../features/singleUser/singleUserSlice';
import repositoriesReducer from '../features/repositories/repositoriesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    search: searchReducer,
    searchRepository: searchRepositoryReducer,
    commitRepository: commitRepositoryReducer,
    singleUser: singleUserReducer,
    repositories: repositoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
