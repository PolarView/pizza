import React from "react";
import styles from "./notFound.module.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h4>Нет страницы с таким адресом</h4>
      <icon>😕</icon>

      <div className={styles.mainText}>
        <h4 className={styles.references}>
          Вы всегда можете заказать пиццу или узнать любую интересующую вас информацию по нашему
          номеру:
          <h3 className={styles.number}>+ 7 866 654 67 54</h3>
          <Link to="/">
            <button className={styles.goHomeBtn}>Вернуться на главную</button>
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default NotFound;
