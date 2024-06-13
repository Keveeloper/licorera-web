import { Box } from "@mui/material"

interface LoaderInterface {
    screenLoader: boolean;
}
const Loader = (props: LoaderInterface) => {

    const { screenLoader } = props;
    const styles = loaderStyles(screenLoader);

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

const loaderStyles = (screenLoader: boolean) => ({
    loaderContainer: {
        // width: '100vw',
        width: screenLoader ? '100vw' : '100%',
        // height: '100vh',
        height: screenLoader ? '100vh' : '100%',
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
});

export default Loader;