import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../constants';
import { IUser } from '../../models';

type argsType = {
    startingId: string;
    resultsPerPage: string;
};

type SliceState = {
    data: IUser[] | null | undefined;
    status: string;
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (args: argsType = { startingId: '', resultsPerPage: '' }) => {
        const { startingId, resultsPerPage } = args;
        try {
            const response = await getUsers(startingId, resultsPerPage);
            return response;
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.log('Unexpected error', err);
            }
        }
    }
);

const initialState: SliceState = {
    data: null,
    status: 'idle',
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            });
    },
});

export default usersSlice.reducer;
