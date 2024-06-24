import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { tabType } from "./types/types";
import { Box } from "@mui/material";
// import { useState } from 'react';

const TabComponent: React.FC<tabType> = (props) => {
  const { tabsArray, children, handleChange, value, disabled, tabStyles } =
    props;
console.log(tabsArray);

  return (
    <TabContext value={value}>
      <TabList
        sx={tabStyles ? tabStyles.tabList : styles.tabList}
        onChange={handleChange}
        aria-label="lab API tabs example"
        centered
      >
        {tabsArray.map((item, index) => {
          return (
            <Tab
              key={index + 1}
              sx={tabStyles ? tabStyles.tabList.tab : styles.tabList.tab}
              label={
                <Box  alignItems="center">
                  {item?.img && (
                    <img src={item.img} alt={item.label} style={{ width: 50, height: 50 }} />
                  )}
                  <div>{item?.label ? item.label : item}</div>
                </Box>
              }
              value={`${index + 1}`}
              disabled={disabled}
            />
          );
        })}
      </TabList>
      {children}
    </TabContext>
  );
};

const styles = {
  tabList: {
    "& button.Mui-selected": {
      color: "black",
    },
    tab: {
      fontFamily: "HudsonNYSerif",
      fontSize: "20px",
      fontWeight: 300,
    },
  },
};

export default TabComponent;
