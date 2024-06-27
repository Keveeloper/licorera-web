import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  hudsonNYFontStyle,
  weblysleekBoltFontStyle,
  weblysleekFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import CheckBoxComponent from "../../shared/checkBox/Checkbox.component";
import { useEffect, useState } from "react";
import ButtonComponent from "../../shared/button/button.component";
import useAddressHook, {
  AddressSelected,
} from "../../shared/hooks/addressHook/useAddressHook";
import useAddress from "../hooks/useAddress";
import { CreateLocationRequest } from "../../../service/modules/address/type";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { useNavigate } from "react-router-dom";

interface props {}
const AddressForm: React.FC<props> = () => {
  const [checked, setChecked] = useState(false);
  const [successAlert, setSucessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const { getAddress, updateAddressItem } = useAddressHook();
  const { PostHookLocation } = useAddress();
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

  const onCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async () => {
    const { address, name, detail } = getValues();
    const newAddress: AddressSelected = {
      addressInput: address,
      detail,
    };
    updateAddressItem(newAddress);
    if (!checked) {
      navigate("/checkout");
      return;
    }
    const storeAddress = getAddress();
    const payload: CreateLocationRequest = {
      name,
      address,
      detail,
      favorite: true,
      latitude: storeAddress.coords.latitude,
      longitude: storeAddress.coords.longitude,
    };
    PostHookLocation(payload)
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
    navigate("/checkout");
  };

  useEffect(() => {
    const address = getAddress();
    setValue("address", address.addressInput, { shouldValidate: true });
  }, []);

  return (
    <Box className="addressContainer">
      <div style={{ width: "450px", marginTop: "20px", textAlign: "center" }}>
        <img
          src="/icons/mapIcon.png"
          alt=""
          style={{ width: "100px", marginTop: "20px" }}
        />
        <Typography style={styles.title} sx={{ mt: 2 }}>
          CONFIRMA LOS DETALLES DE LA DIRECCIÓN
        </Typography>
        <div className="labelForm">
          <label style={styles.label}>Dirección</label>
        </div>
        <TextField
          error={!!errors.address}
          helperText={errors.address ? errors.address.message?.toString() : ""}
          {...register("address", {
            required: "Este campo es obligatorio",
          })}
          style={{ minWidth: "100%" }}
          sx={{ mt: 2 }}
          id="standard-basic"
          // label="Cra 26 # 33 - 17"
          variant="standard"
        />
        {checked && (
          <>
            <div className="labelForm">
              <label style={styles.label}>Nombre de la Dirección</label>
            </div>
            <TextField
              error={!!errors.name}
              helperText={errors.name ? errors.name.message?.toString() : ""}
              {...register("name", {})}
              style={{ minWidth: "100%" }}
              sx={{ mt: 2 }}
              id="standard-basic"
              label="Mi casa"
              variant="standard"
            />
          </>
        )}
        <div className="labelForm">
          <label style={styles.label}>Detalles</label>
        </div>
        <TextField
          error={!!errors.detail}
          helperText={errors.detail ? errors.detail.message?.toString() : ""}
          {...register("detail", {
            required: "Este campo es obligatorio",
          })}
          style={{ minWidth: "100%" }}
          sx={{ mt: 2 }}
          id="standard-basic"
          label="Torre / apto / casa / detalles"
          variant="standard"
        />
        <CheckBoxComponent
          style={styleCheckBox}
          checked={checked}
          onChange={onCheckBox}
          widthIcon={25}
        >
          <Typography
            style={{
              fontFamily: "weblysleekuil",
              fontSize: "16px",
              fontWeight: 300,
              color: "#9E9E9E",
            }}
          >
            Guardar esta dirección para próximos envíos
          </Typography>
        </CheckBoxComponent>
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
export default AddressForm;

const styles = {
  title: {
    ...hudsonNYFontStyle,
    fontSize: "20px",
    color: "#000000",
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
};
const styleCheckBox = {
  marginTop: "20px",
  fontAlign: "center",
};
