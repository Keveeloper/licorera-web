import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../modules/shared/Loader/components/Loader";
import ProductDetailScreen from "../modules/productDetail/productDetail.screen";
import AboutUs from "../modules/aboutUs/aboutUs.screen";

const HomeScreen = React.lazy(() => import("../modules/home/HomeScreen"));

const PromotionDetailScreen = React.lazy(
  () => import("../modules/promotionDetail/PromotionDetailScreen")
);

const StoreScreen = React.lazy(
  () => import("../modules/store/store.screen")
);

const ExchangeScreen = React.lazy(
  () => import("../modules/exchangeProducts/exchange.screen")
);

const UserProfileScreen = React.lazy(
  () => import("../modules/userProfile/UserProfileScreen")
);

const HighlightedScreen = React.lazy(
  () => import("../modules/highlightedCampaigns/HighlightedCampaignScreen")
);

const CheckOut = React.lazy(
  () => import("../modules/checkout/checkout.screen")
);

const Address = React.lazy(
  () => import("../modules/address/address.screen")
);

const RecommendedProducts = React.lazy(
  () => import("../modules/recommendedProducts/RecommendedProductsScreen")
);

const PaymentMethods = React.lazy(
   () => import("../modules/paymentMethods/paymentMethods.screen")
);

const Suggestions = React.lazy(
  () => import("../modules/suggestions/suggestions")
);

const RemoveUserData = React.lazy(
  () => import("../modules/removeUserData/removeUserData")
);

const CreateAccount = React.lazy(
  () => import("../modules/createAccount/createAccount")
);

const RecentOrder = React.lazy(
  () => import("../modules/recentOrders/RecentOrderScreen")
);

const RootRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <HomeScreen />
            {/* <Loader /> */}
          </React.Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <HomeScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/promotion-detail"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <PromotionDetailScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/store/:id?"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <StoreScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/exchange-products"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <ExchangeScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/product-detail"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <ProductDetailScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/user-profile"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <UserProfileScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/aboutus"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <AboutUs />
          </React.Suspense>
        }
      />
      <Route
        path="/highlighted-campaigns"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <HighlightedScreen />
          </React.Suspense>
        }
      />
      <Route
        path="/checkout"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <CheckOut />
          </React.Suspense>
        }
      />

      <Route
        path="/address/*"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <Address />
          </React.Suspense>
        }
      />
      <Route
        path="/recommended-products"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <RecommendedProducts />
          </React.Suspense>
        }
      />
      <Route
        path="/paymentMethods" 
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <PaymentMethods />
          </React.Suspense>
        }
      >
         <Route path=":id" element={<PaymentMethods />} />
      </Route>
      <Route
        path="/suggestions"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <Suggestions />
          </React.Suspense>
        }
      />
      <Route
        path="/removeUserData"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <RemoveUserData />
          </React.Suspense>
        }
      />
      <Route
        path="/createAccount"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <CreateAccount />
          </React.Suspense>
        }
      />
      <Route
        path="/recentOrder/*"
        element={
          <React.Suspense fallback={<Loader screenLoader={true} />}>
            <RecentOrder />
          </React.Suspense>
        }
      />
      
      
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default RootRouter;
