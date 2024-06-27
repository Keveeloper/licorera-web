import { useState } from "react";
import ModalComponent from "../shared/modal/modal.component";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.css";
import ButtonComponent from "../shared/button/button.component";
import { displayFlex } from "../shared/recursiveStyles/RecursiveStyles";
import { getMe, postrememberPasswordThunks, userLogin } from "../../store/modules/users/actions/users.actions";
import { useAppDispatch } from "../../store/store";
import { LoginRequest } from "../../service/modules/users/types";
import ModalAlertComponent from "../shared/modal/modalAlert.component";

interface LoginScreenInterface {
  handleClose: () => void;
  modalOpen: boolean;
}
const ForgotPassword: React.FC<LoginScreenInterface> = ({ handleClose, modalOpen }) => {
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const handleSubmitRecovery = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email } = getValues();

    try{
      const postLogin = await dispatch(postrememberPasswordThunks(email)).unwrap();
      if (postLogin.success) {
        handleClose();
      } else {
        setShowAlert(true);
      }
    } catch (error){
      console.log(error);
      setShowAlert(true);
    }
    
  };

  const handleAlertClose = (isOpen: boolean) => {
    setShowAlert(isOpen);
  };

  return (
    <>
      <ModalComponent style={style} open={modalOpen} handleClose={handleClose}>
        <Grid container spacing={2} style={{ textAlign: "center", height:'100%' }}>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/images/logo-300.png" alt="" width={300} />
          </Grid>
          <Grid item xs={6}   style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box
              component="form"
              onSubmit={handleSubmitRecovery}
              noValidate
              autoComplete="off"
            >
              <Typography
                className="inputCustom"
                style={{ paddingBottom: "30px" }}
              >
                Ingresa tu correo electrónico para recuperar tu contraseña
              </Typography>

              <TextField
                label="Correo electrónico"
                variant="filled"
                error={!!errors.email}
                helperText={
                  errors.email ? errors.email.message?.toString() : ""
                }
                {...register("email", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Debe ser un correo electrónico válido",
                  },
                })}
                name="email"
                type="email"
                className="inputCustom"
              />

              <ButtonComponent
                style={!isValid ? style.Button : style.ButtonChecked}
                disabled={!isValid}
              >
                <Typography
                  style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                >
                 RECUPERAR
                </Typography>
              </ButtonComponent>

            </Box>
          </Grid>
        </Grid>
        <ModalAlertComponent
          handleClose={() => handleAlertClose(false)}
          handleSave={() => handleAlertClose(false)}
          open={showAlert}
          data={{
            title: "INFORMACIÓN",
            content:
              "Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.",
            img: "icons/alert.png",
          }}
        />
      </ModalComponent>
    </>
  );
};

export default ForgotPassword;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height:"521px",
  bgcolor: "#FFFFFF",
  p: 4,
  borderRadius: "20px",
  ButtonChecked: {
    width: "100%",
    height: "43px",
    background: "#FFFFFF",
    color: "#000000",
    borderRadius: "5px",
    border: "1px solid #000000",
    fontFamily: "HudsonNYSerif",
    fontSize: "17px",
    marginTop: "20px",
    cursor: 'pointer',
  },
  Button: {
    width: "100%",
    height: "43px",
    background: "#D1D1D1",
    color: "#FFFFFF",
    borderRadius: "5px",
    border: "none",
    fontFamily: "HudsonNYSerif",
    fontSize: "17px",
    marginTop: "20px",
    cursor: 'pointer',
  },
  recoveryPassword: {
    color: "#99791C",
    fontFamily: "weblysleekuil",
    fontWeight: "600",
    fontSize: "15px",
    paddingTop: "20px",
  }
};
