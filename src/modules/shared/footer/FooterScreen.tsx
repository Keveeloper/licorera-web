import AnnouncementBar from "../header/components/announcementBar/AnnouncementBar";
import Footer from "./components/Footer";
import AppInfo from "./components/app_info/AppInfo";
import FooterBottom from "./components/footerBottom/FooterBottom";
import FooterTop from "./components/footerTop/FooterTop";
import Info from "./components/info/Info";
import LicoreraInfo from "./components/licorera_ifnfo/LicoreraInfo";
import PaymentFooter from "./components/payments/PaymentFooter";

const FooterScreen = () => {
    return(
        <>
            <Footer Children={
                <>
                    <FooterTop Children={
                        <>
                            <LicoreraInfo/>
                            <Info/>
                            <AppInfo/>
                        </>
                    }/>
                    <FooterBottom Children={
                        <PaymentFooter/>
                    }/>
                </>
            }/>
            <AnnouncementBar text={'Todos los derechos reservados © 2018 Licorera Tres Jotas.'}/>
        </>
    );

}

export default FooterScreen;