import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SwiperComponent from '../swiperComponent/SwiperComponent';
import { tabType } from './types/types';

const TabComponent = (props: tabType) => {

    const { handleChange, value } = props;

    return(
        <TabContext value={value}>
            <TabList sx={styles.tabList} onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab sx={styles.tabList.tab} label="PROMOCIONES" value="1" />
                <Tab sx={styles.tabList.tab} label="DESTACADOS" value="2" />
                <Tab sx={styles.tabList.tab} label="PRODUCTOS NUEVOS" value="3" />
            </TabList>
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

export default TabComponent;