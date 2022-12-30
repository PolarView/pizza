import { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, setAddToCartValidation } from "../../redux/features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
const PizzaBlock = ({ title, imageUrl, price, types, sizes, id }) => {
  const pizzaTypes = ["тонкое", "традиционное"];
  const [activeSize, setActiveSize] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const dispatch = useDispatch();
  const handleActiveSize = (index) => {
    setActiveSize(index);
  };

  const handleActiveType = (index) => {
    setActiveType(index);
  };

  const addToCartHandler = () => {
    if (activeSize !== null && activeType !== null) {
      const pizza = {
        title,
        price,
        activeSize,
        activeType,
        imageUrl,
        id
      };
      dispatch(addToCart(pizza));
    } else {
      showWarningMessage();
    }
  };

  const showWarningMessage = () => {
    let modalWarningMessage;
    if (activeSize === null && activeType === null) modalWarningMessage = "тесто и размер";
    else if (activeSize === null) modalWarningMessage = "размер";
    else if (activeType === null) modalWarningMessage = "тесто";
    dispatch(setAddToCartValidation({ passed: false, modalWarningMessage }));
    setTimeout(
      () => dispatch(setAddToCartValidation({ passed: true, modalWarningMessage: null })),
      1500
    );
  };

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((value) => {
            return (
              <li
                key={value}
                className={activeType === value ? "active" : ""}
                onClick={() => {
                  handleActiveType(value);
                }}>
                {pizzaTypes[value]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                className={activeSize === index ? "active" : ""}
                onClick={() => handleActiveSize(index)}>
                {size} см
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{` от ${price} р`}</div>
        <div className="button button--outline button--add" onClick={addToCartHandler}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>1</i>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
