import React from "react";

const CartItems = ({ data }) => {
  console.log(data);
  const {
    id,
    title,
    price,
    description,
    images,
    category,
    offerPercentage,
    originalPrice,
    randomRating,
  } = data;

  if (!data || data.length === 0) {
    return <h1>Cart Is Empty</h1>;
  }


  return (
    <tr>
      <td className="py-4">
        <div className="flex items-center">
          {/* <img
            className="h-16 w-16 mr-4"
            src={images[0].startsWith('["') && images[0].endsWith('"]')
            ? images[0].substring(2, images[0].length - 2)
            : images[0].startsWith('["')
            ? images[0].substring(2)
            : images[0]}
            alt="Product image"
          /> */}
          <span className="font-semibold">{title}</span>
        </div>
      </td>
      <td className="py-4">{price}</td>
      <td className="py-4">
        <div className="flex items-center">
          <button className="border rounded-md py-2 px-4 mr-2">-</button>
          <span className="text-center w-8">1</span>
          <button className="border rounded-md py-2 px-4 ml-2">+</button>
        </div>
      </td>
      <td className="py-4">{price}</td>
    </tr>)
};

export default CartItems;
