import { useState, useEffect, useRef } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import {
  onClickActiveCategoryChange,
  toggleFilters,
  setShowFilters
} from '../redux/features/category/categorySlice';
import { useSelector, useDispatch } from 'react-redux';

const Categories = () => {
  const filtersMenu = useRef(null);
  const { activeCategory, showFilters } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const [fullScreenCategory, setFullScreenCategory] = useState(true);

  const responseHomePage = () => {
    const width = window.innerWidth;
    if (width <= 1500) setFullScreenCategory(false);
    else {
      setFullScreenCategory(true);
      dispatch(setShowFilters(false));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', responseHomePage);
    const initialWidth = window.innerWidth;
    if (initialWidth <= 1500) setFullScreenCategory(false);

    return () => window.removeEventListener('resize', responseHomePage);
  }, []);

  const categoriesDataArr = ['Все', 'Мясные', 'Вегетериансие', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <>
      {fullScreenCategory ? (
        <div className="categories">
          <ul>
            {categoriesDataArr.map((category, index) => {
              return (
                <li
                  key={index}
                  onClick={() => dispatch(onClickActiveCategoryChange(index))}
                  className={activeCategory === index ? 'active' : ''}>
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="filterContainer">
          <div className="filters" onClick={() => dispatch(toggleFilters())}>
            <div>Фильтры</div>
            <TuneIcon className="filterIcon" />
          </div>
          {showFilters && (
            <div
              ref={filtersMenu}
              className="categories"
              // style={{
              //   height: showFilters ? filtersMenu.current.clientHeight : 0,
              //   color: showFilters ? 'red' : 'green',
              // }}
            >
              <ul>
                {categoriesDataArr.map((category, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => dispatch(onClickActiveCategoryChange(index))}
                      className={activeCategory === index ? 'active' : ''}>
                      {category}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Categories;
