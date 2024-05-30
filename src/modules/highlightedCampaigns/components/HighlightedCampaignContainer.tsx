import { Box, Grid, Typography, Button } from "@mui/material";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";
import { displaySpaceBetweenColumn } from "../../shared/recursiveStyles/RecursiveStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCampaigns } from "../../../store/modules/campaigns";
import CardComponent from "../../shared/card/card.component";
import { CampaignInterface } from "../types/types";
import { selectLoadingCampaigns } from "../../../store/modules/campaigns/selectors/campaigns.selector";
import './HighlightedCampaignContainer.css';
import NumberFormat from "../../shared/hooks/numberFormater/NumberFormat";
import { Height } from "@mui/icons-material";
import { useAppDispatch } from "../../../store/store";
import { productExchange } from "../../exchangeProducts/types";
import { storeActions } from "../../../store/modules/store";

const HighlightedCampaignContainer = (props: CampaignInterface) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const highlightedCampaign = location?.state?.highlightedCampaign;
    // const campaingDataredux = useSelector(selectAllCampaigns);
    const loadingStatus = useSelector(selectLoadingCampaigns);
    const { campaignProducts, setCampaignProducts } = props;

    const handleClick = (item: any) => {
        console.log(item);
        
        const mappedProduct: productExchange = {
        id: item.store.product.id,
        quantity: item.store.quantity,
        points: item.store.points || 0,
        price: item.store.price,
        status: item.store.status,
        start_date: item.store.start_date || "",
        end_date: item?.store.end_date || "",
        isExchange: false,
        product_id: item.store.product.id,
        features: [''],
        product: {
            id: item.store.product.id,
            name: item.store.product.name,
            serial: item.store.product.serial,
            lot: item.store.product.lot,
            image: item.store.product.image,
            quantity: item.store.quantity,
            points: item.store.points || undefined,
            description: item.store.product.description,
            category_id: item.store.product.category_id,
            created_at: item.store.product.created_at,
            updated_at: item.store.product.updated_at,
            deleted_at: item.store.product.deleted_at
        }
        }
        dispatch(storeActions.setProductDetail(mappedProduct))
        navigate("/product-detail")
    }

    const goToStore = () => {
        const categoryId = {
            id: highlightedCampaign?.categoryId
        }
        navigate("/store", { state: { categoryId } });
    }

    return (
        <Box className={'columnContainer'}>
            <Box sx={styles.headerContainer}>
                <figure style={styles.headerContainer.imgContainer}>
                    <img style={styles.headerContainer.imgContainer.campaignImage} src={highlightedCampaign.mainImageUrl} alt="" />
                </figure>
            </Box>
            <Box sx={styles.infoContainer}>
                <Typography sx={styles.infoContainer.title}>{highlightedCampaign.name}</Typography>
                <Typography sx={styles.infoContainer.description}>
                    {highlightedCampaign.description}
                </Typography>
            </Box>
            {highlightedCampaign.type === 1 && (
                <Box sx={styles.productsContainer}>
                    <Typography sx={styles.productsContainer.subtitle}>Productos</Typography>
                    <Grid container spacing={2} sx={styles.productsContainer.gridContainer}>
                        {loadingStatus === 'loaded' && campaignProducts.map((item: any, index: any) => (
                            <Grid item xs={2.4} sx={styles.productsContainer.gridContainer.cardColumn}>
                                <CardComponent
                                    style={styles.productsContainer.gridContainer.cardColumn.card}
                                >
                                    <Box onClick={() => handleClick(item)}>
                                        <figure style={styles.productsContainer.gridContainer.cardColumn.card.imageContainer}>
                                            <img className="productImage" src={item.store.product.image} alt="" />
                                        </figure>
                                        <Box sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo}>
                                            <Typography sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo.title}>{item.store.product.name}</Typography>
                                            <Typography sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo.presentation}>{item.store.presentation}</Typography>
                                            <Typography sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo.presentation}>{item.store.product.description.slice(0, 50)}...</Typography>
                                            <Typography sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo.price}>$ {NumberFormat(parseInt(item.store.price))}</Typography>
                                        </Box>
                                    </Box>
                                </CardComponent>
                            </Grid>
                        ))}
                        
                    </Grid>
                </Box>
            )}
            {highlightedCampaign.type === 2 && (
                <Button
                    sx={styles.productsButton}
                    variant="outlined" 
                    fullWidth 
                    color="inherit"
                    onClick={goToStore}
                >
                    Ver productos
                </Button>
            )}
        </Box>
    );

}

const styles = {
    headerContainer: {
        margin: '50px 0',
        width: '100%',
        height: '600px',
        imgContainer: {
            margin: 0,
            width: '100%',
            height: '100%',
            ...displayFlex,
            campaignImage: {
                height: '100%',
                borderRadius: 20,
            }
        }
    },
    infoContainer: {
        width: '100%',
        title: {
            marginBottom: '25px',
            textAlign: 'center',
            fontFamily: 'HudsonNYSerif',
            fontSize: '25px'
        },
        description: {
            marginBottom: '25px',
            fontFamily: 'weblysleekuil',
            fontSize: '20px'
        }
    },
    productsContainer: {
        subtitle: {
            marginBottom: '25px',
            fontFamily: 'HudsonNYSerif',
            fontSize: '25px'
        },
        gridContainer: {
            padding: 0,
            cardColumn: {
                padding: '10px 10px !important', 
                ...displayFlex,
                card: {
                    padding: "20px", 
                    width: '100%',
                    height: '452px', 
                    borderRadius: "10px",
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    imageContainer: {
                        margin: 0,
                        padding: 0,
                        with: '100%',
                        height: '40%',
                        productImage: {
                            with: '100%' as '100%',
                        }
                    },
                    productInfo: {
                        height: '60%',
                        ...displaySpaceBetweenColumn,
                        title: {
                            fontFamily: 'weblysleekuisb',
                            fontSize: '19px',
                            textAlign: 'center',
                        },
                        presentation: {
                            fontFamily: 'weblysleekuil',
                            fontSize: '16px',
                            textAlign: 'center',
                        },
                        price: {
                            fontFamily: 'HudsonNYSerif',
                            fontSize: '20px',
                            textAlign: 'center',
                        }
                    }
                }
            }
        }
    },
    productsButton: {
        marginBottom: '100px', 
        padding: '10px',
        fontFamily: 'HudsonNYSerif',
        fontSize: '20px',
        // lineHeight: 1,
    }
}

export default HighlightedCampaignContainer;