import React, { ReactNode } from 'react';
import './customModal.css'; 

interface ModalProps {
    children?: ReactNode;
    open: boolean;
    onClose: () => void;
    modalStyle?:string;
    modalContentStyle?:string
}

const CustomModal: React.FC<ModalProps> = ({ open, onClose, children, modalStyle, modalContentStyle }) => {
    if (!open) return null;

    return (
        <div className={ modalStyle ? modalStyle : "modal"}>
            <div className={modalContentStyle ? modalContentStyle : "modal-content"}>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;