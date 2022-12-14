import React from 'react';
import styles from './home.module.scss';
import { useState, useEffect, useContext } from 'react';
import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/pizzaBlock';
import Skeleton from '../../components/pizzaBlock/Skeleton';
import { searchContext } from '../../context/SearchContext';

const Home = () => {
  const [pizzasData, setPizzasData] = useState([]);
  const [isPizzaLoading, setIsPizzaLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeSortFilter, setActiveSortFilter] = useState('asc');
  const [chosenSortOption, setChosenSortOption] = useState({
    title: 'популярности',
    sortProperty: 'rating',
  });

  const { searchValue } = useContext(searchContext);

  // search functionality
  // works with static data, however the better option would be a backend request

  const pizzasArray = searchValue
    ? pizzasData
        .filter((pizzaObj) => pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((pizza) => {
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
        })
    : pizzasData.map((pizza) => {
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
    const order = `order=${activeSortFilter}`;
    const pizzasUrl = `https://63640a2d7b209ece0f3f12de.mockapi.io/pizzaItems?${categoryId}${sort}${order}`;
    fetch(pizzasUrl)
      .then((res) => res.json())
      .then((data) => {
        setPizzasData(data);
        setIsPizzaLoading(false);
      });
  }, [activeCategory, chosenSortOption, activeSortFilter]);

  return (
    <>
      <div className={styles.top}>
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        <Sort
          chosenSortOption={chosenSortOption}
          setChosenSortOption={setChosenSortOption}
          activeSortFilter={activeSortFilter}
          setActiveSortFilter={setActiveSortFilter}
        />
      </div>
      <h2 className={styles.title}>Все пиццы</h2>
      <div className={styles.items}>
        {isPizzaLoading === false
          ? pizzasArray
          : [...new Array(9)].map((_, index) => {
              return <Skeleton key={index} />;
            })}
      </div>
    </>
  );
};

export default Home;
