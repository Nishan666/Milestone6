import React, { useContext, useMemo, useCallback } from "react";
import { CartContext } from "../contexts/cartContext.jsx";
import Product from "./Product.jsx";

const Products = () => {
  const { productData, setCartData, cartData ,setOpenCart } = useContext(CartContext);
  const { data, error } = productData || {};


  const productsWithOffer = useMemo(() => {
    return data && data.map((product) => {
      const offerSet = [10, 25, 50, 70, 85];
      const ratingSet = [1, 2, 3, 4, 5];
      const offerPercentage =
        offerSet[Math.floor(Math.random() * offerSet.length)];
      const randomRating =
        ratingSet[Math.floor(Math.random() * ratingSet.length)];
      const originalPrice = Math.floor(
        (product.price * 100) / (100 - offerPercentage)
      );
      return { ...product, offerPercentage, randomRating, originalPrice };
    });
  }, [data]);

  const handleAddToCart = (data) => {
    const withQuantity = { ...data, quantity: 1 };
    setCartData((prev) => [...prev, withQuantity]);
    localStorage.setItem("CART", JSON.stringify([...cartData , withQuantity]) );
  };

  if (!productData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex flex-wrap justify-center">
      {productsWithOffer.map((res, index) => {
        const isIdPresent = cartData.some(item => item.id === res.id);
          return (
            <Product
              key={index}
              data={res}
              handleAddToCart={handleAddToCart}
              setOpenCart={setOpenCart}
              presentInCart={isIdPresent ? true : false}
            />
          );
      })}
    </div>
  );
};

export default Products;
