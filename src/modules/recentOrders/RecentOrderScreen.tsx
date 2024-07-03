import React, { useEffect, useState } from "react";
import HeaderScreen from "../shared/header/HeaderScreen";
import FooterScreen from "../shared/footer/FooterScreen";
import { Box, Typography } from "@mui/material";
import {
  hudsonNYFontStyle,
  weblysleekFontStyle,
} from "../shared/recursiveStyles/RecursiveStyles";
import OrdersComponent from "./components/ordersComponent";
import useRecentOrders from "./hooks/useRecentOrders";
import { Route, Routes } from "react-router-dom";
import OrderComponent from "./components/orderComponent";

const RecentOrderScreen = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>();
  const [orderId, setOrderId] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  const { GetOrdersApi } = useRecentOrders();

  const getOrder = (page: number) => {
    GetOrdersApi(page)
      .then((res) => {
        if (res.success) {
          if (res?.data?.length === 0) {
            setIsEmpty(true);
          } else {
            setTotalPage(res.data.last_page - 1);
            setOrders(res.data.data);
          }
        }
      })
      .catch((error) => console.error(error));
  };

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    getOrder(value);
  };

  useEffect(() => {
    getOrder(1);
  }, []);

  return (
    <>
      <HeaderScreen />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              {isEmpty ? (
                <>
                  <Box sx={styles.container}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography style={styles.title} sx={{ mt: 5 }}>
                        Pedidos recientes
                      </Typography>
                      <Box>
                        <img src="/icons/emptyOrders.png" alt="" />
                      </Box>
                      <Typography style={styles.title}>
                        ¿que esperas para hacer tu pedido?
                      </Typography>
                      <Typography style={styles.subtitle} sx={{ mt: 2 }}>
                        todo lo que necesitas en un solo lugar
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                <OrdersComponent
                  orders={orders}
                  handleChangePagination={handleChangePagination}
                  totalPage={totalPage}
                  page={page}
                />
              )}
            </>
          }
        />
        <Route path="/order/:id" element={<OrderComponent/>} />
      </Routes>
      <FooterScreen />
    </>
  );
};

export default RecentOrderScreen;

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
  subtitle: {
    ...weblysleekFontStyle,
    fontSize: "16px",
    color: "#000000",
  },
};
