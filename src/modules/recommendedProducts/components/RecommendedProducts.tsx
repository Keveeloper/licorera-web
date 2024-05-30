import { Box, Grid, Typography } from "@mui/material";
import { displayFlex, displayFlexColumn, hudsonNYFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import zIndex from "@mui/material/styles/zIndex";
import { useSelector } from "react-redux";
import { selectAllSuggested } from "../../../store/modules/suggestedProducts";
import { Product } from "../../store/types";
import { productExchange } from "../../exchangeProducts/types";
import { storeActions } from "../../../store/modules/store";
import { useAppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import CardComponent from "../../shared/card/card.component";
import { CurrencyFormat } from "../../../utils/helpers";

const RecommendedProducts = () => {

    const suggestedRedux = useSelector(selectAllSuggested);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProduct = (product:Product) => {
        const mappedProduct: productExchange = {
          id: product.id,
          quantity: product.store.quantity,
          points: product.store.points || 0,
          price: product.store.price,
          status: product.store.status,
          start_date: product.store.start_date || "",
          end_date: product?.store?.end_date || "",
          isExchange: false,
          product_id: product.store.id,
          features: product.store.features_string,
          product: {
            id: product.store.id,
            name: product.name,
            serial: product.serial,
            lot: product.lot,
            image: product.image,
            quantity: product.store.quantity,
            points: product.store.points || undefined,
            description: product.description,
            category_id: product.category_id,
            created_at: product.created_at,
            updated_at: product.updated_at,
            deleted_at: product.deleted_at,
            presentation: product.store.presentation,
            discount: product.store.discount
          }
        }
          dispatch(storeActions.setProductDetail(mappedProduct))
          navigate("/product-detail")
    }
     
    return (
        <Box className='columnContainer'>
            <Box sx={styles.banner}>
                <Box sx={styles.banner.textContainer}>
                    <h1 style={styles.banner.textContainer.title} >Productos recomendados</h1>
                    <p style={styles.banner.textContainer.subtitle} >Encuentra aquí los productos que tenemos recomendados para ti.</p>
                </Box>
                <img style={styles.banner.bannerImage} src="images/background-recommended-products.png" alt="banner recommended products" />
            </Box>
            <Grid container spacing={2}>
            {suggestedRedux?.map((item: any) => {
                return (
                <Grid item xs={2.4} style={{ textAlign: "center" }}>
                    {item.discount > 0 && (
                        <div className="promotion">
                        <p>{item.discount}</p>
                        <p>%  off</p>
                        <img src="icons/discount.png" alt="" width={50}/>
                        </div>
                    )}
                    <CardComponent
                        style={cardStyle}
                    >
                        <Box onClick={() => handleProduct(item)}>
                            <img src={item.product.image} alt="" width={200} height={200}  style={{maxWidth: "100%"}}/>
                            <Typography style={styles.card.title}>
                                {item.name}
                            </Typography>
                            <Typography style={styles.card.subtitle}>
                                {item.presentation}
                            </Typography>
                            <Typography style={styles.card.content}>
                                {item.product.description.slice(0, 50)}
                            </Typography>
                            <Typography style={styles.card.price}>
                                {CurrencyFormat(item.price)}
                            </Typography>
                        </Box>
                    </CardComponent>
                </Grid>
                );
            })}
            </Grid>
        </Box>
     )

}

const cardStyle = {
    padding: '20px',
    borderRadius: '10px',
    height: '452px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor:"pointer",
    background: 'yellow'
}

const styles = {
    banner: {
        position: 'relative',
        margin: '70px auto',
        width: '100%',
        height: '300px',
        borderRadius: 5,
        displayFlex,
        overflow: 'hidden',
        bannerImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover' as 'cover',
        },
        textContainer: {
            position: 'absolute' as 'absolute',
            paddingLeft: '50px',
            width: '100%',
            height: '100%',
            ...displayFlexColumn,
            alignItems: 'start',
            background: 'rgb(0,0,0,0.6)',
            // zIndex: 2,
            title: {
                fontFamily: 'HudsonNYSerif',
                color: 'white',
                letterSpacing: '2px',
            },
            subtitle: {
                fontFamily: 'weblysleekuil',
                color: 'white',
                fontSize: '20px',
            }
        },
    },
    card: {
        img: {},
        title: {
          ...weblysleekFontStyle,
          fontSize: "19px",
          fontWeight: "600",
          height: "70px",
          marginTop: "10px"
        },
        subtitle: {
          ...weblysleekFontStyle,
          fontSize: "16px",
        },
        content: {
          ...weblysleekFontStyle,
          fontSize: "16px",
          fontWeight: "300",
          paddingTop: "0px",
        },
        price: {
          ...hudsonNYFontStyle,
          fontSize: "25px",
          padding: "20px 0 0 0",
        },
      },
}

export default RecommendedProducts;