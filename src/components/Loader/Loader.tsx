import { Box } from "@mui/material"

const Loader = () => {

    return(
        <Box sx={styles.loaderContainer}>
            <img src="/images/beer.gif" width={100} alt="git of beer moving" />
        </Box>
    );
}

const styles = {
    loaderContainer: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default Loader;