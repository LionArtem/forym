import React from 'react';

import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';

import { setCurrentPage } from '../../redax/slices/paginationSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, numberPage } = useSelector((state) => state.pagination);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={numberPage}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
