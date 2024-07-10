import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllPaymentMethods } from "../../../store/modules/paymentMethods";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";
import { displayFlexColumn } from "../../shared/recursiveStyles/RecursiveStyles";
import { Typography } from "@mui/material";
import { selectAllUser } from "../../../store/modules/users";
import { useEffect, useState } from "react";
import { DeletePaymentMethod } from "../../../service/modules/paymentMethods/types";
import { useAppDispatch } from "../../../store/store";
import { deletePaymentMethodsThunk } from "../../../store/modules/paymentMethods/actions/paymentMethods.actions";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { selectAllPersonalInfo } from "../../../store/modules/address";
import { deleteFavoriteLocationThunk, deleteLocationThunk, getLocationsThunk, postFavoriteLocationThunk } from "../../../store/modules/address/actions/address.actions";
import Loader from "../../shared/Loader/components/Loader";
import { useNavigate } from "react-router-dom";

const UserAddress = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [addressArray, setAddressArray] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [idToDelete, setIdToDelete] = useState<number>(0);
    const [alertTitle, setAlertTitle] = useState<string>('');
    const [favorites, setFavorites] = useState<boolean>(false);

    const getAdress = async () => {
      await dispatch(getLocationsThunk())
      .unwrap()
      .then((response: any) => {
          const newArray = response.response.data;
          setAddressArray([...newArray]);
          setLoading(false);
      });
    }

    useEffect(() => {

      if (!showAlert || favorites || !favorites) {
        setLoading(true);
        getAdress();
      }

    // }, [showAlert, favorites]);
    }, []);
    
    const handleDelete = async () => {
      const result = await dispatch(deleteLocationThunk(idToDelete)).unwrap();
      if (result.response.success) {
        getAdress();
        setShowAlert(false);
      }
    }

    const handleShowAlert = (item: any) => {
      setIdToDelete(item.id);
      setAlertTitle(item.name);
      setShowAlert(true);
    }

    const handleAlertClose = () => setShowAlert(false);

    const handleFavorites = async(item: any) => {
      setLoading(true);      
      if (!item.favorite) {
        await dispatch(postFavoriteLocationThunk({id: item.id})).unwrap().then((response) => {
          if (response.success) {
            setFavorites(true);
            getAdress();
          }
        });
      }else{
        await dispatch(deleteFavoriteLocationThunk(item.id)).unwrap().then((response) => {
          if (response.success) {
            setFavorites(false);
            getAdress();
          }
        });
      }
    }
  
    const goToAddress = () => {
      const module = {
        module: 'user'
      }
      navigate('/address', {state: { module } });
    }

    if (loading) {
      return (
          <Box sx={{height: '500px'}}>
              <Loader screenLoader={false}/>
          </Box>
      );
    }

    return (
      <Box sx={{width: '100%', height: '100%'}}>
        <Box sx={{padding: '60px 5%', width: '100%', height: '80%', overflow: 'auto'}}>
            {addressArray?.length > 0 ? addressArray?.map((item: any, index: any) => (
              <>
                <Box key={item.token} sx={{marginTop: '30px', padding: '0 0 20px 0', width: '100%', height: '25%', ...displayFlex, borderBottom: '1px solid gray' }}>
                  <figure style={{width: '10%', height: '100%', ...displayFlex}}>
                    <img style={{height: '100%'}} src="/icons/location-icon.png" alt="credit card color icon" />
                  </figure>
                  <Box sx={{width: '80%'}}>
                    <Typography sx={{fontFamily: 'weblysleekuisb', fontSize: '20px'}}>{item.name}</Typography>
                    <Typography sx={{fontFamily: 'weblysleekuil', fontSize: '16px'}}>{item.address} </Typography>
                  </Box>
                  <figure style={{width: '10%', height: '100%', ...displayFlex}}>
                    <img style={{paddingRight: '10px', height: '40%', cursor: 'pointer'}} src={`/icons/${item.favorite ? 'filled-star' : 'empty-star'}.svg`} alt="credit card color icon" onClick={() => handleFavorites(item)}/>
                    <img style={{height: '40%', cursor: 'pointer'}} src="/icons/trash.png" alt="credit card color icon" onClick={() => handleShowAlert(item)}/>
                  </figure>
                </Box>
                
              </>
            ))
            :
              <Box sx={{width: '100%', height: '100%', ...displayFlexColumn}}>
                <Typography sx={{fontFamily: 'HudsonNYSerif'}}>aun no tienes direcciones guardadas</Typography>
                <Typography sx={{fontFamily: 'weblysleekuil'}}>agrega una para continuar</Typography>
              </Box>
            }
          
        </Box>
        <ModalAlertComponent
          handleClose={handleAlertClose}
          handleSave={() => handleDelete()}
          open={showAlert}
          isCancellButton={true}
          data={{
            title: alertTitle,
            content:`¿Seguro que quieres eliminar esta dirección?`,
            img:`/icons/alert.png`
          }}
        />
        <Button 
            // sx={styles.button}
            sx={{height: '12%', fontFamily: 'HudsonNYSerif', fontSize: '18px'}}
            variant="outlined" 
            fullWidth 
            color="inherit" 
            onClick={goToAddress}
        >
            {/* {edit ? 'Guardar' : 'Editar'} */}
            Agregar
        </Button>
      </Box>
    );

}

export default UserAddress;