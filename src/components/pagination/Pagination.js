import React from 'react';
import styles from './pagination.module.scss';

const Pagination = ({ itemsPerPage, totalItemsAmount, changePage }) => {
  const pagestotalAmount = Math.ceil(totalItemsAmount / itemsPerPage);
  const pagesArr = [];
  for (let i = 1; i <= pagestotalAmount; i++) {
    pagesArr.push(i);
  }
  console.log(pagesArr);
  return (
    <ul className={styles.pagesList}>
      {pagesArr.map((pageNumber) => (
        <li className={styles.page} key={pageNumber} onClick={() => changePage(pageNumber)}>
          {pageNumber}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
