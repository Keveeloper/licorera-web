import { Box, TextField } from "@mui/material";

const Nav = ({Children}: any) => {

    return(
        <Box sx={styles.navContainer}>
            {Children}
        </Box>
    );
}

const styles = {
    navContainer: {
        width: '100%',
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