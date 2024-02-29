import { Box } from "@mui/material";
import { displayFlexColumn } from "../../../recursiveStyles/RecursiveStyles";
import { ReactNode } from "react";

interface footerBottomInterface {
    children: ReactNode;
}

const FooterBottom = ({children}: footerBottomInterface) => {
    return(
        <Box sx={styles.footerBottomContainer}>
            {children}
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