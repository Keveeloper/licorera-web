import { useSelector } from "react-redux";
import { selectSearched } from "../../../../../../../store/modules/search";
import { Box, Typography } from "@mui/material";
import { displayFlex } from "../../../../../recursiveStyles/RecursiveStyles";
import { paletteColors } from "../../../../../../../paletteColors/paletteColors";
import { displaySpaceBetweenColumn } from "../../../../../recursiveStyles/RecursiveStyles";
import { displaySpaceBetween } from "../../../../../recursiveStyles/RecursiveStyles";

const SearchedResult = () => {

    const searchedDataredux = useSelector(selectSearched);
    console.log('Qué es esto? ', searchedDataredux);
    
    return (
        // <h1>Hola mundo</h1>
        <Box>
            {
                searchedDataredux && (
                    searchedDataredux.map((item: any) => (
                        <Box sx={styles.searchCard}>
                            <Box sx={styles.searchCard.imageSide}>
                                <figure>
                                    <img src={item.product.image} alt={`Imagen de la cerveza: ${item.product.name}`} />
                                </figure>
                            </Box>
                            <Box sx={styles.searchCard.infoSide}>
                                <Typography fontSize={14}>{item.product.name}</Typography>
                                <Typography style={{marginBottom: 'auto'}} fontSize={14}>{item.product.description.slice(0,70)}{'...'}</Typography>
                                <Box sx={styles.searchCard.infoSide.footer}>
                                    <Typography fontSize={14}>{`presentación: ` + item.presentation}</Typography>
                                    <Typography fontSize={14}>{item.price}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))
                )
            }
        </Box>
        
    )

}

const styles = {
    searchCard: {
        margin: '10px auto 0 auto',
        width: '95%',
        height: '113px',
        ...displayFlex,
        border: `1px solid ${paletteColors.gray}`,
        borderRadius: 4,
        // background: 'blue',
        overflow: 'hidden',
        imageSide: {
            width: '30%',
            height: '100%',
            // background: 'green',
            'figure': {
                width: '100%',
                height: '100%',
                'img': {
                    height: '100%',
                }
            }
        },
        infoSide: {
            padding: '10px',
            width: '70%',
            height: '100%',
            ...displaySpaceBetweenColumn,
            // background: 'red',
            footer: {
                ...displaySpaceBetween,
            }
        }
    }
}

export default SearchedResult;