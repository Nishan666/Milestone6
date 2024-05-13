import React, { createContext, useEffect, useState } from "react";
import { getProducts } from "../api/getProducts";

const CartContext = createContext({ productData: null, cartData: [], openCart: false});

const CartProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);
  const [cartData , setCartData] = useState([])
  const [openCart , setOpenCart] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setProductData(await getProducts());
    };
    fetchData();
  }, []);

  console.log(productData);

  return (
    <CartContext.Provider value={{ productData , cartData , setCartData , openCart , setOpenCart}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
