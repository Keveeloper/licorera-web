import { Box, Typography } from "@mui/material";
import { displaySpaceBetween } from "../shared/recursiveStyles/RecursiveStyles";

const Experience = () => {

    return(
        <Box className='columnContainer' sx={styles.experiencesContainer}>
            <Typography sx={styles.experiencesContainer.subtitle}>las mejores experiencias</Typography>
            <Box sx={styles.experiencesContainer.imageContainer}>
                <img style={styles.experiencesContainer.imageContainer.image}  src="/images/moras.png" alt="" />
                <img style={styles.experiencesContainer.imageContainer.image} src="/images/papa.png" alt="" />
            </Box>
        </Box>
    );
}

const styles = {
    experiencesContainer: {
        subtitle: {
            margin: '50px 0 30px 0',
            fontFamily: 'HudsonNYSerif',
            fontWeight: 600,
            fontSize: '25px',
        },
        imageContainer: {
            width: '100%',
            ...displaySpaceBetween,
            image: {
                width: '49%'
            }
        }
    }
}

export default Experience;