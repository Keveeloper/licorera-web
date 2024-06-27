import { Box, FormHelperText, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  hudsonNYFontStyle,
  weblysleekBoltFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import { useState } from "react";
import ButtonComponent from "../../shared/button/button.component";

import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { useNavigate } from "react-router-dom";
import useRemoveDatanHook from "../hooks/removeUserData.hooks";


interface props {}
const RemoveUserDataComponent: React.FC<props> = () => {
  const [successAlert, setSucessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const { postSuggestionApi } = useRemoveDatanHook();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    reset,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
  });


  const handleSubmit = async () => {
    const { title, email, name, message } = getValues();

    const request = {
      title,
      suggest: message,
    };
    postSuggestionApi(request)
      .then((res) => {
        if (res.success) {
          setSucessAlert(true);
        } else {
          setErrorAlert(true);
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setSucessAlert(false);
    setErrorAlert(false);
  };

  const handleSave = () => {
    setSucessAlert(false);
    navigate("/home");
  };

  return (
    <Box sx={styles.container}>
      <div style={{ width: "650px", marginTop: "20px", textAlign: "center" }}>
        <Typography style={styles.title} sx={{ mt: 2 }}>
           ELIMINAR MIS DATOS
        </Typography>
        <Typography style={{...styles.subtitle, textAlign:'left'}} sx={{ mt: 3 , mb: 3}}>
        Tu privacidad es muy importante para nosotros. Por eso, no guardamos ninguna información que no quieras. Sentimos mucho que quieras irte y te extrañaremos. Por aquí estaremos esperándote de nuevo cuando quieras regresar. Ingresa tu información en el siguiente formulario y eliminaremos tu cuenta de nuestra base de datos
        </Typography>

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
          placeholder="Número de telefono"
          variant="standard"
        />
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

      
        <ButtonComponent
          style={isValid ? styles.button : styles.buttonDisabled}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          <Typography
            style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
          >
            EVNIAR
          </Typography>
        </ButtonComponent>
      </div>

      <ModalAlertComponent
        handleClose={handleClose}
        handleSave={handleSave}
        open={successAlert}
        data={{
          title: "FELICITACIONES!",
          content: `La dirección fue agregada exitosamente.`,
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
export default RemoveUserDataComponent;

const styles = {
  container:{
    minHeight: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start'
  },
  title: {
    ...hudsonNYFontStyle,
    fontSize: "20px",
    color: "#000000",
  },
  subtitle:{
    fontFamily: 'weblysleekuil',
    fontSize: '16px',
    color: '#000000',
    fontWeight: '300'
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
    marginTop: "50px",
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
    marginTop: "50px",
    marginBottom: "200px",
    color: "#FFFFFF",
  },
  label: {
    ...weblysleekBoltFontStyle,
    fontWeigth: 600,
    color: "#000000",
  },
  textarea:{
    fontFamily: 'weblysleekuil',
    fontWeight: 300,
    fontSize: '1rem',
    width: '100%', 
    borderRadius:"10px", 
    padding:"6px"
  }
};
const styleCheckBox = {
  marginTop: "20px",
  fontAlign: "center",
};
