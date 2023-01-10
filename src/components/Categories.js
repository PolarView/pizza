import { useState, useEffect, useRef } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import {
  onClickActiveCategoryChange,
  toggleFilters,
  setShowFilters
} from "../redux/features/category/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/features/pagination/paginationSlice";

const Categories = () => {
  const categoriesDataArr = ["Все", "Мясные", "Вегетериансие", "Гриль", "Острые", "Закрытые"];

  const filtersMenuRef = useRef(null);
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

  const changeCategoryHandler = (index) => {
    dispatch(onClickActiveCategoryChange(index));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    function clickOutsideCategoryPopupHandler(event) {
      if (filtersMenuRef && !event.path.includes(filtersMenuRef.current)) {
        dispatch(setShowFilters(false));
      }
    }

    if (filtersMenuRef) {
      document.body.addEventListener("click", (e) => clickOutsideCategoryPopupHandler(e));
    }

    return window.removeEventListener("click", clickOutsideCategoryPopupHandler);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", responseHomePage);
    const initialWidth = window.innerWidth;
    if (initialWidth <= 1500) setFullScreenCategory(false);

    return () => window.removeEventListener("resize", responseHomePage);
  }, []);

  return (
    <>
      {fullScreenCategory ? (
        <div className="categories">
          <ul>
            {categoriesDataArr.map((category, index) => {
              return (
                <li
                  key={index}
                  onClick={() => changeCategoryHandler(index)}
                  className={activeCategory === index ? "active" : ""}>
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="filterContainer" ref={filtersMenuRef}>
          <div className="filters" onClick={() => dispatch(toggleFilters())}>
            <div>Фильтры</div>
            <TuneIcon className="filterIcon" />
          </div>
          {showFilters && (
            <div className="categories">
              <ul>
                {categoriesDataArr.map((category, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => changeCategoryHandler(index)}
                      className={activeCategory === index ? "active" : ""}>
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
