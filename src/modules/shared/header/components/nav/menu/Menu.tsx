import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { displayFlexEnd } from "../../../../recursiveStyles/RecursiveStyles";
import { paletteColors } from "../../../../../../paletteColors/paletteColors";

const Menu = () => {

    return(
        <Box sx={styles.menuContainer}>
            <Link to={'/'}>Inicio</Link>
            <Link to={'/promotion-detail'}>Tienda</Link>
            <Link to={'/promotion-detail'}>Canjes</Link>
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
        'a:hover, a:focus': {
            borderBottom: `3px solid ${paletteColors.gold}`,
        }
    }
}

export default Menu;