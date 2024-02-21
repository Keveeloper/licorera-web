import { Box } from "@mui/material"
import { paletteColors } from "../../../../../paletteColors/paletteColors";
import { AnnouncementType } from "./types";
import { displayFlex } from "../../../../shared/recursiveStyles/RecursiveStyles"

const AnnouncementBar = (props: AnnouncementType) => {

    const { text } = props;

    return (
        <Box sx={styles.announcementContainer}>
            {text}
        </Box>
    );
}

// const getStylesNav = (scrollPosition: number, screenWidth: number, maxVerticalMobileScreen: number) => ({

// });
const styles = {
    announcementContainer: {
        width: '100vw',
        height: '40px',
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