import { Box, Typography } from "@mui/material";
import { displayFlex, displayFlexColumn } from "../../shared/recursiveStyles/RecursiveStyles";

const UserBanner = () => {

    return(
        <Box sx={styles.bannerContainer}>
            <Box sx={styles.bannerContainer.boxLeft}>
                <Box sx={styles.bannerContainer.boxLeft.userIcon}>
                    <img style={styles.bannerContainer.boxLeft.userIcon.userImage} src="/icons/account-icon.png" width={100} alt="" />
                </Box>
                <Box sx={styles.bannerContainer.boxLeft.userName}>
                    <Typography sx={styles.bannerContainer.boxLeft.userName.name}>Diego Fernando Díaz</Typography>
                    <Typography sx={styles.bannerContainer.boxLeft.userName.jotas}>525 Jotas</Typography>
                </Box>
            </Box>
            <Box sx={styles.bannerContainer.boxRight}>
                <img src="/icons/logout-icon.png" width={30} alt="" />
                <Box sx={styles.bannerContainer.boxRight.circle}>
                    <Typography sx={styles.bannerContainer.boxRight.circle.text}>999</Typography>
                    <Typography sx={styles.bannerContainer.boxRight.circle.text}>Pedidos</Typography>
                </Box>
                <Box sx={styles.bannerContainer.boxRight.circle}>
                    <Typography sx={styles.bannerContainer.boxRight.circle.text}>25</Typography>
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
                    backgroundColor: 'white',
                    borderRadius: '50%',
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
                backgroundColor: 'white',
                text: {
                    fontFamily: 'weblysleekuisb'
                }
            }
        }
    }
}

export default UserBanner;