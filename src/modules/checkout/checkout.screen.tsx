import FooterScreen from "../shared/footer/FooterScreen";
import SuggestedProducts from "../productDetail/components/suggestedProducts";
import CheckoutComponent from "./components/checkout.component";

const CheckoutScreen = () => {
    return(
        <>
            <CheckoutComponent/>
            <SuggestedProducts/>
            <FooterScreen />
        </>
    )
}
export default CheckoutScreen;