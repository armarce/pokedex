import { createSlice } from '@reduxjs/toolkit';

export const currentPage = createSlice({
    name: 'currentPage',
    initialState: 1,
    reducers: {
        changeCurrentPage: (state, action) => action.payload
    }
})

export const { changeCurrentPage } = currentPage.actions;

export default currentPage.reducer;
