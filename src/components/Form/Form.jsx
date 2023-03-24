import React from 'react';
import Style from './Form.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessageValue,
  setMessageAll,
  addNewMessageAll,
  deleteOneMessageAll,
} from '../../redax/slices/messageSlice';

import { setNumberPage } from '../../redax/slices/paginationSlice';

import { api } from '../../utils/Api';

export default function Form({ AddMessage }) {
  const textAreaRef = React.useRef();
  const formRef = React.useRef();
  const { messageValue, messageAll } = useSelector((state) => state.message);

  const dispatch = useDispatch();

 

  const setAllMessage = () => {
    api.getAllMessage().then((res) => {
      dispatch(setMessageAll(res));
    });
  };

  React.useEffect(() => {
    setAllMessage();
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageAll.length >= 99) {
      console.log(messageAll);
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
        AddMessage();
        dispatch(setMessageValue(''));
        textAreaRef.current.focus();
        setTimeout(
          () =>
            formRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'start',
            }),
          500
        );
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
        onChange={(e) => dispatch(setMessageValue(e.target.value))}
        className={Style.input}
        type="text"
      ></textarea>
      <button className={Style.button} type="submit">
        Отправить
      </button>
    </form>
  );
}
