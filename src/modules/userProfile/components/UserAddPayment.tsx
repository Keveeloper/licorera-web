import { Box } from "@mui/joy";
import { Button, TextField, Typography } from "@mui/material";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";
import { useForm } from "react-hook-form";
import { paletteColors } from "../../../paletteColors/paletteColors";

const UserAddPayment = () => {

    const {
        register,
        formState: { errors, isValid },
        reset,
        getValues,
    } = useForm({
        mode: "onChange",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password, year } = getValues();
        // const loginRequest: LoginRequest = {
        //   email,
        //   password,
        // };
        // try{
        //   const postLogin = await dispatch(userLogin(loginRequest)).unwrap();
        //   if (postLogin.success) {
        //     dispatch(getMe(postLogin?.response?.token)).unwrap();
        //     modalOpen = false;
        //     handleClose();
        //   } else {
        //     setShowAlert(true);
        //   }
        // } catch (error){
        //   console.log(error);
        //   setShowAlert(true);
        // }
        
      };
    
    return (
        <>
            <Box sx={styles.titleContainer}>
                <img style={styles.titleContainer.arrowImage} src="/icons/Keyboard-arrow-left.png" alt="" />
                <Typography sx={styles.titleContainer.title}>agregar método de pago</Typography>
            </Box>
            <Box sx={styles.formContainer} onSubmit={ ()=> handleSubmit} >
                <Typography sx={styles.formContainer.cardNumberLabel}>Número de la tarjeta</Typography>
                <Box sx={styles.formContainer.numberContainer}>
                    <TextField
                        label="Correo electrónico"
                        variant="filled"
                        error={!!errors.email}
                        helperText={
                        errors.email ? errors.email.message?.toString() : ""
                        }
                        {...register("email", {
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Formato de correo no válido",
                        },
                        })}
                        name="email"
                        type="email"
                        className="inputCustom"
                    />
                    <img style={styles.formContainer.numberContainer.cardimage} src="/icons/not-valid-card-icon.png" alt="" />
                </Box>
                <Box sx={styles.formContainer.dateCcvContainer}>
                    <Box sx={styles.formContainer.dateCcvContainer.dateContainer}>
                        <Typography sx={styles.formContainer.cardNumberLabel}>Fecha de expiración</Typography>
                        <TextField
                            label="Correo electrónico"
                            variant="filled"
                            error={!!errors.email}
                            helperText={
                            errors.email ? errors.email.message?.toString() : ""
                            }
                            {...register("email", {
                            required: "Este campo es obligatorio",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Formato de correo no válido",
                            },
                            })}
                            name="email"
                            // type="email"
                            className="inputCustom"
                        />
                    </Box>
                    <Box sx={styles.formContainer.dateCcvContainer.ccvContainer}>
                        <Typography sx={styles.formContainer.cardNumberLabel}>CCV</Typography>
                        <TextField
                            label="Correo electrónico"
                            variant="filled"
                            error={!!errors.email}
                            helperText={
                            errors.email ? errors.email.message?.toString() : ""
                            }
                            {...register("email", {
                            required: "Este campo es obligatorio",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Formato de correo no válido",
                            },
                            })}
                            name="email"
                            // type="email"
                            className="inputCustom"
                        />
                    </Box>
                </Box>
                <Box sx={styles.formContainer.nameContainer}>
                    <Typography sx={styles.formContainer.cardNumberLabel}>Nombre en la tarjeta</Typography>
                    <TextField
                        label="Correo electrónico"
                        variant="filled"
                        error={!!errors.email}
                        helperText={
                        errors.email ? errors.email.message?.toString() : ""
                        }
                        {...register("email", {
                        required: "Este campo es obligatorio",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Formato de correo no válido",
                        },
                        })}
                        name="email"
                        // type="email"
                        className="inputCustom"
                    />
                </Box>
                <Box sx={styles.formContainer.ePaycoContainer}>
                    <img style={styles.formContainer.ePaycoContainer.padlock} src="/icons/padlock-icon.png" alt="" />
                    <Typography sx={styles.formContainer.ePaycoContainer.text}>Pago seguro con ePayco</Typography>
                </Box>
                <Button 
                    sx={styles.formContainer.button} 
                    variant="outlined" 
                    fullWidth 
                    color="inherit" 
                    // onClick={handleClick}
                >
                    Agregar
                </Button>
            </Box>
        </>
    );

}

const styles = {
    titleContainer: {
        width: '100%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        arrowImage: {
            height: '100%',
        },
        title: {
            margin: '0 auto',
            fontFamily: "HudsonNYSerif",
            fontSize: '30px',
            textAlign: 'center',
        }
    },
    formContainer: {
        margin: '50px auto 0 auto',
        width: '80%',
        cardNumberLabel: {
            fontFamily: 'weblysleekuisb',
            fontSize: '18px',
        },
        numberContainer: {
            display: 'flex',
            alignItems: 'end',
            cardimage: {
                width: '100px'
            }
        },
        dateCcvContainer: {
            marginTop: 4,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            dateContainer: {
                width: '45%',
            },
            ccvContainer: {
                width: '45%',
            }
        },
        nameContainer: {
            mt: 4
        },
        ePaycoContainer: {
            m: '40px auto 0 auto',
            width: '35%',
            height: '25px',
            display: 'flex',
            justifyContent: 'space-around',
            padlock: {
                height: '100%'
            },
            text: {
                fontFamily: 'weblysleekuil',
            }
        },
        button: {
            margin: '50px 0 0 0', 
            padding: 2,
            fontFamily: 'HudsonNYSerif',
            fontSize: '18px',
            // background: `${edit ? paletteColors.gold : 'none'}`,
            background: 'none',
            // color: `${edit ? paletteColors.white : paletteColors.black}`,
            color: paletteColors.black,
            // '&:hover': {
            //     background: `${edit ? paletteColors.gold : 'transparent'}`,
            // },
        }
    }
}

export default UserAddPayment;