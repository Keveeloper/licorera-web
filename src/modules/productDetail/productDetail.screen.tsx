import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import SuccessAlert from "../shared/modal/lottie.Alert";
import ProductDetail from "./components/productDetail";
import SuggestedProducts from "./components/suggestedProducts";

const ProductDetailScreen = () => {
    return(
        <>
            <HeaderScreen />
                <ProductDetail/>
                <SuggestedProducts/>
            <FooterScreen />
        </>
    )
}
export default ProductDetailScreen;