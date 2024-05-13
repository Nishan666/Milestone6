import React, { useContext, useMemo, useCallback } from "react";
import { CartContext } from "../contexts/cartContext.jsx";
import Product from "./Product.jsx";

const Products = () => {
  const { productData, setCartData } = useContext(CartContext);
  const { data, error } = productData || {};

  if (!productData) {
    return <div>Loading...</div>;
  }

  const productsWithOffer = useMemo(() => {
    return data.map((product) => {
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
    setCartData((prev) => [...prev, data]);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {productsWithOffer.map((res, index) => (
        <Product key={index} data={res} handleAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

export default Products;
