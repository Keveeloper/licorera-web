import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode;
    onClick?:() => void;
    style: object,
    disabled?:boolean,
    className?:string
}

const ButtonComponent: React.FC<ButtonProps> = ({ children, onClick, style, disabled, className }) => {
    return(
        <button onClick={onClick} style={style} disabled={disabled} className={className}>{children}</button>
    )
}

export default ButtonComponent;