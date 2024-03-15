import { Grid, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";
import { useSelector } from "react-redux";
import { selectProductDetails } from "../../../store/modules/store/selectors/store.selector";
import { displayFlex, hudsonNYFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import useCartHook from "../../shared/hooks/cartHook/useCartHook";
import { Product } from "../../exchangeProducts/types";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { useState } from "react";
import { selectAllUser } from "../../../store/modules/users/selectors/users.selector";


const ProductDetail = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    
    const product = useSelector(selectProductDetails);
    const user = useSelector(selectAllUser);
    const { addToCart } = useCartHook();

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const handleErrorClose = () => {
        setShowError(false);
    };

    const setCart = () => {
        const newProduct: Product = {
            quantity:1,
            name: product?.product.name || "",
            id: product?.product.id || 0,
            image: product?.product.image || "",
            description: product?.product.description || "",
            category_id: product?.product.category_id || 0,
        }
        if(product){
            addToCart(newProduct);
        }
        setShowAlert(false);
    }

    const handleSave = () => {
        if(product && product?.points <= user.points){
            setShowAlert(true);
        }else{
            setShowError(true);
        }
        
    }

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
                            <ButtonComponent style={style.saveButton} onClick={handleSave}>
                                CANJEAR
                            </ButtonComponent>
                        </Grid>
                    </Grid>
            </Grid>
            <ModalAlertComponent 
               handleClose={handleAlertClose}
               handleSave={setCart}
               open={showAlert}
               isCancellButton
               data={{
                 title:`${product?.product.name}`,
                 content:`¿Quieres cajearlo por ${product?.points} J?`,
                 img:`${product?.product.image}`
               }}/>

            <ModalAlertComponent 
               handleClose={handleErrorClose}
               handleSave={handleErrorClose}
               open={showError}
               data={{
                 title:"INFORMACIÓN",
                 content:`No tienes los puntos suficientes para canjear este producto. Sigue comprando y acumula.`,
                 img:"icons/alert.png"
               }}/>
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
        padding: '0 0 5px 0',
        cursor:'pointer'
    }
}