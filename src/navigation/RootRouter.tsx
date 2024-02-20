import React from "react";
import { Route, Routes } from "react-router-dom";
import LoaderScreen from "../components/Loader/LoaderScreen";

const HomeScreen = React.lazy(
    () => import("../components/home/HomeScreen")
);

const PromotionDetailScreen = React.lazy(
    () => import("../Screens/promotion/PromotionDetailScreen")
);

const RootRouter = () => {
    return(
        <Routes>
            <Route
                path="/"
                element={
                    <React.Suspense fallback={<LoaderScreen/>}> 
                        <HomeScreen />
                    </React.Suspense>
                }
            />
            <Route path="promotion-detail"
                element={
                    <React.Suspense fallback={<LoaderScreen/>}>
                        <PromotionDetailScreen />
                    </React.Suspense>
                }
            />
            <Route 
                path="*" 
                element={<h1>Not found</h1>} 
            />
        </Routes>
    );
}

export default RootRouter;