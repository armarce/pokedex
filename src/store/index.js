import { configureStore } from '@reduxjs/toolkit';
import userName from './slices/userName.slice';
import typeName from './slices/typeName.slice';
import items from './slices/items.slice';
import currentPage from './slices/currentPage.slice';

export default configureStore({
  reducer: {
        userName,
        typeName,
        items,
        currentPage
	}
})