import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import usersReducer from '../features/users/usersSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
    reducer: { users: usersReducer, search: searchReducer },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
