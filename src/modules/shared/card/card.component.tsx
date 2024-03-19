import { Card } from "@mui/material";
import { ReactNode, memo } from "react";

interface ButtonProps {
    children?: ReactNode;
    style?:object; 
}

const CardComponent: React.FC<ButtonProps> = ({children, style}) => {
    return(
         <Card variant="outlined" style={style}>{children}</Card>
    )
}

export default memo(CardComponent);