import { Box, Grid, Typography } from "@mui/material";
import DrawerComponent from "../shared/drawer/drawer.component";
import { hudsonNYFontStyle, weblysleekFontStyle } from "../shared/recursiveStyles/RecursiveStyles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../store/modules/cart/selectors/cart.selector";
import CardComponent from "../shared/card/card.component";
import useCartHook from "../shared/hooks/cartHook/useCartHook";
import "./cart.screen.css"
import { Product } from "../exchangeProducts/types";

interface cartInterface {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

const Cart: React.FC<cartInterface> = ({ open, toggleDrawer }) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const products = useSelector(selectCartProducts);
    const [count, setCount] = useState(1);
    
    const { removeCartItem, updateCartItem } = useCartHook();

    const onMinus = (product:Product) => {
        if(count > 1){
            setCount(count - 1)
            const updatedProduct = { ...product, quantity: product.quantity - 1 };
            updateCartItem(updatedProduct)
        }
    }

    const onPlus = (product:Product) => {
        setCount(count + 1)
        const updatedProduct = { ...product, quantity: product.quantity + 1 };
        updateCartItem(updatedProduct)
    }

    const removeProduct = (id:number) =>{
        removeCartItem(id)
    }

    useEffect(() => {
        if(products.length === 0){
            setIsEmpty(true)
        }
    },[])
    
    return (
        <DrawerComponent open={open} anchor="right" toggleDrawer={toggleDrawer}>
        <Box sx={{ width: 350, textAlign: 'center'}} role="presentation">
            {isEmpty && (
                <>
                <Typography style={style.emptyCart.title}>TU CARRITO</Typography>
                <Typography style={style.emptyCart.subTitle}>tu carrito está vacio</Typography>
                <img src="/images/empty_phone.png" alt="" width={100}/>
                <Typography style={style.emptyCart.text} >Todo lo que necesitas en un solo lugar</Typography>
                </>
            )}
            {!isEmpty && (
                <>
                <Typography style={style.emptyCart.title}>TU CARRITO</Typography>
                <div style={{padding: '20px'}}>
                    {products.map((item: any) => {
                    return (
                        <CardComponent
                        style={{ padding: "10px", marginBottom: '10px',borderRadius: "10px",  cursor: 'pointer' }}
                        >
                        <Grid
                                className="columnContainer"
                                container
                                spacing={0}
                                style={{
                                // padding: "10px 20px",
                                }}
                                // onClick={() =>cardHandle(item)}
                            >
                                <Grid item xs={3}>
                                    <img src={item.image} alt="" width={100} height={100} />
                                </Grid> 
                                <Grid item xs={6}>
                                    <Typography style={style.cards.title}>{item.name}</Typography>
                                    <Typography style={style.cards.quantity} ></Typography>
                                </Grid>
                                <Grid item  xs={3} sx={{ mt: 0, mb:0}}>
                                    <img style={style.cards.close} src="/icons/vector_close.png" onClick={() => removeProduct(item.id)} />
                                    <Typography style={style.cards.price} sx={{mt:6,  mb:-1}} >$ 170.000</Typography>
                                    <div  className="iconContainer" onClick={() => onMinus(item)} style={count === 1 ?  minusDisabled : {width:"20px", height:"20px"} }>
                                        <span className="icon" id="icono-menos" style={{fontSize: '30px', margin: '-7px 0 0 -12px'}}>-</span>
                                    </div>
                                    <span className="normalText" style={{margin: '0px', fontSize:'18px'}}> {item.quantity} </span> 
                                    <div  className="iconContainer" onClick={() => onPlus(item)} style={{width:"20px", height:"20px"}}>
                                        <span className="icon" id="icono-mas" style={{fontSize: '30px', margin: '-7px 0 0 -19px'}}>+</span>
                                    </div>
                                   
                                </Grid>
                            </Grid>   
                        </CardComponent>
                    )
                    })}
                </div>
                </>
            )}
        </Box>
        </DrawerComponent>
    );
};
export default Cart;

const style: React.CSSProperties | any = {
    emptyCart:{
        title:{
            ...hudsonNYFontStyle,
            padding: '25px 0',
            background: '#404040',
            color: '#FFFFFF',
            fontSize:"20px"
        },
        subTitle:{
            ...hudsonNYFontStyle,
            padding: '20px 0',
        },
        text:{
            ...weblysleekFontStyle,
            padding: '20px 0',
            fontSize:"12px"
        }
    },
    cards:{
        title:{
            ...weblysleekFontStyle,
            fontWeight:"600",
            position: 'relative',
            bottom: '10px'
        },
        subtitle:{
            ...weblysleekFontStyle,
            fontWeight:"300"
        },
        quantity:{
            ...weblysleekFontStyle,
            marginTop: '30px',
            fontWeight:"600"
        },
        close:{
            float: 'right'
        },
        price:{
            ...hudsonNYFontStyle,
            fontSize:"12px"
        }
    }

}
const minusDisabled ={
    background:"#fdbd0063",
    width:"20px", 
    height:"20px"
}