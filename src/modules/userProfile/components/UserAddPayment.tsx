import { Box } from "@mui/joy";
import { Button, TextField, Typography } from "@mui/material";
import { paletteColors } from "../../../paletteColors/paletteColors";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import "./UserAddPayment.css";
import { AddPaymentInterface } from "./types";
import { AddPaymentMethod } from "../../../service/modules/paymentMethods/types";
import { useAppDispatch } from "../../../store/store";
import {
  addPaymentMethodsThunk,
  getPaymentMethodsThunk,
} from "../../../store/modules/paymentMethods/actions/paymentMethods.actions";
import { useEffect, useState } from "react";
import Loader from "../../shared/Loader/components/Loader";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { Height } from "@mui/icons-material";

const UserAddPayment = (props: AddPaymentInterface) => {
  const { setPaymentMethodsOpen, isChekout } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlertWarning, setShowAlertWarning] = useState<boolean>(false);

  const dispatch = useAppDispatch();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const handleAlertCloseWarning = () => {
    setShowAlertWarning(false);
  };

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
            type="submit"
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
          content: `Los datos son erroneos o son requeridos por favor compruebe.`,
          img: `/icons/alert.png`,
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
});

export default UserAddPayment;
