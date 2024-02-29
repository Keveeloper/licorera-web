import TabPanel from "@mui/lab/TabPanel";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import TabComponent from "../shared/tabComponent/TabComponent";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperComponent from "../shared/swiperComponent/SwiperComponent";

const HomeScreen = () => {

    return (
        <>
            <HeaderScreen/>
            <TabComponent
                tabsArray={['PROMOCIONES', 'DESTACADOS', 'PRODUCTOS NUEVOS']}
            >
                <TabPanel sx={{height: '700px'}} value="1">
                    <SwiperComponent 
                        modules={['Navigation', 'Pagination']}
                        slidesPerView={1}
                        images={['slide_01.png', 'slide_02.png', 'slide_03.png']}
                    />
                </TabPanel>
                <TabPanel sx={{height: '700px'}} value="2">
                    <SwiperComponent 
                        modules={['Navigation', 'Pagination']}
                        slidesPerView={1}
                        images={['slide_02.png', 'slide_02.png', 'slide_03.png']}
                    />
                </TabPanel>
                <TabPanel sx={{height: '700px'}} value="3">
                    <SwiperComponent 
                        modules={['Navigation', 'Pagination']}
                        slidesPerView={1}
                        images={['slide_03.png', 'slide_02.png', 'slide_03.png']}
                    />
                </TabPanel>
            </TabComponent>
            <FooterScreen/>
        </>
    );
}

export default HomeScreen;
