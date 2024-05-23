import { Box, Typography } from "@mui/material";
import DrawerComponent from "../shared/drawer/drawer.component";
import {
  hudsonNYFontStyle,
  weblysleekBoltFontStyle,
  weblysleekFontStyle,
} from "../shared/recursiveStyles/RecursiveStyles";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../store/modules/cart/selectors/cart.selector";
import CartComponent from "./components/cart.component";

interface cartInterface {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

const Cart: React.FC<cartInterface> = ({ open, toggleDrawer }) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const products = useSelector(selectCartProducts);

  useEffect(() => {
    if (products.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [products]);

  return (
    <DrawerComponent open={open} anchor="right" toggleDrawer={toggleDrawer}>
      <Box
        sx={{ width: 350, textAlign: "center" }}
        role="presentation"
        id="cart-screen"
      >
        {isEmpty && (
          <>
            <Typography style={style.emptyCart.title}>TU CARRITO</Typography>
            <Typography style={style.emptyCart.subTitle}>
              tu carrito está vacio
            </Typography>
            <img src="/images/empty_phone.png" alt="" width={100} />
            <Typography style={style.emptyCart.text}>
              Todo lo que necesitas en un solo lugar
            </Typography>
          </>
        )}
        {!isEmpty && (
         <CartComponent/>
        )}
      </Box>

    </DrawerComponent>
  );
};
export default Cart;

const style: React.CSSProperties | any = {
  emptyCart: {
    title: {
      ...hudsonNYFontStyle,
      padding: "25px 0",
      background: "#404040",
      color: "#FFFFFF",
      fontSize: "20px",
    },
    subTitle: {
      ...hudsonNYFontStyle,
      padding: "20px 0",
    },
    text: {
      ...weblysleekFontStyle,
      padding: "20px 0",
      fontSize: "12px",
    },
  }
};

