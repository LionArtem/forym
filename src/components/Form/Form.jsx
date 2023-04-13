import React from 'react';
import Style from './Form.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessageValue,
  addNewMessageAll,
  deleteOneMessageAll,
  fetchMessageAll,
  selectMessage,
} from '../../redax/slices/messageSlice';
import {
  fetchPaginationPage,
  selectPagination,
} from '../../redax/slices/paginationSlice';

import { api } from '../../utils/Api';

export default function Form() {
  const textAreaRef = React.useRef();
  const formRef = React.useRef();
  const { messageValue, messageAll, messagePage } = useSelector(selectMessage);

  const { pageNumber } = useSelector(selectPagination);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(messageValue);
    if (messageAll.length >= 99) {
      deletePost(messageAll[0].id);
    } else {
      addPost();
    }
  };

  const deletePost = (id) => {
    api
      .deletePost(id)
      .then(() => {
        dispatch(deleteOneMessageAll());
        addPost();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPost = () => {
    api
      .addPost(messageValue)
      .then((res) => {
        dispatch(addNewMessageAll(res));
        dispatch(fetchPaginationPage(pageNumber));
        dispatch(fetchMessageAll());
        dispatch(setMessageValue(''));
        textAreaRef.current.focus();
        if (messagePage.length <= 8) {
          setTimeout(
            () =>
              formRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start',
              }),
            500
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      ref={formRef}
      className={Style.form}
    >
      <textarea
        ref={textAreaRef}
        value={messageValue}
        onChange={(e) => {
          dispatch(setMessageValue(e.target.value));
        }}
        className={Style.input}
        type="text"
      ></textarea>
      <button className={Style.button} type="submit">
        Отправить
      </button>
    </form>
  );
}
