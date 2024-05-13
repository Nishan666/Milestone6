import React, { createContext, useEffect, useState } from "react";
import { getProducts } from "../api/getProducts";

const CartContext = createContext({ productData: null, cartData: [], openCart: false});

const CartProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);
  let cart = JSON.parse(localStorage.getItem("CART")) || []
  const [cartData , setCartData] = useState(cart)
  const [openCart , setOpenCart] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setProductData(await getProducts());
    };
    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ productData , cartData , setCartData , openCart , setOpenCart}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
