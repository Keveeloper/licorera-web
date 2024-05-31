import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CardComponent from "../../shared/card/card.component";
import { hudsonNYFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import "./suggestedProducts.css"
import { useAppDispatch } from "../../../store/store";
import { getSuggestedProductThunk } from "../../../store/modules/suggestedProducts/actions/suggested.actions";
import { useSelector } from "react-redux";
import { selectAllSuggested } from "../../../store/modules/suggestedProducts/selectors/suggested.selector";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { displaySpaceBetween } from "../../shared/recursiveStyles/RecursiveStyles";
import NumberFormat from "../../shared/hooks/numberFormater/NumberFormat";
import { Promotion } from "../../../store/modules/suggestedProducts/types";
import { productExchange } from "../../exchangeProducts/types";
import { storeActions } from "../../../store/modules/store";

const SuggestedProducts = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const suggested = useSelector(selectAllSuggested);

    const [products, setProducts] = React.useState<any>([]);

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
    },[suggested]);

    const handleProduct = (product: Promotion) => {
      const mappedProduct: productExchange = {
        id: product.id,
        quantity: product.quantity,
        points: product.points || 0,
        price: product.price,
        status: product.status,
        start_date: product.start_date || "",
        end_date: product.end_date || "",
        isExchange: false,
        product_id: product.id,
        features: product.features_string,
        product: {
          id: product.product.id,
          name: product.product.name,
          serial: product.product.serial,
          lot: product.product.lot,
          image: product.product.image,
          quantity: 1,
          points: product.points || undefined,
          description: product.product.description,
          category_id: product.product.category_id,
          created_at: product.product.created_at,
          updated_at: product.product.updated_at,
          deleted_at: product.product.deleted_at,
          presentation: product.presentation,
          discount: product.discount
        }
      }
        dispatch(storeActions.setProductDetail(mappedProduct))
        navigate("/product-detail")
  }
    
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
                  {/* <a href="#" className="link" onClick={handleLink}>
                      Ver todos
                  </a> */}
                  <Link className="link" to={'/recommended-products'}>Ver todos</Link>
              </div>
              {/* </Grid> */}
            </>

          :
            <Box sx={{width: '100%', ...displaySpaceBetween, alignItems: 'baseline'}}>
              <Typography sx={{margin: '50px 0 0 0', fontFamily: 'HudsonNYSerif', fontWeight: 600, fontSize: '25px',}}>
                productos destacados
              </Typography>
              <Link className="link" to={'/recommended-products'}>Ver todos</Link>
            </Box>
          }

        {/* PRODUCTS SECTION */}
        <Grid container spacing={2} sx={{mt:2, mb:10}}>
          {products.map((item: any) => {
            return (
              <Grid key={item.id} item xs={2.4} style={{ textAlign: "center" }}>
                <CardComponent
                  style={{ padding: "20px", borderRadius: "10px", cursor: 'pointer' }}
                >
                  <Box onClick={() => handleProduct(item)}>
                    {item.discount > 0 && (
                      <div className="promotion">
                        <p>{item.discount}</p>
                        <p>% off</p>
                        <img src="icons/discount-icon.png" alt="" width={50}/>
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
                  </Box>
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