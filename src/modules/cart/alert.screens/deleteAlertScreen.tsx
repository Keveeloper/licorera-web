import { Box, Grid, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";

interface AlertProps{
    onClose: () => void;
    onAccept: () => void;
    title:string;
    img:string
}

const DeleteAlertScreen:React.FC<AlertProps> = ({onClose, onAccept, title, img}) => {
  return (
    <Box sx={defaultStyle}>
      <img src={img} alt="" style={{width:"100px"}} />
      <Typography style={{ fontFamily: "HudsonNYSerif", marginBottom: '15px'}}>
        {title}
      </Typography>
      <Typography style={{ fontFamily: "weblysleekuil" }}>
      ¿Deseas eliminar este producto de tu carrito de compras?
      </Typography>
      <Grid className="columnContainer" container spacing={1}>
        <Grid item xs={6}>
          <ButtonComponent style={defaultStyle.button} onClick={onAccept}>
            <Typography
              style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
            >
              ACEPTAR
            </Typography>
          </ButtonComponent>
        </Grid>

        <Grid item xs={6}>
          <ButtonComponent style={defaultStyle.button} onClick={onClose}>
            <Typography
              style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
            >
              CANCELAR
            </Typography>
          </ButtonComponent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeleteAlertScreen

const defaultStyle = {
  bgcolor: "#FFFFFF",
  p: 2,
  width: "280px",
  borderRadius: "50px",
  button: {
    background: "white",
    border: "1px solid",
    width: "100%",
    height: "43px",
    borderRadius: "5px",
    fontFamily: "HudsonNYSerif",
    fontSize: "17px",
    marginTop: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
