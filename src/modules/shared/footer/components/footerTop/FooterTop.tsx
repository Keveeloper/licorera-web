import { Box } from "@mui/material";
import { displayFlex } from "../../../recursiveStyles/RecursiveStyles";
import { ReactNode } from "react";

interface footerTopInterface {
    children: ReactNode;
}

const FooterTop = ({children}: footerTopInterface) => {
    return(
        <Box sx={styles.footerTopContainer}>
            {children}
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