import { Box } from "@mui/material";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import UserBanner from "./components/UserBanner";
import UserContent from "./components/UserContent";
import { useAppDispatch } from "../../store/store";
import { useCallback, useEffect } from "react";
import { getPaymentMethodsThunk } from "../../store/modules/paymentMethods/actions/paymentMethods.actions";

const UserProfileScreen = () => {

    const dispatch = useAppDispatch();

    const getAsyncPaymentMethods = useCallback(async () => {
        dispatch(getPaymentMethodsThunk()).unwrap();
    }, []);

    useEffect(() => {
        getAsyncPaymentMethods();
    }, []);
    
    return (
        <>
            <HeaderScreen />
            <UserBanner />
            <UserContent />
            <FooterScreen />
        </>
    );

}

export default UserProfileScreen;