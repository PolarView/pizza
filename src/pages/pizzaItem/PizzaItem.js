import React from "react";
import styles from "./pizzaItem.module.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowWarning from "../../components/showWarning/ShowWarning";
import ErrorModal from "../../components/errorModal/ErrorModal";
import DonaldTrampIcon from "../../assets/static/donaldTramp.jpg";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
const PizzaItem = () => {
  const { id } = useParams();
  console.log(id);
  const [pizza, setPizza] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        <div className={styles.pizzaSlider}>
          <img src={pizza.imageUrl} alt="pizza" />
        </div>
        <div className={styles.pizzaTextdesc}>
          <div className={styles.caption}>{pizza.title}</div>
          <div className={styles.desc}>{pizza.description}</div>
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.avaImgWrapper}>
          <img alt="avatar" src={DonaldTrampIcon} />
        </div>
        <div className={styles.bannerQuote}>Любимая пицца Дональда Трампа !</div>
      </div>
      <div className={styles.addToCartSection}></div>
    </div>
  );
};

export default PizzaItem;
