import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";
import TabComponent from "../shared/tabComponent/TabComponent";
import { displayFlex } from "../shared/recursiveStyles/RecursiveStyles";
import { Box } from "@mui/material";
import PsePaymentMethod from "./components/psePaymentMethod";
import FooterScreen from "../shared/footer/FooterScreen";
import UserPaymentMethods from "../userProfile/components/UserPaymentMethods";
import HomePaymentMethod from "./components/homePaymentMethod";
import UserAddPayment from "../userProfile/components/UserAddPayment";

const PaymentMethodsScreen = () => {
  const [value, setValue] = useState("1");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [paymentMethodsOpen, setPaymentMethodsOpen] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTimeout(() => {
      setDisabled(false);
    }, 200);
    setDisabled(true);
  };

  return (
    <>
      <Box style={{ ...displayFlex, margin: "40px 0" }}>
        <img src="/images/whiteLogo.png" alt="" width={200} />
      </Box>
      <TabComponent
        tabsArray={[
          { label: "PAGO PSE", img: "/icons/PseIcon.png" },
          { label: "T. CREDITO", img: "/icons/CreditCardIcon.png" },
          { label: "EN CASA", img: "/icons/AtHomeIcon.png" },
        ]}
        value={value}
        setValue={setValue}
        handleChange={handleChange}
        disabled={disabled}
        tabStyles={styles}
      >
        <TabPanel
          sx={{ padding: "0", height: "600px", width: "650px !important" }}
          value="1"
          className="columnContainer"
        >
          <PsePaymentMethod />
        </TabPanel>
        <TabPanel
          sx={{ padding: "0", height: "600px", width: "650px !important" }}
          value="2"
          className="columnContainer"
        >
          {paymentMethodsOpen ? (
            <UserAddPayment setPaymentMethodsOpen={setPaymentMethodsOpen} isChekout />
          ) : (
            <UserPaymentMethods setPaymentMethodsOpen={setPaymentMethodsOpen} isChekout/>
          )}
        </TabPanel>
        <TabPanel
          sx={{ padding: "0", height: "600px", width: "650px !important" }}
          value="3"
          className="columnContainer mt-20"
        >
          <HomePaymentMethod />
        </TabPanel>
      </TabComponent>
      <FooterScreen />
    </>
  );
};

export default PaymentMethodsScreen;

const styles = {
  tabList: {
    "& button.Mui-selected": {
      background: "#404040",
      color: "white",
    },
    ".MuiTabs-indicator": {
      backgroundColor: "transparent !important",
    },
    tab: {
      height: "90px",
      width: "150px",
      margin: "0 10px",
      borderRadius: "5px",
      background: "#D1D1D1",
      fontFamily: "HudsonNYSerif",
      fontSize: "20px",
      fontWeight: 300,
    },
  },
};
