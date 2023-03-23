import { configureStore } from '@reduxjs/toolkit';
import message from './slices/messageSlice';
import pagination from './slices/paginationSlice';

export const store = configureStore({
  reducer: { message, pagination },
});
