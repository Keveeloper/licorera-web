import { Box } from "@mui/material";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import UserBanner from "./components/UserBanner";
import UserContent from "./components/UserContent";

const UserProfileScreen = () => {

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