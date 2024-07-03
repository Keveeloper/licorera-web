import { useEffect, useState } from "react";
import useRecentOrders from "../hooks/useRecentOrders";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { hudsonNYFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import { useParams } from "react-router-dom";
import { CurrencyFormat, JotaFormat, convertFormatDate } from "../../../utils/helpers";
import CardComponent from "../../shared/card/card.component";
import { Height } from "@mui/icons-material";

interface props {}

const OrderComponent: React.FC<props> = () => {
  const { getOrderApi } = useRecentOrders();
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
        <Grid container spacing={0} sx={{ mt: 0 }}>
          <Grid container xs={6}>
            {order?.products?.map((item: any) => {
              return (
                <CardComponent
                  key={item.id}
                  style={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "10px",
                    width: '100%',
                    minHeight: '140px',
                    maxWidth:'500px'
                  }}
                >
                  <Grid
                    container
                    spacing={0}
                    style={{display:'flex', minHeight: '100%'}}
                  >
                    <Grid item xs={3} style={{ display: 'flex', alignItems: 'center'}}>
                      <img
                        src={item.store.product.image}
                        alt=""
                        height={100}
                        style={{ width: '100%', maxWidth: '100%'}}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={7}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding:'15px 10px 10px'
                      }}
                    >
                      <Typography style={styles.cards.title}>
                        {item.store.product.name}
                      </Typography>
                      <Typography style={styles.cards.quantity}>
                        {item.store.presentation && <span>Presentación: {item.store.presentation}</span>}
                        Cantidad: {item.store.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ mt: 0, mb: 0 }} style={{padding:'15px 0 10px'}}>
                      <Typography
                        style={styles.cards.price}
                      >
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
          <Grid container xs={6}>

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
    fontWeight:'600',
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
};
