import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserExchangeinterface } from './types'
import CardComponent from '../../shared/card/card.component';
import { displayFlex } from '../../shared/recursiveStyles/RecursiveStyles';
import { getExchangeProductThunk, getMeExchangeProductThunk } from '../../../store/modules/exchangeProducts/actions/exchange.actions';
import { useAppDispatch } from '../../../store/store';
import Loader from '../../shared/Loader/components/Loader';
import { convertFormatDateNoHour } from '../../../utils/helpers';

const UserExchange = (props: UserExchangeinterface) => {

    const { exchangeOpen, setExchangeOpen } = props;
    const dispatchApp = useAppDispatch();

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [products, setProducts] = useState<any>([]);
    const [loading, setLiading] = useState<boolean>(true);

    console.log('productsproducts: ', products);
    

    const handleExchange = ( ) => setExchangeOpen(false);

    const handleChangePagination = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        handleExchangeProducts(value);
    };

    const handleExchangeProducts = async (page:number) => {
        const {response} = await dispatchApp(
            getExchangeProductThunk({page})
        ).unwrap();
        if(response.success){
            // setProducts(response.data.data)
            setTotal(response.data.last_page)
        }
    }

    useEffect(() => {
        dispatchApp(getMeExchangeProductThunk()).unwrap().then((response) => {
            if (response.response.data.data.length > 0) {
                setProducts(response.response.data.data);
                setLiading(false);
            }
        });
    }, []);

    if (loading) {
        return (
            <Box sx={{width: '100%', height: '500px'}}>
                <Loader screenLoader={false} />
            </Box>
        )
    }

  return (
    <Box sx={{width: '100%'}}>
        <Box sx={styles.titleContainer}>
            <img style={styles.titleContainer.arrowImage} src="/icons/Keyboard-arrow-left.png" alt="" onClick={handleExchange}/>
            <Typography sx={styles.titleContainer.title}>productos canjeados</Typography>
        </Box>
        <Grid
            container
            spacing={2}
            style={{
                // padding: "30px 5%",
                margin: 0,
                width: '100%',
            }}
        >
            {products.map((item: any, index: number) => {
                return (
                    <Grid item xs={6} key={item.id}>
                        <CardComponent
                            style={{ padding: "20px", borderRadius: "10px",  cursor: 'pointer', height:"150px"}}
                        >
                        <Grid
                                container
                                spacing={0}
                                style={{
                                    height:"100%",
                                }}
                            >
                                <Grid item xs={3} style={{...displayFlex, justifyContent:'start', height: '100%'}}>
                                    <img src={item?.order_products[0]?.store?.product?.image} alt="" style={{maxWidth:'100%'}} />
                                </Grid> 
                                <Grid item xs={7} style={{display:"flex", flexDirection:"column", justifyContent:"space-between", padding: '0 0 0 10px'}}>
                                    <Typography sx={{fontFamily: 'weblysleekuisb', fontSize: '18px', fontWeight: 'bold'}} >{item?.order_products[0]?.store?.product?.name}</Typography>
                                    <Typography sx={{fontFamily: 'weblysleekuil', fontSize: '15px'}}>{item?.order_products[0]?.store?.product?.description.slice(0, 50)}</Typography>
                                    <Typography sx={{fontFamily: 'weblysleekuisb', fontSize: '16px', fontWeight: 'bold'}}>Canjeado: {convertFormatDateNoHour(item?.order_products[0]?.updated_at)}</Typography>
                                </Grid> 
                                <Grid item xs={2} style={{display: 'flex',justifyContent: 'flex-end'}}>
                                    <Typography sx={{fontFamily: 'HudsonNYSerif', fontSize: '18px', lineHeight: 1}}>{item?.order_products[0]?.store?.points} J</Typography>
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
        </Grid>
    </Box>
  )
}

const styles = {
    titleContainer: {
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        arrowImage: {
          height: "100%",
          cursor: "pointer",
        },
        title: {
          margin: "0 auto",
          fontFamily: "HudsonNYSerif",
          fontSize: "30px",
          textAlign: "center",
        },
    },
}

export default UserExchange
