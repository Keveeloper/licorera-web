import { Box, TextField, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";
import { hudsonNYFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";

interface props {
    setStep: () => void;
}
const AddressMap: React.FC<props> = ({setStep}) => {
    return(
          <Box className="addressContainer">
            <div style={{width:"450px"}}>
                <div className="addressText mt-20">
                    <Typography>Ubica la dirección en el mapa</Typography>
                    <Typography style={{fontWeight:300, fontFamily: "weblysleekuil", color:"#9E9E9E"}}>Mueve el punto amarillo a tu posición</Typography>
                </div>
                <div className="addressText mt-20">
                    <Typography>Completa tu dirección</Typography>
                    <Typography style={{fontWeight:300, fontFamily: "weblysleekuil", color:"#9E9E9E"}}>Agrega la nomenclaruta que haga falta</Typography>
                </div>
                <div>
                    <TextField
                        //   error={!!errors.location1}
                        //   helperText={
                        //     errors.location1 ? errors.location1.message?.toString() : ""
                        //   }
                        //   {...register("location1", {
                        //     required: "Este campo es obligatorio",
                        //     minLength: { value: 4, message: "Ingresar mas de 4 caracteres" },
                        //   })}
                        style={{ minWidth: "100%" }}
                        sx={{ mt: 2 }}
                        id="standard-basic"
                        label="Ej: Cra 26 # 33-17"
                        variant="standard"
                    />
                </div>
                <ButtonComponent style={styles.button}>
                    <Typography
                        style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                    >
                        CONFIRMAR
                    </Typography>
                </ButtonComponent>
            </div>
          </Box>
    )
}
export default AddressMap;

const styles = {
    button: {
        ...hudsonNYFontStyle,
        fontSize: "22px",
        background: "#FFFFFF",
        width: "100%",
        height: "48px",
        borderRadius: "5px",
        padding: "0 0 0px 0",
        border: "1px solid #000000",
        marginTop:"20px"
      },
}