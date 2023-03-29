import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../utils/Api';

export const fetchNumberPage = createAsyncThunk(
  'page/fetchNumberPage',
  async () => {
    const data = await api.getAllMessage();
    return data;
  }
);

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
    setIsAddPage(state, action) {
      state.isAddPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNumberPage.pending, (state) => {
      console.log('загрузка');
    });
    builder.addCase(fetchNumberPage.fulfilled, (state, { payload }) => {
      state.numberPage = Math.ceil(payload.length / 10);
    });
    builder.addCase(fetchNumberPage.rejected, (state) => {
      console.log('error');
    });
  },
});

export const { setCurrentPage, setNumberPage, setIsAddPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
