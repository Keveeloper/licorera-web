import { useEffect } from "react";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import SuccessAlert from "../shared/modal/lottie.Alert";
import ProductDetail from "./components/productDetail";
import SuggestedProducts from "./components/suggestedProducts";

const ProductDetailScreen = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
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