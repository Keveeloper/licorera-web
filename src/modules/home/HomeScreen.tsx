import { useState } from "react";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import { paletteColors } from "../../paletteColors/paletteColors";
import SwiperComponent from "../shared/swiperComponent/SwiperComponent";
import TabComponent from "../shared/tabComponent/TabComponent";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Material ui imports
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const HomeScreen = () => {

    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <HeaderScreen/>
            <TabComponent
                handleChange={handleChange}
                value={value}
                setValue={setValue}
            />
            <FooterScreen/>
        </>
    );
}

export default HomeScreen;
