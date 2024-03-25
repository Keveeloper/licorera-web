import { Box } from "@mui/material";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import UserBanner from "./components/UserBanner";

const UserProfileScreen = () => {

    return (
        <>
            <HeaderScreen />
            <UserBanner />
            <FooterScreen />
        </>
    );

}

export default UserProfileScreen;