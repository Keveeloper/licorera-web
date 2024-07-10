import { Box } from "@mui/joy";
import { Button, TextField, Typography } from "@mui/material";
import { paletteColors } from "../../../paletteColors/paletteColors";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import "./UserAddPayment.css";
import { AddPaymentInterface } from "./types";
import { AddPaymentMethod, posPaymentCredit } from "../../../service/modules/paymentMethods/types";
import { useAppDispatch } from "../../../store/store";
import {
  addPaymentMethodsThunk,
  getPaymentMethodsThunk,
  posPaymentCreditThunk,
} from "../../../store/modules/paymentMethods/actions/paymentMethods.actions";
import { useEffect, useState } from "react";
import Loader from "../../shared/Loader/components/Loader";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { Height } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectAllCart } from "../../../store/modules/cart";
import usePaymentHook, { PaymentSelected } from "../../shared/hooks/paymentHook/usePaymentHook";
import { useNavigate } from "react-router-dom";
import DuesModal from "./DuesModal";
import CheckBoxComponent from "../../shared/checkBox/Checkbox.component";

const UserAddPayment = (props: AddPaymentInterface) => {
  const { setPaymentMethodsOpen, isChekout } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlertWarning, setShowAlertWarning] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showModalDue, setShowModalDue] = useState<boolean>(false);
  const [textWarning, setTextWarning] = useState<string>('Los datos son erroneos o son requeridos por favor compruebe.')
  const [dues, setDues] = useState<number>(0);
  const [checked, setChecked] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addToPayment } = usePaymentHook()
  const cartStore = useSelector(selectAllCart);

  const {
    register,
    formState: { errors, isValid },
    reset,
    getValues,
    control,
  } = useForm({
    mode: "onChange",
  });

  const styles = stylesAddPayment(errors, isValid);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    // setShowAlert(true);
    setLoading(true);
    const { cardnumber, expiryDate, ccvnumber, name } = getValues();
    const addPaymenteRequest: AddPaymentMethod = {
      number: cardnumber.replaceAll(" ", ""),
      cvv: ccvnumber,
      name: name,
      favorite: false,
      exp_month: expiryDate.split("/")[0],
      exp_year: `20${expiryDate.split("/")[1]}`,
    };
    try {
      const postAddPayment = await dispatch(
        addPaymentMethodsThunk({ reqData: addPaymenteRequest })
      ).unwrap();

      if (postAddPayment.success) {
        setLoading(false);
        setShowAlert(true);
      } else {
        setLoading(false);
        setShowAlertWarning(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowAlertWarning(true);
      //setShowAlert(true);
    }
  };

  const handleShowModalDue = () => {
    setShowModalDue(true);
  };

  const sutmitPayment = async () => {
    setLoading(true);
    setShowModalDue(false);
    if(checked)
      handleSubmit()
    
    const { cardnumber, expiryDate, ccvnumber, name } = getValues();
    
    const request: posPaymentCredit = {
      cardNumber: cardnumber.replaceAll(" ", ""),
      cardCvc: ccvnumber,
      cardExpYear: `20${expiryDate.split("/")[1]}`,
      cardExpMonth: expiryDate.split("/")[0],
      value: cartStore.total,
      orderId: cartStore.order,
      dues: dues,
      _cardTokenId: '',
    };
    const Payment = await dispatch(
      posPaymentCreditThunk({ reqData: request })
    ).unwrap();
    if (Payment.success) {
      setLoading(false);
      if (Payment?.response?.ref_payco && Payment.response.estado === "Aceptada") {
        setShowSuccessAlert(true)
        const payment:PaymentSelected = {
          type: "Tarjeta crédito",
          payment:"",
          ref_payco: Payment.response.ref_payco
        }
        addToPayment(payment)
      } else {
        setTextWarning("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.")
        setShowAlertWarning(true);
      }
    }else{
      setShowModalDue(false)
      setLoading(false);
      setTextWarning("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.")
      setShowAlertWarning(true);
    }
  };

  const dueOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDues(parseInt(value));
  };

  const handleBack = () => setPaymentMethodsOpen(false);

  const validateExpirationDate = (value: any) => {
    const [month, year] = value.split("/").map(Number);

    // Check if month is valid
    if (month < 1 || month > 12) {
      return "El mes debe estar entre 01 y 12";
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
    const currentYear = currentDate.getFullYear() % 100; // Obtener los dos últimos dígitos del año

    // Check if date is in the past
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "No puede ser menor a la fecha actual";
    }
    return true;
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

  const handleAlertCloseWarning = () => {
    setShowAlertWarning(false);
  };

  const goToCheckOut = () => {
    navigate("/checkout");
  };

  const onCheckBox = () => {
    setChecked(!checked)
  }

  const handleSave = async () => {
    setLoading(true);
    const getPayments = await dispatch(getPaymentMethodsThunk()).unwrap();
    if (getPayments.success) {
      setPaymentMethodsOpen(false);
    }
  };

  const handleSaveWarning = async () => {
    // setLoading(true);
    setShowAlertWarning(false);
  };

  if (loading) {
    return (
      <Box sx={{ height: "600px" }}>
        <Loader screenLoader={false} />
      </Box>
    );
  }

  return (
    <>
      <Box sx={styles.titleContainer}>
        <img
          style={styles.titleContainer.arrowImage}
          src="/icons/Keyboard-arrow-left.png"
          alt=""
          onClick={handleBack}
        />
        {!isChekout && (
          <Typography sx={styles.titleContainer.title}>
            agregar método de pago
          </Typography>
        )}
      </Box>
      <Box
        component="form"
        sx={styles.formContainer}
        style={isChekout ? { width: "100%" } : {}}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Typography sx={styles.formContainer.cardNumberLabel}>
          Número de la tarjeta
        </Typography>
        <Box sx={styles.formContainer.numberContainer}>
          <Box sx={styles.formContainer.numberContainer.cardInputContainer}>
            <InputMask
              style={
                styles.formContainer.numberContainer.cardInputContainer
                  .cardInput
              }
              mask="9999 9999 9999 9999"
              maskChar=" "
              placeholder="1234 5678 9012 3456"
              className="card-input-payment"
              {...register("cardnumber", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 16,
                  message: "El número de tarjeta debe tener 16 caracteres",
                },
                maxLength: {
                  value: 19,
                  message:
                    "El número de tarjeta no debe exceder los 19 caracteres",
                },
                validate: (value) =>
                  value.replace(/\s/g, "").length === 16 ||
                  "El número de tarjeta debe tener 16 dígitos",
              })}
              name="cardnumber"
              type="text"
            ></InputMask>
          </Box>
          <img
            style={styles.formContainer.numberContainer.cardimage}
            src="/icons/not-valid-card-icon.png"
            alt=""
          />
        </Box>
        <Typography color={"red"}>
          {errors.cardnumber ? errors.cardnumber.message?.toString() : ""}
        </Typography>
        <Box sx={styles.formContainer.dateCcvContainer}>
          <Box sx={styles.formContainer.dateCcvContainer.dateContainer}>
            <Typography sx={styles.formContainer.cardNumberLabel}>
              Fecha de expiración
            </Typography>
            <InputMask
              style={
                styles.formContainer.dateCcvContainer.dateContainer.inputDate
              }
              mask="99/99"
              maskChar=" "
              placeholder="MM/YY"
              className="card-input-payment"
              {...register("expiryDate", {
                required: "Este campo es obligatorio",
                validate: validateExpirationDate,
              })}
              name="expiryDate"
              type="text"
            />
          </Box>
          <Box sx={styles.formContainer.dateCcvContainer.ccvContainer}>
            <Typography sx={styles.formContainer.cardNumberLabel}>
              CCV
            </Typography>
            <InputMask
              style={
                styles.formContainer.dateCcvContainer.ccvContainer.inputCvv
              }
              mask="999"
              maskChar=" "
              placeholder="123"
              className="card-input-payment"
              {...register("ccvnumber", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 3,
                  message: "No puede ser menor a 3 caracteres",
                },
                maxLength: {
                  value: 4,
                  message: "No puede ser mayor a 4 caracteres",
                },
                validate: (value) =>
                  value.replace(/\s/g, "").length === 3 ||
                  "El número de tarjeta debe tener 3 dígitos",
              })}
              name="ccvnumber"
              type="text"
            />
          </Box>
        </Box>
        <Box sx={styles.formContainer.dateCcvErrorsContainer}>
          <Box
            sx={styles.formContainer.dateCcvErrorsContainer.dateErrorsContainer}
          >
            <Typography color={"red"}>
              {errors.expiryDate ? errors.expiryDate.message?.toString() : ""}
            </Typography>
          </Box>
          <Box
            sx={styles.formContainer.dateCcvErrorsContainer.ccvErrorsContainer}
          >
            <Typography color={"red"}>
              {errors.ccvnumber ? errors.ccvnumber.message?.toString() : ""}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.formContainer.nameContainer}>
          <Typography sx={styles.formContainer.cardNumberLabel}>
            Nombre en la tarjeta
          </Typography>
          <TextField
            sx={styles.formContainer.nameContainer.nameInput}
            placeholder="Pepito Perez"
            variant="filled"
            error={!!errors.name}
            // helperText={
            //     errors.name ? errors.name.message?.toString() : ""
            // }
            {...register("name", {
              required: "Este campo es obligatorio",
              minLength: {
                value: 6,
                message: "El mínimo de caracteres permitidos son 6",
              },
            })}
            name="name"
          />
        </Box>
        <Typography color={"red"}>
          {errors.name ? errors.name.message?.toString() : ""}
        </Typography>
        {isChekout && 
          <CheckBoxComponent
            style={styles.checkBox}
            checked={checked}
            onChange={onCheckBox}
            widthIcon={30}
          >
            <Typography
              style={{ fontFamily: "weblysleekuisb", fontSize: "18px", fontWeight: 400,
              color: '#000000'  }}
            >
              Guardar esta tarjeta
            </Typography>
          </CheckBoxComponent>
        }
        <Box sx={styles.formContainer.ePaycoContainer}>
          <img
            style={styles.formContainer.ePaycoContainer.padlock}
            src="/icons/padlock-icon.png"
            alt=""
          />
          <Typography sx={styles.formContainer.ePaycoContainer.text}>
            Pago seguro con ePayco
          </Typography>
        </Box>
        {isChekout ? (
          <Button
            sx={styles.formContainer.button}
            variant="outlined"
            fullWidth
            color="inherit"
            type="button"
            onClick={handleShowModalDue}
            disabled={!isValid}
          >
            Pagar
          </Button>
        ) : (
          <Button
            sx={styles.formContainer.button}
            variant="outlined"
            fullWidth
            color="inherit"
            type="submit"
            disabled={!isValid}
          >
            Agregar
          </Button>
        )}
      </Box>
      <ModalAlertComponent
        handleClose={handleAlertClose}
        handleSave={handleSave}
        open={showAlert}
        isCancellButton={false}
        data={{
          title: "informaCión",
          content: `La tarjeta fue agregada exitosamente.`,
          img: `/icons/checkIcon.png`,
        }}
      />
      <ModalAlertComponent
        handleClose={handleAlertCloseWarning}
        handleSave={handleSaveWarning}
        open={showAlertWarning}
        isCancellButton={false}
        data={{
          title: "informaCión",
          content: textWarning,
          img: `/icons/alert.png`,
        }}
      />
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
    </>
  );
};

const stylesAddPayment = (errors: any, isValid: boolean) => ({
  titleContainer: {
    width: "100%",
    height: "70px",
    display: "flex",
    alignItems: "center",
    arrowImage: {
      height: "100%",
      cursor: "pointer",
    },
    title: {
      margin: "0 auto",
      fontFamily: "HudsonNYSerif",
      fontSize: "30px",
      textAlign: "center",
    },
  },
  formContainer: {
    margin: "50px auto 0 auto",
    width: "80%",
    cardNumberLabel: {
      fontFamily: "weblysleekuisb",
      fontSize: "18px",
    },
    numberContainer: {
      width: "100%",
      display: "flex",
      alignItems: "end",
      cardInputContainer: {
        width: "90%",
        cardInput: {
          padding: "25px 12px 20px 12px",
          width: "100%",
          fontFamily: "weblysleekuil",
          fontSize: "16px",
          fontWeight: 300,
          color: paletteColors.black,
          border: "none",
          borderBottom: `1px solid ${errors.cardnumber ? "red" : "black"}`,
        },
      },
      cardimage: {
        width: "100px",
      },
    },
    dateCcvContainer: {
      marginTop: 4,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      dateContainer: {
        width: "45%",
        inputDate: {
          padding: "25px 12px 20px 12px",
          width: "100%",
          fontFamily: "weblysleekuil",
          fontSize: "16px",
          fontWeight: 300,
          color: paletteColors.black,
          border: "none",
          borderBottom: `1px solid ${errors.expiryDate ? "red" : "black"}`,
        },
      },
      ccvContainer: {
        width: "45%",
        inputCvv: {
          padding: "25px 12px 20px 12px",
          width: "100%",
          fontFamily: "weblysleekuil",
          fontSize: "16px",
          fontWeight: 300,
          color: paletteColors.black,
          border: "none",
          borderBottom: `1px solid ${errors.ccvnumber ? "red" : "black"}`,
        },
      },
    },
    dateCcvErrorsContainer: {
      display: "flex",
      justifyContent: "space-between",
      dateErrorsContainer: {
        width: "45%",
      },
      ccvErrorsContainer: {
        width: "45%",
      },
    },
    nameContainer: {
      mt: 4,
      nameInput: {
        width: "100%",
        fontFamily: "weblysleekuil",
        fontSize: "16px",
        fontWeight: 300,
        color: "#000000",
        "& input": {
          paddingBottom: "20px",
          background: "white",
        },
      },
    },
    ePaycoContainer: {
      m: "40px auto 0 auto",
      width: "35%",
      height: "25px",
      display: "flex",
      justifyContent: "space-around",
      padlock: {
        height: "100%",
      },
      text: {
        fontFamily: "weblysleekuil",
      },
    },
    button: {
      margin: "50px 0 0 0",
      padding: 2,
      fontFamily: "HudsonNYSerif",
      fontSize: "18px",
      background: isValid ? paletteColors.gold : "#D1D1D1",
      color: "white !important",
      border: "none !important",
      height: "60px",
      // '&:hover': {
      //     background: `${edit ? paletteColors.gold : 'transparent'}`,
      // },
    },
  },
  checkBox: {
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    fontAlign: "center",
  }
});

export default UserAddPayment;
