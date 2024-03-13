import { Box, Modal, ModalProps } from "@mui/material";
import React, { ReactNode, memo } from "react";

interface ModalCustomProps {
    children?: ReactNode;
    handleClose: () => void;
    style?:object;
    open: boolean;
    backgrounDrop?:boolean
}

const ModalComponent: React.FC<ModalCustomProps> = ({ children, handleClose, open, style, backgrounDrop}) => {
    const handleCloseIgnoreBackdropClick: ModalProps['onClose'] = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose();
        }
    };
    return(
        <Modal
            open={open}
            onClose={backgrounDrop ? handleCloseIgnoreBackdropClick : handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style || defaultStyle}>
                {children}
            </Box>
        </Modal>
    )
}
export default memo(ModalComponent);

const defaultStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "#FFFFFF",
    p: 4,
    borderRadius: "20px",
}