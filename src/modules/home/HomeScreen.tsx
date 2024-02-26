import { Box } from "@mui/material";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";

// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomeScreen = () => {
    return (
        <>
            <HeaderScreen/>
            <Box sx={{height: '700px'}}>
                <Swiper style={{ height: '100%'}}
                    modules={[Navigation]}
                    navigation={{
                        enabled: true
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper: any) => console.log(swiper)}
                >
                    <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                        <img height={'90%'} src="/images/slide_01.png" alt="" />
                    </SwiperSlide>
                    <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                        <img height={'90%'} src="/images/slide_02.png" alt="" />
                    </SwiperSlide>
                    <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                        <img height={'90%'} src="/images/slide_03.png" alt="" />
                    </SwiperSlide>
                    ...
                </Swiper>
            </Box>
            <FooterScreen/>
        </>
    );
}

export default HomeScreen;
