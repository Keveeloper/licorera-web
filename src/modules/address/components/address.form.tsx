import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { hudsonNYFontStyle, weblysleekBoltFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import CheckBoxComponent from "../../shared/checkBox/Checkbox.component";
import { useState } from "react";
import ButtonComponent from "../../shared/button/button.component";

interface props {}
const AddressForm: React.FC<props> = () => {
  const [checked, setChecked] = useState(false);
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
    const { location1, password, year } = getValues();
  };

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
          error={!!errors.location1}
          helperText={
            errors.location1 ? errors.location1.message?.toString() : ""
          }
          {...register("location1", {
            required: "Este campo es obligatorio",
            minLength: { value: 4, message: "Ingresar mas de 4 caracteres" },
          })}
          style={{ minWidth: "100%" }}
          sx={{ mt: 2 }}
          id="standard-basic"
          label="Cra 26 # 33 - 17"
          variant="standard"
        />
        <div className="labelForm">
            <label style={styles.label}>Detalles</label>
        </div>
        <TextField
          error={!!errors.location1}
          helperText={
            errors.location1 ? errors.location1.message?.toString() : ""
          }
          {...register("location1", {
            required: "Este campo es obligatorio",
            minLength: { value: 4, message: "Ingresar mas de 4 caracteres" },
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
        <ButtonComponent style={styles.button} onClick={handleSubmit}>
          <Typography
            style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
          >
            ACEPTAR
          </Typography>
        </ButtonComponent>
      </div>
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
  },
  label:{
    ...weblysleekBoltFontStyle,
    fontWeigth: 600,
    color: "#000000",
  }
};
const styleCheckBox = {
    marginTop: "20px",
    fontAlign: "center",
};
