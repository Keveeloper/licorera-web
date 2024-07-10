import { useEffect, useState } from "react";
import useRecentOrders from "../hooks/useRecentOrders";
import { Box, Divider, Grid, Typography } from "@mui/material";
import {
  hudsonNYFontStyle,
  weblysleekBoltFontStyle,
  weblysleekFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import { useNavigate, useParams } from "react-router-dom";
import {
  CurrencyFormat,
  JotaFormat,
  convertFormatDate,
} from "../../../utils/helpers";
import CardComponent from "../../shared/card/card.component";
import { Height } from "@mui/icons-material";
import ButtonComponent from "../../shared/button/button.component";
import { useSelector } from "react-redux";
import { selectAllInfo } from "../../../store/modules/users/selectors/users.selector";
import useCartHook from "../../shared/hooks/cartHook/useCartHook";
import { Product } from "../../exchangeProducts/types";

interface props {}

const OrderComponent: React.FC<props> = () => {

  const Info = useSelector(selectAllInfo);
  const navigate = useNavigate()
  
  const { getOrderApi } = useRecentOrders();
  const { addArrayToCart } = useCartHook();
  const [order, setOrder] = useState<any>();
  const { id } = useParams();

  const getOrder = () => {
    if (id) {
      getOrderApi(parseInt(id))
        .then((res) => {
          console.log(res);
          if (res.success) {
            setOrder(res.data);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleSubmit = () => {
   
    let products:Product[]=[];

    order?.products.forEach((item:any)=>{
      const newProduct:Product ={
        id: item.store.product.id,
        name: item.store.product.name,
        image: item.store.product.image,
        quantity:item.quantity,
        points:item.store.points,
        price:item.store.price,
        description: item.store.product.description,
        category_id: item.store.product.category_id,
        created_at: item.store.product.created_at,
        presentation:item.store.presentation,
        discount:item.store.discount
      }
      products = [...products, newProduct]
    })
    addArrayToCart(products)
    navigate("/home")
  }

  useEffect(() => {
    getOrder();
  }, [id]);

  return (
    <Box sx={styles.container}>
      <Box sx={{ textAlign: "left", width: "90%" }}>
        <Typography style={styles.title} sx={{ mt: 5 }}>
          {convertFormatDate(order?.created_at)}
        </Typography>
        <Typography
          style={
            order?.status?.name === "Completado"
              ? {
                  ...styles.subtitle,
                  color: "#048404",
                }
              : {
                  ...styles.subtitle,
                  color: "#FF1806",
                }
          }
        >
          <img
            src={
              order?.status?.name === "Completado"
                ? "/icons/successIcon.png"
                : "/icons/CancelIcon.png"
            }
            alt=""
            style={{ width: "20px", marginRight: "5px" }}
          />
          {order?.status?.name}
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Grid container spacing={0} sx={{ mt: 0,  textAlign:'center'}}>
          {/* left section */}
          <Grid container xs={6} style={{height: '100%',}}>
            {order?.products?.map((item: any) => {
              return (
                <CardComponent
                  key={item.id}
                  style={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "10px",
                    width: "100%",
                    minHeight: "140px",
                    maxWidth: "500px",
                    maxHeight:'150px'
                  }}
                >
                  <Grid
                    container
                    spacing={0}
                    style={{ display: "flex", minHeight: "100%" }}
                  >
                    <Grid
                      item
                      xs={3}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={item.store.product.image}
                        alt=""
                        height={100}
                        style={{ width: "100%", maxWidth: "100%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "15px 10px 10px",
                      }}
                    >
                      <Typography style={styles.cards.title}>
                        {item.store.product.name}
                      </Typography>
                      <Typography style={styles.cards.quantity}>
                        {item.store.presentation && (
                          <span>Presentación: {item.store.presentation}</span>
                        )}
                        Cantidad: {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{ mt: 0, mb: 0 }}
                      style={{ padding: "15px 0 10px" }}
                    >
                      <Typography style={styles.cards.price}>
                        {item.store.points
                          ? JotaFormat(item.store.points)
                          : CurrencyFormat(item.store.price)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardComponent>
              );
            })}
          </Grid>
          {/* rigth section */}
          <Grid
            container
            xs={6}
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "550px",
              height: "450px",
              background: "#F6F6F6",
            }}
          >
            <div style={{ padding: "20px", width: '100%', maxWidth:'550px'}}>
              <Typography style={styles.footer.title}>
                Obtienes por tu compra {order?.earned_points} J
              </Typography>
              <Grid
                container
                spacing={0}
                style={{
                  padding: "20px 0",
                }}
              >
                <Grid
                  item
                  xs={6}
                  style={{
                    ...styles.footer.textLeft,
                    color: "#4F4F4F",
                    fontSize: "14px",
                  }}
                >
                  SUBTOTAL:
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ mb: 2 }}
                  style={{
                    ...styles.footer.textRigth,
                    color: "#4F4F4F",
                    fontSize: "14px",
                  }}
                >
                  {CurrencyFormat(order?.amount)}
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    ...styles.footer.textLeft,
                    color: "#4F4F4F",
                    fontSize: "14px",
                  }}
                >
                  DOMICILIO:
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ mb: 2 }}
                  style={{
                    ...styles.footer.textRigth,
                    color: "#4F4F4F",
                    fontSize: "14px",
                  }}
                >
                  {order?.delivery_value && order?.delivery_value > 0
                    ? CurrencyFormat(order?.delivery_value)
                    : "--"}
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={6} style={styles.footer.textLeft} sx={{mt:2, mb:2}}>
                  TOTAL:
                </Grid>
                <Grid item xs={6} style={styles.footer.textRigth} sx={{mt:2, mb:2}}>
                  {CurrencyFormat(order?.total)}
                </Grid>
              </Grid>
              <Typography style={styles.footer.text} sx={{mb:2}}>
                {`Domicilio gratis por compras mayores a${" "} 
                  ${CurrencyFormat(Info?.data?.minimumOrderAmount)} IVA incluido.`}
              </Typography>

              <ButtonComponent
                disabled={false}
                onClick={handleSubmit}
                style={styles.footer.button}
              >
                Agregar de nuevo
              </ButtonComponent>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderComponent;

const styles: React.CSSProperties | any = {
  container: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  title: {
    ...hudsonNYFontStyle,
    fontSize: "25px",
    color: "#000000",
  },
  subtitle: {
    fontFamily: "weblysleekuil",
    fontWeight: "600",
    fontSize: "15px",
    alignItems: "center",
    display: "flex",
  },
  cards: {
    title: {
      ...weblysleekFontStyle,
      fontWeight: "600",
      position: "relative",
      top: "10px",
      fontSize: "18px",
      textAlign: "left",
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
    },
  },
  footer: {
    title: {
      ...weblysleekBoltFontStyle,
      fontSize: "18px",
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
