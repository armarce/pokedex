import { createSlice } from '@reduxjs/toolkit';

export const userName = createSlice({
	name: 'userName',
    initialState: '',
    reducers: {
        change: (state, action) => action.payload
    }
})

export const { change } = userName.actions;

export default userName.reducer;