import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllPaymentMethods } from "../../../store/modules/paymentMethods";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";
import { displayFlexColumn } from "../../shared/recursiveStyles/RecursiveStyles";
import { Typography } from "@mui/material";
import { selectAllUser } from "../../../store/modules/users";
import { useCallback, useEffect, useState } from "react";
import {
  DeletePaymentMethod,
  posPaymentCredit,
} from "../../../service/modules/paymentMethods/types";
import { useAppDispatch } from "../../../store/store";
import {
  deletePaymentMethodsThunk,
  getPaymentMethodsThunk,
  posPaymentCreditThunk,
} from "../../../store/modules/paymentMethods/actions/paymentMethods.actions";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { AddPaymentInterface } from "./types";
import DuesModal from "./DuesModal";
import { selectAllCart } from "../../../store/modules/cart";
import { useNavigate } from "react-router-dom";
import usePaymentHook, { PaymentSelected } from "../../shared/hooks/paymentHook/usePaymentHook";
import Loader from "../../shared/Loader/components/Loader";

const UserPaymentMethods = (props: AddPaymentInterface) => {
  const { setPaymentMethodsOpen, isChekout, updateOrder } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addToPayment } = usePaymentHook()

  const getAsyncPaymentMethods = useCallback(async () => {
    dispatch(getPaymentMethodsThunk()).unwrap();
  }, []);

  const paymentMethodsRedux = useSelector(selectAllPaymentMethods);
  const cartStore = useSelector(selectAllCart);
  const user = useSelector(selectAllUser);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [dues, setDues] = useState<number>(0);
  const [showModalDue, setShowModalDue] = useState<boolean>(false);
  const [item, setItem] = useState<any>({});
  const [warningAlert, setwarningAlert] = useState<boolean>(false);
  const [itemToRemove, setItemToRemove] = useState<DeletePaymentMethod | null>(null);
  const [newItem, setNewItem] = useState<DeletePaymentMethod | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const deletePayment = async () => {
    if (itemToRemove) {
      await dispatch(deletePaymentMethodsThunk({ reqData: itemToRemove })).unwrap().then((response) => {
        console.log('removed: ', response.response.success);
        if (response.response.success) {
          dispatch(getPaymentMethodsThunk()).unwrap().then((res) => {            
            if(res.success){
              setItemToRemove(null);
              setLoading(false);
            }
          });
        }
      });
    }
  }
  
  useEffect(() => {
    if (itemToRemove) {
      deletePayment();
    }else {
      setLoading(false);
    }
  }, [itemToRemove]);

  const handleShowAlert = (item: DeletePaymentMethod) => {
    const newItemToRemove = {
      token: item.token,
      franchise: item.franchise,
      mask: item.mask,
    };
    setNewItem(newItemToRemove);
    setShowAlert(true);
  };

  const dueOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDues(parseInt(value));
  };

  const handleShowModalDue = (item: any) => {
    setItem(item);
    setShowModalDue(true);
  };

  // const handleRemove = (item: DeletePaymentMethod) => {
  const handleRemove = () => {
    console.log(newItem);
    
    // const newItemToRemove = {
    //   token: item.token,
    //   franchise: item.franchise,
    //   mask: item.mask,
    // };
    setLoading(true);
    setItemToRemove(newItem);
    setShowAlert(false);
  };

  useEffect(() => {
    getAsyncPaymentMethods();
  }, []);

  const alertClose = () => {
    setwarningAlert(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
  };

  const handleModalDueClose = () => {
    setShowModalDue(false);
  };

  const handleClick = () => setPaymentMethodsOpen(true);

  const sutmitPayment = async () => {
    const request: posPaymentCredit = {
      cardNumber: "",
      cardCvc: "",
      cardExpYear: "",
      cardExpMonth: "",
      value: cartStore.total,
      orderId: cartStore.order,
      dues: dues,
      _cardTokenId: item.token,
    };
    const Payment = await dispatch(
      posPaymentCreditThunk({ reqData: request })
    ).unwrap();
    
    if (Payment.success) {
      if (Payment?.response?.ref_payco && Payment.response.estado === "Aceptada") {
        setShowSuccessAlert(true)
        const payment:PaymentSelected = {
          type: "Tarjeta crédito",
          payment:"",
          ref_payco: Payment.response.ref_payco
        }
        addToPayment(payment)
      } else {
        setwarningAlert(true);
        console.log(Payment);
      }
    }else{
      setwarningAlert(true);
    }
  };

  const goToCheckOut = () => {
    if(updateOrder){
      updateOrder()
    } 
  };

  if (loading) {
    return (
        
            <Loader screenLoader={false}/>
        
    );
}

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          padding: "60px 5%",
          width: "100%",
          height: "80%",
          overflow: "auto",
        }}
      >
        {paymentMethodsRedux?.length > 0 ? (
          paymentMethodsRedux?.map((item: any, index: any) => (
            <div
              onClick={isChekout ? () => handleShowModalDue(item) : () => {}}
              key={item.token}
              style={{
                marginTop: "30px",
                padding: "0 0 20px 0",
                width: "100%",
                height: "25%",
                ...displayFlex,
                borderBottom: "1px solid gray",
              }}
            >
              <figure style={{ width: "10%", height: "100%", ...displayFlex }}>
                <img
                  style={{ height: "50%" }}
                  src="/icons/credit-card-color.png"
                  alt="credit card color icon"
                />
              </figure>
              <Box sx={{ width: "80%" }}>
                <Typography
                  sx={{ fontFamily: "weblysleekuisb", fontSize: "20px" }}
                >
                  {item.mask}
                </Typography>
                <Typography
                  sx={{ fontFamily: "weblysleekuil", fontSize: "16px" }}
                >
                  {user.name} {user.last_name}
                </Typography>
              </Box>
              {!isChekout && (
                <>
                  <figure
                    style={{ width: "10%", height: "100%", ...displayFlex }}
                  >
                    {/* <img style={{height: '40%'}} src="/icons/trash.png" alt="credit card color icon" onClick={(() => handleRemove(item))}/> */}
                    <img
                      style={{ height: "40%", cursor: "pointer" }}
                      src="/icons/trash.png"
                      alt="credit card color icon"
                      onClick={() => handleShowAlert(item)}
                    />
                  </figure>
                  <ModalAlertComponent
                    handleClose={handleAlertClose}
                    handleSave={() => handleRemove()}
                    open={showAlert}
                    isCancellButton={true}
                    data={{
                      title: newItem?.mask,
                      content: `¿Seguro que quieres eliminar esta tarjeta?`,
                      img: `/icons/alert.png`,
                    }}
                  />
                </>
              )}
            </div>
          ))
        ) : (
          <Box sx={{ width: "100%", height: "100%", ...displayFlexColumn }}>
            <Typography sx={{ fontFamily: "HudsonNYSerif" }}>
              aun no tienes tarjetas guardadas
            </Typography>
            <Typography sx={{ fontFamily: "weblysleekuil" }}>
              agrega una para continuar
            </Typography>
          </Box>
        )}
      </Box>
      <Button
        // sx={styles.button}
        sx={{ height: "10%", fontFamily: "HudsonNYSerif", fontSize: "18px" }}
        variant="outlined"
        fullWidth
        color="inherit"
        onClick={handleClick}
      >
        {/* {edit ? 'Guardar' : 'Editar'} */}
        Agregar
      </Button>
      {/* due modal */}
      <DuesModal
        handleClose={handleModalDueClose}
        handleSave={sutmitPayment}
        dues={dues}
        open={showModalDue}
        setDue={dueOnchange}
        data={{
          title: "¿A cuantas cuotas quieres diferir tu pago?",
        }}
      />
      {/* success modal */}
      <ModalAlertComponent
        handleClose={handleSuccessAlertClose}
        handleSave={goToCheckOut}
        open={showSuccessAlert}
        data={{
          title: `¡FELICITACIONES!`,
          content: `Tu pago fue procesado exitosamente. Procederemos con tu pedido.`,
          img: `/icons/checkIcon.png`,
        }}
      />
      {/* error modal */}
      <ModalAlertComponent
        handleClose={alertClose}
        handleSave={alertClose}
        open={warningAlert}
        data={{
          title: "INFORMACIÓN",
          content: `Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.`,
          img: "/icons/alert.png",
        }}
      />
    </Box>
  );
};

export default UserPaymentMethods;
