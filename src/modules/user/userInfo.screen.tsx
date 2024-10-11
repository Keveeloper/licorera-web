import { useState } from "react";
// Material ui imports
import { Box, Grid, TextField, Typography } from "@mui/material";
import ModalComponent from "../shared/modal/modal.component";
import ButtonComponent from "../shared/button/button.component";
import CheckBoxComponent from "../shared/checkBox/Checkbox.component";
import React from "react";
import TextMaskCustom, { typeYear } from "../shared/helper/textMaskCustom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import { personalInfoActions } from "../../store/modules/users/users.slice";
import { paletteColors } from "../../paletteColors/paletteColors";
import { getMe, updateUserInfo } from "../../store/modules/users/actions/users.actions";
import { putUserRequest } from "../../service/modules/users/types";
import { useAppDispatch } from "../../store/store";
import { selectAllUser } from "../../store/modules/users";

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
  background: "#FFFFFF",
  color: "#000000",
  borderRadius: "5px",
  fontFamily: "HudsonNYSerif",
  fontSize: "17px",
  marginTop: "20px",
  cursor: 'pointer',
  border:'1px solid #000000'
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

const UserInfoScreen = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [errorFields, setErrorFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDate, setIsDate] = useState(false);
  const [dateValue, setDateValue] = useState("");

  const dispatch = useAppDispatch();
  const user = useSelector(selectAllUser);
  
  const handleOpen = (isOpen: boolean) => {
    setModalOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  };

  const handleClick = () => {
    setIsDate(true);
  };

  const {
    register,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
  });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { docNumber, birthday, cellphone } = getValues();
    const reqData = {
      ...(docNumber && { docNumber }),
      ...(birthday && { birthday }),
      ...(cellphone && { cellphone })
    };
    try {
      const postLogin = await dispatch(updateUserInfo({reqData,userId:user.id})).unwrap();
      if (postLogin.success) {
        console.log(postLogin);
        dispatch(personalInfoActions.setIsUserInfoComplete(false))
        dispatch(getMe(user.api_token)).unwrap()
      } else {
        console.log(postLogin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const styles = stylesAddPayment(errors, isValid);
  const isEmptyOrNull = (value: any) => value === "" || value === null;

  return (
      <ModalComponent
        style={style}
        open={modalOpen}
        handleClose={() => handleOpen(false)}
        backgrounDrop
      >
        <Grid container spacing={4} style={{ textAlign: "center" }}>
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
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{
                  fontFamily: "weblysleekuisb",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#000000",
                }}
              >
                Nos hace falta unos datos. Por favor completa esta información
              </Typography>

              <Grid container spacing={0} style={{ textAlign: "center" }}>
                {isEmptyOrNull(user.docNumber) && 
                  <Grid item xs={12}>
                    <TextField
                      error={!!errors.docNumber}
                      helperText={errors.docNumber ? errors.docNumber.message?.toString() : ""}
                      {...register("docNumber", {
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
                  </Grid>
                }
                {isEmptyOrNull(user.birthday) && 
                  <Grid item xs={12}>
                    <TextField
                      error={!!errors.birthday}
                      type={isDate ? "date" : "text"}
                      helperText={errors.birthday ? errors.birthday.message?.toString() : ""}
                      {...register("birthday", {
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
                }
                {isEmptyOrNull(user.cellphone) && (
                  <>
                    <Grid item xs={12}>
                      <InputMask
                        style={styles.cardInput}
                        mask="999 999 99 99"
                        maskChar=" "
                        placeholder="Número de celular"
                        className="card-input-payment"
                        {...register("cellphone", {
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
                        name="cellphone"
                        type="text"
                      ></InputMask>
                      <Typography color={"#d32f2f"} fontSize={"0.75rem"}>
                          {errors.cellphone ? errors.cellphone.message?.toString() : ""}
                        </Typography>
                    </Grid>
                    {errorFields && (
                        <Grid item xs={12}>
                        <Typography style={{ color: "rgb(211, 47, 47)" }}>
                            {errorMessage}
                        </Typography>
                        </Grid>
                    )}
                  </>
                  )
                }
              </Grid>

              <ButtonComponent style={!isValid ? styleButton : styleButtonChecked} disabled={!isValid} >
                <Typography
                  style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                >
                  GUARDAR
                </Typography>
              </ButtonComponent>
            </Box>

          </Grid>
        </Grid>
      </ModalComponent>
  );
};

export default UserInfoScreen;
