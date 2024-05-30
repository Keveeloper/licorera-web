import { Box } from "@mui/material"

const Loader = () => {

    return(
        <Box sx={styles.loaderContainer}>
            {/* <img src="/images/beer.gif" width={100} alt="git of beer moving" /> */}
            {/* <img src="/images/Loader-background.png" alt="loader square background" /> */}
            {/* <figure style={styles.loaderContainer.searchLoaderContainer}> */}
                <img 
                    style={styles.loaderContainer.loaderBackground} 
                    src="/images/Loader-background.png" alt="loader square background" 
                />
                <img 
                    style={styles.loaderContainer.loaderSpinner} 
                    src="/images/loader-circle.png" alt="loader circle spinner" 
                />
            {/* </figure> */}
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
        loaderBackground: {
            // position: 'absolute' as 'absolute',
            // top: '50%',
            // left: '50%',
            // transform: 'translate(-50%, -50%)',
        },
        loaderSpinner: {
            position: 'absolute' as 'absolute',
            // top: '50%',
            // left: '50%',
            // transform: 'translate(-50%, -50%)',
            animation: 'rotateMobile360 1s linear infinite',
        },
        '@keyframes rotateMobile360': {
            '0%': {
                transform: 'rotate(0deg)',
            },                    
            '100%': {
                transform: 'rotate(360deg)',
            }
        }
        
    }
}

export default Loader;