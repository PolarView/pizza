import React from 'react';
import styles from './home.module.scss';
import { useEffect } from 'react';
import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/pizzaBlock';
import Skeleton from '../../components/pizzaBlock/Skeleton';
import Pagination from '../../components/pagination/Pagination';
import ShowWarning from '../../components/showWarning/ShowWarning';
import ErrorModal from '../../components/errorModal/ErrorModal';
import { fetchPizzas } from '../../redux/features/bussnesLogic/pizzasSlice';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

const Home = () => {
  const { currentPage } = useSelector((store) => store.pagination);
  const searchValue = useSelector((store) => store.search);
  const { activeCategory } = useSelector((store) => store.category);
  const { activeSortFilter, chosenSortOption } = useSelector((store) => store.sort);
  const { addToCartValidation } = useSelector((store) => store.cart);
  const { pizzasData, status } = useSelector((store) => store.pizzas);
  const dispatch = useDispatch();

  const pizzasArray = pizzasData.map((pizza) => {
    return (
      <div className={styles.pizzaBlockWrapper}>
        <PizzaBlock
          key={pizza.id}
          title={pizza.title}
          price={pizza.price}
          imageUrl={pizza.imageUrl}
          types={pizza.types}
          sizes={pizza.sizes}
          id={uuid()}
        />
      </div>
    );
  });

  useEffect(() => {
    const getPizzas = () => {
      const categoryId = activeCategory > 0 ? `category=${activeCategory}&` : '';
      const sort = `sortBy=${chosenSortOption.sortProperty}&`;
      const order = `order=${activeSortFilter}&`;
      const search = searchValue.trim() ? `title=${searchValue}` : '';

      dispatch(fetchPizzas({ currentPage, sort, order, search, categoryId }));
    };
    getPizzas();
  }, [activeCategory, chosenSortOption, activeSortFilter, searchValue, currentPage]);

  return (
    <>
      {status === 'error' ? (
        <ErrorModal />
      ) : (
        <div>
          <div className={styles.top}>
            <Categories />
            <Sort />
          </div>
          <h2 className={styles.title}>Все пиццы</h2>
          <div className={styles.items}>
            {status === 'loading'
              ? [...new Array(9)].map((_, index) => {
                  return <Skeleton key={index} />;
                })
              : pizzasArray}
          </div>
          {addToCartValidation.passed || <ShowWarning />}
          <Pagination />
        </div>
      )}
    </>
  );
};

export default Home;
