import { Box, Grid, Typography } from "@mui/material";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen"
import ButtonComponent from "../shared/button/button.component";
import './PromotionDetails.css'
import React from "react";
import { useLocation } from "react-router-dom";

const PromotionDetailScreen = () => {

    const location = useLocation();
    const productDetail = location?.state?.productDetail;
    
    const [count, setCount] = React.useState(1);

    const onMinus = () => {
        if(count > 1){
            setCount(count - 1)
        }
    }

    const onPlus = () => {
        setCount(count + 1)
    }

    return (
        <>
            <HeaderScreen/>
            <Box className='columnContainer'>
                <Grid container spacing={2} style={{ textAlign: "center" }}>
                    <Grid item  xs={12} sx={{ mt: 4, mr:4, ml:4 }}>
                        {/* <img src="/images/slide_03.png" alt="" style={{maxWidth:'100%', maxHeight:'600px'}}/> */}
                        <img src={productDetail.image} alt="" style={{maxWidth:'100%', maxHeight:'600px', borderRadius: 20}}/>
                    </Grid>
                </Grid>
                <Typography sx={{ mt:4, mb:4 }} style={{ textAlign:'center',fontFamily:'HudsonNYSerif', color:'#000000', fontSize:'200%'}}>
                    {/* buchanan’s Master */}
                    {productDetail.name}
                </Typography>
                <Typography  sx={{ mr:4, ml:4 }} style={{ textAlign:'left',fontFamily:'weblysleekuil', color:'#000000', fontSize:'150%'}}>
                    {/* Resultado de la creación del Master Blender Keith Law, quien seleccionó las mejores maltas de Escocia en su punto más alto de maduración. Vivamos grandes momentos y no te pierdas la grandeza de un Buchanan's Master. con este descuento. 

                    Aquí va toda la descripción de la promoción. Aquí va toda la descripción de la promoción. */}
                    {productDetail.description}
                </Typography>
                <Typography  sx={{ mt: 2, mr:4, ml:4 }} style={{ textAlign:'left', fontWeight:'600',fontFamily:'weblysleekuil', color:'#000000', fontSize:'125%'}}>
                    {/* Válido hasta: Agosto 23, 2023 */}
                    Válido hasta: {productDetail.end_date}
                </Typography>
                <Typography  sx={{ mt: 2, mr:4, ml:4 }} style={{ textAlign:'left', fontWeight:'600',fontFamily:'weblysleekuil', color:'#000000', fontSize:'125%'}}>
                    {/* Precio: <span style={{fontFamily:'HudsonNYSerif', color:'#000000', fontSize:'200%'}}>$ 127.500</span> */}
                    Precio: <span style={{fontFamily:'HudsonNYSerif', color:'#000000', fontSize:'200%'}}>{productDetail.price}</span>
                </Typography>
                <div  style={{margin:'0 32px'}} > 
                    <Grid container spacing={2} sx={{ mb:6}}>
                        <Grid item  xs={3} sx={{ mt: 2, mb:4}}>
                            <div  className="iconContainer" onClick={onMinus} style={count === 1 ?  minusDisabled : {} }>
                                <span className="icon" id="icono-menos">-</span>
                            </div>
                            <span className="normalText" style={{margin: '0 10px', fontSize:'40px'}}> {count} </span> 
                            <div  className="iconContainer" onClick={onPlus}>
                                <span className="icon" id="icono-mas">+</span>
                            </div>
                        </Grid>
                        <Grid item  xs={9} sx={{ mt: 2, mb:4}}>
                            <ButtonComponent style={styleButtonChecked}>
                                <Typography
                                style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                                >
                                AGREGAR
                                </Typography>
                            </ButtonComponent>
                        </Grid>
                    </Grid>
                </div>
            </Box>
            <FooterScreen />
        </>
        
    );
}

export default PromotionDetailScreen;


const styleButtonChecked = {
    width: "100%",
    height: "43px",
    background: "#99791C",
    color: "#FFFFFF",
    borderRadius: "5px",
    border: "none",
    fontFamily: "HudsonNYSerif",
    fontSize: "17px",
    marginTop: "20px",
};

const minusDisabled ={
    background:"#fdbd0063"
}