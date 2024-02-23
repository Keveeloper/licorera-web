import React from "react";
import { Box } from "@mui/system";
import { displaySpaceAround } from "../../../../recursiveStyles/RecursiveStyles";

// Base Material UI imports
// import { Dropdown } from '@mui/base/Dropdown';
// import { Menu, MenuListboxSlotProps } from '@mui/base/Menu';
// import { MenuButton} from '@mui/base/MenuButton';
// import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
// import { CssTransition } from '@mui/base/Transitions';
// import { PopupContext } from '@mui/base/Unstable_Popup';
// import { styled } from '@mui/system';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import { paletteColors } from "../../../../../../paletteColors/paletteColors";

// const blue = {
//     50: '#F0F7FF',
//     100: '#C2E0FF',
//     200: '#99CCF3',
//     300: '#66B2FF',
//     400: '#3399FF',
//     500: '#007FFF',
//     600: '#0072E6',
//     700: '#0059B3',
//     800: '#004C99',
//     900: '#003A75',
// };

// const grey = {
//     50: '#F3F6F9',
//     100: '#E5EAF2',
//     200: '#DAE2ED',
//     300: '#C7D0DD',
//     400: '#B0B8C4',
//     500: '#9DA8B7',
//     600: '#6B7A90',
//     700: '#434D5B',
//     800: '#303740',
//     900: '#1C2025',
// };

// const MenuItem = styled()(
//     ({ theme }) => `
//     list-style: none;
//     padding: 8px;
//     border-radius: 8px;
//     cursor: default;
//     user-select: none;
  
//     &:last-of-type {
//       border-bottom: none;
//     }
  
//     &.${menuItemClasses.disabled} {
//       color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
//     }
  
//     &:hover:not(.${menuItemClasses.disabled}) {
//       background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
//       color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
//     }
//     `,
//   );

// const Listbox = styled('ul')(
//     ({ theme }) => `
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-size: 0.875rem;
//     box-sizing: border-box;
//     padding: 6px;
//     margin: 12px 0;
//     min-width: 200px;
//     border-radius: 12px;
//     overflow: auto;
//     outline: 0px;
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${paletteColors.black};
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    
//     z-index: 1;
  
//     .closed & {
//       opacity: 0;
//       transform: scale(0.95, 0.8);
//       transition: opacity 200ms ease-in, transform 200ms ease-in;
//     }
    
//     .open & {
//       opacity: 1;
//       transform: scale(1, 1);
//       transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
//     }
  
//     .placement-top & {
//       transform-origin: bottom;
//     }
  
//     .placement-bottom & {
//       transform-origin: top;
//     }
//     `,
//   );

// const AnimatedListbox = React.forwardRef(function AnimatedListbox(
//     props: MenuListboxSlotProps,
//     ref: React.ForwardedRef<HTMLUListElement>,
//   ) {
//     const { ownerState, ...other } = props;
//     const popupContext = React.useContext(PopupContext);
  
//     if (popupContext == null) {
//       throw new Error(
//         'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
//       );
//     }
  
//     const verticalPlacement = popupContext.placement.split('-')[0];
  
//     return (
//       <CssTransition
//         className={`placement-${verticalPlacement}`}
//         enterClassName="open"
//         exitClassName="closed"
//       >
//         <Listbox {...other} ref={ref} />
//       </CssTransition>
//     );
//   });

const Icons = () => {

    return(
        <Box sx={styles.iconsContainer}>
            {/* <img src="/icons/account-icon.png" alt="" /> */}
            <Dropdown>
                <MenuButton
                    sx={{width: '20%', border: 'none'}}
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'outlined', color: 'neutral', backgroundColor: 'none' } }}
                >
                    <img style={{width: '100%'}} src="/icons/account-icon.png" alt="" />
                </MenuButton>
                <Menu sx={{borderRadius: '20px', border: '1px solid black'}}>
                    <Box>
                        <h2>Hola mundo</h2>
                    </Box>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </Menu>
            </Dropdown>
            <img src="/icons/web-shopping-cart-icon.png" alt="" />
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
        }
    }
}

export default Icons;