import { Box, Typography } from "@mui/material";
import { paletteColors } from "../../paletteColors/paletteColors";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import { selectAllSponsors } from "../../store/modules/sponsors/selectors/sponsors.selector";
import { useSelector } from "react-redux";
import { displayFlex } from "../shared/recursiveStyles/RecursiveStyles";
import { displayFlexColumn } from "../shared/recursiveStyles/RecursiveStyles";
import { BorderRight, Padding } from "@mui/icons-material";

const Sponsors = () => {

    const sponsorsDataredux = useSelector(selectAllSponsors);    

    return (
        <Box className="columnContainer" sx={{marginBottom: '50px !important'}}>
            <Typography sx={{
                margin: '50px 0 50px 0',
                fontFamily: 'HudsonNYSerif',
                fontSize: '25px',
                textAlign: 'center'
            }}>
                Encuentra tus <span style={{color: paletteColors.gold}}>marcas favoritas</span>
            </Typography>
            <Swiper
                style={styles.swiper}
                modules={[Navigation, Pagination]}
                navigation={{
                    enabled: true
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                spaceBetween={1}
                slidesPerView={sponsorsDataredux.length}
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
                                <Box sx={styles.swiper.sponsorContainer}>
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

const styles = {
    swiper: {
        padding: '0 30px 0 30px',
        // width: '100%',
        // maxWidth: '1450px',
        height: '190px',
        sponsorContainer: {
            height: '100%',
            ...displayFlexColumn,
            borderRight: '0.5px solid',
            // background: 'blue',
        }
    }
}
export default Sponsors;