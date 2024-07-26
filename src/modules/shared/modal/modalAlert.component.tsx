import ModalComponent from "./modal.component";
import { Grid, Typography } from "@mui/material";
import ButtonComponent from "../button/button.component";

interface ModalArletCustomProps {
  handleClose: () => void;
  handleSave?: () => void;
  style?: object;
  open?: boolean;
  data: {
    title: string | undefined;
    content: string;
    img: string;
  };
  isCancellButton?: boolean;
  withSchedule?:boolean;
  schedule?:string[]
}

const ModalAlertComponent: React.FC<ModalArletCustomProps> = ({
  handleClose,
  handleSave,
  open,
  style,
  data,
  isCancellButton,
  withSchedule,
  schedule
}) => {

  const formatTime = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minutes} ${ampm}`;
  };

  return (
    <ModalComponent
      style={styleDefault}
      open={open || false}
      handleClose={handleClose}
    >
      <img src={data.img} alt="" style={styleDefault.img} />
      <Typography className="inputCustom" style={styleDefault.title}>
        {data.title}
      </Typography>
      <Typography className="inputCustom" style={styleDefault.content}>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </Typography>
      {withSchedule &&
        <Typography className="inputCustom" style={styleDefault.schedule}>
          {schedule?.length === 2 && `${formatTime(schedule[0])} - ${formatTime(schedule[1])}`}
        </Typography>
      }
        

      

      <Grid className="columnContainer" container spacing={0}>
        <Grid item xs={isCancellButton ? 6 : 12}>
          <ButtonComponent style={styleDefault.button}>
            <Typography
              onClick={handleSave}
              style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
            >
              ACEPTAR
            </Typography>
          </ButtonComponent>
        </Grid>
        {isCancellButton && (
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
        )}
      </Grid>
    </ModalComponent>
  );
};
export default ModalAlertComponent;

const styleDefault = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#FFFFFF",
  p: 4,
  borderRadius: "30px",
  textAlign: "center",
  title: {
    fontFamily: "HudsonNYSerif",
    fontWeight: "600",
    fontSize: "28px",
    color: "#000000",
    padding: "10px",
  },
  content: {
    fontFamily: "weblysleekuil",
    fontWeight: "300",
    fontSize: "16px",
    color: "#000000",
    padding: "10px",
  },
  schedule: {
    fontFamily: "weblysleekuisb",
    fontWeight: "600",
    fontSize: "16px",
    color: "#000000",
    padding: "10px",
  },
  img: {
    width: "120px",
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
