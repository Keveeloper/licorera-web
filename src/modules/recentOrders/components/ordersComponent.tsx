import { Box, Divider, Grid, Typography, Stack } from "@mui/material";
import {
  hudsonNYFontStyle,
  weblysleekFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import CardComponent from "../../shared/card/card.component";
import { useEffect, useState } from "react";
import Loader from "../../shared/Loader/components/Loader";
import { CurrencyFormat, convertFormatDate } from "../../../utils/helpers";
import { Pagination as MyPagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface props {
  orders: any;
  totalPage?:number;
  page?:number;
  handleChangePagination?:any
}
const OrdersComponent: React.FC<props> = ({ orders, totalPage ,handleChangePagination, page}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (orders?.length > 0) {
      setLoading(false);
    }
  }, [orders]);

  const OrderById = (id:number) => {
    navigate(`/recentOrder/order/${id}`)
  }

  if (loading) {
    return <Loader screenLoader={true} />;
  }
  return (
    <Box sx={styles.container}>
      <Box sx={{ textAlign: "center", width: "60%" }}>
        <Typography style={styles.title} sx={{ mt: 5 }}>
          Pedidos recientes
        </Typography>
        <Grid container spacing={0} sx={{ mt: 5 }}>
          {orders?.length > 0 &&
            orders.map((item: any) => {
              return (
                <Grid container xs={6} style={styles.grid}>
                    <div onClick={()=> OrderById(item.id)}>
                        <CardComponent style={styles.card}>
                            <Box sx={styles.card.firstSection}>
                            {convertFormatDate(item.created_at)}
                            </Box>
                            <Box sx={styles.card.secondSection}>
                            <Typography style={styles.card.secondSection.title}>
                                {item?.address?.slice(0,38)}
                            </Typography>
                            <Typography style={styles.card.secondSection.subtitle}>
                                {item?.instructions}
                            </Typography>
                            <Typography
                                style={styles.card.secondSection.subtitle}
                                sx={{ mt: 1 }}
                            >
                                Productos: {item.products_quantity}
                            </Typography>
                            </Box>
                            <Divider style={{ margin: "10px 10px -10px" }} />
                            <Box sx={styles.card.thirdSection}>
                            <Typography style={styles.card.thirdSection.title}>
                                total: {CurrencyFormat(item.total)}
                            </Typography>
                            <Typography
                                style={
                                item.status.name === "Completado"
                                    ? {
                                        ...styles.card.thirdSection.subtitle,
                                        color: "#048404",
                                    }
                                    : {
                                        ...styles.card.thirdSection.subtitle,
                                        color: "#FF1806",
                                    }
                                }
                            >
                                <img
                                src={
                                    item.status.name === "Completado"
                                    ? "/icons/successIcon.png"
                                    : "/icons/CancelIcon.png"
                                }
                                alt=""
                                style={{ width: "20px", marginRight: "5px" }}
                                />
                                {item.status.name}
                            </Typography>
                            </Box>
                        </CardComponent>
                    </div>
                </Grid>
              );
            })}
        </Grid>
        <Stack spacing={2} style={{ margin: "auto", padding: "30px 0", alignItems: 'center' }}>
          <MyPagination
            count={totalPage}
            page={page}
            onChange={handleChangePagination}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default OrdersComponent;

const styles = {
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
  grid: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
  card: {
    width: "380px",
    height: "200px",
    bordeRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px",
    // height: '100vh',
    firstSection: {
      ...hudsonNYFontStyle,
      background: "#404040",
      alignItems: "center",
      padding: "10px 10px 15px",
      display: "flex",
      color: "#FFFFFF",
      fontSize: "20px",
    },
    secondSection: {
      textAlign: "left",
      padding: "0px 10px",
      title: {
        ...weblysleekFontStyle,
        color: "#000000",
        fontWeight: "600",
        fontSize: "20px",
        maxWidth: '34ch', 
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      subtitle: {
        ...weblysleekFontStyle,
        color: "#000000",
        fontWeight: "300",
        fontSize: "16px",
      },
    },
    thirdSection: {
      display: "flex",
      padding: "10px 10px",
      justifyContent: "space-between",
      title: {
        fontFamily: "HudsonNYSerif",
        fontSize: "20px",
      },
      subtitle: {
        fontFamily: "weblysleekuil",
        fontWeight:'600',
        fontSize: "15px",
        alignItems: "center",
        display: "flex",
      },
    },
  },
};
