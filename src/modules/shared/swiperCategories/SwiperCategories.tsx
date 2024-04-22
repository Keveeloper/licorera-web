// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { displayFlex, displayFlexColumn } from '../recursiveStyles/RecursiveStyles';
import { swiperCategoriesType } from './types/types';

// Material UI
import Skeleton from '@mui/material/Skeleton';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { paletteColors } from '../../../paletteColors/paletteColors';
import { selectArrayCategories } from '../../../store/modules/store/selectors/store.selector';
import { CategoriesById } from '../../../store/modules/store/actions/store.actions';
import { useAppDispatch } from '../../../store/store';
import { useNavigate } from 'react-router-dom';


const SwiperCategories = (props: swiperCategoriesType) => { 
    
    const categoriesDataredux = useSelector(selectArrayCategories);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { modules, slidesPerView, loadingStatus } = props;

    const handleCategory = async (id: number, page: number) => {
        dispatch(CategoriesById({ id, page })).unwrap();
        // setTotalPage(categoriesById.response.data.last_page);
        // setProducts(categoriesById.response.data.data);
        // filterCategory(id);
        const categoryId = {
            id
        }
        navigate("/store", { state: { categoryId } });
    };

    return(
        <Box className={'columnContainer'} sx={styles.swiperContainer}>
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
                {categoriesDataredux?.length > 0 && categoriesDataredux.map((item: any, index: any) => {
                return (
                    <SwiperSlide
                    key={index}
                    style={styles.swiperContainer.swiper.swiperSlide}
                    onClick={() => handleCategory(item.id, 1)}
                    >
                        {(loadingStatus === 'loading') ? 
                                <Skeleton sx={styles.swiperContainer.swiper.swiperSlide.skeleton} variant="rectangular" />
                            :
                                <Box sx={styles.swiperContainer.swiper.swiperSlide.categoriesContainer}>
                                    <img height={"100px"} src={`${item.image}`} alt="" style={styles.swiperContainer.swiper.swiperSlide.categoriesContainer.image}/>
                                    <Typography sx={styles.swiperContainer.swiper.swiperSlide.categoriesContainer.name}>
                                        {item.name}
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
        // margin: '0 auto 0 auto',
        // width: '100%',
        // maxWidth: '1450px',
        subtitle: {
            margin: '50px 0 0 0',
            fontFamily: 'HudsonNYSerif',
            fontWeight: 600,
            fontSize: '25px',
        },
        swiper: {
            padding: '0 30px 0 30px',
            // width: '100%',
            // maxWidth: '1450px',
            height: '250px',
            swiperSlide: {
                // padding: '40px 0 0 0',
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
                        fontSize: '16px'
                    }
                }
            }
        }
    }
}

export default SwiperCategories;