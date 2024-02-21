import { displayFlex } from "../../../../recursiveStyles/RecursiveStyles";

// MUI components
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '50%',
    borderRadius: '10px',
    border: '1px solid #9E9E9E'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    ...displayFlex
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    color: 'inherit',
    fontFamily: 'weblysleekuil',
    fontSize: '14px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));

const SearchBar = () => {

    return(
        <Box sx={styles.searchContainer}>
            <p style={styles.searchContainer.text}>
                ¿ QUE QUIERES TOMAR HOY ?
            </p>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon fontSize="small" />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Old parr, Whisky, Cervezas"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </Box>
    );

}

const styles = {

    searchContainer: {
        width: '37.5%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'blue',
        text: {
            marginBottom: '5px',
            fontFamily: 'Hudson NY Serif',
            fontSize: '14px',
            fontWeight: 600
        },
        search: {
            width: '50%',
        },
    },
}

export default SearchBar;