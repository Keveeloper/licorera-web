import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import ExchangeComponent from "./components/exchange.component";

const ExchangeScreen = () => {
    return(
        <>
            <HeaderScreen />
                <ExchangeComponent/>
            <FooterScreen />
        </>
    )
}
export default ExchangeScreen;