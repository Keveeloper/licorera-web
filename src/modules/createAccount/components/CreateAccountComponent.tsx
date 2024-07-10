import {
  Box,
  FormHelperText,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  hudsonNYFontStyle,
  weblysleekBoltFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import { useState } from "react";
import ButtonComponent from "../../shared/button/button.component";

import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { useNavigate } from "react-router-dom";
import useCreateAccountHook from "../hooks/useCreateAccount.hooks";
import { postUserRequest } from "../../../service/modules/users/types";
import { useAppDispatch } from "../../../store/store";
import { postUserThunks } from "../../../store/modules/users/actions/users.actions";

interface props {}
const CreateAccountComponent: React.FC<props> = () => {
  const [successAlert, setSucessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [isDate, setIsDate] = useState(false);

  const { postSuggestionApi } = useCreateAccountHook();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const {
    register,
    formState: { errors, isValid },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  };

  const handleClick = () => {
    setIsDate(true);
  };

  const handleSubmit = async () => {
    const { names, lastName, document, date, phone, email, password } = getValues();

    const request:postUserRequest = {
      id:document,
      name:names,
      last_name:lastName,
      email:email,
      password:password,
      uuid:email,
      birthday:date,
      cellphone: phone,
      social_id:3
    };
    try{
      const postCreateAccount = await dispatch(postUserThunks(request)).unwrap();
        if (postCreateAccount.success) {
          setSucessAlert(true);
        } else {
          setErrorAlert(true);
        }
    } catch (error){
      console.log(error);
      setErrorAlert(true);
    }
  };

  const handleClose = () => {
    setSucessAlert(false);
    setErrorAlert(false);
  };

  const handleSave = () => {
    setSucessAlert(false);
    navigate("/home");
  };

  const password = watch("password");

  return (
    <Box sx={styles.container}>
      <div style={{ width: "650px", marginTop: "20px", textAlign: "center" }}>
        <Typography style={styles.title} sx={{ mt: 2 }}>
          CREAR CUENTA
        </Typography>

        <div className="labelForm">
          <label style={styles.label}>Datos personales</label>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              error={!!errors.names}
              helperText={errors.names ? errors.names.message?.toString() : ""}
              {...register("names", {
                required: "Este campo es obligatorio",
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 5 }}
              placeholder="Nombres"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={!!errors.lastName}
              helperText={
                errors.lastName ? errors.lastName.message?.toString() : ""
              }
              {...register("lastName", {
                required: "Este campo es obligatorio",
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 5 }}
              placeholder="Apellidos"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={!!errors.document}
              type="number"
              helperText={
                errors.document ? errors.document.message?.toString() : ""
              }
              {...register("document", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Debe ser un número válido",
                },
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 5 }}
              placeholder="Número de identificación"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={!!errors.date}
              type={isDate ? "date" : "text"}
              helperText={errors.date ? errors.date.message?.toString() : ""}
              {...register("date", {
                required: "Este campo es obligatorio",
              })}
              value={dateValue}
              onChange={handleDateChange}
              onClick={handleClick}
              style={{ minWidth: "100%" }}
              sx={{ mt: 5 }}
              placeholder={isDate ? "" : "Fecha de nacimiento DD/MM/AAAA"}
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={!!errors.phone}
              type="number"
              helperText={errors.phone ? errors.phone.message?.toString() : ""}
              {...register("phone", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 10,
                  message: "El número debe tener 10 caracteres",
                },
                maxLength: {
                  value: 10,
                  message: "El número no debe exceder los 10 caracteres",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Debe ser un número telefónico válido",
                },
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 5 }}
              placeholder="Número de celular"
              variant="standard"
            />
          </Grid>
        </Grid>

        <div className="labelForm">
          <label style={styles.label}>Datos de la cuenta</label>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              error={!!errors.email}
              type="email"
              helperText={errors.email ? errors.email.message?.toString() : ""}
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Debe ser un correo electrónico válido",
                },
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 5 }}
              placeholder="Correo electrónico"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={!!errors.password}
              type="password"
              helperText={
                errors.password ? errors.password.message?.toString() : ""
              }
              {...register("password", {
                required: "Este campo es obligatorio",
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 5 }}
              placeholder="Contraseña"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={!!errors.confirmPassword}
              type="password"
              helperText={
                errors.confirmPassword
                  ? errors.confirmPassword.message?.toString()
                  : ""
              }
              {...register("confirmPassword", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 5 }}
              placeholder="Confirmar contraseña"
              variant="standard"
            />
          </Grid>
        </Grid>

        <Typography
          style={{
            fontFamily: "weblysleekuil",
            fontSize: "12px",
            fontWeight: 600,
            color: "#000000",
            marginTop:"40px"
          }}
        >
         Al crear una cuenta acepto los{" "}
          <a
            href="https://www.licorera3jjjs.com/condiciones"
            target="_blank"
            style={{ color: "#99791C" }}
          >
            términos y condiciones
          </a>
        </Typography>

        <ButtonComponent
          style={isValid ? styles.button : styles.buttonDisabled}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          <Typography
            style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
          >
            CREAR CUENTA
          </Typography>
        </ButtonComponent>
      </div>

      <ModalAlertComponent
        handleClose={handleClose}
        handleSave={handleSave}
        open={successAlert}
        data={{
          title: "FELICITACIONES!",
          content: `Tu cuenta se ha creado exitosamente. Ahora puedes empezar a hacer pedidos y acumular puntos.`,
          img: "/icons/success-icon.png",
        }}
      />

      <ModalAlertComponent
        handleClose={handleClose}
        handleSave={handleClose}
        open={errorAlert}
        data={{
          title: "INFORMACIÓN",
          content: `Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.`,
          img: "/icons/alert.png",
        }}
      />
    </Box>
  );
};
export default CreateAccountComponent;

const styles = {
  container: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  title: {
    ...hudsonNYFontStyle,
    fontSize: "28px",
    color: "#000000",
  },
  subtitle: {
    fontFamily: "weblysleekuil",
    fontSize: "16px",
    color: "#000000",
    fontWeight: "300",
  },
  button: {
    ...hudsonNYFontStyle,
    fontSize: "22px",
    background: "#FFFFFF",
    width: "100%",
    height: "48px",
    borderRadius: "5px",
    padding: "0 0 0px 0",
    border: "1px solid #000000",
    marginTop: "40px",
    marginBottom: "200px",
    cursor: "pointer",
  },
  buttonDisabled: {
    ...hudsonNYFontStyle,
    fontSize: "22px",
    background: "#D1D1D1",
    width: "100%",
    height: "48px",
    borderRadius: "5px",
    padding: "0 0 0px 0",
    border: "1px solid #D1D1D1",
    marginTop: "40px",
    marginBottom: "200px",
    color: "#FFFFFF",
  },
  label: {
    ...weblysleekBoltFontStyle,
    fontWeigth: 600,
    color: "#000000",
  },
  textarea: {
    fontFamily: "weblysleekuil",
    fontWeight: 300,
    fontSize: "1rem",
    width: "100%",
    borderRadius: "10px",
    padding: "6px",
  },
};
const styleCheckBox = {
  marginTop: "20px",
  fontAlign: "center",
};
