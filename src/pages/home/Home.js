import React from 'react';
import styles from './home.module.scss';
import { useState, useEffect } from 'react';
import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/pizzaBlock';
import Skeleton from '../../components/pizzaBlock/Skeleton';
import Pagination from '../../components/pagination/Pagination';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { async } from 'q';

const Home = () => {
  const [pizzasData, setPizzasData] = useState([]);
  const [isPizzaLoading, setIsPizzaLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const searchValue = useSelector((store) => store.search);
  const { activeCategory } = useSelector((store) => store.category);
  const { activeSortFilter, chosenSortOption } = useSelector((store) => store.sort);

  // search functionality
  // works with static data, however the better option would be a backend request

  const pizzasArray =
    // searchValue
    //   ? pizzasData
    //       .filter((pizzaObj) => pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()))
    //       .map((pizza) => {
    //         return (
    //           <div className={styles.pizzaBlockWrapper}>
    //             <PizzaBlock
    //               key={pizza.id}
    //               title={pizza.title}
    //               price={pizza.price}
    //               imageUrl={pizza.imageUrl}
    //               types={pizza.types}
    //               sizes={pizza.sizes}
    //             />
    //           </div>
    //         );
    //       })
    // :
    pizzasData.map((pizza) => {
      return (
        <div className={styles.pizzaBlockWrapper}>
          <PizzaBlock
            key={pizza.id}
            title={pizza.title}
            price={pizza.price}
            imageUrl={pizza.imageUrl}
            types={pizza.types}
            sizes={pizza.sizes}
          />
        </div>
      );
    });

  useEffect(() => {
    setIsPizzaLoading(true);
    const categoryId = activeCategory > 0 ? `category=${activeCategory}&` : '';
    const sort = `sortBy=${chosenSortOption.sortProperty}&`;
    const order = `order=${activeSortFilter}&`;
    const search = searchValue.trim() ? `title=${searchValue}` : '';
    const pizzasUrl = `https://63640a2d7b209ece0f3f12de.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${categoryId}${sort}${order}${search}`;

    axios.get(pizzasUrl).then((res) => {
      setPizzasData(res.data);
      console.log(res);
      setIsPizzaLoading(false);
    });
    // fetch(pizzasUrl)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPizzasData(data);
    //     setIsPizzaLoading(false);
    //   });
  }, [activeCategory, chosenSortOption, activeSortFilter, searchValue, currentPage]);

  return (
    <>
      <div className={styles.top}>
        <Categories />
        <Sort />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div className={styles.items}>
        {isPizzaLoading === false
          ? pizzasArray
          : [...new Array(9)].map((_, index) => {
              return <Skeleton key={index} />;
            })}
      </div>
      <Pagination
        itemsPerPage={4}
        totalItemsAmount={10}
        changePage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Home;
