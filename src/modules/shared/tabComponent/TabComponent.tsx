import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { tabType } from './types/types';
// import { useState } from 'react';

const TabComponent: React.FC<tabType> = (props) => {

    const { tabsArray, children, handleChange, value} = props;


    return(
        <TabContext value={value}>
            <TabList sx={styles.tabList} onChange={handleChange} aria-label="lab API tabs example" centered>
                {tabsArray.map((item, index) => {
                    return(
                        <Tab key={index + 1} sx={styles.tabList.tab} label={`${item}`} value={`${index + 1}`} />
                    );
                })}
            </TabList>
            {children}

        </TabContext>
    );

}

const styles = {
    tabList: {
        "& button.Mui-selected": {
            color: 'black',

        },
        tab: {
            fontFamily: 'HudsonNYSerif', 
            fontSize: '20px',
            fontWeight: 300,
        }
    }
}

export default TabComponent;