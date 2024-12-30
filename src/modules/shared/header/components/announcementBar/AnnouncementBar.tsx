import { Box } from "@mui/material"
import { paletteColors } from "../../../../../paletteColors/paletteColors";
import { AnnouncementType } from "./types";
import { displayFlex } from "../../../../shared/recursiveStyles/RecursiveStyles"
import { IS_DEVELOPER } from "../../../../../service/tools/constans";

const AnnouncementBar = (props: AnnouncementType) => {

    const { text } = props;

    return (
        <Box sx={styles.announcementContainer}>
            {text}
            {IS_DEVELOPER ? ' Development Mode':''}
        </Box>
    );
}

// const getStylesNav = (scrollPosition: number, screenWidth: number, maxVerticalMobileScreen: number) => ({

// });
const styles = {
    announcementContainer: {
        width: '100%',
        height: '40px',
        ...displayFlex,
        background: paletteColors.gold,
        'p': {
            fontSize: '14px',
            fontWeight: 600,
            color: paletteColors.white,
        }
    }
}

export default AnnouncementBar;