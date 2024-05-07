import { useState } from "react";
// Material ui imports
import { Box, Grid, TextField, Typography } from "@mui/material";
import ModalComponent from "../shared/modal/modal.component";
import ButtonComponent from "../shared/button/button.component";
import CheckBoxComponent from "../shared/checkBox/Checkbox.component";
import React from "react";
import TextMaskCustom, { typeYear } from "../shared/helper/textMaskCustom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { personalInfoActions } from "../../store/modules/users/users.slice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "#FFFFFF",
  p: 4,
  borderRadius: "20px",
};

const styleButtonChecked = {
  width: "100%",
  height: "43px",
  background: "#99791C",
  color: "#FFFFFF",
  borderRadius: "5px",
  border: "none",
  fontFamily: "HudsonNYSerif",
  fontSize: "17px",
  marginTop: "20px",
  cursor: 'pointer'
};

const styleButton = {
    width: "100%",
    height: "43px",
    background: "#D1D1D1",
    color: "#FFFFFF",
    borderRadius: "5px",
    border: "none",
    fontFamily: "HudsonNYSerif",
    fontSize: "17px",
    marginTop: "20px",
    // cursor: 'pointer'
};

const styleCheckBox = {
  marginTop: "20px",
  marginLeft: "20px",
  marginRight: "20px",
  fontAlign: "center",
  // cursor: 'pointer'
};

const WelcomeScreen = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [checked, setChecked] = useState(false);
  const [errorFields, setErrorFields] = useState(false);
  const [errorcheckBox, setErrorcheckBox] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false)

  const dispatch = useDispatch();
  
  const [values, setValues] = React.useState({
    textmask: "",
    numberformat: "1320",
  });

  const [valuesMoth, setValuesMoth] = React.useState({
    textmask: "",
    numberformat: "1320",
  });

  const [valuesYear, setValuesYear] = React.useState({
    year: "",
    numberformat: "1320",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeMoth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuesMoth({
      ...valuesMoth,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuesYear({
      ...valuesYear,
      [event.target.name]: event.target.value,
    });
  };

  const handleOpen = (isOpen: boolean) => {
    setModalOpen(false);
  };

  const onCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { day, month, year } = getValues();
    if (!validateDate(day, month, year)) {
        setErrorFields(true);
        return;
    } else {
        setErrorFields(false);
        if(!checked){
            setIsButtonActive(true)
        }else{
            setIsButtonActive(false)
        }
    }
    setChecked(event.target.checked);
  };

  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const validateDate = (day: string, month: string, year: string): boolean => {
    const birthDate = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    );

    const date18YearsAgo = new Date();
    date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);

    return birthDate <= date18YearsAgo;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorFields(false);
    setErrorcheckBox(false);
    const { day, month, year } = getValues();
    event.preventDefault();

    if (!validateDate(day, month, year)) 
        return setErrorFields(true);

    if(!checked)
        return setErrorcheckBox(true);

    dispatch(personalInfoActions.setIsWelcome(true));
  };

  return (
      <ModalComponent
        style={style}
        open={modalOpen}
        handleClose={() => handleOpen(false)}
        backgrounDrop
      >
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
            <img src="/images/logo-300.png" alt="" width={250} />
          </Grid>
          <Grid item xs={6}>
          
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <Typography
                id="modal-modal-title"
                style={{
                  fontFamily: "HudsonNYSerif",
                  color: "#000000",
                  fontSize: "30px",
                }}
                variant="h6"
                component="h2"
              >
                BIENVENIDOS
              </Typography>

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{
                  fontFamily: "weblysleekuisb",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#000000",
                }}
              >
                Por favor ingresa tu fecha de cumpleaños
              </Typography>

              <Grid container spacing={2} style={{ textAlign: "center" }}>
                <Grid item xs={4}>
                  <TextField
                    style={{background: 'white'}}
                    label="Dia"
                    variant="standard"
                    {...register("day", { required: true })}
                    onChange={handleChange}
                    name="day"
                    InputProps={{
                      inputComponent: TextMaskCustom as any,
                      inputProps: {
                        regex: /[0-3]/,
                        type: typeYear.day,
                        mask: "00",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    style={{background: 'white'}}
                    label="Mes"
                    variant="standard"
                    {...register("month", { required: true })}
                    name="month"
                    onChange={handleChangeMoth}
                    InputProps={{
                      inputComponent: TextMaskCustom as any,
                      inputProps: {
                        regex: /[0-1]/,
                        type: typeYear.moth,
                        mask: "00",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    style={{background: 'white'}}
                    label="Año"
                    variant="standard"
                    {...register("year", { required: true })}
                    name="year"
                    defaultValue="" // react-hook-form maneja el valor inicial con defaultValue
                    onChange={handleChangeYear} // Manejo personalizado del cambio para actualizar react-hook-form
                    InputProps={{
                      inputComponent: TextMaskCustom as any,
                      inputProps: {
                        regex: /[0-3]/,
                        mask: "0000",
                      },
                    }}
                  />
                </Grid>
                {errorFields && (
                    <Grid item xs={12}>
                    <Typography style={{ color: "rgb(211, 47, 47)" }}>
                        La fecha debe ser mayor a 18 años.
                    </Typography>
                    </Grid>
                )}
              </Grid>

              <CheckBoxComponent
                style={styleCheckBox}
                checked={checked}
                onChange={onCheckBox}
              >
                <Typography
                  style={{ fontFamily: "weblysleekuil", fontSize: "12px", fontWeight: 600,
                  color: '#000000'  }}
                >
                  Al ingresar acepto los{" "}
                  <a href="https://www.licorera3jjjs.com/condiciones"  target="_blank" style={{ color: "#99791C" }}>
                    términos y condiciones
                  </a>
                </Typography>
              </CheckBoxComponent>
              {errorcheckBox && (
                    <Grid item xs={12}>
                    <Typography style={{ color: "rgb(211, 47, 47)" }}>
                        Parar continuar debe aceptar los terminos.
                    </Typography>
                    </Grid>
                )}

              <ButtonComponent style={!isButtonActive ? styleButton : styleButtonChecked} disabled={!isButtonActive} >
                <Typography
                  style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                >
                  CONTINUAR
                </Typography>
              </ButtonComponent>

              <Typography
                style={{ fontFamily: "weblysleekuil", fontSize: "12px"}}
                sx={{ mt: 2 }}
              >
                El contenido de esta aplicación es solo para mayores de edad.
                Prohíbase el expendio de bebidas embriagantes a menores de edad.
                El exceso de alcohol es perjudicial para la salud.
              </Typography>
            </Box>

          </Grid>
        </Grid>
      </ModalComponent>
  );
};

export default WelcomeScreen;
