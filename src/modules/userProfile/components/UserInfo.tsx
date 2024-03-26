import { useSelector } from "react-redux";
import { selectAllUser } from "../../../store/modules/users";
import { Box, Input } from "@mui/material";
import { displayFlex, displaySpaceAround, displaySpaceBetween, displayFlexColumn } from "../../shared/recursiveStyles/RecursiveStyles";

const UserInfo = () => {

    const user = useSelector(selectAllUser);
    console.log(user);
    

    return (
        <>
        <Box sx={styles.nameContainer}>
            <Input
                sx={styles.nameContainer.inputInfo}
                placeholder="Nombre"
                value={user?.name}
                disabled
                endAdornment
            />
            <Input
                sx={styles.nameContainer.inputInfo} 
                placeholder="Apellido"
                value={user?.last_name}
                disabled
                endAdornment
            />
        </Box>
        <Box sx={styles.otherInfoContainer}>
            <Input
                sx={styles.otherInfoContainer.inputInfo} 
                placeholder="Email"
                value={user?.email}
                disabled
                endAdornment
            />
            <Input
                sx={styles.otherInfoContainer.inputInfo} 
                placeholder="Fecha de nacimiento"
                value={user?.birthday}
                disabled
                endAdornment
            />
            <Input
                sx={styles.otherInfoContainer.inputInfo}  
                placeholder="Telefono"
                value={user?.cellphone}
                disabled
                endAdornment
            />
        </Box>
        </>
    );

}

const styles = {
    nameContainer: {
        margin: '40px 0 0 0',
        width: '100%',
        ...displaySpaceBetween,
        inputInfo: {
            margin: '20px 0 0 0',
            padding: '10px', 
            width: '45%',
            '& .Mui-disabled:before': {
                borderBottomStyle: 'solid',
            },
        }
    },
    otherInfoContainer: {
        ...displayFlexColumn,
        inputInfo: {
            margin: '20px 0 0 0',
            padding: '10px', 
            width: '100%',
            '& .Mui-disabled:before': {
                borderBottomStyle: 'solid',
            },
        }
    }
}

export default UserInfo;