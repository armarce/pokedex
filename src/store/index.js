import { configureStore } from '@reduxjs/toolkit';
import userName from './slices/userName.slice';
import typeName from './slices/typeName.slice';

export default configureStore({
  reducer: {
        userName,
        typeName
	}
})