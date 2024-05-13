import { useContext } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import { CartContext } from "./contexts/cartContext";
import Cart from "./components/Cart";

function App() {
  const { openCart } = useContext(CartContext);

  return (
    <>
      <Header />
      {openCart ? <Cart /> : <Products />} 
    </>
  );
}

export default App;
