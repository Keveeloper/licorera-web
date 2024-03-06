import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import ContainerStore from "./components/containerStore.component";


const StoreScreen = () => {
    return(
        <>
            <HeaderScreen />
            {/* Todo pending add categories */}
                <ContainerStore/>
            <FooterScreen />
        </>
    )
}
export default StoreScreen;

