import React, { useContext, useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../contexts/cartContext";
import logo from "../../public/lamy-logo-png-transparent.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const { cartData, setOpenCart } = useContext(CartContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let newCount = 0;
    cartData && cartData.map((item) => (newCount += item.quantity));
    setCount(newCount);
  }, [cartData]);

  return (
    <div className="text-right px-5 pt-1 sticky top-0 z-10 bg-white flex justify-between">
      <img src={logo} className="h-20 px-4 w-auto" alt="LOGO" />
      <div className="flex justify-center items-center px-4">
        <IconButton onClick={() => setOpenCart(true)} aria-label="cart">
          <StyledBadge badgeContent={count} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
