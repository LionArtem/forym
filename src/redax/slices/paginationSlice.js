import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  numberPage: 1,
  isAddPage: false,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setNumberPage(state, action) {
      state.numberPage = action.payload;
    },
    setIsAddPage(state, action) {
      state.isAddPage = action.payload;
    },
  },
});

export const { setCurrentPage, setNumberPage, setIsAddPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
