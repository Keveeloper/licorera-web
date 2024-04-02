import Lottie from "react-lottie-player";
import lottieJson from "./Success-Loading.json";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessAlert: React.FC<Props> = ({ setOpen }) => {

  useEffect(() => {
    let timer = setTimeout(() => {
        setOpen(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setOpen]);
  return (
    <>
      <Modal
        open={true}
        // onClose={backgrounDrop ? handleCloseIgnoreBackdropClick : handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={styles.lottie}
      >
        <Box style={styles.lottie}>
          <div style={styles.container}>
            <Lottie
              loop={false}
              play
              animationData={lottieJson}
              style={{ width: 150, height: 150 }}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SuccessAlert;

const styles: any = {
  lottie: {
    position: "fixed",
    // marginTop: '70%',
    width: "100%",
    height: "100%",
    zIndex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100px",
    height: "100px",
    background: "#000000B2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
  },
};
