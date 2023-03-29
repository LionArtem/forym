import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageValue: '',
  messagePage: [],
  messageAll: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessageValue(state, action) {
      state.messageValue = action.payload;
    },
    setMessagePage(state, action) {
      state.messagePage = action.payload;
    },
    addNewMessageState(state, action) {
      state.messagePage.push(action.payload);
    },
    setMessageAll(state, action) {
      state.messageAll = action.payload;
    },
    addNewMessageAll(state, action) {
      state.messageAll.push(action.payload);
    },
    deleteOneMessageAll(state) {
      state.messageAll.shift();
    },
  },
});

export const {
  setMessageValue,
  setMessagePage,
  addNewMessageState,
  setMessageAll,
  addNewMessageAll,
  deleteOneMessageAll,
} = messageSlice.actions;
export default messageSlice.reducer;
