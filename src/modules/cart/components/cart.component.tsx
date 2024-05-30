import { Box, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../../store/modules/cart/selectors/cart.selector";
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
import { selectAllInfo } from "../../../store/modules/users/selectors/users.selector";
import CustomModal from "../../shared/modal/customModal";
import WarningAlertScreen from "../alert.screens/warningAlertScreen";
import DeleteAlertScreen from "../alert.screens/deleteAlertScreen";
import "./cart.component.css";
import { useNavigate } from "react-router-dom";

interface customProps {
  isCheckout?: boolean;
}

const CartComponent: React.FC<customProps> = ({ isCheckout }) => {
  const products = useSelector(selectCartProducts);
  const user = useSelector(selectAllUser);
  const Info = useSelector(selectAllInfo);
  const navigate = useNavigate();

  const { removeCartItem, updateCartItem } = useCartHook();

  const [total, setTotal] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [product, setProduct] = useState<Product>();
  const [showWarningAlert, setShoWarningAlert] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

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

  const validatePoints = (points: number) => {
    if (user.points >= points) return true;
    else return false;
  };

  const removeProduct = (id: number) => {
    removeCartItem(id);
    setShowDeleteAlert(false);
  };

  const handleAlertOpen = () => {
    navigate('/checkout')
  };

  const handleDeleteClose = () => {
    setShowDeleteAlert(false);
  };

  const handleWarningClose = () => {
    setShoWarningAlert(false);
  };

  const handleDeleteOpen = (item: Product) => {
    setProduct(item);
    setShowDeleteAlert(true);
  };

  useEffect(() => {
    let newtotal = 0;
    products.forEach((item) => {
      if (item.price) {
        newtotal += item.quantity * item.price;
      }
    });
    setTotal(newtotal);
    setPoints(newtotal / Info?.data?.minimumAmountForPoints || 0);
  }, [products]);

  return (
    <>
      <Typography
        style={isCheckout ? checkoutStyle.title : style.emptyCart.title}
      >
        TU CARRITO
      </Typography>
      <div style={{ padding: "20px" }}>
        {products.map((item: any) => {
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
                <Grid item xs={3}>
                  <img
                    src={item.image}
                    alt=""
                    width={100}
                    height={100}
                    style={{ marginLeft: "-20px" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography style={style.cards.title}>{item.name}</Typography>
                  <Typography style={style.cards.quantity}>
                    {item.presentation}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ mt: 0, mb: 0 }}>
                  <img
                    style={style.cards.close}
                    src="/icons/vector_close.png"
                    onClick={() => handleDeleteOpen(item)}
                  />
                  <Typography
                    style={style.cards.price}
                    sx={{ mt: 5, mb: -1, pb: 2 }}
                  >
                    {item.points
                      ? JotaFormat(item.points)
                      : CurrencyFormat(item.price)}
                  </Typography>
                  <div
                    className="iconContainer"
                    onClick={() => onMinus(item)}
                    style={
                      item.quantity === 1
                        ? minusDisabled
                        : { width: "20px", height: "20px" }
                    }
                  >
                    <span
                      className="icon"
                      id="icono-menos"
                      style={{
                        fontSize: "20px",
                        width: "100%",
                        marginBottom: "30%",
                        justifyItems: "center",
                      }}
                    >
                      -
                    </span>
                  </div>
                  <span
                    className="normalText"
                    style={{ margin: "0px", fontSize: "18px" }}
                  >
                    {" "}
                    {item.quantity}{" "}
                  </span>
                  <div
                    className="iconContainer"
                    onClick={() => onPlus(item)}
                    style={{ width: "20px", height: "20px" }}
                  >
                    <span
                      className="icon"
                      id="icono-mas"
                      style={{
                        fontSize: "20px",
                        width: "100%",
                        marginBottom: "30%",
                      }}
                    >
                      +
                    </span>
                  </div>
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
                {CurrencyFormat(total)}
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
                {CurrencyFormat(total)}
              </Grid>
            </>
          )}
          <Grid item xs={6} style={style.footer.textLeft}>
            TOTAL:
          </Grid>
          <Grid item xs={6} style={style.footer.textRigth}>
            {CurrencyFormat(total)}
          </Grid>
        </Grid>
        <Typography style={style.footer.text}>
          Domicilio gratis por compras mayores a{" "}
          {CurrencyFormat(Info?.data?.minimumOrderValueFree)} IVA incluido.
        </Typography>
        {isCheckout ? (
          <ButtonComponent
            disabled={false}
            // onClick={() => handleAlertOpen()}
            style={style.footer.button}
          >
            CONFIRMAR
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

      {/* Modal Warning*/}
      <CustomModal
        modalStyle="cartModal"
        modalContentStyle="cartModalContent"
        open={showWarningAlert}
        onClose={handleWarningClose}
      >
        <WarningAlertScreen
          title="INFORMACIÓN"
          Text="No tienes suficientes puntos para este canje. Compra y acumula más puntos."
          onClose={handleWarningClose}
        />
      </CustomModal>
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
    },
    subtitle: {
      ...weblysleekFontStyle,
      fontWeight: "300",
    },
    quantity: {
      ...weblysleekFontStyle,
      marginBottom: "10px",
      fontWeight: "600",
      fontSize: "14px",
    },
    close: {
      float: "right",
      marginTop: "10px",
      width: "10px",
    },
    price: {
      ...hudsonNYFontStyle,
      fontSize: "15px",
    },
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
  },
};
const minusDisabled = {
  width: "20px",
  height: "20px",
};
