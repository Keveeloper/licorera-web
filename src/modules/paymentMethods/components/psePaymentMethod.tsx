import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  hudsonNYFontStyle,
  weblysleekBoltFontStyle,
  weblysleekFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import ButtonComponent from "../../shared/button/button.component";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useAppDispatch } from "../../../store/store";
import {
  getPaymentBanksThunk,
  posPaymentPseThunk,
} from "../../../store/modules/paymentMethods/actions/paymentMethods.actions";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { paletteColors } from "../../../paletteColors/paletteColors";
import { useSelector } from "react-redux";
import { selectAllCart } from "../../../store/modules/cart";

const PsePaymentMethod = () => {
  const [bankList, setBankList] = useState([]);
  const [warningAlert, setwarningAlert] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const cartStore = useSelector(selectAllCart);
  
  const {
    register,
    formState: { errors, isValid },
    reset,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const getBanks = async () => {
    const getPayments = await dispatch(getPaymentBanksThunk()).unwrap();
    if (getPayments.success) {
      setBankList(getPayments.response);
    }
  };

  const alertClose = () => {
    setwarningAlert(false);
  };

  const postPaymentPse = async () => {
    const {
      bankSelect,
      documentType,
      document,
      phone,
      names,
      lastNames,
      email,
    } = getValues();
    const request = {
      value: cartStore.total,
      order_id: cartStore.order,
      bank: bankSelect,
      doc_type: documentType,
      doc_number: document,
      cell_phone: phone,
      name: names,
      last_name: lastNames,
      email: email,
      tax: "0",
      reference: "PSE",
      isWeb:true
    };
    const Payment = await dispatch(
      posPaymentPseThunk({ reqData: request })
    ).unwrap();
    if (Payment.success) {
      console.log(Payment);
      if (Payment.response.success) {
        const urlBank = Payment.response.data.urlbanco;
        const ref = Payment.response.data.ref_payco;
        window.open(urlBank, "_blank");
      } else {
        setwarningAlert(true);
        console.log(Payment.response.text_response);
      }
    }
  };

  useEffect(() => {
    getBanks();
  }, []);

  const styles = stylesAddPayment(errors, isValid);

  return (
    <Grid item xs={12} sx={{}}>
      <FormControl variant="standard" sx={{ mt: 2, minWidth: "100%" }}>
        <InputLabel style={{ ...style.form.label }} id="labelLocation">
          Selecciona tu banco
        </InputLabel>
        <Select
          placeholder="Seleccionar"
          label="labelLocation"
          {...register("bankSelect", {
            required: "Este campo es obligatorio",
          })}
          style={{ width: "100%", textAlign: "left" }}
          // onChange={handleChange}
        >
          {bankList &&
            bankList?.length > 0 &&
            bankList?.map((item: any) => {
              return (
                <MenuItem value={item.bankCode} key={item.bankCode}>
                  {item.bankName}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <Typography
        style={{ ...style.form.subtitle, textAlign: "left" }}
        sx={{ mt: 2 }}
      >
        Datos Personales
      </Typography>
      <FormControl variant="standard" sx={{ mt: 2, minWidth: "100%" }}>
        <InputLabel style={{ ...style.form.label }} id="labelLocation">
          Tipo de documento
        </InputLabel>
        <Select
          placeholder="Seleccionar"
          label="labelLocation"
          {...register("documentType", {
            required: "Este campo es obligatorio",
          })}
          labelId="dlocation"
          style={{ width: "100%", textAlign: "left" }}
          // onChange={handleChange}
        >
          <MenuItem value="CC">Cédula</MenuItem>
          <MenuItem value="Pasaporte">Pasaporte</MenuItem>
          <MenuItem value="Tarjeta de identidad">Tarjeta de identidad</MenuItem>
        </Select>
      </FormControl>
      <TextField
        error={!!errors.document}
        helperText={errors.document ? errors.document.message?.toString() : ""}
        {...register("document", {
          required: "Este campo es obligatorio",
          pattern: {
            value: /^[0-9]*$/,
            message: "Solo se permiten números",
          },
        })}
        style={{ minWidth: "100%" }}
        sx={{ mt: 3 }}
        id="standard-basic"
        label="Número de documento"
        variant="standard"
      />
      <TextField
        error={!!errors.names}
        helperText={errors.names ? errors.names.message?.toString() : ""}
        {...register("names", {
          required: "Este campo es obligatorio",
        })}
        style={{ minWidth: "100%" }}
        sx={{ mt: 3 }}
        id="standard-basic"
        label="Nombres"
        variant="standard"
      />
      <TextField
        error={!!errors.lastNames}
        helperText={
          errors.lastNames ? errors.lastNames.message?.toString() : ""
        }
        {...register("lastNames", {
          required: "Este campo es obligatorio",
        })}
        style={{ minWidth: "100%" }}
        sx={{ mt: 3 }}
        id="standard-basic"
        label="Apellidos"
        variant="standard"
      />
      <TextField
        error={!!errors.email}
        helperText={errors.email ? errors.email.message?.toString() : ""}
        {...register("email", {
          required: "Este campo es obligatorio",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Debe ser un correo electrónico válido",
          },
        })}
        style={{ minWidth: "100%" }}
        sx={{ mt: 3 }}
        id="standard-basic"
        label="Correo Electrónico"
        variant="standard"
      />
      {/* <TextField
        error={!!errors.phone}
        helperText={errors.phone ? errors.phone.message?.toString() : ""}
        {...register("phone", {
          required: "Este campo es obligatorio",
          pattern: {
            value: /^[0-9]*$/,
            message: "Solo se permiten números",
          },
          minLength: {
            value: 10,
            message: "Debe tener al menos 10 dígitos",
          },
          maxLength: {
            value: 10,
            message: "No puede tener más de 10 dígitos",
          },
        })}
        style={{ minWidth: "100%" }}
        sx={{ mt: 3 }}
        id="standard-basic"
        label="Número de celular"
        variant="standard"
      /> */}
      <InputMask
        style={styles.cardInput}
        mask="999 999 99 99"
        maskChar=" "
        placeholder="Número de celular"
        className="card-input-payment"
        {...register("phone", {
          required: "Este campo es obligatorio",
          minLength: {
            value: 13,
            message: "El número de tarjeta debe tener 10 caracteres",
          },
          maxLength: {
            value: 13,
            message: "El número de tarjeta no debe exceder los 10 caracteres",
          },
          validate: (value) =>
            value.replace(/\s/g, "").length === 10 ||
            "El número de celular debe tener 10 dígitos",
        })}
        name="phone"
        type="text"
      ></InputMask>
      <Typography color={"#d32f2f"} fontSize={"0.75rem"}>
          {errors.phone ? errors.phone.message?.toString() : ""}
      </Typography>
      <Box sx={{ mt: 10 }}>
        <ButtonComponent
          disabled={!isValid}
          onClick={postPaymentPse}
          style={isValid ? styleButton.button : styleButton.disabledButton}
        >
          PAGAR CON PSE
        </ButtonComponent>
      </Box>
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
    </Grid>
  );
};

export default PsePaymentMethod;

const style = {
  form: {
    title: {
      ...weblysleekBoltFontStyle,
      fontSize: "21px",
    },
    subtitle: {
      ...weblysleekBoltFontStyle,
      fontWeight: 600,
    },
    label: {
      ...weblysleekFontStyle,
      color: "#BBBBBB",
    },
    button: {
      background: "#99791C",
      color: "white",
      padding: "10px 0 15px",
      fontFamily: "HudsonNYSerif",
      width: "100%",
      borderRadius: "5px",
      fontSize: "20px",
      margin: "0 0 2px 2px",
      border: "none",
      cursor: "pointer",
    },
  },
};

const styleButton = {
  button: {
    ...hudsonNYFontStyle,
    fontSize: "18px",
    background: "#FFFFFF",
    width: "100%",
    height: "60px",
    borderRadius: "5px",
    // padding: "0 0 8px 0",
    cursor: "pointer",
    border: "1px solid #000000",
  },
  disabledButton: {
    ...hudsonNYFontStyle,
    fontSize: "18px",
    background: "#D1D1D1",
    width: "100%",
    height: "60px",
    borderRadius: "5px",
    // padding: "0 0 8px 0",
    cursor: "pointer",
    color: "#FFFFFF",
    border: "none",
  }
};

const stylesAddPayment = (errors: any, isValid: boolean) => ({
  cardInput: {
    padding: '4px 0 5px',
    height: '48px',
    marginTop: '24px',
    width: "100%",
    fontFamily: "weblysleekuil",
    fontSize: "16px",
    fontWeight: 300,
    color: paletteColors.black,
    border: "none",
    borderBottom: `1px solid ${errors.cardnumber ? "red" : "black"}`,
  },
})
