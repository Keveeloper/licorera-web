import { useDispatch, useSelector } from "react-redux";
import { selectSearched } from "../../../../../../../store/modules/search";
import { Box, Grid, Typography } from "@mui/material";
import { displayFlex, displayFlexColumn } from "../../../../../recursiveStyles/RecursiveStyles";
import { paletteColors } from "../../../../../../../paletteColors/paletteColors";
import { displaySpaceBetweenColumn } from "../../../../../recursiveStyles/RecursiveStyles";
import { displaySpaceBetween } from "../../../../../recursiveStyles/RecursiveStyles";
import NumberFormat from "../../../../../hooks/numberFormater/NumberFormat";
import { SearchInterface } from "../types/types";
import { selectAllSuggested } from "../../../../../../../store/modules/suggestedProducts";
import { Promotion } from "../../../../../../../store/modules/search/types";
import './searchResult.css';
import { useAppDispatch } from "../../../../../../../store/store";
import { storeActions } from "../../../../../../../store/modules/store";
import { useNavigate } from "react-router-dom";
import { productExchange } from "../../../../../../exchangeProducts/types";
import zIndex from "@mui/material/styles/zIndex";

const SearchedResult = (props: SearchInterface) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { searchedText } = props;
    const searchedDataredux = useSelector(selectSearched);
    const suggestedProductsDataredux = useSelector(selectAllSuggested);
    console.log('suggestedProductsDataredux: ', suggestedProductsDataredux);
    

    const handleProduct = (item: Promotion) => {
        const mappedProduct: productExchange = {
          id: item.id,
          quantity: item.quantity,
          points: item.points || 0,
          price: item.price,
          status: item.status,
          start_date: item.start_date || "",
          end_date: item?.end_date || "",
          isExchange: false,
          product_id: item.product.id,
          features: item.features_string,
          product: {
            id: item.product.id,
            name: item.product.name,
            serial: item.product.serial,
            lot: item.product.lot,
            image: item.product.image,
            quantity: item.quantity,
            points: item.points || undefined,
            description: item.product.description,
            category_id: item.product.category_id,
            created_at: item.product.created_at,
            updated_at: item.product.updated_at,
            deleted_at: item.product.deleted_at
          }
        }
        dispatch(storeActions.setProductDetail(mappedProduct))
        navigate("/product-detail")
      }
    
    return (
        // <h1>Hola mundo</h1>
        <Box sx={{position: 'relative'}}>
            {
                searchedDataredux.length > 0 ? 
                    searchedDataredux.map((item: any, index: any) => (
                        <Box sx={styles.searchCard} onClick={() => handleProduct(item)}>
                            <Box sx={styles.searchCard.imageSide}>
                                <figure>
                                    <img src={item.product.image} alt={`Imagen de la cerveza: ${item.product.name}`} />
                                    {item.discount && (
                                        <figure>
                                            <img style={styles.searchCard.imageSide.figure.figure.discountImage} src="/icons/discount.png" alt="" />
                                            <Typography sx={styles.searchCard.imageSide.figure.figure.text1}>{item.discount}</Typography>
                                            <Typography sx={styles.searchCard.imageSide.figure.figure.text2}>%Off</Typography>
                                        </figure>
                                    )}
                                </figure>
                            </Box>
                            <Box sx={styles.searchCard.infoSide}>
                                <Typography sx={styles.searchCard.infoSide.title}>{item.product.name}</Typography>
                                <Typography style={{margin: '10px 0 auto 0'}} fontSize={14}>{item.product.description.slice(0,70)}{'...'}</Typography>
                                <Box sx={item.points ? styles.searchCard.infoSide.footerJotas : styles.searchCard.infoSide.footer}>
                                    {item.points ?
                                        <Typography sx={styles.searchCard.infoSide.footer.price}>{NumberFormat(item.points)} J</Typography>
                                    :
                                        <>
                                            <Typography fontSize={14}>{`Presentación: ` + item.presentation}</Typography>
                                            <Typography sx={styles.searchCard.infoSide.footer.price}>$ {NumberFormat(item.price)}</Typography>
                                        </>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    ))
                :
                <>
                    <Box sx={styles.noResultsHeader}>
                        <Typography sx={styles.noResultsHeader.title}>No obtuvimos resultados para</Typography>
                        <Typography>"{searchedText}"</Typography>
                    </Box>
                    <Box sx={styles.noResultsHeader.mightContainer}>
                        <Typography sx={styles.noResultsHeader.mightContainer.subtitle}>Te podría interesar</Typography>
                    </Box>
                    <Box sx={styles.noResultsHeader.recommendedContainer}>
                    {suggestedProductsDataredux && ( suggestedProductsDataredux.map((item: any, index: any) => (
                        <Box sx={styles.noResultsHeader.recommendedContainer.recommendedProduct} onClick={() => handleProduct(item)}>
                            <figure style={styles.noResultsHeader.recommendedContainer.recommendedProduct.imgContainer}>
                                {item.discount && (
                                    <figure style={styles.noResultsHeader.recommendedContainer.recommendedProduct.imgContainer.promotionContainer}>
                                        <Typography sx={styles.noResultsHeader.recommendedContainer.recommendedProduct.imgContainer.promotionContainer.discountNumber}>{item.discount}</Typography>
                                        <Typography sx={styles.noResultsHeader.recommendedContainer.recommendedProduct.imgContainer.promotionContainer.discountOff}>% off</Typography>
                                        <img style={styles.noResultsHeader.recommendedContainer.recommendedProduct.imgContainer.promotionContainer.promotionIcon} src="/icons/discount.png" alt=""/>
                                    </figure>
                                )}
                                <img className="productImage"src={item.product.image} alt={`imagen del producto: ${item.product.name}`}/>
                            </figure>
                            <Box sx={styles.noResultsHeader.recommendedContainer.recommendedProduct.infoSearchedContainer}>
                                <Typography sx={styles.noResultsHeader.recommendedContainer.recommendedProduct.infoSearchedContainer.productName}>{item.product.name}</Typography>
                                <Typography sx={styles.noResultsHeader.recommendedContainer.recommendedProduct.infoSearchedContainer.description}>{item.presentation}</Typography>
                                <Typography sx={styles.noResultsHeader.recommendedContainer.recommendedProduct.infoSearchedContainer.description}>{item.product.description.slice(0, 70)}...</Typography>
                                <Typography sx={styles.noResultsHeader.recommendedContainer.recommendedProduct.infoSearchedContainer.price}>$ {NumberFormat(item.price)}</Typography>
                            </Box>
                        </Box>
                    ))
                    )
                    }
                    </Box>
                </>
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
        cursor: 'pointer',
        border: `1px solid ${paletteColors.gray}`,
        borderRadius: 4,
        // background: 'blue',
        overflow: 'hidden',
        imageSide: {
            width: '30%',
            height: '100%',
            // background: 'green',
            'figure': {
                position: 'relative' as 'relative',
                padding: '10px',
                width: '100%',
                height: '100%',
                'img': {
                    height: '100%',
                },
                'figure': {
                    position: 'absolute' as 'absolute',
                    padding: 3,
                    top: 10,
                    left: 10,
                    width: '35px',
                    height: '35px',
                    ...displayFlexColumn,
                    discountImage: {
                        position: 'inherit' as 'inherit',
                        width: '100%',
                        height: '100%',
                    },
                    text1: {
                        margin: 0,
                        padding: 0,
                        fontFamily: 'HudsonNYSerif',
                        fontSize: '14px',
                        color: paletteColors.white,
                        zIndex: 2
                    },
                    text2: {
                        margin: 0,
                        padding: 0,
                        fontFamily: 'weblysleekuisb',
                        // fontFamily: 'HudsonNYSerif',
                        fontSize: '8px',
                        color: paletteColors.white,
                        zIndex: 2
                    }
                }
            }
        },
        infoSide: {
            padding: '10px 20px 10px 10px',
            width: '70%',
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
            },
            footerJotas: {
                display: 'flex',
                justifyContent: 'flex-end',
            }
        }
    },
    noResultsHeader: {
        padding: '10px',
        width: '100%',
        ...displayFlexColumn,
        // overflow: 'auto',
        title: {
            marginBottom: '10px',
            fontSize: '16px',
            fontFamily: 'HudsonNYSerif',
        },
        mightContainer: {
            margin: '0 auto',
            width: '95%',
            subtitle: {
                fontFamily: 'weblysleekuisb',
            },
        },
        recommendedContainer: {
            margin: '10px auto 0 auto',
            width: '95%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'minmax(100px, 1fr)',
            columnGap: '20px',
            rowGap: '15px',
            recommendedProduct: {
                minHeight: '284px',
                maxHeight: '284px',
                border: '1px solid rgb(190, 190, 190)',
                borderRadius: '10px',
                cursor: 'pointer',
                imgContainer: {
                    position: 'relative' as 'relative',
                    margin: 0,
                    padding: '5px',
                    width: '100%',
                    height: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    promotionContainer: {
                        position: 'absolute' as 'absolute',
                        margin: 0,
                        width: '40px',
                        height: '40px',
                        top: '16px',
                        left: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column' as 'column',
                        discountNumber: {
                            margin: 0,
                            padding: 0,
                            fontFamily: 'HudsonNYSerif',
                            fontSize: '16px',
                            color: 'white',
                            zIndex: 1,
                        },
                        discountOff: {
                            marginBottom: '5px',
                            padding: 0,
                            fontFamily: 'HudsonNYSerif',
                            fontSize: '6px',
                            color: 'white',
                            zIndex: 1,
                        },
                        promotionIcon: {
                            position: 'absolute' as 'absolute',
                        }
                    },
                    productImage: {
                        // height: '100%' as '100%',
                        objectFit: 'contain',    
                    }
                },
                infoSearchedContainer: {
                    padding: '10px 0',
                    width: '100%',
                    height: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    productName: {
                        padding: '5px',
                        fontFamily: 'weblysleekuisb',
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: '21.28px',
                        textAlign: 'center',
                    },
                    description: {
                        margin: '10px 0 auto 0',
                        padding: '0px 10px 0 10px',
                        fontFamily: 'weblysleekuil',
                        fontSize: '12px',
                        textAlign: 'center',
                        fontWeight: 300,
                    },
                    price: {
                        margin: 0,
                        fontSize: '18px',
                        fontFamily: 'HudsonNYSerif',
                    }
                }
            }
        }
    }
}

export default SearchedResult;