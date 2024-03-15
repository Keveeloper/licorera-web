import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { ReactNode } from "react";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface DrawerInterface {
    children?: ReactNode;
    anchor: Anchor;
    open: boolean;
    toggleDrawer: (open: boolean) => void; 
}

const DrawerComponent: React.FC<DrawerInterface> = ({ children, anchor, open, toggleDrawer }) => {

    const handleToggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        toggleDrawer(open);
    };

    return (
        <div>
            <Drawer
                anchor={anchor}
                open={open}
                onClose={handleToggleDrawer(false)}
            >
                <img src="/icons/vector_close_white.png" style={styles.iconClose} onClick={handleToggleDrawer(false)}/>
                {children}
            </Drawer>
        </div>
    );
}

export default DrawerComponent;

const styles:any = {
    iconClose:{
        position: 'absolute',
        right: '10px',
        top: '10px',
        width: '20px',
        cursor:'pointer'
    }
}