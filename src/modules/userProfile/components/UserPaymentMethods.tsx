import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllPaymentMethods } from "../../../store/modules/paymentMethods";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";
import { Typography } from "@mui/material";
import { selectAllUser } from "../../../store/modules/users";
import { useAppDispatch } from "../../../store/store";
import { useEffect, useState } from "react";
import { deletePaymentMethodsThunk, getPaymentMethodsThunk } from "../../../store/modules/paymentMethods/actions/paymentMethods.actions";
import { DeletePaymentMethod } from "../../../service/modules/paymentMethods/types";

const UserPaymentMethods = ({ items, onItemDelete }: any) => {

  const paymentMethodsRedux = useSelector(selectAllPaymentMethods);  
  const user = useSelector(selectAllUser);

  const dispatch = useAppDispatch();
  const [ itemToDelete, setItemToDelete ] = useState<DeletePaymentMethod>({
    token: '',
    franchise: '',
    mask: '',
  })

  useEffect(() => {
    if (itemToDelete) {
      dispatch(deletePaymentMethodsThunk({reqData: itemToDelete})).unwrap();
      dispatch(getPaymentMethodsThunk()).unwrap();
    }
  }, [itemToDelete])

  const handleDelete = (item: any) => {
    console.log(item);
    const newItem = item;
    setItemToDelete(newItem);
  }

  return (
    
    <Box sx={{width: '100%', height: '100%'}}>
      <Box sx={{padding: '60px 5%', width: '100%', height: '88%', overflow: 'auto'}}>
        {paymentMethodsRedux.map((item: any, index: any) => (
          <Box sx={{marginTop: '30px', padding: '0 0 20px 0', width: '100%', height: '25%', ...displayFlex, borderBottom: '1px solid gray' }}>
            <figure style={{width: '10%', height: '100%', ...displayFlex}}>
              <img style={{height: '50%'}} src="/icons/credit-card-color.png" alt="credit card color icon" />
            </figure>
            <Box sx={{width: '80%'}}>
              <Typography sx={{fontFamily: 'weblysleekuisb', fontSize: '20px'}}>{item.mask}</Typography>
              <Typography sx={{fontFamily: 'weblysleekuil', fontSize: '16px'}}>{user.name} {user.last_name}</Typography>
            </Box>
            <figure style={{width: '10%', height: '100%', ...displayFlex}}>
              <img style={{height: '40%'}} src="/icons/trash.png" alt="credit card color icon" onClick={(() => handleDelete(item))}/>
            </figure>
          </Box>
        ))}
      </Box>
      <Button 
          // sx={styles.button}
          sx={{height: '12%'}}
          variant="outlined" 
          fullWidth 
          color="inherit" 
          // onClick={handleClick}
      >
          {/* {edit ? 'Guardar' : 'Editar'} */}
          Agregar
      </Button>
    </Box>
  );
};

export default UserPaymentMethods;
