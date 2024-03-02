import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode;
    onClick?:() => void;
    style: object,
    disabled?:boolean
}

const ButtonComponent: React.FC<ButtonProps> = ({ children, onClick, style, disabled }) => {
    return(
        <button onClick={onClick} style={style} disabled={disabled}>{children}</button>
    )
}

export default ButtonComponent;