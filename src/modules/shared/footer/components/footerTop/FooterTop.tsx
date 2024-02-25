import { Box } from "@mui/material";
import { displayFlex } from "../../../recursiveStyles/RecursiveStyles";

const FooterTop = ({Children}: any) => {
    return(
        <Box sx={styles.footerTopContainer}>
            {Children}
        </Box>
    );
}

const styles = {
    footerTopContainer: {
        paddingTop: '40px',
        width: '100%',
        height: '65%',
        ...displayFlex,
    }
}

export default FooterTop;