import React from 'react';
import styles from './pagination.module.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  setCurrentPage as changePage,
  navigateToPrevPage,
  navigateToNextPage
} from '../../redux/features/pagination/paginationSlice';
import { useSelector, useDispatch } from 'react-redux';

const Pagination = () => {
  const { currentPage, itemsPerPage, totalItemsAmount } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();
  const pagesTotalAmount = Math.ceil(totalItemsAmount / itemsPerPage);
  const pagesArr = [];
  for (let i = 1; i <= pagesTotalAmount; i++) {
    pagesArr.push(i);
  }

  const nextPageClickHandler = () => {
    if (currentPage === pagesTotalAmount) dispatch(changePage(1));
    else dispatch(navigateToNextPage());
    window.scrollTo(0, 0);
  };

  const prevPageClickHandler = () => {
    if (currentPage === 1) dispatch(changePage(pagesTotalAmount));
    else dispatch(navigateToPrevPage());
    window.scrollTo(0, 0);
  };

  const changePageHandler = (pageNumber) => {
    dispatch(changePage(pageNumber));
    window.scrollTo(0, 0);
  };
  return (
    <ul className={styles.pagesList}>
      <li>
        <KeyboardArrowLeftIcon className={styles.arrowBtn} onClick={prevPageClickHandler} />
      </li>
      {pagesArr.map((pageNumber) => (
        <li className={styles.page} key={pageNumber} onClick={() => changePageHandler(pageNumber)}>
          {pageNumber}
        </li>
      ))}
      <li>
        <KeyboardArrowRightIcon className={styles.arrowBtn} onClick={nextPageClickHandler} />
      </li>
    </ul>
  );
};

export default Pagination;
