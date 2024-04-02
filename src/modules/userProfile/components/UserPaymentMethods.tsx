import { Box } from "@mui/material";
import React, { useRef, useEffect } from "react";

const UserPaymentMethods = ({ items, onItemDelete }: any) => {
  
  const listElementRef = useRef<any>();
  const wrapperRef = useRef<any>();
  const backgroundRef = useRef();

  const dragStartXRef = useRef(0);
  const leftRef = useRef(0);
  const draggedRef = useRef(false);

  useEffect(() => {
    window.addEventListener("drag", onDragEndMouse);
    return () => {
      window.removeEventListener("drag", onDragEndMouse);
    };
  });

  const onDragEndMouse = (event: any) => {
    // console.log('Qué está pasando aquí?');
    const clientX = event.clientX;
    console.log(clientX);
    
    
  }

  return (
    
    <Box sx={{width: '100%', height: '100px', bgcolor: 'blue'}}>
      {/* Hola */}
    </Box>
  );
};

export default UserPaymentMethods;
