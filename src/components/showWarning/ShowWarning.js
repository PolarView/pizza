import styles from './showWarning.module.scss';
import { useSelector } from 'react-redux';

const ShowWarning = () => {
  const { addToCartValidation } = useSelector((store) => store.cart);

  return (
    <div className={styles.warningModalContainer}>
      <span className={styles.modalWarning}>
        Пожалуйста, выберете {addToCartValidation.modalWarningMessage} пиццы
      </span>
    </div>
  );
};

export default ShowWarning;
