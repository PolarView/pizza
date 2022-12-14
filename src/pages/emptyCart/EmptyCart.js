import React from 'react';
import EmptyCartImg from '../../assets/static/empty-cart.png';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={EmptyCartImg} alt="Empty cart" />
      {/* replace href to useNavigate */}
      <button onClick={() => navigate('/')} className="button button--black">
        <span>Вернуться назад</span>
      </button>
    </div>
  );
};

export default EmptyCart;
