import { Box, Grid, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";

interface AlertProps {
  onClose: () => void;
  onAccept: () => void;
  title: string;
  text: string;
  img: string;
  isCheck?: boolean;
}

const CancelAlertScreen: React.FC<AlertProps> = ({
  onClose,
  onAccept,
  title,
  text,
  img,
  isCheck,
}) => {
  return (
    <Box sx={defaultStyle}>
      <img src={img} alt="" style={{ width: "100px" }} />
      <Typography style={{ fontFamily: "HudsonNYSerif", marginBottom: "15px" }}>
        {title}
      </Typography>
      <Typography style={{ fontFamily: "weblysleekuil", fontSize: "15px" }}>
        {text}
      </Typography>
      <Grid className="columnContainer" container spacing={1}>
        {isCheck ? (
          <>
            <Grid item xs={12}>
              <ButtonComponent style={defaultStyle.button} onClick={onAccept}>
                <Typography
                  style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                >
                  ACEPTAR
                </Typography>
              </ButtonComponent>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6}>
              <ButtonComponent style={defaultStyle.button} onClick={onAccept}>
                <Typography
                  style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                >
                  SI
                </Typography>
              </ButtonComponent>
            </Grid>

            <Grid item xs={6}>
              <ButtonComponent style={defaultStyle.button} onClick={onClose}>
                <Typography
                  style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                >
                  NO
                </Typography>
              </ButtonComponent>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default CancelAlertScreen;

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
