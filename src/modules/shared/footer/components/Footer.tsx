import { Box } from "@mui/material";
import { ReactNode } from "react";

interface footerInterface {
    children: ReactNode;
}

const Footer: React.FC<footerInterface> = ({children}) => {
    return(
        <Box sx={styles.footerContainer}>
            {children}
        </Box>
    );

}

const styles = {
    footerContainer: {
        marginTop: '120px',
        with: '100vw',
        height: '350px',
        borderTop: 'solid 1px',
    }
}

export default Footer;