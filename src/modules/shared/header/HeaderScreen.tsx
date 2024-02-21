import AnnouncementBar from "./components/announcementBar/AnnouncementBar";
import Nav from "./components/nav/Nav";
import Icons from "./components/nav/icons/Icons";
import Logo from "./components/nav/logo/Logo";
import Menu from "./components/nav/menu/Menu";
import SearchBar from "./components/nav/search/SearchBar";


const HeaderScreen = () => (
    <>
        <AnnouncementBar text={'Envío gratis por compras superiores a $ 50.000'}/>
        <Nav Children= {
            <>
                <Logo/>
                <SearchBar/>
                <Menu/>
                <Icons/>
            </>
        }/>
    </>
)

export default HeaderScreen;