import { Card } from "@mui/material";
import { ReactNode, memo } from "react";

interface ButtonProps {
    children?: ReactNode;
    style?:object; 
}

const CardComponent: React.FC<ButtonProps> = ({children, style}) => {
    return(
         <Card sx={styles.card} variant="outlined" style={style}>{children}</Card>
    )
}

const styles = {
    card: {
        padding: '20px',
        borderRadius: '10px',
        height: '452px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export default memo(CardComponent);