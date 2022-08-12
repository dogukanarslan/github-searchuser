import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'models';
import { getUser } from '../../constants';

export const fetchSingleUser = createAsyncThunk(
    'singleUser/fetchSingleUser',
    async (args: { login: string }) => {
        const response = await getUser(args.login);

        return response;
    }
);

export const singleUserSlice = createSlice({
    name: 'singleUser',
    initialState: {
        user: {} as IUser,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            });
    },
});

export default singleUserSlice.reducer;
