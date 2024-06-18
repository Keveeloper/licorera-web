import { Box } from "@mui/joy";
import { Typography } from "@mui/material";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";

const UserAddPayment = () => {

    return (
        <>
            <Box sx={styles.titleContainer}>
                <img style={styles.titleContainer.arrowImage} src="/icons/Keyboard-arrow-left.png" alt="" />
                <Typography sx={styles.titleContainer.title}>agregar método de pago</Typography>
            </Box>
            <Box sx={styles.formContainer}>
                <Typography sx={styles.formContainer.cardNumberLabel}>Número de la tarjeta</Typography>
            </Box>
        </>
    );

}

const styles = {
    titleContainer: {
        width: '100%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        arrowImage: {
            height: '100%',
        },
        title: {
            margin: '0 auto',
            fontFamily: "HudsonNYSerif",
            fontSize: '30px',
            textAlign: 'center',
        }
    },
    formContainer: {
        margin: '80px auto 0 auto',
        width: '80%',
        cardNumberLabel: {
            fontFamily: 'weblysleekuisb',
            fontSize: '18px',
        }
    }
}

export default UserAddPayment;