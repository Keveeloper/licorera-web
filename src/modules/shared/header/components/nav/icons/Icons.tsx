import React, { useState } from "react";
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

const Icons = () => {
    const [isLogin, setIslogin] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const handleLogin =() => {
        setOpenModal(true);
    }
    const handleClose = (isOpen: boolean) => {
        setOpenModal(isOpen);
    };
    return(
        <Box sx={styles.iconsContainer}>
            <Dropdown>
                <MenuButton
                    onClick={handleLogin}
                    sx={styles.iconsContainer.menuButton}
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'outlined', color: 'neutral', backgroundColor: 'none' } }}
                >
                    <img style={styles.iconsContainer.menuButton.img} src="/icons/account-icon.png" alt="" />
                </MenuButton>
                {(!isLogin && openModal) ? <LoginScreen handleClose={() => handleClose(false)} modalOpen={openModal}/> :
                    isLogin && (<Menu sx={styles.iconsContainer.menu}>
                        <Box sx={styles.iconsContainer.menu.userContainer}>
                            <h2>DIEGO DÍAZ</h2>
                            <p>532 Jotas</p>
                        </Box>
                        <MenuItem sx={styles.iconsContainer.menu.menuitem}>Profile</MenuItem>
                        <MenuItem sx={styles.iconsContainer.menu.menuitem}>My account</MenuItem>
                        <MenuItem sx={styles.iconsContainer.menu.menuitem}>Logout</MenuItem>
                    </Menu>)
                }
            </Dropdown>
            <Badge sx={styles.iconsContainer.badge} badgeContent={12}>
                <img style={{width: '100%'}} src="/icons/web-shopping-cart-icon.png" alt="" />
            </Badge>
            <img src="/icons/delivery-icon.png" alt="" />
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
                backgroundColor: paletteColors.gold
            }
        }
    }
}

export default Icons;