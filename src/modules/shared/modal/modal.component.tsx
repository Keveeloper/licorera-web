import { Box, Modal, Typography } from "@mui/material";
import React, { ReactNode, memo } from "react";

interface ModalProps {
    children?: ReactNode;
    handleClose: () => void;
    style:object;
    open: boolean;
}

const ModalComponent: React.FC<ModalProps> = ({ children, handleClose, open, style }) => {

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}
export default memo(ModalComponent);