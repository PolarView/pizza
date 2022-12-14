import { useState, useEffect, useRef } from 'react';
import TuneIcon from '@mui/icons-material/Tune';

const Categories = ({ activeCategory, setActiveCategory, showFilters, setShowFilters }) => {
  const filtersMenu = useRef(null);

  const [fullScreenCategory, setFullScreenCategory] = useState(true);

  const onClickActiveCategoryChange = (index) => {
    setActiveCategory(index);
    setShowFilters(false);
  };

  const toggleFilters = () => {
    setShowFilters((priv) => !priv);
  };

  const responseHomePage = () => {
    const width = window.innerWidth;
    if (width <= 1500) setFullScreenCategory(false);
    else {
      setFullScreenCategory(true);
      setShowFilters(false);
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
                  onClick={() => onClickActiveCategoryChange(index)}
                  className={activeCategory === index ? 'active' : ''}>
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="filterContainer">
          <div className="filters" onClick={toggleFilters}>
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
                      onClick={() => onClickActiveCategoryChange(index)}
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
