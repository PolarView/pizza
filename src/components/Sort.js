import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChosenSortOption, setActiveSortFilter } from '../redux/features/sort/sortSlice';

const Sort = () => {
  const { chosenSortOption, activeSortFilter } = useSelector((store) => store.sort);
  const dispatch = useDispatch();
  const [showSortOptions, setShowSortOptions] = useState(false);
  const sortRef = useRef(null);
  const sortOptions = [
    { title: 'популярности', sortProperty: 'rating' },
    { title: 'цене', sortProperty: 'price' },
    { title: 'алфавиту', sortProperty: 'title' }
  ];
  const toggleShowSortOptions = () => {
    setShowSortOptions((priv) => {
      return !priv;
    });
  };
  const chooseCurrentSortOption = (sortObj) => {
    dispatch(setChosenSortOption(sortObj));
    setShowSortOptions(false);
  };

  useEffect(() => {
    document.body.addEventListener('click', (event) => clickOutsideSortPopupHandler(event));
    const clickOutsideSortPopupHandler = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setShowSortOptions(false);
      }
    };

    return () => {
      document.body.removeEventListener('click', clickOutsideSortPopupHandler);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleShowSortOptions}>{chosenSortOption.title}</span>
      </div>
      {showSortOptions && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((obj) => {
              return (
                <li
                  key={obj.title}
                  className={chosenSortOption.sortProperty === obj.sortProperty ? 'active' : ''}
                  onClick={() => chooseCurrentSortOption(obj)}>
                  {obj.title}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="sort__filters">
        <span
          className={`sort__filters--name ${
            activeSortFilter === 'desc' ? 'sort__filters--name--active' : ''
          }`}
          onClick={() => dispatch(setActiveSortFilter('desc'))}>
          По Убыванию
        </span>
        |
        <span
          className={`sort__filters--name ${
            activeSortFilter === 'asc' ? 'sort__filters--name--active' : ''
          }`}
          onClick={() => dispatch(setActiveSortFilter('asc'))}>
          По возрастанию
        </span>
      </div>
    </div>
  );
};

export default Sort;
