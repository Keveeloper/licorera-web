import { Box } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import { displayFlexEnd } from "../../../../recursiveStyles/RecursiveStyles";
import { paletteColors } from "../../../../../../paletteColors/paletteColors";
import { useState } from "react";
import { Padding } from "@mui/icons-material";

const Menu = () => {

    const location = useLocation();
    const { pathname } = location;
    const menuSelected = pathname === '/' ? 'Inicio' : pathname === '/store/1' ? 'Tienda' : pathname === '/exchange-products' ? 'Canjes' : '';

    const [clicked, setClicked] = useState<string>(menuSelected);

    return(
        <Box sx={styles.menuContainer}>
            <Link style={clicked === 'Inicio' ? styles.menuContainer.clicked : {}} to={'/'}>Inicio</Link>
            <Link style={clicked === 'Tienda' ? styles.menuContainer.clicked : {}} to={'/store/1'}>Tienda</Link>
            <Link style={clicked === 'Canjes' ? styles.menuContainer.clicked : {}} to={'/exchange-products'}>Canjes</Link>
        </Box>
    );

}

const styles = {
    menuContainer: {
        width: '37.5%',
        height: '100%',
        ...displayFlexEnd,
        'a': {
            padding: '0 25px 5px 25px',
            color: paletteColors.black,
            fontFamily: 'weblysleekuisb',
            fontSize: '16px',
            fontWeight: 900,
            textDecoration: 'none',
        },
        'a:hover': {
            padding: '0 25px 5px 25px',
            borderBottom: `3px solid ${paletteColors.gold}`,
        },
        clicked: {
            padding: '0 25px 5px 25px',
            borderBottom: `3px solid ${paletteColors.gold}`,
        }
    }
}

export default Menu;