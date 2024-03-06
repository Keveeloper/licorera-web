import { ReactNode } from "react";
import ModalComponent from "./modal.component";
import { Typography } from "@mui/material";
import ButtonComponent from "../button/button.component";

interface ModalArletCustomProps {
  handleClose: () => void;
  style?: object;
  open?: boolean;
  data: {
    title: string;
    content: string;
    img: string;
  };
}

const ModalAlertComponent: React.FC<ModalArletCustomProps> = ({
  handleClose,
  open,
  style,
  data,
}) => {

  const handleButton = () =>{
    handleClose()
  }  
  return (
    <ModalComponent
      style={styleDefault}
      open={open || false}
      handleClose={handleClose}
    >
      <img src={data.img} style={styleDefault.img} />
      <Typography className="inputCustom" style={styleDefault.title}>
        {data.title}
      </Typography>
      <Typography className="inputCustom" style={styleDefault.content}>
        {data.content}
      </Typography>
      <ButtonComponent
        style={styleDefault.button}
      >
        <Typography onClick={handleButton} style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}>
          ACEPTAR
        </Typography>
      </ButtonComponent>
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
    fontSize: "20px",
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
  img: {
    width: "120px",
  },
  button:{
    border:"1px solid",
    width: "100%",
    height: "43px",
    borderRadius: "5px",
    fontFamily: "HudsonNYSerif",
    fontSize: "17px",
    marginTop: "20px",
  }
};
