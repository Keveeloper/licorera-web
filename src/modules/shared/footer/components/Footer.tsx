import { Box } from "@mui/material";

const Footer = ({Children}: any) => {
    return(
        <Box sx={styles.footerContainer}>
            {Children}
        </Box>
    );

}

const styles = {
    footerContainer: {
        with: '100vw',
        height: '350px',
    }
}

export default Footer;