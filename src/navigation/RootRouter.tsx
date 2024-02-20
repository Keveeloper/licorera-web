import React from "react";
import { Route, Routes } from "react-router-dom";
import LoaderScreen from "../modules/shared/Loader/LoaderScreen";


const HomeScreen = React.lazy(
    () => import("../modules/home/HomeScreen")
);

const PromotionDetailScreen = React.lazy(
    () => import("../modules/promotionDetail/PromotionDetailScreen")
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