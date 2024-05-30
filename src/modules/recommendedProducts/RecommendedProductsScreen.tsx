import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import RecommendedProducts from "./components/RecommendedProducts";

const RecommendedProductsScreen = () => {

    return (
        <>
            <HeaderScreen/>
                <RecommendedProducts/>
            <FooterScreen />
        </>
    );

}

export default RecommendedProductsScreen;