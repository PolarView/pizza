import React from 'react';
import styles from './pagination.module.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Pagination = ({ itemsPerPage, totalItemsAmount, changePage, currentPage }) => {
  const pagesTotalAmount = Math.ceil(totalItemsAmount / itemsPerPage);
  const pagesArr = [];
  for (let i = 1; i <= pagesTotalAmount; i++) {
    pagesArr.push(i);
  }

  const nextPageClickHandler = () => {
    if (currentPage === pagesTotalAmount) changePage(1);
    else changePage((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevPageClickHandler = () => {
    if (currentPage === 1) changePage(pagesTotalAmount);
    else changePage((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const changePageHandler = (pageNumber) => {
    changePage(pageNumber);
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
