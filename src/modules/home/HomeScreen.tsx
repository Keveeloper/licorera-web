import { useState } from "react";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";

// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Material ui imports
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { paletteColors } from "../../paletteColors/paletteColors";

const HomeScreen = () => {

    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <HeaderScreen/>
            <Box>
            <TabContext value={value}>
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
                <TabList sx={styles.tabList} onChange={handleChange} aria-label="lab API tabs example" centered>
                    <Tab sx={styles.tabList.tab} label="PROMOCIONES" value="1" />
                    <Tab sx={styles.tabList.tab} label="DESTACADOS" value="2" />
                    <Tab sx={styles.tabList.tab} label="PRODUCTOS NUEVOS" value="3" />
                </TabList>
                {/* </Box> */}
                <TabPanel sx={{height: '700px'}} value="1">
                    <Swiper style={{ height: '100%'}}
                        modules={[Navigation, Pagination]}
                        navigation={{
                            enabled: true
                        }}
                        pagination={{
                            clickable: true,
                        }}
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
                </TabPanel>
                <TabPanel sx={{height: '700px'}} value="2">
                <Swiper style={{ height: '100%'}}
                        modules={[Navigation, Pagination]}
                        navigation={{
                            enabled: true
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper: any) => console.log(swiper)}
                    >
                        <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                            <img height={'90%'} src="/images/slide_02.png" alt="" />
                        </SwiperSlide>
                        <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                            <img height={'90%'} src="/images/slide_01.png" alt="" />
                        </SwiperSlide>
                        <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                            <img height={'90%'} src="/images/slide_03.png" alt="" />
                        </SwiperSlide>
                        ...
                    </Swiper>
                </TabPanel>
                <TabPanel sx={{height: '700px'}} value="3">
                <Swiper style={{ height: '100%'}}
                        modules={[Navigation, Pagination]}
                        navigation={{
                            enabled: true
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper: any) => console.log(swiper)}
                    >
                        <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                            <img height={'90%'} src="/images/slide_03.png" alt="" />
                        </SwiperSlide>
                        <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                            <img height={'90%'} src="/images/slide_02.png" alt="" />
                        </SwiperSlide>
                        <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                            <img height={'90%'} src="/images/slide_01.png" alt="" />
                        </SwiperSlide>
                        ...
                    </Swiper>
                </TabPanel>
            </TabContext>
                
            </Box>
            <FooterScreen/>
        </>
    );
}

const styles = {
    tabList: {
        "& button.Mui-selected": {
            color: 'black',

        },
        tab: {
            fontFamily: 'Hudson NY Serif', 
            fontWeight: 900,
        }
    }
}

export default HomeScreen;
