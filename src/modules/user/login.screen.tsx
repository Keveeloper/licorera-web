import { useState } from "react";
import ModalComponent from "../shared/modal/modal.component";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.css";
import ButtonComponent from "../shared/button/button.component";
import { displayFlex } from "../shared/recursiveStyles/RecursiveStyles";
import {
  getMe,
  userLogin,
} from "../../store/modules/users/actions/users.actions";
import { useAppDispatch } from "../../store/store";
import { LoginRequest } from "../../service/modules/users/types";
import ModalAlertComponent from "../shared/modal/modalAlert.component";
import ForgotPassword from "./ForgotPassword.screen";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../../service/firebase/firebaseConfig";
import { personalInfoActions } from "../../store/modules/users";
import { PersonalInfoState, ResponsePersonalInfo } from "../../store/modules/store/types";
import { useSelector } from "react-redux";
import { selectIsWelcome } from "../../store/modules/users/selectors/users.selector";
import UserInfoScreen from "./userInfo.screen";

interface LoginScreenInterface {
  handleClose: () => void;
  modalOpen: boolean;
}
const LoginScreen: React.FC<LoginScreenInterface> = ({
  handleClose,
  modalOpen,
}) => {
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const isWelcome = useSelector(selectIsWelcome);

  const {
    register,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      if (token) {
        console.log("User:", result.user);
        const googleUser:ResponsePersonalInfo={
            firstName: result.user.displayName || '',
            lastName: '',
            phone: '',
            email: result.user.email || '',
            token: token
        }
        await dispatch(personalInfoActions.setPersonalInfo(googleUser));
        checkDataInfoComplete(token)
        modalOpen = false;
        handleClose();
      } else {
        console.error("No se pudo obtener el accessToken.");
      }
      const user = result.user;
      console.log("Usuario logueado:", user);
    } catch (error) {
      console.error("Error durante el login:", error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);

      // Obtener el accessToken de Facebook
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential?.accessToken;
      const token = await result.user.getIdToken();
    
      if (token) {
        console.log("AccessToken:", token);
        const facebookUser:ResponsePersonalInfo={
          firstName: result.user.displayName || '',
          lastName: '',
          phone: '',
          email: result.user.email || '',
          token: token
        }
        await dispatch(personalInfoActions.setPersonalInfo(facebookUser));
        checkDataInfoComplete(token)
        modalOpen = false;
        handleClose();
      } else {
        console.error("No se pudo obtener el accessToken.");
      }

      const user = result.user;
      console.log("Usuario logueado:", user);
    } catch (error) {
      console.error("Error durante el login:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, year } = getValues();
    const loginRequest: LoginRequest = {
      email,
      password,
    };
    try {
      const postLogin = await dispatch(userLogin(loginRequest)).unwrap();
      if (postLogin.success) {
        checkDataInfoComplete(postLogin?.response?.token)
        modalOpen = false;
        handleClose();
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  };

  const handleAlertClose = (isOpen: boolean) => {
    setShowAlert(isOpen);
  };

  const handleCloseForgotPassword = (isOpen: boolean) => {
    setOpenModal(isOpen);
  };

  const isEmptyOrNull = (value: any) => value === "" || value === null;

  const checkDataInfoComplete = async (token:string) =>{
    const userData = await dispatch(getMe(token)).unwrap();
    if( isEmptyOrNull(userData?.response?.docNumber) ||
        isEmptyOrNull(userData?.response?.birthday) ||
        isEmptyOrNull(userData?.response?.cellphone)){
      dispatch(personalInfoActions.setIsUserInfoComplete(true))
    }
    console.log("response me:",userData.response.docNumber);
  }

  return (
    <>
      <ModalComponent style={style} open={modalOpen} handleClose={handleClose}>
        <Grid container spacing={2} style={{ textAlign: "center" }}>
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
          <Grid item xs={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <Typography
                className="inputCustom"
                style={{ paddingBottom: "30px" }}
              >
                Para continuar debes iniciar sesión
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
              <TextField
                label="Contraseña"
                variant="filled"
                error={!!errors.password}
                helperText={
                  errors.password ? errors.password.message?.toString() : ""
                }
                {...register("password", {
                  required: "Este campo es obligatorio",
                  minLength: {
                    value: 6,
                    message: "El mínimo de caracteres permitidos son 6",
                  },
                })}
                name="password"
                type="password"
                className="inputCustom"
              />
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(true);
                }}
                style={{ ...style.recoveryPassword, float: "right" }}
              >
                Recuperar Contraseña
              </a>
              <ButtonComponent
                style={!isValid ? style.Button : style.ButtonChecked}
                disabled={!isValid}
              >
                <Typography
                  style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                >
                  INICIAR SESIÓN
                </Typography>
              </ButtonComponent>

              <Typography
                className="inputCustom"
                style={{ paddingTop: "30px" }}
              >
                O continuar con
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ padding: "20px", textAlign: "center" }}
              >
                <Grid item xs={6} style={{cursor:'pointer',...displayFlex}}>
                  <div className="circleImg" onClick={signInWithGoogle}>
                    <img src="icons/google.png" alt="" />
                  </div>
                </Grid>
                <Grid item xs={6} style={displayFlex} onClick={signInWithFacebook}>
                  <div className="circleImg">
                    <img src="icons/facebook.png" alt="" />
                  </div>
                </Grid>
              </Grid>
              <Typography className="inputCustom">
                Crear una cuenta{" "}
                {/* <a href="/createAccount" style={style.recoveryPassword}>
                  aquí
                </a>{" "} */}
                <Link to={"/createAccount"} style={style.recoveryPassword}>
                  {" "}
                  aquí
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <ModalAlertComponent
          handleClose={() => handleAlertClose(false)}
          open={showAlert}
          data={{
            title: "INFORMACIÓN",
            content:
              "Los datos no coinciden en nuestros registros, revísalos o crea una cuenta.",
            img: "icons/alert.png",
          }}
        />
      </ModalComponent>
      <ForgotPassword
        handleClose={() => handleCloseForgotPassword(false)}
        modalOpen={openModal}
      />
    </>
  );
};

export default LoginScreen;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "#FFFFFF",
  p: 4,
  borderRadius: "20px",
  ButtonChecked: {
    width: "100%",
    height: "43px",
    background: "#99791C",
    color: "#FFFFFF",
    borderRadius: "5px",
    border: "none",
    fontFamily: "HudsonNYSerif",
    fontSize: "17px",
    marginTop: "20px",
    cursor: "pointer",
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
    cursor: "pointer",
  },
  recoveryPassword: {
    color: "#99791C",
    fontFamily: "weblysleekuil",
    fontWeight: "600",
    fontSize: "15px",
    paddingTop: "20px",
  },
};
