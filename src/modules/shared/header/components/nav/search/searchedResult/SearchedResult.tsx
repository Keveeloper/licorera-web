import { useSelector } from "react-redux";
import { selectSearched } from "../../../../../../../store/modules/search";
import { Box, Typography } from "@mui/material";
import { displayFlex } from "../../../../../recursiveStyles/RecursiveStyles";
import { paletteColors } from "../../../../../../../paletteColors/paletteColors";
import { displaySpaceBetweenColumn } from "../../../../../recursiveStyles/RecursiveStyles";
import { displaySpaceBetween } from "../../../../../recursiveStyles/RecursiveStyles";
import NumberFormat from "../../../../../hooks/numberFormater/NumberFormat";
import { useMemo } from "react";

const SearchedResult = () => {

    const searchedDataredux = useSelector(selectSearched);
    console.log('Qué es esto? ', searchedDataredux);
    
    return (
        // <h1>Hola mundo</h1>
        <Box>
            {
                searchedDataredux && (
                    searchedDataredux.map((item: any, index: any) => (
                        <Box sx={styles.searchCard}>
                            <Box sx={styles.searchCard.imageSide}>
                                <figure>
                                    <img src={item.product.image} alt={`Imagen de la cerveza: ${item.product.name}`} />
                                </figure>
                            </Box>
                            <Box sx={styles.searchCard.infoSide}>
                                <Typography sx={styles.searchCard.infoSide.title}>{item.product.name}</Typography>
                                <Typography style={{marginBottom: 'auto'}} fontSize={14}>{item.product.description.slice(0,70)}{'...'}</Typography>
                                <Box sx={styles.searchCard.infoSide.footer}>
                                    <Typography fontSize={14}>{`presentación: ` + item.presentation}</Typography>
                                    <Typography sx={styles.searchCard.infoSide.footer.price}>$ {NumberFormat(item.price)}</Typography>
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
        height: '137px',
        ...displayFlex,
        border: `1px solid ${paletteColors.gray}`,
        borderRadius: 4,
        // background: 'blue',
        overflow: 'hidden',
        imageSide: {
            width: '20%',
            height: '100%',
            // background: 'green',
            'figure': {
                padding: '10px',
                width: '100%',
                height: '100%',
                'img': {
                    height: '100%',
                }
            }
        },
        infoSide: {
            padding: '10px 20px 10px 10px',
            width: '80%',
            height: '100%',
            ...displaySpaceBetweenColumn,
            // background: 'red',
            title: {
                fontSize: '16px',
                fontFamily: 'weblysleekuisb',
            },
            footer: {
                ...displaySpaceBetween,
                price: {
                    fontSize: '16px',
                    fontFamily: 'HudsonNYSerif',
                }
            }
        }
    }
}

export default SearchedResult;