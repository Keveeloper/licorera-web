import React from "react";
import { Route, Routes } from "react-router-dom";
import LoaderScreen from "../Screens/Loader/LoaderScreen";

const HomeScreen = React.lazy(
    () => import("../Screens/home/HomeScreen")
);

const PromotionDetailScreen = React.lazy(
    () => import("../Screens/promotion/PromotionDetailScreen")
);

const RootRouter = () => {
    return(
        <Routes>
            <Route 
                path="*" 
                element={<h1>Not found</h1>} 
            />
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
        </Routes>
    );
}

export default RootRouter;