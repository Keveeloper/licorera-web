import { Box, TextField, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";
import { hudsonNYFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { GOOGLE_MAP_API_KEY } from "../../../service/tools/constans";
import useAddress from "../hooks/useAddress";

interface props {
    setStep: () => void;
}
const initialCenter = {
    lat: 7.068565,
    lng: -73.1070059
};
const containerStyle = {
    width: '100%',
    height: '400px',
    marginTop:'20px'
};
const AddressMap: React.FC<props> = ({setStep}) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const mapRef = useRef(null);
    const [coordinates, setCoordinates] = useState(initialCenter);
    const [address, setAddress] = useState("")

    const { GetHookGoogleReverseApi }= useAddress()

    const getGoogleReverseApi = async (lat:number, lng:number) => {
        GetHookGoogleReverseApi(lat,lng)
        .then((res)=>{
            if(res.success){
                setAddress(res.data.results[0].formatted_address)
            }
        })
        .catch((err)=>console.log(err))
    }

    const onMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          getGoogleReverseApi(lat, lng);
          console.log(lat,lng)
        }
      };

    return(
          <Box className="addressContainer">
            <div style={{width:"450px", marginTop:"20px"}}>
                <div className="addressText mt-20">
                    <Typography>Ubica la dirección en el mapa</Typography>
                    <Typography style={{fontWeight:300, fontFamily: "weblysleekuil", color:"#9E9E9E"}}>Mueve el punto amarillo a tu posición</Typography>
                </div>

                <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={coordinates}
                    zoom={12}
                    onLoad={map => setMap(map)}
                    ref={mapRef}
                    >
                    <Marker
                        position={coordinates}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        icon='/icons/locationIcon.png'
                    />
                    </GoogleMap>
                </LoadScript>

                <div className="addressText mt-20">
                    <Typography>Completa tu dirección</Typography>
                    <Typography style={{fontWeight:300, fontFamily: "weblysleekuil", color:"#9E9E9E"}}>Agrega la nomenclaruta que haga falta</Typography>
                </div>
                <div>
                    <TextField
                        //   error={!!errors.location1}
                        //   helperText={
                        //     errors.location1 ? errors.location1.message?.toString() : ""
                        //   }
                        //   {...register("location1", {
                        //     required: "Este campo es obligatorio",
                        //     minLength: { value: 4, message: "Ingresar mas de 4 caracteres" },
                        //   })}
                        value={address}
                        style={{ minWidth: "100%" }}
                        sx={{ mt: 2 }}
                        id="standard-basic"
                        label="Ej: Cra 26 # 33-17"
                        variant="standard"
                    />
                </div>
                <ButtonComponent style={styles.button}>
                    <Typography
                        style={{ marginTop: "-5px", fontFamily: "HudsonNYSerif" }}
                    >
                        CONFIRMAR
                    </Typography>
                </ButtonComponent>
            </div>
          </Box>
    )
}
export default AddressMap;

const styles = {
    button: {
        ...hudsonNYFontStyle,
        fontSize: "22px",
        background: "#FFFFFF",
        width: "100%",
        height: "48px",
        borderRadius: "5px",
        padding: "0 0 0px 0",
        border: "1px solid #000000",
        marginTop:"20px",
        marginBottom:"200px"
      },
}