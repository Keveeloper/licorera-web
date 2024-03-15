import { Grid, Stack, Typography } from "@mui/material";
import { displayFlex, hudsonNYFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import CardComponent from "../../shared/card/card.component";
import { useAppDispatch } from "../../../store/store";
import React, { useState } from "react";
import { getExchangeProductThunk } from "../../../store/modules/exchangeProducts/actions/exchange.actions";
import { Pagination  } from "@mui/material";
import { productExchange } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../../store/modules/store/store.slice";
import { useNavigate } from "react-router-dom";
import LoginScreen from "../../user/login.screen";
import { selectAllUser } from "../../../store/modules/users/selectors/users.selector";

const ExchangeComponent = () => {

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const dispatchApp = useAppDispatch();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectAllUser);
    
    const handleChangePagination = (
        event: React.ChangeEvent<unknown>,
        value: number
      ) => {
        setPage(value);
        handleExchange(value);
      };
    
    const handleExchange = async (page:number) => {
        const {response} = await dispatchApp(
            getExchangeProductThunk({page})
        ).unwrap();
        if(response.success){
            setProducts(response.data.data)
            setTotal(response.data.last_page)
        }
    }

    const cardHandle = (product:productExchange) => {
        if(Object.keys(user).length > 0){
            dispatch(storeActions.setProductDetail(product))
            navigate("/product-detail")
        }else{
            setOpenModal(true)
        } 
    }

    const handleClose = (isOpen: boolean) => {
        setOpenModal(isOpen);
    };

    React.useEffect(() => {
        handleExchange(1)
    },[])
   
    
    return(
        <Grid
            className="columnContainer"
            container
            spacing={2}
            style={{
            padding: "30px 5%",
            }}
        >
            {/* BANNER SECTION */}
            <Grid item xs={12}>
            <img
                src="https://images.applicorera3jjjs.com/ImageHandler.php?src=../storage/2018_09_13_21_36_13_cerveza.jpg"
                alt=""
                style={{
                borderRadius: "20px",
                maxHeight: "200px",
                width: "100%",
                objectFit: "cover",
                }}
            />
            <Typography style={style.banner.title}>tenemos muchos regalos para ti</Typography>
            <Typography style={style.banner.subtitle}>Aquí tienes los productos por los cuales puedes canjear tus puntos.</Typography>
            </Grid> 
            {/* PRODUCTS SECTION */}
            {products.map((item: any) => {
                return (
                    <Grid item xs={6}>
                        <CardComponent
                        style={{ padding: "20px", borderRadius: "10px",  cursor: 'pointer' }}
                        >
                        <Grid
                                className="columnContainer"
                                container
                                spacing={0}
                                style={{
                                padding: "10px 20px",
                                }}
                                onClick={() =>cardHandle(item)}
                            >
                                <Grid item xs={3}>
                                    <img src={item.product.image} alt="" width={100} height={100} />
                                </Grid> 
                                <Grid item xs={6}>
                                    <Typography style={style.cards.title}>{item.product.name}</Typography>
                                    <Typography style={style.cards.subtitle}>{item.product.description.slice(0, 50)}</Typography>
                                    <Typography style={style.cards.quantity} >Disponibles: {item.quantity}</Typography>
                                </Grid> 
                                <Grid item xs={3}>
                                    <Typography style={style.cards.jotas}>{item.points} J</Typography>
                                </Grid> 
                            </Grid>   
                        </CardComponent>
                    </Grid>
                )
            })}
            <Grid item xs={12}>
                <Stack spacing={2} style={{ ...displayFlex, padding: "30px 0" }}>
                    <Pagination
                        count={total}
                        page={page}
                        onChange={handleChangePagination}
                    />
                </Stack>
            </Grid>
            <LoginScreen handleClose={() => handleClose(false)} modalOpen={openModal}/>
        </Grid>
    )
}
export default ExchangeComponent;

const bannerStyle: React.CSSProperties  = {
    padding: '0 0 0 30px',
    color: 'white',
    position: 'absolute'
}
const style: React.CSSProperties | any = {
    banner:{
        title:{
            ...hudsonNYFontStyle,
            ...bannerStyle,
            fontSize:'45px',
            top: '270px',
        },
        subtitle:{
            ...weblysleekFontStyle,
            ...bannerStyle,
            fontSize:'19px',
            top: '330px',
        },
       
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
        jotas:{
            ...hudsonNYFontStyle,
            float: 'right',
            fontSize:"25px",
            position: 'relative',
            bottom: '10px'
        }
    }
}
