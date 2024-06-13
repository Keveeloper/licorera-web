import { useSelector } from "react-redux";
import { selectAllPersonalInfo, selectAllUser } from "../../../store/modules/users";
import { Box, Button, Input } from "@mui/material";
import { displaySpaceBetween, displayFlexColumn } from "../../shared/recursiveStyles/RecursiveStyles";
import { useState } from "react";
import { paletteColors } from "../../../paletteColors/paletteColors";
import { ResponsePersonalInfo } from "../../../store/modules/users/types";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/store";

// DatePicker components
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import 'dayjs/locale/es';
import { putUserRequest } from "../../../service/modules/users/types";
import { getMe, updateUserInfo } from "../../../store/modules/users/actions/users.actions";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";

const UserInfo = () => {

    const dispatch = useAppDispatch();
    const user = useSelector(selectAllUser);
    console.log('user name: ', user?.name);
    
    
    const {
        register,
        // formState: { errors, isValid },
        // reset,
        getValues,
      } = useForm({
        mode: "onChange",
    });

    const [ userFirstName, setUserFirstName ] = useState<string>(user?.name);
    const [ userLastName, setUserLastName ] = useState<string>(user?.last_name);
    const [ userEmail, setUserEmail ] = useState<string>(user?.email);
    const [ date, setDate ] = useState<Dayjs | null>(dayjs(user?.birthday));
    const [ userCellphone, setUsercellphone ] = useState<string>(user?.cellphone);

    const [ edit, setEdit ] = useState<boolean>(false);    
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const styles = stylesMethod(edit);

    const handleClick = async () => {
        setEdit(!edit); 
        if (edit) {
            const updateUserRequest: putUserRequest = {
                name: userFirstName,
                last_name: userLastName,
                birthday: date?.toString(),
                email: userEmail,
                cellphone: userCellphone,
            };
            
            const parameterComplete = {
                reqData: updateUserRequest,
                userId: user?.id,
            } 
            const updateResponse = await dispatch(updateUserInfo(parameterComplete)).unwrap();
            if (updateResponse.success) {
                setShowAlert(true);
                dispatch(getMe(updateResponse.response.api_token)).unwrap();
            }
            
        }
    }

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    return (
        <>
            <Box sx={styles.nameContainer}>
                <Input
                    sx={styles.nameContainer.inputInfo}
                    placeholder="Nombre"
                    // value={user?.name}
                    // value={userInfo.firstName}
                    value={userFirstName}
                    disabled={edit ? false : true}
                    // endAdornment
                    {...register("name", {
                        required: "Este campo es obligatorio",
                    })}
                    // onChange={handleChange}
                    onChange={(event) => setUserFirstName(event?.target.value)}
                    name="name"
                />
                <Input
                    sx={styles.nameContainer.inputInfo} 
                    placeholder="Apellido"
                    // value={user?.last_name}
                    value={userLastName}
                    disabled={edit ? false : true}
                    // endAdornment
                    {...register("lastName", {
                        required: "Este campo es obligatorio",
                    })}
                    onChange={(event) => setUserLastName(event?.target.value)}
                    name="lastName"
                />
            </Box>
            <Box sx={styles.otherInfoContainer}>
                <Input
                    sx={styles.otherInfoContainer.inputInfo} 
                    placeholder="Email"
                    // value={user?.email}
                    value={userEmail}
                    disabled={true}
                    // endAdornment
                    {...register("email", {
                        required: "Este campo es obligatorio",
                    })}
                    onChange={(event) => setUserEmail(event?.target.value)}
                    name="email"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <MobileDatePicker 
                        sx={styles.otherInfoContainer.datePicker}
                        // defaultValue={dayjs(new Date())}
                        value={date}
                        disabled={edit ? false : true}
                        {...register("birthday", {
                            required: "Este campo es obligatorio",
                        })}
                        onChange={(newValue) => setDate(newValue)}
                        name="birthday"
                        // loading
                    />
                </LocalizationProvider>
                <Input
                    sx={styles.otherInfoContainer.inputInfo}  
                    placeholder="Telefono"
                    value={userCellphone}
                    disabled={edit ? false : true}
                    // endAdornment
                    {...register("cellphone", {
                        required: "Este campo es obligatorio",
                    })}
                    onChange={(event) => setUsercellphone(event?.target.value)}
                    // onChange={(event) => setUserFirstName(event.target.value)}
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
            <ModalAlertComponent
               handleClose={handleAlertClose}
               handleSave={handleAlertClose}
               open={showAlert}
               isCancellButton={false}
               data={{
                 title:`¡felicitaciones!`,
                 content:`Tu información ha sido actualizada exitosamente.`,
                 img:`/icons/checkIcon.png`
            }}/>
        </>
    );

}

const stylesMethod = (edit: boolean) => ({
    nameContainer: {
        margin: '40px 0 0 0',
        width: '100%',
        ...displaySpaceBetween,
        // background: 'purple',
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
        },
        datePicker: {
            margin: '20px 0 0 0',
            width: '100%',
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            '&:hover': {
                borderBottom: `${edit && ('1px solid black')}`,
            }
        }
    },
    button: {
        margin: '50px 0 0 0', 
        padding: 2,
        fontFamily: 'HudsonNYSerif',
        fontSize: '18px',
        background: `${edit ? paletteColors.gold : 'none'}`,
        color: `${edit ? paletteColors.white : paletteColors.black}`,
        '&:hover': {
            background: `${edit ? paletteColors.gold : 'transparent'}`,
        },
    }
});

export default UserInfo;