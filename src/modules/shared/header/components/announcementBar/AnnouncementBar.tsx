import { Box } from "@mui/material"
import { paletteColors } from "../../../../../paletteColors/paletteColors";


const displayFlex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const AnnouncementBar = () => {

    return (
        <Box sx={styles.announcementContainer}>
            <p>Envío gratis por compras superiores a $ 50.000</p>
        </Box>
    );
}

// const getStylesNav = (scrollPosition: number, screenWidth: number, maxVerticalMobileScreen: number) => ({

// });
const styles = {
    announcementContainer: {
        width: '100vw',
        height: '50px',
        ...displayFlex,
        backgroundColor: paletteColors.gold,
        'p': {
            fontSize: '14px',
            fontWeight: 600,
            color: paletteColors.white,
        }
    }
}

export default AnnouncementBar;