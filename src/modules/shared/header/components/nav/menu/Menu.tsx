import { Box } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import { displayFlexEnd } from "../../../../recursiveStyles/RecursiveStyles";
import { paletteColors } from "../../../../../../paletteColors/paletteColors";
import { useState } from "react";

const Menu = () => {

    const location = useLocation();
    const { pathname } = location;
    const menuSelected = pathname === '/' ? 'Inicio' : pathname === '/store' ? 'Tienda' : 'Canjes';

    const [clicked, setClicked] = useState<string>(menuSelected);

    return(
        <Box sx={styles.menuContainer}>
            <Link style={clicked === 'Inicio' ? styles.menuContainer.clicked : {}} to={'/'}>Inicio</Link>
            <Link style={clicked === 'Tienda' ? styles.menuContainer.clicked : {}} to={'/store'}>Tienda</Link>
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
            padding: '0 25px 0 25px',
            color: paletteColors.black,
            fontFamily: 'weblysleekuil',
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none'
        },
        'a:hover': {
            borderBottom: `3px solid ${paletteColors.gold}`,
        },
        clicked: {
            borderBottom: `3px solid ${paletteColors.gold}`,
        }
    }
}

export default Menu;