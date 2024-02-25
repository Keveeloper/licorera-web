import { Box } from "@mui/material";

const LicoreraInfo = () => {
    return(
        <Box sx={styles.licoreraInfoContainer}>
            <img src="/images/logo-3jjj.png" width={80} alt="" />
            <p>Licorera Tres Jotas</p>
            <p>Cra 26 # 33 - 17</p>
            <p>Cañaveral, Floridablanca, Santander</p>
            <p>6392474 - 6799493 - 3153521966 - 3154835560</p>
        </Box>
    );

}

const styles = {
    licoreraInfoContainer: {
        paddingLeft: '30px',
        width: '33.3%',
        height: '100%',
        'p': {
            fontFamily: 'weblysleekuisb'
        }
    }
}

export default LicoreraInfo;