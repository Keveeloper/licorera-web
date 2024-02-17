import { Box } from "@mui/material"
import { paletteColors } from "../../paletteColors/paletteColors";

const AnnouncementBar = () => {

    return (
        <Box sx={styles.announcementContainer}>
            <p>Envío gratis por compras superiores a $ 50.000</p>
        </Box>
    );
}

const styles = {
    announcementContainer: {
        width: '100vw',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: paletteColors.gold,
        'p': {
            fontSize: '14px',
            fontWeight: 600,
            color: paletteColors.white
        }
    }
}

export default AnnouncementBar;