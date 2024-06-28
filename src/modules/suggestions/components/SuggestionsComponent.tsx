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
import useSuggestionHook from "../hooks/suggestions.hooks";

interface props {}
const SuggestionsComponent: React.FC<props> = () => {
  const [successAlert, setSucessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const { postSuggestionApi } = useSuggestionHook();
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
            SUGERENCIAS
        </Typography>
        <Typography style={styles.subtitle} sx={{ mt: 3 , mb: 3}}>
         Para nosotros es muy importante tu opinión, ayúdanos a mejorar. ¿Tienes alguna sugerencia?
        </Typography>

        <TextField
          error={!!errors.title}
          helperText={errors.title ? errors.title.message?.toString() : ""}
          {...register("title", {
            required: "Este campo es obligatorio",
          })}
          style={{ minWidth: "100%" }}
          sx={{ mt: 5 }}
          placeholder="Título"
          variant="standard"
        />
        <TextField
          error={!!errors.name}
          helperText={errors.name ? errors.name.message?.toString() : ""}
          {...register("name", {
            required: "Este campo es obligatorio",
          })}
          style={{ minWidth: "100%" }}
          sx={{ mt: 5 }}
          placeholder="Nombre"
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
          placeholder="Correo"
          variant="standard"
        />
        <div className="labelForm" style={{ textAlign: 'left',fontSize: '18px', marginTop:'20px'}}>
          <label style={styles.label}>Mensaje</label>
        </div>

        <Box sx={{ mt: 2 }}>
        <TextareaAutosize
        //   placeholder="Mensaje"
          {...register("message", {
            required: "Este campo es obligatorio",
          })}
          minRows={5}
          maxRows={5}
          style={styles.textarea}
        />
        {errors.message && (
          <FormHelperText error>
            {errors.message.message?.toString()}
          </FormHelperText>
        )}
      </Box>
      
        <ButtonComponent
          style={isValid ? styles.button : styles.buttonDisabled}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          <Typography
            style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
          >
            ACEPTAR
          </Typography>
        </ButtonComponent>
      </div>

      <ModalAlertComponent
        handleClose={handleClose}
        handleSave={handleSave}
        open={successAlert}
        data={{
          title: "FELICITACIONES!",
          content: `Tu sugerencia ha sido enviada exitosamente y la atenderemos muy pronto. Trabajamos para mejorar.`,
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
export default SuggestionsComponent;

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
    fontFamily: 'weblysleekuisb',
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
    marginTop: "20px",
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
    marginTop: "20px",
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
