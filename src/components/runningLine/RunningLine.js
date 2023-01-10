import styles from "./runningLine.module.scss";
import PizzaLogo from "../../assets/static/pizza-logo.svg";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const RunningLine = () => {
  return (
    <Link to="/pizza/0">
      <div className={styles.runningLineContainer}>
        <Marquee direction="right" speed={30} pauseOnClick={true} gradient={false}>
          <div className={styles.promotionText}>специальная акция</div>
          <div className={styles.logoWrapper}>
            <img src={PizzaLogo} alt="специальная акция" width={38} />
          </div>
          <div className={styles.promotionText}>скидка до 70% на пиццу</div>
        </Marquee>
      </div>
    </Link>
  );
};

export default RunningLine;
