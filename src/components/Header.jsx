import React, { useContext } from "react";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from "../contexts/cartContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

const Header = () => {
    const { cartData , setOpenCart , openCart } = useContext(CartContext);

    const handleOpen = ()=>{
        setOpenCart(true)
    }
    
  return (
    <div  className="text-right px-5 pt-3 pb-1 sticky top-0 z-10 bg-white">
      <IconButton onClick={()=>handleOpen()} aria-label="cart">
        <StyledBadge badgeContent={cartData.length} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton> 
      
    </div>
  );
};

export default Header;
