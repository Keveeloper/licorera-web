import { Box, TextField } from "@mui/material";

const Nav = () => {

    return(
        <Box sx={styles.navContainer}>
            <figure>
                <img src="/images/logo-3jjj.png" width={80} alt="" />
            </figure>
            <Box sx={styles.navContainer.searchContainer}>
                <p style={styles.navContainer.searchContainer.text}>
                    ¿ QUE QUIERES TOMAR HOY ?
                </p>
                <TextField
                    size="small"
                    sx={styles.navContainer.searchContainer.search}
                    // id="demo-helper-text-aligned"
                    label="Old parr, Whisky, Cervezas"
                />
            </Box>
            <Box sx={styles.navContainer.menuContainer}>

            </Box>
        </Box>
    );
}

const styles = {
    navContainer: {
        width: '100vw',
        height: '120px',
        display: 'flex',
        borderBottom: 'solid 1px',
        // backgroundColor: 'blue',
        'figure': {
            width: '10%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'yellow'
        },
        searchContainer: {
            width: '45%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'blue',
            text: {
                marginBottom: '5px',
                fontSize: '14px',
                fontWeight: 600
            },
            search: {
                width: '50%',
            },
        },
        menuContainer: {
            width: '45%',
            height: '100%',
            // backgroundColor: 'green'
        }
    }
}
export default Nav;