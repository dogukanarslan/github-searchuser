import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../../constants'

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (args = {}) => {
        const { startingId, resultsPerPage } = args
        try {
            const response = await getUsers(startingId, resultsPerPage)
            return response
        } catch (err) {
            return err.message
        }
    }
)

const initialState = {
    data: [],
    status: 'idle',
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
    },
})

export default usersSlice.reducer
