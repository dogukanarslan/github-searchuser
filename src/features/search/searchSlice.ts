import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSearch } from '../../constants'

type ArgsType = {
    type: string
    q: string
}

type SliceState = {
    data: any
    status: string
}

export const fetchSearch = createAsyncThunk(
    'search/fetchSearch',
    async (args: ArgsType = { type: '', q: '' }) => {
        const { type, q } = args
        try {
            const response = await getSearch(type, q)
            return response
        } catch (err) {
            if (err instanceof Error) {
                return err.message
            } else {
                console.log('Unexpected error', err)
            }
        }
    }
)

const initialState: SliceState = {
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