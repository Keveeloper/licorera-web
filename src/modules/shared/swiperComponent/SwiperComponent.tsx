// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { swiperType } from './types/types';
import { displayFlex, displaySpaceBetween } from '../recursiveStyles/RecursiveStyles';

// Material UI
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAllPromotion } from '../../../store/modules/promotions';
import { Promotion } from '../../../store/modules/promotions/types';
import StringDateFormat from '../hooks/stringDateFormat/StringDateFormat';
import NumberFormat from '../hooks/numberFormater/NumberFormat';
import { useMemo } from 'react';
import { selectAllCampaigns } from '../../../store/modules/campaigns';
import { useNavigate } from 'react-router-dom';
import { PromotionCampaign } from '../../../store/modules/campaigns/types';

const SwiperComponent = (props: swiperType) => { 
    
    const navigate = useNavigate();
    const { modules, slidesPerView, loadingStatus, bannerType } = props;
    const promotionsDataredux = useSelector(selectAllPromotion);
    const campaingDataredux = useSelector(selectAllCampaigns);
    
    const selector: any = bannerType === 'Promotions' ? promotionsDataredux : campaingDataredux;

    const formattedDates = useMemo(
        () => promotionsDataredux?.map((item: Promotion) => StringDateFormat(item.end_date)),
        [promotionsDataredux]
    );
      
    const formattedNumbers = useMemo(
        () => promotionsDataredux?.map((item: Promotion) => NumberFormat(parseInt(item.price))),
        [promotionsDataredux]
    );

    const handleClick = (item: any) => {
        
        let productDetail: Promotion;
        let highlightedCampaign: PromotionCampaign;

        if (bannerType === 'Promotions') {
            productDetail = {
                id: item.id,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                start_date: item.start_date,
                end_date: StringDateFormat(item.end_date),
                promotion_type: item.promotion_type,
                store_product_id: item.store_product_id,
                discount: item.discount,
                quantity_minimal: item.quantity_minimal,
                divider: item.divider,
                multiplier: item.multiplier,
                price: NumberFormat(parseInt(item.price)),
                // price: typeof item.price === 'string' ? NumberFormat(item.price) : 0,
                description: item.description,
                diageo: item.diageo,
            }
            navigate('/promotion-detail', {state: {productDetail}});
        }else{
            highlightedCampaign = {
                id: item.id,
                name: item.name,
                description: item.description,
                mainImageUrl: item.mainImageUrl,
                secondImageUrl: item.secondImageUrl,
                type: item.type,
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                products: null,
            }
            navigate('/highlighted-campaigns', {state: {highlightedCampaign}});
        }
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
            loop={true}
            spaceBetween={10}
            slidesPerView={slidesPerView}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper: any) => console.log(swiper)}
        >
            {/* {promotionsDataredux.map((item: Promotion, index) => { */}
            {selector?.length > 0 && selector.map((item: any, index: any) => {
                return(
                    <SwiperSlide key={index} style={styles.swiper.swiperSlide}>
                            {loadingStatus === 'loading' ? 
                                <Skeleton sx={styles.swiper.swiperSlide.skeleton} variant="rectangular" height={'90%'} />
                            :
                                <Box sx={styles.swiper.swiperSlide.promotionContainer} onClick={() => handleClick(item)}>
                                    {/* <img height={'100%'} src={`${img}`} alt="" /> */}
                                    <img style={styles.swiper.swiperSlide.promotionContainer.image} src={`${bannerType === 'Promotions' ? item.image : item.mainImageUrl}`} alt={item.name} />
                                    {bannerType === 'Promotions' && (
                                        <Box sx={styles.swiper.swiperSlide.promotionContainer.descriptionContainer}>
                                            <Box sx={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header}>
                                                <h1 style={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header.title}>{item.name}</h1>
                                                <h2 style={styles.swiper.swiperSlide.promotionContainer.descriptionContainer.header.title}>$ {formattedNumbers[index]}</h2>
                                            </Box>
                                            <p style={{marginBottom: '30px'}}>{item.description}</p>
                                            <p>Válido hasta: {formattedDates[index]}</p>
                                        </Box>
                                    )}
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
        with: '100%',
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
                // background: 'blue',
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

export default SwiperComponent;