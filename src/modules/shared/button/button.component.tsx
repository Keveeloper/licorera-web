import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode;
    onClick?:() => void;
    style: object
}

const ButtonComponent: React.FC<ButtonProps> = ({ children, onClick, style }) => {
    return(
        <button onClick={onClick} style={style}>{children}</button>
    )
}

export default ButtonComponent;