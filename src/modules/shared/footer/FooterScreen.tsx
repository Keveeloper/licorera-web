import AnnouncementBar from "../header/components/announcementBar/AnnouncementBar";
import Footer from "./components/Footer";
import AppInfo from "./components/app_info/AppInfo";
import FooterTop from "./components/footerTop/FooterTop";
import Info from "./components/info/Info";
import LicoreraInfo from "./components/licorera_ifnfo/LicoreraInfo";

const FooterScreen = () => {
    return(
        <>
            <Footer Children={
                <FooterTop Children={
                    <>
                        <LicoreraInfo/>
                        <Info/>
                        <AppInfo/>
                    </>
                }/>
            }/>
            <AnnouncementBar text={'Todos los derechos reservados © 2018 Licorera Tres Jotas.'}/>
        </>
    );

}

export default FooterScreen;