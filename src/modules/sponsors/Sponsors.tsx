import { Box, Typography } from "@mui/material";
import { paletteColors } from "../../paletteColors/paletteColors";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import { selectAllSponsors } from "../../store/modules/sponsors/selectors/sponsors.selector";
import { useSelector } from "react-redux";
import { displayFlex } from "../shared/recursiveStyles/RecursiveStyles";
import { displayFlexColumn } from "../shared/recursiveStyles/RecursiveStyles";

import './Sponsors.css';

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
                slidesPerView={6}
            >
                {sponsorsDataredux?.length > 0 && sponsorsDataredux.map((item: any, index: any) => {
                return (
                    <SwiperSlide
                    key={index}
                    >
                        <Box className={`${sponsorsDataredux?.length === (index + 1) && sponsorsDataredux?.length < 6 ? '' : 'sponsor-container-line'}`} sx={sponsorsDataredux?.length === (index + 1) ? styles.swiper.sponsorContainer : styles.swiper.sponsorContainerLine}>
                            <img style={styles.swiper.image} src={`${item.imageUrl}`} alt=""/>
                        </Box>
                    </SwiperSlide>
                );
                })}
            </Swiper>
        </Box>
    );

}

const styles = {
    swiper: {
        padding: '0 40px 0 40px',
        height: '190px',
        sponsorContainerLine: {
            height: '100%',
            ...displayFlexColumn,
        },
        sponsorContainer: {
            height: '100%',
            ...displayFlexColumn,
        },
        image : {
            width: '50%'
        }

    }
}
export default Sponsors;