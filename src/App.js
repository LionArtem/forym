import React from 'react';
import Form from './components/Form/Form';
import Forum from './components/Forum/Forum';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { fetchMessageAll, selectMessage } from './redax/slices/messageSlice';
import {
  fetchPaginationPage,
  selectPagination,
} from './redax/slices/paginationSlice';
import MyLoader from './components/Forum/sceleton';

function App() {
  const { messagePage } = useSelector(selectMessage);

  const { pageNumber, isAddPage } = useSelector(selectPagination);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchMessageAll());
  }, []);

  React.useEffect(() => {
    dispatch(fetchPaginationPage(pageNumber));
  }, [pageNumber]);

  return (
    <div className="page">
      <header className="">
        <Header />
      </header>
      <main>
        <section>
          {/* {[...new Array(10)].map((_, i) => (
            <MyLoader key={i} />
          ))} */}
          {isAddPage
            ? [...new Array(6)].map((_, i) => <MyLoader key={i} />)
            : messagePage.map((obj, i) => <Forum key={i} text={obj} />)}
        </section>
        <section>{messagePage.length < 10 && <Form />}</section>
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
