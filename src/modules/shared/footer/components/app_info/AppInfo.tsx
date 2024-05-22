import { Box } from "@mui/material";
import { displayFlexColumnEnd } from "../../../recursiveStyles/RecursiveStyles";
import { Link } from "react-router-dom";

const AppInfo = () => {
    return(
        <Box sx={styles.appInfoContainer}>
            <p style={styles.appInfoContainer.text}>Descarga nuestra App aquí</p>
            <figure>
                <Link to='https://apps.apple.com/co/app/licorera-tres-jotas/id1178470906'>
                    <img style={styles.appInfoContainer.image} src="/images/Apple_App_Store.png" alt="" />
                </Link>
                <Link to='https://play.google.com/store/apps/details?id=com.licorera3jjjs.app&hl=es_CO&gl=US'>
                    <img style={styles.appInfoContainer.image} src="/images/Google_Play_Store.png" alt="" />
                </Link>
            </figure>
            <p style={styles.appInfoContainer.text}>Síguenos en</p>
            <figure>
                <Link to='https://www.instagram.com/licoreratresjotas'>
                    <img src="/images/Instagram.png" alt="" />
                </Link>
                <Link to='https://www.facebook.com/licoreratresjotas'>
                    <img src="/images/Facebook.png" alt="" />
                </Link>
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