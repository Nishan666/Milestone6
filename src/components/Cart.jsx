import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/cartContext";
import CartItems from "./CartItems";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Cart = () => {
  const { cartData, setOpenCart, setCartData } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [total, setTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);

  useEffect(() => {
    calculateSummary();
  }, [cartData]);

  if (!cartData) {
    return <div>Cart is empty</div>;
  }

  const handleQuantity = (todo, id) => {
    const updatedCartData = cartData
      .map((product) => {
        if (product.id === id) {
          if (todo === "inc") {
            return { ...product, quantity: product.quantity + 1 };
          } else if (todo === "dec") {
            if (product.quantity === 1) {
              return null;
            } else {
              return { ...product, quantity: product.quantity - 1 };
            }
          }
        }
        return product;
      })
      .filter((product) => product !== null);
    localStorage.setItem("CART", JSON.stringify(updatedCartData));
    setCartData(updatedCartData);
  };

  const calculateSummary = () => {
    let partTotal = 0;
    cartData.forEach((item) => (partTotal += item.price * item.quantity));
    setSubTotal(partTotal);

    let newShippingCharge = partTotal <= 300 ? (partTotal === 0 ? 0 : 20) : 0;
    setShippingCharge(parseFloat(newShippingCharge.toFixed(2)));

    let newTaxes = (18 * partTotal) / 100;
    setTaxes(parseFloat(newTaxes.toFixed(2)));

    let newTotal = partTotal + newTaxes + newShippingCharge;
    setTotal(parseFloat(newTotal.toFixed(2)));
  };

  return (
    <div className="bg-gray-100  py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <h1
            className="text-xl font-semibold mb-4 py-1 pr-1 pl-3 rounded-lg bg-slate-200 text-slate-700 cursor-pointer"
            onClick={() => setOpenCart(false)}
          >
            Back
            <KeyboardArrowRightIcon />
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold w-1/2">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <CartItems
                      key={index}
                      data={item}
                      handleQuantity={handleQuantity}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subTotal}.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>${taxes}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shippingCharge}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total}</span>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
