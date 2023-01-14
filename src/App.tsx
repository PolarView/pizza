import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PizzaItem from "./pages/pizzaItem/PizzaItem";
import NotFound from "./pages/error/NotFound";
import EmptyCart from "./pages/emptyCart/EmptyCart";
import Layout from "./components/layout/Layout";

import { useSelector } from "react-redux";

function App() {
  const { totalPizzasAmount } = useSelector((store) => store.cart);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={totalPizzasAmount > 0 ? <Cart /> : <EmptyCart />} />
          <Route path="pizza/:id" element={<PizzaItem />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
