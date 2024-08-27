import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useState } from "react";
import TabComponent from "../shared/tabComponent/TabComponent";
import { displayFlex } from "../shared/recursiveStyles/RecursiveStyles";
import { Box } from "@mui/material";
import PsePaymentMethod from "./components/psePaymentMethod";
import FooterScreen from "../shared/footer/FooterScreen";
import UserPaymentMethods from "../userProfile/components/UserPaymentMethods";
import HomePaymentMethod from "./components/homePaymentMethod";
import UserAddPayment from "../userProfile/components/UserAddPayment";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartActions, selectAllCart } from "../../store/modules/cart";
import { useAppDispatch } from "../../store/store";
import { getOrderByIdThunk, updateOrderThunk } from "../../store/modules/cart/actions/cart.actions";
import ModalAlertComponent from "../shared/modal/modalAlert.component";
import usePaymentHook, {
  PaymentSelected,
} from "../shared/hooks/paymentHook/usePaymentHook";
import useAddressHook from "../shared/hooks/addressHook/useAddressHook";
import { requestUpdateOrder } from "../../service/modules/orders/order";
import NumberFormat from "../shared/hooks/numberFormater/NumberFormat";
import { addressActions } from "../../store/modules/address";
import { paymentMethodsActions } from "../../store/modules/paymentMethods";


const PaymentMethodsScreen = () => {
  const { id } = useParams();
  const cartStore = useSelector(selectAllCart);
  const { getAddress, updateAddressItem } = useAddressHook();
  const { getPayment } = usePaymentHook();

  const [successData, setSuccessData] = useState<any>();
  const [successAlert, setSuccessAlert] = useState(false);
  const [value, setValue] = useState("1");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [warningAlert, setWarningAlert] = useState<boolean>(false);
  const [paymentMethodsOpen, setPaymentMethodsOpen] = useState<boolean>(false);
  const [alertArray, setAlertArray] = useState<{
    img: string;
    text: string;
    save: any;
  }>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addToPayment } = usePaymentHook();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTimeout(() => {
      setDisabled(false);
    }, 200);
    setDisabled(true);
  };

  const handleClose = () => {
    setWarningAlert(false);
  };

  const goToHome = () => {
    navigate("/home");
  };

  const successClose = () => {
    setSuccessAlert(false);
  };

  const getOrderById = async () => {
    const currentOrders = await dispatch(
      getOrderByIdThunk(cartStore.order)
    ).unwrap();
    if (currentOrders.response.success) {
      if (currentOrders.response.data.status_id === 3) {
        setAlertArray({
          save: updateOrder,
          img: "/icons/checkIcon.png",
          text: "Tu pago fue procesado exitosamente. Procederemos con tu pedido.",
        });
        const payment: PaymentSelected = {
          type: "Pago PSE",
          payment: "",
        };
        addToPayment(payment);
        setWarningAlert(true);
      } else {
        setAlertArray({
          save: handleClose,
          img: "/icons/alert.png",
          text: "Transaccion en progreso",
        });
        setWarningAlert(true);
      }
    } else {
      setAlertArray({
        save: handleClose,
        img: "/icons/alert.png",
        text: "Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.",
      });
      setWarningAlert(true);
    }
  };

  const updateOrder = async () => {
    const addressHook = getAddress();
    const payment = getPayment();

    const requestUpdate: requestUpdateOrder = {
      latitude: addressHook.coords.latitude,
      longitude: addressHook.coords.longitude,
      address: addressHook.address,
      addressDetails: addressHook.detail,
      paymentMethod: payment.type,
      pay_method: payment.type,
      amount: cartStore.total,
      phone: cartStore.phone || "",
      discountCode: cartStore?.disccount || "",
      instructions: "",
      description: "",
      transactionId: "",
    };
    const updateOrder = await dispatch(
      updateOrderThunk({ id: cartStore.order, reqData: requestUpdate })
    ).unwrap();
    if (updateOrder.success) {
      console.log(updateOrder);
      if (updateOrder.response && updateOrder.response.success) {
        const data = updateOrder.response.data;
        const total = parseInt(data.value);
        setSuccessData({
          time: data.time,
          value: NumberFormat(total),
        });
        setSuccessAlert(true);
        dispatch(cartActions.clearState());
        dispatch(addressActions.clearAddressSelected())
        dispatch(paymentMethodsActions.clearPaymentSelected())
      }
    }
  };

  useEffect(() => {
    if (id === "response") {
      getOrderById();
    }
  }, [id]);
  

  return (
    <>
      <Box style={{ ...displayFlex, margin: "40px 0" }}>
        <img
          src="/images/whiteLogo.png"
          alt=""
          width={200}
          onClick={goToHome}
        />
      </Box>
      <TabComponent
        tabsArray={[
          { label: "PAGO PSE", img: "/icons/PseIcon.png" },
          { label: "T. CREDITO", img: "/icons/CreditCardIcon.png" },
          {
            label: "EN CASA",
            img: `${
              value === "3"
                ? "/icons/AtHomeIconWhite.png"
                : "/icons/AtHomeIcon.png"
            }`,
          },
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
            <UserAddPayment
              setPaymentMethodsOpen={setPaymentMethodsOpen}
              isChekout
            />
          ) : (
            <UserPaymentMethods
              setPaymentMethodsOpen={setPaymentMethodsOpen}
              isChekout
              updateOrder={updateOrder}
            />
          )}
        </TabPanel>
        <TabPanel
          sx={{ padding: "0", height: "600px", width: "650px !important" }}
          value="3"
          className="columnContainer mt-20"
        >
          <HomePaymentMethod updateOrder={updateOrder}/>
        </TabPanel>
      </TabComponent>
      <FooterScreen />
      <ModalAlertComponent
        handleClose={handleClose}
        handleSave={alertArray?.save}
        open={warningAlert}
        data={{
          title: "INFORMACIÓN",
          content: alertArray?.text || "",
          img: alertArray?.img || "",
        }}
      />
      {/* modal already submit done */}
      <ModalAlertComponent
        handleClose={successClose}
        handleSave={goToHome}
        open={successAlert}
        data={{
          title: `PEDIDO RECIBIDO`,
          content: `Gracias por tu pedido lo recibiras en <b>${successData?.time} min aprox <br/><br/> Total: $${successData?.value}</b>`,
          img: `icons/SuccessCheckout.png`,
        }}
      />
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
      fontSize: "14px",
      fontWeight: 300,
    },
  },
};
