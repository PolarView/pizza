import React from "react";
import styles from "./pizzaItem.module.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowWarning from "../../components/showWarning/ShowWarning";
import ErrorModal from "../../components/errorModal/ErrorModal";
import Slider from "../../components/slider/Slider";
import DonaldTrampIcon from "../../assets/static/donaldTramp.jpg";
import { addToCart, setAddToCartValidation } from "../../redux/features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
const PizzaItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { addToCartValidation } = useSelector((store) => store.cart);
  const [pizza, setPizza] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pizzaTypes = ["тонкое", "традиционное"];
  const [activeSize, setActiveSize] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const handleActiveSize = (index) => {
    setActiveSize(index);
  };

  const handleActiveType = (index) => {
    setActiveType(index);
  };

  const addToCartHandler = ({ title, price, imagesUrl, id }) => {
    if (activeSize !== null && activeType !== null) {
      const pizza = {
        title,
        price,
        activeSize,
        activeType,
        imagesUrl: imagesUrl[0].url,
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
  useEffect(() => {
    setIsLoading(true);
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://63640a2d7b209ece0f3f12de.mockapi.io/pizzaItems/${id}`
        );
        setPizza(data);
        setIsLoading(false);
      } catch (err) {
        setPizza("error");
        setIsLoading(false);
      }
    };
    fetchPizza();
  }, []);
  return isLoading ? (
    <div className={styles.loaderContainer}>
      <CircularProgress color="secondary" />
    </div>
  ) : pizza === "error" ? (
    <ErrorModal />
  ) : (
    <div>
      <div className={styles.pizzaInfoContainer}>
        <Slider title={pizza.title} imagesUrl={pizza.imagesUrl} />
        <div className={styles.pizzaTextDescContainer}>
          <div className={styles.pizzaDesc}>
            <div className={styles.caption}>{pizza.title}</div>
            <div className={styles.desc}>{pizza.description}</div>
          </div>
          <div className={styles.consistContainer}>
            <div className={styles.consistCaption}>Состав:</div>
            <div className={styles.consist}>{pizza.consist}</div>
          </div>
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.avaImgWrapper}>
          <img alt="avatar" src={DonaldTrampIcon} />
        </div>
        <div className={styles.bannerQuote}>Любимая пицца Дональда Трампа !</div>
      </div>
      <div className={styles.addToCartSection}>
        <ul className={styles.pizzaTypeWrapper}>
          {pizza.types.map((value) => {
            return (
              <li
                key={value}
                className={activeType === value ? styles.active : ""}
                onClick={() => {
                  handleActiveType(value);
                }}>
                {pizzaTypes[value]}
              </li>
            );
          })}
        </ul>
        <ul className={styles.pizzaSizeWrapper}>
          {pizza.sizes.map((size, index) => {
            return (
              <li
                key={index}
                className={activeSize === index ? styles.active : ""}
                onClick={() => handleActiveSize(index)}>
                {size} см
              </li>
            );
          })}
        </ul>

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{` от ${pizza.price} р`}</div>
          <div
            className="button button--outline button--add"
            onClick={() => addToCartHandler(pizza)}>
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
          </div>
        </div>
        {addToCartValidation.passed || <ShowWarning />}
      </div>
    </div>
  );
};

export default PizzaItem;
