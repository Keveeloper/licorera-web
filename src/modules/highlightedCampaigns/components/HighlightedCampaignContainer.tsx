import { Box, Grid, Typography } from "@mui/material";
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
                                    <figure style={styles.productsContainer.gridContainer.cardColumn.card.imageContainer}>
                                        <img className="productImage" src={item.store.product.image} alt="" />
                                    </figure>
                                    <Box sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo}>
                                        <Typography sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo.title}>{item.store.product.name}</Typography>
                                        <Typography sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo.presentation}>{item.store.presentation}</Typography>
                                        <Typography sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo.presentation}>{item.store.product.description.slice(0, 50)}...</Typography>
                                        <Typography sx={styles.productsContainer.gridContainer.cardColumn.card.productInfo.price}>$ {NumberFormat(parseInt(item.store.price))}</Typography>
                                    </Box>
                                </CardComponent>
                            </Grid>
                        ))}
                        
                    </Grid>
                </Box>
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
    }
}

export default HighlightedCampaignContainer;