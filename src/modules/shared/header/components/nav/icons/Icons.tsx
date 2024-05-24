import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { displaySpaceAround } from "../../../../recursiveStyles/RecursiveStyles";
import { displayFlexColumn } from "../../../../recursiveStyles/RecursiveStyles";
import { paletteColors } from "../../../../../../paletteColors/paletteColors";

// Material UI imports
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Badge from '@mui/material/Badge';
import LoginScreen from "../../../../../user/login.screen";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUser, selectIsWelcome } from "../../../../../../store/modules/users/selectors/users.selector";
import { personalInfoActions } from "../../../../../../store/modules/users/users.slice";
import DrawerComponent from "../../../../drawer/drawer.component";
import { Anchor } from "@mui/icons-material";
import Cart from "../../../../../cart/cart.screen";
import { selectCartProducts } from "../../../../../../store/modules/cart/selectors/cart.selector";
import { useNavigate } from "react-router-dom";

const Icons = () => {

    const navigation = useNavigate();
    const [isLogin, setIslogin] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const user = useSelector(selectAllUser);
    const isWelcome = useSelector(selectIsWelcome);
    const products = useSelector(selectCartProducts);
    const dispatch = useDispatch();
    
    const handleLogin =() => {
        setOpenModal(true);
    }
    const handleClose = (isOpen: boolean) => {
        setOpenModal(isOpen);

    };

    const logout = () =>{
        dispatch(personalInfoActions.clearUserState(isWelcome));
    }

    const toggleDrawer = (open: boolean) => {
        setIsDrawerOpen(open);
    };

    useEffect(() => {
        if(user?.id && user?.name){
            setIslogin(true);
        }else{
            setIslogin(false);
        }
    },[user])

    return(
        <Box sx={styles.iconsContainer}>
            {!isLogin && <img  onClick={handleLogin} src="/icons/account-icon.png"alt="" /> }
            {openModal && <LoginScreen handleClose={() => handleClose(false)} modalOpen={openModal}/>}
            {isLogin && (
                <Dropdown>
                    <MenuButton
                        sx={styles.iconsContainer.menuButton}
                        slots={{ root: IconButton }}
                        slotProps={{ root: { variant: 'outlined', color: 'neutral', background: 'none' } }}
                    >
                        <img style={styles.iconsContainer.menuButton.img} src="/icons/account-icon.png" alt="" />
                    </MenuButton>
                        <Menu sx={styles.iconsContainer.menu}>
                            <Box sx={styles.iconsContainer.menu.userContainer}>
                                <h2>{user?.name?.toUpperCase()}</h2>
                                <p>{user?.points} Jotas</p>
                            </Box>
                            <MenuItem sx={styles.iconsContainer.menu.menuitem} onClick={() => navigation('/user-profile')}>Perfil</MenuItem>
                            <MenuItem sx={styles.iconsContainer.menu.menuitem}>Mis Pedidos</MenuItem>
                            <MenuItem sx={styles.iconsContainer.menu.menuitem} onClick={logout}>Cerrar Sesión</MenuItem>
                        </Menu>
                </Dropdown>
            )}
            <Badge sx={styles.iconsContainer.badge} badgeContent={products?.length}>
                <img style={{width: '100%'}} src="/icons/web-shopping-cart-icon.png" alt="" onClick={() => toggleDrawer(true)}/>
            </Badge>
            <img src="/icons/delivery-icon.png" alt="" />
            <Cart open={isDrawerOpen}  toggleDrawer={toggleDrawer} />
        </Box>
    );

}

const styles = {
    iconsContainer: {
        width: '15%',
        height: '100%',
        ...displaySpaceAround,
        'img': {
            width: '17%'
        },
        'img:hover': {
            cursor: 'pointer'
        },
        menuButton: {
            width: '20%', 
            border: 'none',
            img: {
                width: '100%'
            },
        },
        menuNormalButton: {
            width: '20%', 
            border: 'none',
            img: {
                width: '100%'
            },
        },
        menu: {
            borderRadius: '20px', 
            border: '1px solid black',
            userContainer: {
                margin: '0 15px 0 15px',
                padding: '10px',
                ...displayFlexColumn,
                borderBottom: `1px solid ${paletteColors.gold} !important`,
                'h2': {
                    fontFamily: 'HudsonNYSerif',
                    color: paletteColors.black,
                    fontSize: '18px'
                },
                'p': {
                    fontFamily: 'weblysleekuisb'
                }
            },
            menuitem: {
                fontFamily: 'weblysleekuil'
            }
        },
        badge: {
            width: '17%',
            "& .MuiBadge-badge": {
                color: paletteColors.white,
                background: paletteColors.gold
            }
        }
    }
}

export default Icons;