import { useEffect, useState } from "react";
import { TabPanel } from "@mui/lab";

// Custom components
import TabComponent from "../../shared/tabComponent/TabComponent";

// Material UI component
import { Box } from "@mui/material";
import UserInfo from "./UserInfo";
import UserPaymentMethods from "./UserPaymentMethods";
import { useAppDispatch } from "../../../store/store";
import { getMe } from "../../../store/modules/users/actions/users.actions";
import { useSelector } from "react-redux";
import { selectAllPersonalInfo } from "../../../store/modules/users";
import { getPaymentMethodsThunk } from "../../../store/modules/paymentMethods/actions/paymentMethods.actions";
import Loader from "../../shared/Loader/components/Loader";
import UserAddPayment from "./UserAddPayment";
import UserAddress from "./UserAddress";
import { useLocation } from "react-router-dom";

const UserContent = () => {

    const dispatch = useAppDispatch();
    const personalInfo: any = useSelector(selectAllPersonalInfo);
    const location = useLocation();
    
    const [value, setValue] = useState<string>(location.state.tab);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [paymentMethodsOpen, setPaymentMethodsOpen] = useState<boolean>(false);

    const styles = stylesUserContent(value, paymentMethodsOpen);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setTimeout(() => {
          setDisabled(false);
        }, 2000);
        setDisabled(true);    
    };

    useEffect(()  => {
        setLoading(true);
        const fetchData = async () => {
            if (value === "1") await dispatch(getMe(personalInfo.token)).unwrap();
            if (value === "2") await dispatch(getPaymentMethodsThunk()).unwrap();

            await setLoading(false);
        }
        fetchData();
    }, [value]);

    if (loading) {
        return (
            <Box sx={styles.contentContainer}>
                <Loader screenLoader={false}/>
            </Box>
        );
    }

    return (
        <Box sx={styles.contentContainer}>
            {paymentMethodsOpen ? 
                <UserAddPayment setPaymentMethodsOpen={setPaymentMethodsOpen}/>
            :
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
                    <TabPanel sx={{padding: 0, width: '100%', height: '100%'}} value="2">
                        <UserPaymentMethods setPaymentMethodsOpen={setPaymentMethodsOpen}/>
                    </TabPanel>
                    <TabPanel sx={{padding: 0, width: '100%', height: '100%'}} value="3">
                        <UserAddress />
                    </TabPanel>
                </TabComponent>
            }
        </Box>
    );

}

const stylesUserContent = (value: string, paymentMethodsOpen: boolean) => ({
    contentContainer: {
        margin: '90px auto',
        width: '60%',
        height: value === '2' || value === '3' && !paymentMethodsOpen ? '500px' : '',
        // background: 'orange'
    }
});

export default UserContent;