import { Box, Typography } from "@mui/material";
import { paletteColors } from "../../paletteColors/paletteColors";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from "swiper/modules";
import { selectAllSponsors } from "../../store/modules/sponsors/selectors/sponsors.selector";
import { useSelector } from "react-redux";

const Sponsors = () => {

    const sponsorsDataredux = useSelector(selectAllSponsors);
    console.log('sponsorsDataredux: ', sponsorsDataredux);
    

    return (
        <Box className="columnContainer" sx={{marginBottom: '50px !important'}}>
            <Typography sx={{
                margin: '50px 0 0 0',
                fontFamily: 'HudsonNYSerif',
                fontSize: '25px',
                textAlign: 'center'
            }}>
                Encuentra tus <span style={{color: paletteColors.gold}}>marcas favoritas</span>
            </Typography>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    enabled: true
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                spaceBetween={1}
                slidesPerView={7}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper: any) => console.log(swiper)}
            >
                {sponsorsDataredux?.length > 0 && sponsorsDataredux.map((item: any, index: any) => {
                return (
                    <SwiperSlide
                    key={index}
                    //   onClick={() => handleCategory(item.id, 1)}
                    >
                        {/* {(loadingStatus === 'loading') ? 
                                <Skeleton sx={styles.swiperContainer.swiper.swiperSlide.skeleton} variant="rectangular" />
                            : */}
                                <Box>
                                    <img height={"100px"} src={`${item.imageUrl}`} alt=""/>
                                    <Typography>
                                        {item.name}
                                    </Typography>
                                </Box>
                        {/* }  */}
                    </SwiperSlide>
                );
                })}
            </Swiper>
        </Box>
    );

}

export default Sponsors;