import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import CartComponent from "../../cart/components/cart.component";
import { useForm } from "react-hook-form";
import { weblysleekBoltFontStyle, weblysleekFontStyle } from "../../shared/recursiveStyles/RecursiveStyles";
import { useState } from "react";
import ButtonComponent from "../../shared/button/button.component";

const CheckoutComponent = () => {
    const [location, setLocation] = useState("");

  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  return (
    <Box className="">
      <Grid container spacing={0} style={{ textAlign: "center" }}>
        <Grid item xs={8} sx={{}} style={{padding: '0 10%'}}>
          <img
            src="images/whiteLogo.png"
            alt="whitelogo"
            width={200}
            style={{ marginTop: "30px" }}
          />
          <Typography style={style.form.title} sx={{mt:2}}>
            Dirección de entrega
          </Typography>
          {/* location section */}
          <Grid item xs={12} sx={{}}>
            <Typography style={{...style.form.subtitle, textAlign:"left"}} sx={{mt:2}}>
                Mis ubicaciones
            </Typography>
            <FormControl variant="standard" sx={{ mt: 2, minWidth: '100%' }}>
            <InputLabel style={{...style.form.label}} id="labelLocation">Selecciona una ubicación</InputLabel>
            <Select
                placeholder="Seleccionar"
                label="labelLocation"
                // variant="standard"
                id="location"
                value={location}
                labelId="dlocation"
                style={{ width: '100%'}}
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Typography style={{...style.form.subtitle, textAlign:"left"}} sx={{mt:2}}>
                Ingresa una dirección
            </Typography>
            <TextField style={{ minWidth: '100%' }} sx={{mt:2}} id="standard-basic" label="Ej: Cra 26 # 33-17" variant="standard" />
            <TextField style={{ minWidth: '100%' }} sx={{mt:2}} id="standard-basic" label="Torre / Apto / Casa / Detalles" variant="standard" />
          </Grid>
          {/* contact section */}
          <Grid item xs={12} sx={{}}>
            <Typography style={{...style.form.subtitle, textAlign:"center", fontSize:'20px'}} sx={{mt:2}}>
                Contacto
            </Typography>
            <TextField style={{ minWidth: '100%' }} sx={{mt:2}} id="standard-basic" label="315 310 33 52" variant="standard" />
          </Grid>
          {/* payment method */}
          <Grid item xs={12} sx={{}}>
            <Typography style={{...style.form.subtitle, textAlign:"center", fontSize:'20px'}} sx={{mt:2}}>
                Forma de pago
            </Typography>
            <FormControl variant="standard" sx={{ mt: 2, minWidth: '100%' }}>
            <InputLabel style={{...style.form.label}} id="labelLocation">Selecciona un método de pago</InputLabel>
            <Select
                placeholder="Seleccionar"
                label="labelLocation"
                // variant="standard"
                id="location"
                value={location}
                labelId="dlocation"
                style={{ width: '100%'}}
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
          </Grid>
            {/* discount section */}
            <Grid item xs={12} sx={{}}>
            <Typography style={{...style.form.subtitle, textAlign:"left"}} sx={{mt:2}}>
                Código de descuento
            </Typography>
            <Grid container spacing={0} >
                <Grid item xs={9} sx={{}}>
                    <TextField sx={{ minWidth: '100%' }} id="standard-basic" label="Ej: DESCTRESJOTAS" variant="standard" />
                </Grid>
                <Grid item xs={3} sx={{mt:0}}>
                    <ButtonComponent
                        disabled={false}
                        style={style.form.button}
                    >
                        APLICAR
                    </ButtonComponent>
                </Grid>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{}} style={{ background: "#F5F5F5" }}>
          <CartComponent isCheckout />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutComponent;

const style = {
    form: {
        title:{
            ...weblysleekBoltFontStyle,
            fontSize: "21px",
        },
        subtitle:{
            ...weblysleekBoltFontStyle,
            fontWeight:600,
        },
        label:{
            ...weblysleekFontStyle,
            color: "#BBBBBB"
        },
        button:{
            background: "#99791C",
            color: 'white',
            padding: '10px 0 15px',
            fontFamily: 'HudsonNYSerif',
            width: '100%',
            borderRadius: '5px',
            fontSize: '20px',
            margin:'0 0 2px 2px',
            border: 'none'
        }
    }
} 