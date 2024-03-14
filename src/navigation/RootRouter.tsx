import React from "react";
import { Route, Routes } from "react-router-dom";
import LoaderScreen from "../modules/shared/Loader/LoaderScreen";
import ProductDetailScreen from "../modules/productDetail/productDetail.screen";

const HomeScreen = React.lazy(() => import("../modules/home/HomeScreen"));

const PromotionDetailScreen = React.lazy(
  () => import("../modules/promotionDetail/PromotionDetailScreen")
);

const StoreScreen = React.lazy(() => import("../modules/store/store.screen"));

const ExchangeScreen = React.lazy(
  () => import("../modules/exchangeProducts/exchange.screen")
);

const RootRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<LoaderScreen />}>
            <HomeScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <React.Suspense fallback={<LoaderScreen />}>
            <HomeScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/promotion-detail"
        element={
          <React.Suspense fallback={<LoaderScreen />}>
            <PromotionDetailScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/store"
        element={
          <React.Suspense fallback={<LoaderScreen />}>
            <StoreScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/exchange-products"
        element={
          <React.Suspense fallback={<LoaderScreen />}>
            <ExchangeScreen />
          </React.Suspense>
        }
      />

      <Route
        path="/product-detail"
        element={
          <React.Suspense fallback={<LoaderScreen />}>
            <ProductDetailScreen />
          </React.Suspense>
        }
      />

      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default RootRouter;
