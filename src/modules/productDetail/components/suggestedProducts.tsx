import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CardComponent from "../../shared/card/card.component";
import { hudsonNYFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import "./suggestedProducts.css"
import { useAppDispatch } from "../../../store/store";
import { getSuggestedProductThunk } from "../../../store/modules/suggestedProducts/actions/suggested.actions";
import { useSelector } from "react-redux";
import { selectAllSuggested } from "../../../store/modules/suggestedProducts/selectors/suggested.selector";
import { Link, useLocation } from "react-router-dom";
import { displaySpaceBetween } from "../../shared/recursiveStyles/RecursiveStyles";
import NumberFormat from "../../shared/hooks/numberFormater/NumberFormat";

const SuggestedProducts = () => {

    const location = useLocation();

    const [products, setProducts] = React.useState<any>([]);
    
    const suggested = useSelector(selectAllSuggested);

    const dispatch = useAppDispatch();
    
    const handleLink = () => {
        alert("here")
    }

    const getSuggestedProducts = async () =>{
      const {response} = await dispatch(
        getSuggestedProductThunk()
      ).unwrap();
      if(response.success){
        setDataProducts(response.data)
      }
    }

    const setDataProducts  = (data:any) =>{
      let tempArray = []
        for(var i = 0; i < 5; i++){
          tempArray.push(data[i])
        }
        setProducts(tempArray)
    }

    useEffect(() => {
      if(suggested && suggested.length > 0){
        setDataProducts(suggested)
      }
      if(suggested.length === 0){
        getSuggestedProducts()
      }
    },[suggested])
    
    return(
        <Grid
            className="columnContainer"
            container
            spacing={2}
            // style={{
            //   padding: "30px 5%",
            // }}
        >
          {location.pathname === '/product-detail' ?
            <>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography style={{fontWeight:600}}>También te podría interesar</Typography>
              </Grid>
              {/* <Grid item xs={12}  style={styles.link} > */}
              <div  style={{width: "100%"}}>
                  <a href="#" className="link" onClick={handleLink}>
                      Ver todos
                  </a>
              </div>
              {/* </Grid> */}
            </>

          :
            <Box sx={{width: '100%', ...displaySpaceBetween}}>
              <Typography sx={{margin: '50px 0 0 0', fontFamily: 'HudsonNYSerif', fontWeight: 600, fontSize: '25px',}}>
                productos destacados
              </Typography>
              <Link className="link" to={'/store'}>Ver todos</Link>
            </Box>
          }

        {/* PRODUCTS SECTION */}
        <Grid container spacing={2} sx={{mt:2, mb:10}}>
          {products.map((item: any) => {
            return (
              <Grid key={item.id} item xs={2.4} style={{ textAlign: "center" }}>
                <CardComponent
                  style={{ padding: "20px", borderRadius: "10px" }}
                >
                  {item.discount > 0 && (
                    <div className="promotion">
                      <p>{item.discount}</p>
                      <p>% off</p>
                      <img src="icons/discount.png" alt="" width={50}/>
                    </div>
                  )}
                  <img src={item.product.image} alt="" width={200} height={200} />
                  <Typography style={styles.card.title}>
                    {item.product.name}
                  </Typography>
                  <Typography style={styles.card.subtitle}>
                    {item.presentation}
                  </Typography>
                  <Typography style={styles.card.content}>
                    {item.product.description.slice(0, 50)}
                  </Typography>
                  <Typography style={styles.card.price}>
                    $ {NumberFormat(item.price)}
                  </Typography>
                </CardComponent>
              </Grid>
            );
          })}
        </Grid>
       </Grid>
    )
}
export default SuggestedProducts;

const styles = {
    title:{
        ...weblysleekFontStyle,   
        fontSize: "22px",  
    },
    card: {
        img: {},
        title: {
          ...weblysleekFontStyle,
          fontSize: "19px",
          fontWeight: "600",
          height: "110px",
        },
        subtitle: {
          ...weblysleekFontStyle,
          fontSize: "13px",
        },
        content: {
          ...weblysleekFontStyle,
          fontSize: "16px",
          fontWeight: "300",
          paddingTop: "0px",
          height: '50px'
        },
        price: {
          ...hudsonNYFontStyle,
          fontSize: "19px",
          padding: "20px 0 0 0",
        },
    },
}