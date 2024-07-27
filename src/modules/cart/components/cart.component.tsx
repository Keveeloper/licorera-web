import { Box, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardComponent from "../../shared/card/card.component";
import { CurrencyFormat, JotaFormat } from "../../../utils/helpers";
import { useEffect, useState } from "react";
import { selectAllUser } from "../../../store/modules/users";
import { Product } from "../../exchangeProducts/types";
import useCartHook from "../../shared/hooks/cartHook/useCartHook";
import {
  hudsonNYFontStyle,
  weblysleekBoltFontStyle,
  weblysleekFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import ButtonComponent from "../../shared/button/button.component";
import { selectAllInfo, selectToken } from "../../../store/modules/users/selectors/users.selector";
import CustomModal from "../../shared/modal/customModal";
import WarningAlertScreen from "../alert.screens/warningAlertScreen";
import DeleteAlertScreen from "../alert.screens/deleteAlertScreen";
import "./cart.component.css";
import { useNavigate } from "react-router-dom";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import useHelperHook from "../../shared/hooks/helper/useHelper";
import useAddressHook from "../../shared/hooks/addressHook/useAddressHook";
import { useAppDispatch } from "../../../store/store";
import { cancelCurrentOrderThunk, postOrderThunk } from "../../../store/modules/cart/actions/cart.actions";
import { requestOrder } from "../../../service/modules/orders/order";
import CancelAlertScreen from "../alert.screens/cancelAlertScreen";
import LoginScreen from "../../user/login.screen";
import { addressActions } from "../../../store/modules/address";
import { paymentMethodsActions } from "../../../store/modules/paymentMethods";
import { cartActions, selectAllCart } from "../../../store/modules/cart";

interface customProps {
  isCheckout?: boolean;
  isCurrentOrder?: boolean;
  onClick?: () => void;
  isFormValid?: boolean;
  products: any;
  currentOrder?:any;
  toggleDrawer?:any
}

const CartComponent: React.FC<customProps> = ({
  products,
  isCheckout,
  isCurrentOrder,
  onClick,
  isFormValid,
  currentOrder,
  toggleDrawer
}) => {
  const user = useSelector(selectAllUser);
  const Info = useSelector(selectAllInfo);
  const cartStore = useSelector(selectAllCart);
  const token = useSelector(selectToken);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { removeCartItem, updateCartItem, updateOrder, updateTotal } =
    useCartHook();
  const { calculateTotal } = useHelperHook();
  const { getAddress } = useAddressHook();

  const [total, setTotal] = useState<number>(0);
  const [delivery, setDelivery] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [product, setProduct] = useState<Product>();
  const [showWarningAlert, setShoWarningAlert] = useState<boolean>(false);
  const [showCancelCurrentOrder, setShowCancelCurrentOrder] = useState<boolean>(false);
  const [showSuccessCurrentOrder, setShowSuccessCurrentOrder] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [warningText, setWarningText] = useState<string>("No tienes suficientes puntos para este canje. Compra y acumula más puntos.")
  const [openLogin, setOpenLogin] = useState(false);

  const onMinus = (product: Product) => {
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      updateCartItem(updatedProduct);
    } else {
      handleDeleteOpen(product);
    }
  };

  const onPlus = (product: Product) => {
    if (product.points && product?.points > 0) {
      if (!validatePoints(points + product?.points)) {
        setShoWarningAlert(true);
        return;
      }
    }
    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    updateCartItem(updatedProduct);
  };

  const handleCloseLogin= (isOpen: boolean) => {
    setOpenLogin(isOpen);
  };

  const validatePoints = (points: number) => {
    if (user.points >= points) return true;
    else return false;
  };

  const removeProduct = (id: number) => {
    removeCartItem(id);
    setShowDeleteAlert(false);
  };

  const handleAlertOpen = () => {
    postOrder();
  };

  const postOrder = async () => {
    // if (products.length > 0) {
    //   const resultado = products.reduce((acumulador: any, producto: any) => {
    //     if (acumulador !== "") {
    //       acumulador += ",";
    //     }
    //     acumulador += `${producto.id}:${producto.quantity}`;
    //     return acumulador;
    //   }, "");
    //   const request: requestOrder = {
    //     products: resultado,
    //     amount: total,
    //     instructions: "test",
    //     source: "Web",
    //   };
    //   const Payment = await dispatch(
    //     postOrderThunk({ reqData: request })
    //   ).unwrap();
    //   if (Payment.success && Payment.response.success) {
    //     dispatch(cartActions.clearPhone());
    //     dispatch(addressActions.clearAddressSelected())
    //     dispatch(paymentMethodsActions.clearPaymentSelected())
    //     updateOrder(Payment.response.data.id);
    //     navigate("/checkout");
    //   }else if(Payment.success && !Payment.response.success){
    //     if(Payment.response.error_code === 401){
    //       setOpenLogin(true)
    //     }
    //   }else{
    //     setWarningText("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.")
    //     setShoWarningAlert(true)
    //   }
    // }
    if(!token){
        setOpenLogin(true)
        return;
    }
    dispatch(addressActions.clearAddressSelected())
    dispatch(paymentMethodsActions.clearPaymentSelected())
    navigate("/checkout");
  };

  const handleDeleteClose = () => {
    setShowDeleteAlert(false);
  };

  const handleWarningClose = () => {
    setShoWarningAlert(false);
  };

  const handleShowCancelCurrentClose = () => {
    setShowCancelCurrentOrder(false);
  };

  const handleShowSuccessCurrentClose = () => {
    setShowSuccessCurrentOrder(false);
    toggleDrawer(false);
    navigate("/home");
  };

  const handleDeleteOpen = (item: Product) => {
    setProduct(item);
    setShowDeleteAlert(true);
  };

  const getTotal = async () => {
    const newtotal = await calculateTotal(products);
    setSubTotal(newtotal[0]);
    setDelivery(newtotal[1]);

    if (newtotal[1]) {
      setTotal(newtotal[0] + newtotal[1]);
      updateTotal(newtotal[0] + newtotal[1]);
    } else {
      setTotal(newtotal[0]);
      updateTotal(newtotal[0]);
    }
    setPoints(Math.floor(newtotal[0] / Info?.data?.minimumAmountForPoints || 0));
   
  };

  const cancelCurrentOrder = async ()=>{
    const currentOrders = await dispatch(cancelCurrentOrderThunk()).unwrap();
    if(currentOrders.success && currentOrders.response.success){;
      setShowCancelCurrentOrder(false)
      setShowSuccessCurrentOrder(true)
    }
  }

  useEffect(() => {
    getTotal();
  }, [products, getAddress().detail]);

  return (
    <>
      <Typography
        style={isCheckout ? checkoutStyle.title : style.emptyCart.title}
      >
       {isCurrentOrder ? 'PEDIDO EN CURSO': 'TU CARRITO'} 
      </Typography>
      <div style={{ padding: "20px" }}>
        {products?.map((item: any) => {
          return (
            <CardComponent
              key={item.id}
              style={{
                borderRadius: "10px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              <Grid
                className="columnContainer"
                container
                spacing={0}
                style={{}}
              >
                <Grid 
                  item 
                  xs={3} 
                  style={{
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }} 
                >
                  <img
                    src={item.image}
                    alt=""
                    style={{width: '100%',
                      height: 'auto' }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding:'0 5%'
                  }}
                >
                  <Typography style={style.cards.title}>{item.name}</Typography>
                  <Typography style={style.cards.quantity}>
                    {item.presentation && <span>Presentación: </span>}
                    {item.presentation}
                  </Typography>
                  <Typography style={style.cards.currentOrderQuantity}>
                    {isCurrentOrder && <>Cantidad:  {item.quantity} </>}
                  </Typography>
                  
                </Grid>
                <Grid item xs={3} sx={{ mt: 0, mb: 0 }}>
                  {!isCurrentOrder &&
                  <img
                    style={style.cards.close}
                    src="/icons/vector_close.png"
                    onClick={() => !cartStore.order && handleDeleteOpen(item)}
                  />
                  }
                  <Typography
                    style={isCurrentOrder ?  style.cards.CurrentOrderPrice : style.cards.price}
                    sx={{ pb: 2 }}
                  >
                    {item.points
                      ? JotaFormat(item.points)
                      : CurrencyFormat(item.price)}
                  </Typography>
                  {!isCurrentOrder &&
                  <div className="contentIcons">
                    <FaMinusCircle
                      onClick={() => !cartStore.order && onMinus(item)}
                      style={{
                        color: "#fdbd00",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      className="normalText"
                      style={{ margin: "0px", fontSize: "18px" }}
                    >
                      {" "}
                      {item.quantity}{" "}
                    </span>
                    <FaPlusCircle
                      onClick={() => !cartStore.order && onPlus(item)}
                      style={{
                        color: "#fdbd00",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  }
                </Grid>
              </Grid>
            </CardComponent>
          );
        })}

        <Typography style={style.footer.title}>
          Obtienes por tu compra {points} J
        </Typography>
        <Divider />
        <Grid
          container
          spacing={0}
          style={{
            padding: "20px 0",
          }}
        >
          {isCheckout && (
            <>
              <Grid
                item
                xs={6}
                style={{
                  ...style.footer.textLeft,
                  color: "#4F4F4F",
                  fontSize: "14px",
                }}
              >
                SUBTOTAL:
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ mb: 1 }}
                style={{
                  ...style.footer.textRigth,
                  color: "#4F4F4F",
                  fontSize: "14px",
                }}
              >
                {CurrencyFormat(subTotal)}
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  ...style.footer.textLeft,
                  color: "#4F4F4F",
                  fontSize: "14px",
                }}
              >
                DOMICILIO:
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ mb: 1 }}
                style={{
                  ...style.footer.textRigth,
                  color: "#4F4F4F",
                  fontSize: "14px",
                }}
              >
                {delivery && delivery > 0 ? CurrencyFormat(delivery) : "--"}
              </Grid>
            </>
          )}
          {isCurrentOrder && (
            <>
              <Grid
                item
                xs={6}
                style={{
                  ...style.footer.textLeft,
                  color: "#4F4F4F",
                  fontSize: "14px",
                }}
              >
                SUBTOTAL:
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ mb: 1 }}
                style={{
                  ...style.footer.textRigth,
                  color: "#4F4F4F",
                  fontSize: "14px",
                }}
              >
                {CurrencyFormat(currentOrder?.amount)}
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  ...style.footer.textLeft,
                  color: "#4F4F4F",
                  fontSize: "14px",
                }}
              >
                DOMICILIO:
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ mb: 1 }}
                style={{
                  ...style.footer.textRigth,
                  color: "#4F4F4F",
                  fontSize: "14px",
                }}
              >
                {currentOrder?.delivery && currentOrder?.delivery > 0 ? CurrencyFormat(currentOrder?.delivery) : "--"}
              </Grid>
            </>
          )}
          <Grid item xs={6} style={style.footer.textLeft}>
            TOTAL:
          </Grid>
          <Grid item xs={6} style={style.footer.textRigth}>
            {CurrencyFormat(isCurrentOrder ? currentOrder?.total : total)}
          </Grid>
        </Grid>
        <Typography style={style.footer.text}>
          {isCurrentOrder ? 'Tu pedido está en camino. Tienes 5 minutos para cancelarlo'
          : `Domicilio gratis por compras mayores a${" "}
          ${CurrencyFormat(Info?.data?.minimumOrderAmount)} IVA incluido.`
         }
        </Typography>
        {isCheckout ? (
          <ButtonComponent
            disabled={!isFormValid}
            onClick={onClick}
            style={
              isFormValid ? style.footer.button : style.footer.disabledButton
            }
          >
            CONFIRMAR
          </ButtonComponent>
        ) : isCurrentOrder ? (
          <ButtonComponent
            disabled={false}
            onClick={() => setShowCancelCurrentOrder(true)}
            style={style.footer.button}
          >
            CANCELAR PEDIDO
          </ButtonComponent>
        ) : (
          <ButtonComponent
            disabled={false}
            onClick={() => handleAlertOpen()}
            style={style.footer.button}
          >
            IR A PAGAR
          </ButtonComponent>
        )}
      </div>

      {/* Modal Delete*/}
      {showDeleteAlert && (
          <CustomModal
            modalStyle="cartModal"
            modalContentStyle="cartModalContent"
            open={showDeleteAlert}
            onClose={handleDeleteClose}
          >
            <DeleteAlertScreen
              img={product?.image || ""}
              title={product?.name || ""}
              onClose={handleDeleteClose}
              onAccept={() => removeProduct(product?.id || 0)}
            />
          </CustomModal>
      )}
      {/* Modal Warning*/}
      <CustomModal
        modalStyle="cartModal"
        modalContentStyle="cartModalContent"
        open={showWarningAlert}
        onClose={handleWarningClose}
      >
        <WarningAlertScreen
          title="INFORMACIÓN"
          Text={warningText}
          onClose={handleWarningClose}
        />
      </CustomModal>
      
      {/* cancel current order*/}
      <CustomModal
        modalStyle="cartModal"
        modalContentStyle="cartModalContent"
        open={showCancelCurrentOrder}
        onClose={handleShowCancelCurrentClose}
      >
        <CancelAlertScreen
          title="INFORMACIÓN"
          text="¿Estás seguro que quieres cancelar el pedido?"
          onClose={handleShowCancelCurrentClose}
          onAccept={cancelCurrentOrder}
          img="icons/warning-hand.png"
        />
      </CustomModal>
       {/* success cancel current order*/}
       <CustomModal
        modalStyle="cartModal"
        modalContentStyle="cartModalContent"
        open={showSuccessCurrentOrder}
        onClose={handleShowSuccessCurrentClose}
      >
        <CancelAlertScreen
          title="INFORMACIÓN"
          text="Te pedido fue cancelado exitosamente. Puedes seguir comprando ahora."
          onClose={handleShowSuccessCurrentClose}
          onAccept={handleShowSuccessCurrentClose}
          img="icons/alert.png"
          isCheck
        />
      </CustomModal>
      <LoginScreen modalOpen={openLogin}  handleClose={()=>handleCloseLogin(false)}/>
    </>
  );
};

export default CartComponent;

const checkoutStyle = {
  title: {
    ...hudsonNYFontStyle,
    padding: "20px 0 10px 0",
    color: "#000000",
    fontSize: "28px",
  },
};

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
  cards: {
    title: {
      ...weblysleekFontStyle,
      fontWeight: "600",
      position: "relative",
      top: "10px",
      fontSize: "15px",
      textAlign: "left",
      lineHeight: '1.2',
      paddingBottom: '15px',
    },
    subtitle: {
      ...weblysleekFontStyle,
      fontWeight: "300",
      lineHeight: '1.2',
    },
    quantity: {
      ...weblysleekFontStyle,
      marginBottom: "10px",
      fontWeight: "600",
      fontSize: "14px",
      textAlign: "left",
    },
    currentOrderQuantity:{
      ...weblysleekBoltFontStyle,
      marginBottom: "10px",
      fontWeight: "600",
      fontSize: "14px",
      textAlign: "left",
    },
    close: {
      float: "right",
      marginTop: "10px",
      width: "10px",
    },
    price: {
      ...hudsonNYFontStyle,
      fontSize: "15px",
      marginTop: "40px",
      marginBottom: "-8px",
    },
    CurrentOrderPrice:{
      ...hudsonNYFontStyle,
      fontSize: "15px",
      marginTop: "10px",
    }
  },
  footer: {
    title: {
      ...weblysleekBoltFontStyle,
      fontSize: "14px",
      padding: "20px 0",
      fontWeight: "600",
    },
    textLeft: {
      ...hudsonNYFontStyle,
      textAlign: "left",
      fontSize: "16px",
    },
    textRigth: {
      ...hudsonNYFontStyle,
      textAlign: "right",
      fontSize: "16px",
    },
    text: {
      ...weblysleekFontStyle,
      fontSize: "12px",
      paddingBottom: "10px",
      color: "#4F4F4F",
    },
    button: {
      ...hudsonNYFontStyle,
      fontSize: "16px",
      background: "#FFFFFF",
      width: "100%",
      height: "40px",
      borderRadius: "5px",
      padding: "0 0 8px 0",
      cursor: "pointer",
      border: "1px solid #000000",
    },
    disabledButton: {
      ...hudsonNYFontStyle,
      fontSize: "16px",
      background: "#D1D1D1",
      width: "100%",
      height: "40px",
      borderRadius: "5px",
      padding: "0 0 8px 0",
      cursor: "pointer",
      color: "#FFFFFF",
      border: "none",
    },
  },
};
const minusDisabled = {
  width: "20px",
  height: "20px",
};
