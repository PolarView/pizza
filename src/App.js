import { useState, useEffect } from 'react';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import NotFound from './pages/error/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
