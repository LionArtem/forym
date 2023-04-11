import React from 'react';
import Form from './components/Form/Form';
import Forum from './components/Forum/Forum';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { fetchMessageAll } from './redax/slices/messageSlice';
import { fetchPaginationPage } from './redax/slices/paginationSlice';

function App() {
  const { messagePage } = useSelector((state) => state.message);

  const { pageNumber } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  const AddMessage = () => {
    dispatch(fetchPaginationPage(pageNumber));
    dispatch(fetchMessageAll());
  };

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
          {messagePage.map((obj, i) => (
            <Forum key={i} text={obj} />
          ))}
        </section>
        <section>
          {messagePage.length < 10 && <Form AddMessage={AddMessage} />}
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
