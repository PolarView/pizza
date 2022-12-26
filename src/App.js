import { useState, useEffect } from 'react';

import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import NotFound from './pages/error/NotFound';
import EmptyCart from './pages/emptyCart/EmptyCart';
import { useSelector } from 'react-redux';

function App() {
  const { totalPizzasAmount } = useSelector((store) => store.cart);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={totalPizzasAmount > 0 ? <Cart /> : <EmptyCart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
