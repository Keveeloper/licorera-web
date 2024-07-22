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
import { getCurrentOrderThunk } from "../../store/modules/cart/actions/cart.actions";
import { useAppDispatch } from "../../store/store";
import LoginScreen from "../user/login.screen";

interface cartInterface {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  isCurrentOrder?: boolean;
}

const Cart: React.FC<cartInterface> = ({
  open,
  toggleDrawer,
  isCurrentOrder,
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);
  const [currentOrder, setCurrentOrder] = useState<any>({});
  const [openLogin, setOpenLogin] = useState(false);

  const productsSelector = useSelector(selectCartProducts);

  const dispatch = useAppDispatch();

  const getCurrentOrder = async () => {
    const currentOrders = await dispatch(getCurrentOrderThunk()).unwrap();
    if(currentOrders.response.data === null){
      setProducts([]);
      setIsEmpty(true)
      return;
    }
    if (currentOrders.success && currentOrders.response) {
      if(!currentOrders.response.success){
        setIsEmpty(true)
        setOpenLogin(true)
        return;
      }
      setIsEmpty(false)
      const responseProducts = currentOrders?.response?.data?.products;
      const mappedData = responseProducts?.map((item: any) => ({
        quantity: item.quantity,
        points: Number(item.points),
        price: Number(item.price),
        name: item.store.product.name,
        id: item.store.id,
        image: item.store.product.image,
        description: item.store.product.description,
        category_id: item.store.product.category_id,
        presentation: item.store.presentation,
      }));
      if(currentOrders?.response?.data){
        setCurrentOrder({
          total: currentOrders.response.data.total,
          amount: currentOrders.response.data.amount,
          delivery: currentOrders.response.data.delivery_value
        });
      }
      setProducts(mappedData);
      console.log(products);
    }else{
      
    }
  };

  const handleCloseLogin= (isOpen: boolean) => {
    setOpenLogin(isOpen);
  };

  useEffect(() => {
    if (isCurrentOrder) {
      getCurrentOrder();
    }
    if (productsSelector.length === 0) {
      setIsEmpty(true);
    } else {
      setProducts(productsSelector);
      setIsEmpty(false);
    }
  }, [productsSelector, isCurrentOrder, open]);

  return (
    <DrawerComponent open={open} anchor="right" toggleDrawer={toggleDrawer}>
      <Box
        sx={{ width: 350, textAlign: "center", height: '100%'}}
        role="presentation"
        id="cart-screen"
      >
        {isEmpty && (
          <>
            <Typography style={style.emptyCart.title}>
              {isCurrentOrder ? "PEDIDO EN CURSO" : "TU CARRITO"}
            </Typography>
            <Typography style={style.emptyCart.subTitle}>
              {isCurrentOrder
                ? "¿que esperas para hacer tu pedido?"
                : "tu carrito está vacio"}
            </Typography>
            <img src="/images/empty_phone.png" alt="" width={100} />
            <Typography style={style.emptyCart.text}>
              Todo lo que necesitas en un solo lugar
            </Typography>
          </>
        )}
        {!isEmpty && (
          <CartComponent products={products} toggleDrawer={toggleDrawer} isCurrentOrder={isCurrentOrder} currentOrder={currentOrder}/>
        )}
      </Box>
      <LoginScreen modalOpen={openLogin}  handleClose={()=>handleCloseLogin(false)}/>
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
  },
};
