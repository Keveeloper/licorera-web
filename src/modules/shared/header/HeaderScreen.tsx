import AnnouncementBar from "./components/announcementBar/AnnouncementBar";
import Nav from "./components/nav/Nav";
import Icons from "./components/nav/icons/Icons";
import Logo from "./components/nav/logo/Logo";
import Menu from "./components/nav/menu/Menu";
import SearchBar from "./components/nav/search/SearchBar";

const HeaderScreen = () => {

    return (
        <>
            <AnnouncementBar text={'Envío gratis por compras superiores a $ 100.000'}/>
            <Nav>
                <Logo/>
                <SearchBar/>
                <Menu/>
                <Icons/>
            </Nav>
        </>
    )
}

export default HeaderScreen;