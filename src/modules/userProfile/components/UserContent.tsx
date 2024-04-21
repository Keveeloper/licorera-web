import { useState } from "react";
import { TabPanel } from "@mui/lab";

// Custom components
import TabComponent from "../../shared/tabComponent/TabComponent";

// Material UI component
import { Box } from "@mui/material";
import UserInfo from "./UserInfo";
import UserPaymentMethods from "./UserPaymentMethods";

const UserContent = () => {

    const [value, setValue] = useState<string>("1");
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setTimeout(() => {
          setDisabled(false);
        }, 2000);
        setDisabled(true);    
    };

    return (
        <Box sx={styles.contentContainer}>
            <TabComponent
                tabsArray={["INFORMACIÓN", "MÉTODOS DE PAGO", "DIRECCIONES"]}
                // tabsArray={}
                value={value}
                setValue={setValue}
                handleChange={handleChange}
                disabled={disabled}
            >
                <TabPanel sx={{padding: 0}} value="1">
                    <UserInfo />
                </TabPanel>
                <TabPanel sx={{padding: 0}} value="2">
                    <UserPaymentMethods/>
                </TabPanel>
            </TabComponent>
        </Box>
    );

}

const styles = {
    contentContainer: {
        margin: '90px auto',
        width: '60%',
        height: '500px',
        // background: 'blue'
    }
}

export default UserContent;