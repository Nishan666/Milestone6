import React, { useContext, useMemo, useCallback, useEffect, useState } from "react";
import { CartContext } from "../contexts/cartContext.jsx";
import Product from "./Product.jsx";
import { getProducts } from "../api/getProducts.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";

const Products = () => {
  const { productData, setCartData, setProductData, cartData, setOpenCart } = useContext(CartContext);
  const { data, error } = productData || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page) => {
    const payload = await getProducts(page);
    if (payload.data.length === 0 || page > 2) {
      setHasMore(false);
    }
    setProductData((prevData) => ({
      ...prevData,
      data: [...(prevData?.data || []), ...payload.data],
    }));
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const productsWithOffer = useMemo(() => {
    return (
      data &&
      data.map((product) => {
        const offerSet = [10, 25, 50, 70, 85];
        const ratingSet = [1, 2, 3, 4, 5];
        const offerPercentage = offerSet[Math.floor(Math.random() * offerSet.length)];
        const randomRating = ratingSet[Math.floor(Math.random() * ratingSet.length)];
        const originalPrice = Math.floor((product.price * 100) / (100 - offerPercentage));
        return { ...product, offerPercentage, randomRating, originalPrice };
      })
    );
  }, [data]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleAddToCart = (data) => {
    const withQuantity = { ...data, quantity: 1 };
    setCartData((prev) => [...prev, withQuantity]);
    localStorage.setItem("CART", JSON.stringify([...cartData, withQuantity]));
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <InfiniteScroll
      className="flex flex-wrap justify-center"
      dataLength={data?.length || 0}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {productsWithOffer?.map((res) => (
        <Product
          key={uuidv4()}
          data={res}
          handleAddToCart={handleAddToCart}
          setOpenCart={setOpenCart}
          presentInCart={cartData.some((item) => item.id === res.id)}
        />
      ))}
    </InfiniteScroll>
  );
};

export default Products;
