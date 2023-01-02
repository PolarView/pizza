import React from "react";
import styles from "./slider.module.scss";
import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Slider = ({ title, imagesUrl }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const showNextImg = () => {
    if (currentImgIndex === imagesUrl.length - 1) {
      setCurrentImgIndex(0);
    } else {
      setCurrentImgIndex((prev) => prev + 1);
    }
  };

  const showPrevImg = () => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(imagesUrl.length - 1);
    } else {
      setCurrentImgIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.previousPizzaImg} onClick={showPrevImg}>
        <ArrowBackIosNewIcon className={styles.prevArrowIcon} />
      </div>
      <img src={imagesUrl[currentImgIndex].url} className={styles.pizzaImg} alt={`пицца${title}`} />
      <div className={styles.nextPizzaImg} onClick={showNextImg}>
        <NavigateNextIcon className={styles.nextArrowIcon} />
      </div>
      <div className={styles.dotsList}>
        {imagesUrl.map((_, pizzaIndex) => {
          return (
            <div
              className={styles.dot}
              onClick={() => {
                setCurrentImgIndex(pizzaIndex);
              }}>
              &#183;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
