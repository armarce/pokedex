import { createSlice } from '@reduxjs/toolkit';

export const typeName = createSlice({
	name: 'typeName',
    initialState: '',
    reducers: {
        changeTypeName: (state, action) => action.payload
    }
})

export const { changeTypeName } = typeName.actions;

export default typeName.reducer;