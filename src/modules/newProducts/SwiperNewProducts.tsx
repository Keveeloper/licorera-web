// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { swiperType } from './types/types';
import { displayFlex, displaySpaceBetween } from '../shared/recursiveStyles/RecursiveStyles';

// Material UI
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Promotion } from '../../store/modules/newProducts/types';
import NumberFormat from '../shared/hooks/numberFormater/NumberFormat';
import { useEffect, useMemo } from 'react';
import { selectAllNewProducts } from '../../store/modules/newProducts';
import { productExchange } from '../exchangeProducts/types';
import { useAppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { storeActions } from '../../store/modules/store';

const SwiperNewProducts = (props: swiperType) => { 
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { modules, slidesPerView, loadingStatus, bannerType } = props;
    const newProductsDataredux = useSelector(selectAllNewProducts);
      
    const formattedNumbers = useMemo(
        () => newProductsDataredux?.map((item: Promotion) => NumberFormat(item.price)),
        [newProductsDataredux]
    );

  
    

    const handleClick = (item: Promotion) => {
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
            features: item.features,
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
              deleted_at: item.product.deleted_at,
              presentation: item.presentation,
            }
          }
          dispatch(storeActions.setProductDetail(mappedProduct))
          navigate(`/product-detail/${mappedProduct.id}`)
    }

    return(
        <Swiper style={styles.swiper}
            modules={modules}
            navigation={{
                enabled: true
            }}
            pagination={{
                clickable: true,
            }}
            loop={false}
            spaceBetween={10}
            slidesPerView={slidesPerView}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper: any) => console.log(swiper)}
        >
            {newProductsDataredux.map((item: Promotion, index: any) => {
                return(
                    <SwiperSlide key={index} style={styles.swiper.swiperSlide}>
                            {loadingStatus === 'loading' ? 
                                <Skeleton sx={styles.swiper.swiperSlide.skeleton} variant="rectangular" height={'90%'} />
                            :
                                <Box sx={styles.swiper.swiperSlide.promotionContainer} onClick={() => handleClick(item)}>
                                    <img style={styles.swiper.swiperSlide.promotionContainer.image} src={item.bannerImage} alt={item.product.name} />
                                    <Box sx={styles.swiper.swiperSlide.promotionContainer.descriptionContainer}>
                                        <Box sx={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header}>
                                            <h1 style={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header.title}>{item.product.name}</h1>
                                            <h2 style={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header.title}>$ {formattedNumbers[index]}</h2>
                                        </Box>
                                        <p style={{marginBottom: '30px'}}>{item.product.description}</p>
                                    </Box>
                                </Box>
                            }
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );

}

const styles = {
    swiper: {
        width: '100%',
        height: '100%',
        swiperSlide: {
            ...displayFlex,
            cursor: 'pointer',
            skeleton: {
                width: '100%', 
                maxWidth: '1000px', 
                borderRadius: '20px'
            },
            promotionContainer: {
                position: 'relative', 
                height: '90%', 
                borderRadius: '20px', 
                display: 'inline-block', 
                overflow: 'hidden',
                image: {
                    height: '100%'
                },
                descriptionContainer: {
                    position: 'absolute', 
                    padding: '20px', 
                    width: '100%' , 
                    bottom: 0, 
                    border: '1px solid black', 
                    borderBottomLeftRadius: '20px', 
                    borderBottomRightRadius: '20px', 
                    background: 'white',
                    header: {
                        marginBottom: '10px',
                        ...displaySpaceBetween,
                        title: {
                            fontFamily: 'HudsonNYSerif',
                            fontWeight: 600
                        },
                        price: {
                            fontFamily: 'HudsonNYSerif',
                            fontWeight: 600
                        }
                    }
                }
            }
        }
    }
}

export default SwiperNewProducts;