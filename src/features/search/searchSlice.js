import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSearch } from '../../constants'

export const fetchSearch = createAsyncThunk(
    'search/fetchSearch',
    async (args = {}) => {
        const { type, q } = args
        try {
            const response = await getSearch(type, q)
            return response
        } catch (err) {
            return err.message
        }
    }
)

const initialState = {
    data: null,
    status: 'idle',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
    },
})

export default searchSlice.reducer
