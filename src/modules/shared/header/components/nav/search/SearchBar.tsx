import { displayFlex } from "../../../../recursiveStyles/RecursiveStyles";

// MUI components
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { paletteColors } from "../../../../../../paletteColors/paletteColors";
import { useContext, useEffect, useState } from "react";
import { searchContext } from "../../../../../../context/searchContext";
import SearchedResult from "./searchedResult/SearchedResult";
import { useAppDispatch } from "../../../../../../store/store";
import { getSearchedThunk } from "../../../../../../store/modules/search/actions/search.actions";
import { useDispatch } from "react-redux";
import { searchedActions } from "../../../../../../store/modules/search";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '80%',
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
    fontFamily: 'weblysleekuisb',
    fontSize: '14px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));

const SearchBar = () => {

    const dispatch = useAppDispatch();
    const dispatchClear = useDispatch();
    const { searching, setSearching } = useContext(searchContext);
    const [ searchedText, setSearchedText ] = useState<string>('');
    const [ searchLoading, setSearchLoading ] = useState<boolean>(true);

    const handleBlur = () => {
        setTimeout(() => {
            setSearchedText('');
            setSearching(false);
            dispatchClear(searchedActions.clearPersonalInfo());
        }, 500);
    }

    useEffect(() => {
        setSearchLoading(true);
        const delayDebounceFn = setTimeout(() => {
            if(searchedText) {
                setSearching(true);
                dispatch(getSearchedThunk(searchedText)).unwrap().finally(() => {
                    setSearchLoading(false);
                });                
            }
        }, 500);
        
        if (!searchedText) {
            setSearching(false);
            dispatchClear(searchedActions.clearPersonalInfo());
            setSearchLoading(false);
        }    
        return () => clearTimeout(delayDebounceFn)
    }, [searchedText]);

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
                    value={searchedText}
                    onChange={(e: any) => setSearchedText(e.target.value)}
                    onBlur={handleBlur}
                />
            </Search>
            {searching && (
                <Box sx={styles.searchContainer.resultsPivot}>
                    <Box sx={styles.searchContainer.resultsPivot.resultsContainer}>
                        {searchLoading ? 
                            <figure style={styles.searchContainer.resultsPivot.resultsContainer.searchLoaderContainer}>
                                <img src="/images/Loader-background.png" alt="loader square background" />
                                <img 
                                    style={styles.searchContainer.resultsPivot.resultsContainer.searchLoaderContainer.loaderSpinner} 
                                    src="/images/loader-circle.png" alt="loader circle spinner" 
                                />
                            </figure>
                        :
                            <SearchedResult 
                                searchedText={searchedText}
                                setSearchedText={setSearchedText}
                            />
                        }
                    </Box>
                </Box>
            )}
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
            fontFamily: 'HudsonNYSerif',
            fontSize: '16px',
        },
        search: {
            width: '50%',
        },
        resultsPivot: {
            position: 'relative',
            width: '80%',
            resultsContainer: {
                position: 'absolute',
                paddingBottom: '10px',
                width: '100%',
                height: '600px',
                borderRadius: 4,
                background: paletteColors.white,
                // boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                zIndex: 3,
                overflow: 'auto',
                scrollbarWidth: 'none',
                searchLoaderContainer: {
                    position: 'relative' as 'relative',
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    loaderSpinner: {
                        position: 'absolute' as 'absolute',
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
        }
    },
}

export default SearchBar;