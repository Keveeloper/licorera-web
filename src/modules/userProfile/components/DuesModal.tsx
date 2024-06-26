import ButtonComponent from "../../shared/button/button.component";

import { Grid, TextField, Typography } from "@mui/material";
import ModalComponent from "../../shared/modal/modal.component";


interface ModalArletCustomProps {
  handleClose: () => void;
  handleSave?: () => void;
  setDue?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: object;
  open?: boolean;
  data: {
    title: string;
  };
  dues:number;
}

const DuesModal: React.FC<ModalArletCustomProps> = ({
  handleClose,
  handleSave,
  setDue,
  open,
  data,
  dues
}) => {

  return (
    <ModalComponent
      style={styleDefault}
      open={open || false}
      handleClose={handleClose}
    >
      <Typography className="inputCustom" style={styleDefault.title}>
        {data.title}
      </Typography>

      <TextField
        style={{ minWidth: "100%" }}
        sx={{ mt: 3 }}
        variant="standard"
        type="number"
        value={dues}
        onChange={setDue}
      />

      <Grid className="columnContainer" container spacing={0}>
        <Grid item xs={ 6 }>
          <ButtonComponent style={styleDefault.button}>
            <Typography
              onClick={handleSave}
              style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
            >
              ACEPTAR
            </Typography>
          </ButtonComponent>
        </Grid>

        <Grid item xs={6}>
        <ButtonComponent style={styleDefault.button}>
            <Typography
            onClick={handleClose}
            style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
            >
            CANCELAR
            </Typography>
        </ButtonComponent>
        </Grid>

      </Grid>
    </ModalComponent>
  );
};
export default DuesModal;

const styleDefault = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFFFFF",
  p: 4,
  borderRadius: "30px",
  textAlign: "center",
  title: {
    fontFamily: "weblysleekuil",
    fontWeight: "600",
    fontSize: "20px",
    color: "#000000",
    padding: "10px",
  },
  button: {
    background: "white",
    border: "1px solid",
    width: "95%",
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
