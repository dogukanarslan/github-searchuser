import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
    reducer: { users: usersReducer, search: searchReducer },
})
