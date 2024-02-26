import { Box } from "@mui/material";
import { displayFlexColumn } from "../../../recursiveStyles/RecursiveStyles";

const FooterBottom = ({Children}: any) => {
    return(
        <Box sx={styles.footerBottomContainer}>
            {Children}
        </Box>
    );
}

const styles = {
    footerBottomContainer: {
        width: '100%',
        height: '35%',
        ...displayFlexColumn,
    }
}

export default FooterBottom;