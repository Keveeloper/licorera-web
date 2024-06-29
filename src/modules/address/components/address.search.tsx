import {
  Box,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import useAddress from "../hooks/useAddress";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";
import useAddressHook from "../../shared/hooks/addressHook/useAddressHook";

interface props {
}
const AddressSearch: React.FC<props> = () => {

  const location = useLocation();
  const { GetHookGoogleApi } = useAddress();
  const navigate = useNavigate();
  const { addToAddress  } = useAddressHook();
  

  const [googleAddress, setGoogleAddress] = useState<any[]>([]);
  const [myTimeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getLocation = (event: any) => {
    console.log(event.target.value);
    let params = event.target.value;

    params = params.replace(/ /g, "+");
    params = params.replace("#", "");
    params = encodeURIComponent(params);

    if (myTimeout !== null) {
      clearTimeout(myTimeout);
    }
    const timeoutId = setTimeout(async () => {
      console.log("llegamos");
      GetHookGoogleApi(params)
        .then((res) => {
          if (res.success) {
            setGoogleAddress(res.data.results);
          }
          console.log(googleAddress);
        })
        .catch((error) => console.error(error));
    }, 600);
    setMyTimeout(timeoutId);
  };

  const goToMap = () => {
    const module = {
      module: location.state.module.module === 'user' ? 'user' : 'checkout'
    }
    navigate('map', {state: {module} } );
  }
  const setAddress = (address:any) => {
    const newAddress = {
      coords:{
        latitude:address.geometry.location.lat,
        longitude:address.geometry.location.lng
      },
      addressInput: address.formatted_address 
    }
    addToAddress(newAddress)
    const module = {
      module: location.state.module.module === 'user' ? 'user' : 'checkout'
    }
    navigate('form', {state: {module} } );
  }

  return (
    <Box className="addressContainer">
      <div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 450,
            mt: 2,
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Ingresa una dirección"
            inputProps={{ "aria-label": "Ingresa una dirección" }}
            style={styles.searchText}
            onChange={getLocation}
          />
        </Paper>
        <img
          src="/icons/google-icon.png"
          alt=""
          style={{ width: "100px", marginTop: "5px" }}
        />
        <Divider sx={{ mt: 2 }} />
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          style={{ maxHeight: "300px", height:"300px", overflow: "auto" }}
        >
          {googleAddress?.length > 0 &&
            googleAddress.map((item: any) => {
              return (
                <>
                  <ListItem alignItems="flex-start" onClick={() => setAddress(item)}>
                    <ListItemText
                      style={{cursor:"pointer"}}
                      className="searchTitle"
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            style={styles.searchSubTitle}
                          >
                            {item.formatted_address}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </>
              );
            })}
        </List>

        <List sx={{ width: "100%", bgcolor: "background.paper", mb:20, cursor:"pointer" }} onClick={goToMap}>
          <ListItem alignItems="flex-start">
            <ListItemText
              className="searchTitle"
              primary="¿No encuentras la dirección?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    style={{...styles.searchSubTitle, paddingTop:"20px"}}
                  >
                    Fija un punto en el mapa para la entrega
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemIcon style={{color:"#000000"}}>
              <ArrowForwardIosIcon />
            </ListItemIcon>
          </ListItem>
        </List>

        {/* <ButtonComponent style={{}} onClick={() => setStep(2)}>
            <Typography
                style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
            >
                CAMBIAR
            </Typography>
            </ButtonComponent> */}
      </div>
    </Box>
  );
};
export default AddressSearch;

const styles = {
  searchText: {
    fontFamily: "weblysleekuil",
    fontWeight: 600,
    color: "#000000",
  },
  searchSubTitle: {
    fontFamily: "weblysleekuil",
    fontWeight: 300,
    color: "#000000",
  },
};
