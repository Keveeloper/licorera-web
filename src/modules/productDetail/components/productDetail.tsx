import { Grid, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";
import { useSelector } from "react-redux";
import { selectProductDetails } from "../../../store/modules/store/selectors/store.selector";
import { displayFlex, hudsonNYFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";

const ProductDetail = () => {
    const product = useSelector(selectProductDetails);
    
    return(
        <Grid
            className="columnContainer"
            container
            spacing={2}
            style={{
            padding: "30px 5%",
            }}
        >
            <Grid item xs={4} style={displayFlex}>
                <img src={product?.product.image} alt="" width={350} height={350} />
            </Grid>
            <Grid item xs={8}>
                <Typography style={style.name}>{product?.product.name}</Typography>
                <Typography style={style.description} sx={{ mt: 2 }}>{product?.product.description}</Typography>
                <Typography style={style.points}>{product?.points} J</Typography>
                <Typography style={style.quantity} sx={{ mt: 2 , mb:4}}>Disponibles: {product?.quantity}</Typography>
                    <Grid
                        className="columnContainer"
                        container
                        spacing={0}
                       
                    >
                        <Grid item xs={6}>
                            <ButtonComponent style={style.shareButton}>
                                COMPARTIR
                            </ButtonComponent>
                        </Grid>
                        <Grid item xs={6}>
                            <ButtonComponent style={style.saveButton}>
                                CANJEAR
                            </ButtonComponent>
                        </Grid>
                    </Grid>
            </Grid>
        </Grid>
    )
}
export default ProductDetail;

const style = {
    name:{
        ...hudsonNYFontStyle,
        fontSize: "45px",
    },
    description:{
        ...weblysleekFontStyle,
        fontSize: "22px",
        fontWeight:"300"
    },
    points:{
        ...hudsonNYFontStyle,
        fontSize: "45px",
    },
    quantity:{
        ...weblysleekFontStyle,
        fontSize: "22px",
        fontWeight:"600"
    },
    shareButton:{
        ...hudsonNYFontStyle,
        fontSize: "22px",
        background:"#FFFFFF",
        width: '278px',
        height: '48px',
        borderRadius: '5px',
        padding: '0 0 5px 0',
    },
    saveButton:{
        ...hudsonNYFontStyle,
        color: "#FFFFFF",
        fontSize: "22px",
        background:"#99791C",
        width: '278px',
        height: '48px',
        border:"none",
        borderRadius: '5px',
        padding: '0 0 5px 0'
       
    }
}