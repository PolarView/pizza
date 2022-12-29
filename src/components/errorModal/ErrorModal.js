import React from 'react';
import styles from './errorModal.module.scss';
const ErrorModal = () => {
  return (
    <div className={styles.modal}>
      <h2 className={styles.caption}>
        К сожалению не удалось загрузить пиццы ... <icon>😕</icon>
      </h2>
      <p className={styles.mainText}>
        Возвращайтесь через несколько минут, и всё будет работать !
        <br />
        Вы также всегда можете заказать пиццу просто позвонив нам по нашему номеру:
        <br />
        <div className={styles.reference}>+7 975 378 54 34</div>
      </p>
    </div>
  );
};

export default ErrorModal;
