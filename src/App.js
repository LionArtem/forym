import React from 'react';
import Form from './components/Form/Form';
import Forum from './components/Forum/Forum';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import { api } from './utils/Api';

import { useSelector, useDispatch } from 'react-redux';
import { setMessagePage } from './redax/slices/messageSlice';

import {
  setCurrentPage,
  setNumberPage,
  setIsAddPage,
} from './redax/slices/paginationSlice';

function App() {
  const { messagePage } = useSelector((state) => state.message);

  const { currentPage, isAddPage, numberPage } = useSelector(
    (state) => state.pagination
  );
  const dispatch = useDispatch();

  const AddMessage = () => {
    api
      .getPaginationPage(currentPage)
      .then((res) => {
        dispatch(setMessagePage(res));
        if (isAddPage) {
          dispatch(setCurrentPage(currentPage + 1));
          dispatch(setNumberPage(numberPage + 1));
          dispatch(setIsAddPage(false));
        }
        if (res.length === 10 && messagePage.length <= 9) {
          dispatch(setIsAddPage(true));
        }
      })
      .catch((res) => console.log(res));
  };

  React.useEffect(() => {
    api
      .getPaginationPage(currentPage)
      .then((res) => {
        dispatch(setMessagePage(res));
      })
      .catch((res) => console.log(res));
  }, [currentPage]);

  return (
    <div className="page">
      <header className="">
        <Header />
      </header>
      <main>
        <section>
          {messagePage.map((obj, i) => (
            <Forum key={i} text={obj} />
          ))}
        </section>
        <section>
          <Form AddMessage={AddMessage} />
        </section>
        <section>
          <Pagination />
        </section>
      </main>
      <footer>
        <p>ArtemGreen</p>
      </footer>
    </div>
  );
}

export default App;
