// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { displayFlex, displayFlexColumn, displaySpaceBetween } from '../recursiveStyles/RecursiveStyles';
import { swiperCategoriesType } from './types/types';

// Material UI
import Skeleton from '@mui/material/Skeleton';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAllPromotion } from '../../../store/modules/promotions';
import { Promotion } from '../../../store/modules/promotions/types';
import StringDateFormat from '../hooks/stringDateFormat/StringDateFormat';
import NumberFormat from '../hooks/numberFormater/NumberFormat';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { Categories } from '../../../store/modules/store/actions/store.actions';
import { paletteColors } from '../../../paletteColors/paletteColors';
import { selectArrayCategories } from '../../../store/modules/store/selectors/store.selector';


const SwiperCategories = (props: swiperCategoriesType) => { 
    
    const dispatch = useAppDispatch();
    const categoriesDataredux = useSelector(selectArrayCategories);

    console.log('que es esto: ', categoriesDataredux);
    

    const { modules, slidesPerView, loadingStatus, categories, setCategories } = props;

    return(
        <Box sx={styles.swiperContainer}>
            <Typography sx={styles.swiperContainer.subtitle}>Explora nuestras categorias</Typography>
            <Swiper style={styles.swiperContainer.swiper}
                modules={modules}
                navigation={{
                    enabled: true
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                spaceBetween={1}
                slidesPerView={slidesPerView}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper: any) => console.log(swiper)}
            >
                {categoriesDataredux.map((item: any, index: any) => {
                return (
                    <SwiperSlide
                    key={index}
                    style={styles.swiperContainer.swiper.swiperSlide}
                    //   onClick={() => handleCategory(item.id, 1)}
                    >
                        {loadingStatus === 'loading' ? 
                                <Skeleton sx={styles.swiperContainer.swiper.swiperSlide.skeleton} variant="rectangular" />
                            :
                                <Box sx={styles.swiperContainer.swiper.swiperSlide.categoriesContainer}>
                                    <img height={"100px"} src={`${item.image}`} alt=""  style={styles.swiperContainer.swiper.swiperSlide.categoriesContainer.image}/>
                                    <Typography sx={styles.swiperContainer.swiper.swiperSlide.categoriesContainer.name}>
                                    {item.name.toUpperCase()}
                                    </Typography>
                                </Box>
                        } 
                    </SwiperSlide>
                );
                })}
            </Swiper>
        </Box>
    );

}

const styles = {
    swiperContainer: {
        margin: '0 auto 0 auto',
        width: '100%',
        maxWidth: '1450px',
        subtitle: {
            marginLeft: '60px',
            fontFamily: 'HudsonNYSerif',
            fontWeight: 600,
            fontSize: '25px',
        },
        swiper: {
            padding: '0 30px 0 30px',
            width: '100%',
            maxWidth: '1450px',
            height: '250px',
            swiperSlide: {
                padding: '0 20px 0 20px',
                cursor: 'pointer',
                ...displayFlex,
                skeleton: {
                    width: '150px',
                    height: '150px',
                    margin: 'auto 0 auto 0',
                    borderRadius: '50%'
                },
                categoriesContainer: {
                    height: '100%',
                    ...displayFlexColumn,
                    image: {
                        height: '50%',
                        border: `1px solid ${paletteColors.gray}`,
                        borderRadius: '50%',
                    },
                    name: {
                        marginTop: '10px',
                        fontFamily: 'HudsonNYSerif',
                        fontWeight: 600,
                        fontSize: '20px'
                    }
                }
            }
        }
    }
}

export default SwiperCategories;