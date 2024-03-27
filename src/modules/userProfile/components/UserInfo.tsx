import { useSelector } from "react-redux";
import { selectAllUser } from "../../../store/modules/users";
import { Box, Button, Input } from "@mui/material";
import { displaySpaceBetween, displayFlexColumn } from "../../shared/recursiveStyles/RecursiveStyles";
import { useState } from "react";
import { paletteColors } from "../../../paletteColors/paletteColors";
import { ResponsePersonalInfo } from "../../../store/modules/users/types";
import { useForm } from "react-hook-form";

const UserInfo = () => {

    const user = useSelector(selectAllUser);

    const {
        register,
        formState: { errors, isValid },
        reset,
        getValues,
      } = useForm({
        mode: "onChange",
    });
    
    const [ edit, setEdit ] = useState<boolean>(false);
    const [ userInfo, setUserInfo ] = useState<ResponsePersonalInfo>({
        firstName: user?.name,
        lastName: user?.last_name,
        phone: user?.cellphone,
        email: user?.email,
        birthday: user?.birthday,
    });


    const styles = stylesMethod(edit);

    const handleClick = () => {
        setEdit(!edit); 
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, lastName, email, birthday, cellphone } = getValues();
        const newUserInfo = {
            firstName: name,
            lastName: lastName,
            phone: cellphone,
            email: email,
            birthday: birthday,
        }
        setUserInfo(newUserInfo);
    }
    return (
        <>
            <Box sx={styles.nameContainer}>
                <Input
                    sx={styles.nameContainer.inputInfo}
                    placeholder="Nombre"
                    // value={user?.name}
                    value={userInfo.firstName}
                    disabled={edit ? false : true}
                    endAdornment
                    onChange={handleChange}
                    name="name"
                />
                <Input
                    sx={styles.nameContainer.inputInfo} 
                    placeholder="Apellido"
                    // value={user?.last_name}
                    value={userInfo.lastName}
                    disabled={edit ? false : true}
                    endAdornment
                    onChange={handleChange}
                    name="lastName"
                />
            </Box>
            <Box sx={styles.otherInfoContainer}>
                <Input
                    sx={styles.otherInfoContainer.inputInfo} 
                    placeholder="Email"
                    // value={user?.email}
                    value={userInfo.email}
                    disabled={edit ? false : true}
                    endAdornment
                    onChange={handleChange}
                    name="email"
                />
                <Input
                    sx={styles.otherInfoContainer.inputInfo} 
                    placeholder="Fecha de nacimiento"
                    // value={user?.birthday}
                    value={userInfo.birthday}
                    disabled={edit ? false : true}
                    endAdornment
                    onChange={handleChange}
                    name="birthday"
                />
                <Input
                    sx={styles.otherInfoContainer.inputInfo}  
                    placeholder="Telefono"
                    value={userInfo.phone}
                    disabled={edit ? false : true}
                    endAdornment
                    onChange={handleChange}
                    name="cellphone"
                    type="number"
                />
            </Box>
            <Button 
                sx={styles.button} 
                variant="outlined" 
                fullWidth 
                color="inherit" 
                onClick={handleClick}
            >
                {edit ? 'Guardar' : 'Editar'}
            </Button>
        </>
    );

}

const stylesMethod = (edit: boolean) => ({
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
    },
    button: {
        margin: '50px 0 0 0', 
        padding: 2,
        fontFamily: 'HudsonNYSerif',
        backgroundColor: `${edit ? paletteColors.gold : 'none'}`,
        color: `${edit ? paletteColors.white : paletteColors.black}`,
        '&:hover': {
            backgroundColor: `${edit ? paletteColors.gold : 'transparent'}`,
        },
    }
});

export default UserInfo;