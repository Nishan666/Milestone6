import React from "react";

const CartItems = ({ data , handleQuantity  }) => {
  const {
    id,
    title,
    price,
    description,
    image,
    category,
    offerPercentage,
    originalPrice,
    randomRating,
    quantity,
  } = data;


  const truncateTitleWords = (title, numWords) => {
    const words = title.split(" ");
    const truncatedWords =
      words.length > numWords
        ? words.slice(0, numWords).join(" ") + " ..."
        : title;
    return truncatedWords;
  };

  if (!data || data.length === 0) {
    return <h1>Cart Is Empty</h1>;
  }



  return (
    <tr>
      <td className="py-4">
        <div className="flex items-center">
          <img className="h-16 w-16 mr-4" src={image} alt="" />
          <span className="font-semibold w-1/2">
            {truncateTitleWords(title, 10)}
          </span>
        </div>
      </td>
      <td className="py-4">$ {price}</td>
      <td className="py-4">
        <div className="flex items-center">
          <button
            className="border rounded-md py-2 px-4 mr-2"
            onClick={() => handleQuantity("dec",id)}
          >
            -
          </button>
          <span className="text-center w-8">{quantity}</span>
          <button
            className="border rounded-md py-2 px-4 ml-2"
            onClick={() => handleQuantity("inc",id)}
          >
            +
          </button>
        </div>
      </td>
      <td className="py-4 font-bold">$ {price * quantity }</td>
    </tr>
  );
};

export default CartItems;

{
  /* <img
            className="h-16 w-16 mr-4"
            src={images[0].startsWith('["') && images[0].endsWith('"]')
            ? images[0].substring(2, images[0].length - 2)
            : images[0].startsWith('["')
            ? images[0].substring(2)
            : images[0]}
            alt="Product image"
          /> */
}
