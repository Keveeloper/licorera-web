import { Box, Typography } from "@mui/material";
import { displayFlex, displayFlexColumn } from "../../shared/recursiveStyles/RecursiveStyles";
import { useSelector } from "react-redux";
import { personalInfoActions, selectAllUser } from "../../../store/modules/users";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { selectAllPersonalInfo, selectIsWelcome } from "../../../store/modules/users/selectors/users.selector";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { getInfoThunk, getMe } from "../../../store/modules/users/actions/users.actions";
import { useNavigate } from "react-router-dom";
import { UserExchangeinterface } from "./types";
import { getMeExchangeProductThunk } from "../../../store/modules/exchangeProducts/actions/exchange.actions";

const UserBanner = (props: UserExchangeinterface) => {

    const { exchangeOpen, setExchangeOpen } = props;

    const user = useSelector(selectAllUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isWelcome = useSelector(selectIsWelcome);
    // const personalInfo: any = useSelector(selectAllPersonalInfo);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleShowAlert = () => {
        setShowAlert(true);
    }

    const handleAlertClose = () => setShowAlert(false);

    const logout = () =>{
        dispatch(personalInfoActions.clearUserState(isWelcome));
        setShowAlert(false);
        navigate('/');
    }

    const goToRecentOrder = ()=>{
        navigate('/recentOrder')
    }

    const handleExchange = async () => {
        await dispatch(getMeExchangeProductThunk()).unwrap().then((response) => {
            if (response.response.data.data.length > 0) {
                setExchangeOpen(true);
            }
        });
    }

    // useEffect(() => {
        
    // }, []);

    return(
        <Box sx={styles.bannerContainer}>
            <Box sx={styles.bannerContainer.boxLeft}>
                <Box sx={styles.bannerContainer.boxLeft.userIcon}>
                    {/* <img style={styles.bannerContainer.boxLeft.userIcon.userImage} src="/icons/account-icon.png" width={100} alt="" /> */}
                    <img style={styles.bannerContainer.boxLeft.userIcon.userImage} src="/icons/user.png" width={100} alt=""/>
                </Box>
                <ModalAlertComponent
                    handleClose={handleAlertClose}
                    handleSave={logout}
                    open={showAlert}
                    isCancellButton={true}
                    data={{
                        title: `información`,
                        content:`¿Seguro que quieres cerrar sesión?`,
                        img:`/icons/logout-modal-icon.png`
                    }}
                />
                <Box sx={styles.bannerContainer.boxLeft.userName}>
                    <Typography sx={styles.bannerContainer.boxLeft.userName.name}>{user?.name} {user?.last_name}</Typography>
                    <Typography sx={styles.bannerContainer.boxLeft.userName.jotas}>{user?.points} Jotas</Typography>
                </Box>
            </Box>
            <Box sx={styles.bannerContainer.boxRight}>
                <img style={{cursor: 'pointer'}} src="/icons/logout-icon.png" width={30} alt="" onClick={handleShowAlert}/>
                <Box sx={styles.bannerContainer.boxRight.circle}>
                    <Typography sx={styles.bannerContainer.boxRight.circle.text}>{user?.order_quantity}</Typography>
                    <Typography sx={styles.bannerContainer.boxRight.circle.text} onClick={goToRecentOrder}>Pedidos</Typography>
                </Box>
                <Box sx={styles.bannerContainer.boxRight.circle} onClick={handleExchange}>
                    <Typography sx={styles.bannerContainer.boxRight.circle.text}>{user?.exchanges_quantity}</Typography>
                    <Typography sx={styles.bannerContainer.boxRight.circle.text}>Canjes</Typography>
                </Box>
            </Box>
        </Box>
    );

}

const styles = {
    bannerContainer: {
        width: '100%',
        height: '220px',
        ...displayFlex,
        backgroundImage: `url("/images/background-profile-user.png")`,
        boxLeft: {
            width: '50%',
            height: '100%',
            ...displayFlex,
            userIcon: {
                width: '30%',
                height: '100%',
                ...displayFlex,
                userImage: {
                    padding: '10px',
                    background: 'white',
                    borderRadius: '50%',
                    border: '3px solid black',
                }
            },
            userName: {
                width: '70%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                name: {
                    fontSize: '35px',
                    fontFamily: 'HudsonNYSerif'
                },
                jotas: {
                    margin: '0 0 10px 0',
                    fontSize: '30px',
                    fontFamily: 'weblysleekuisb'
                }
            }
        },
        boxRight: {
            position: 'relative',
            width: '50%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            'img': {
                position: 'absolute',
                top: '20px',
                right: '40px',
            },
            circle: {
                margin: '0 40px 0 0',
                width: '100px',
                height: '100px',
                border: '3px solid black',
                borderRadius: '50%',
                ...displayFlexColumn,
                cursor:'pointer',
                background: 'white',
                text: {
                    fontFamily: 'weblysleekuisb',
                }
            }
        }
    }
}

export default UserBanner;