import { Box, Grid, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";

interface AlertProps{
    onClose: () => void;
    title:string;
    Text:string;
}

const WarningAlertScreen:React.FC<AlertProps> = ({onClose, title, Text}) => {
  return (
    <Box sx={defaultStyle}>
      <img src="icons/alert.png" alt="" style={{width:"100px"}} />
      <Typography style={{ fontFamily: "HudsonNYSerif", marginBottom: '15px', fontSize:'20px'}}>
        {title}
      </Typography>
      <Typography style={{ fontFamily: "weblysleekuil",  fontSize:'15px' }}>
        {Text}
      </Typography>
      <Grid className="columnContainer" container spacing={1}>
        <Grid item xs={12}>
          <ButtonComponent style={defaultStyle.button} onClick={onClose}>
            <Typography
              style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
            >
              ACEPTAR
            </Typography>
          </ButtonComponent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WarningAlertScreen

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
