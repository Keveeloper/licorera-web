import { Box, Grid, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";

interface AlertProps {
  onClose: () => void;
  title:string
}

const InfoAlertScreen: React.FC<AlertProps> = ({ onClose, title }) => {
  return (
    <Box sx={defaultStyle}>
      {/* <img src={} alt="" style={} /> */}
      <Typography style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}>
        {title}
      </Typography>
      <Grid className="columnContainer" container spacing={1}>
        <Grid item xs={12}>
          <ButtonComponent style={defaultStyle.button}>
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

export default InfoAlertScreen;

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
