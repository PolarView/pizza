import React from "react";
import styles from "./pizzaItem.module.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sort from "../../components/Sort";
import Categories from "../../components/Categories";
import ShowWarning from "../../components/showWarning/ShowWarning";
const PizzaItem = () => {
  return (
    <div>
      <div className={styles.pizzaInfoContainer}>
        <div className={styles.pizzaSlider}></div>
        <div className={styles.pizzaDesc}></div>
      </div>
      <div className={styles.banner}></div>
      <div className={styles.addToCartSection}></div>
    </div>
  );
};

export default PizzaItem;
