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
import SwiperComponent from "../shared/swiperComponent/SwiperComponent";

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
                    <SwiperComponent 
                        modules={['Navigation', 'Pagination']}
                        slidesPerView={1}
                        images={['slide_01.png', 'slide_02.png', 'slide_03.png']}
                    />
                </TabPanel>
                <TabPanel sx={{height: '700px'}} value="2">
                    
                </TabPanel>
                <TabPanel sx={{height: '700px'}} value="3">
                    
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
