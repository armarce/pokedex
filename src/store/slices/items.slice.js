import { createSlice } from '@reduxjs/toolkit';

export const items = createSlice({
    name: 'items',
    initialState: 10,
    reducers: {
        changeItems: (state, action) => action.payload
    }
})

export const { changeItems } = items.actions;

export default items.reducer;
