import { Box } from "@mui/material";
import { displayFlexColumnEnd } from "../../../recursiveStyles/RecursiveStyles";

const AppInfo = () => {
    return(
        <Box sx={styles.appInfoContainer}>
            <p style={styles.appInfoContainer.text}>Descarga nuestra App aquí</p>
            <figure>
                <img style={styles.appInfoContainer.image} src="/images/Apple_App_Store.png" alt="" />
                <img style={styles.appInfoContainer.image} src="/images/Google_Play_Store.png" alt="" />
            </figure>
            <p style={styles.appInfoContainer.text}>Síguenos en</p>
            <figure>
                <img src="/images/Instagram.png" alt="" />
                <img src="/images/Facebook.png" alt="" />
            </figure>
        </Box>
    );

}

const styles = {
    appInfoContainer: {
        paddingRight: '30px',
        width: '33.3%',
        ...displayFlexColumnEnd,
        image: {
            marginLeft: '20px',
            width: '140px',
        },
        text: {
            marginBottom: '10px',
            fontFamily: 'weblysleekuisb',
            fontWeight: 600,
        }
    }
}

export default AppInfo;