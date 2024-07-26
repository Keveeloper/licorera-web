import { Box } from "@mui/material";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import UserBanner from "./components/UserBanner";
import UserContent from "./components/UserContent";
import { useAppDispatch } from "../../store/store";
import { useCallback, useEffect, useState } from "react";
import { getPaymentMethodsThunk } from "../../store/modules/paymentMethods/actions/paymentMethods.actions";

const UserProfileScreen = () => {

    const [ exchangeOpen, setExchangeOpen ] = useState<boolean>(false);

    return (
        <Box sx={{width: '100%'}}>
            <HeaderScreen />
            <UserBanner 
                exchangeOpen={exchangeOpen} 
                setExchangeOpen={setExchangeOpen}
            />
            <UserContent 
                exchangeOpen={exchangeOpen} 
                setExchangeOpen={setExchangeOpen}
            />
            <FooterScreen />
        </Box>
        
    );

}

export default UserProfileScreen;