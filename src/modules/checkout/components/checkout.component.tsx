import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CartComponent from "../../cart/components/cart.component";
import { useForm } from "react-hook-form";
import {
  weblysleekBoltFontStyle,
  weblysleekFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import { useEffect, useState } from "react";
import ButtonComponent from "../../shared/button/button.component";
import useAddressHook from "../../shared/hooks/addressHook/useAddressHook";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { getLocationsThunk } from "../../../store/modules/address/actions/address.actions";
import { postDelivery } from "../../../service/modules/address/address";
import { DeliveryRequest } from "../../../service/modules/address/type";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../../store/modules/cart/selectors/cart.selector";
import useHelperHook from "../../shared/hooks/helper/useHelper";

const CheckoutComponent = () => {
  const products = useSelector(selectCartProducts);
  const [locationList, setLocationList] = useState<any>([]);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState<{latitude:number, longitude:number}>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [delivery, setDelivery] = useState<number>(0);
  
  const { getAddress } = useAddressHook();
  const { calculateTotal } = useHelperHook();
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    reset,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const handleSubmit = async () => {
    const { location1, password, year } = getValues();

    alert(isValid);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const addressSelected = event.target.value;
    const addressFind = locationList.find((item:any)=> item.id === addressSelected)
    setCoords({latitude: addressFind.latitude, longitude: addressFind.longitude})
    setValue("address", addressFind.name, { shouldValidate: true });
    setValue("detail", addressFind.detail, { shouldValidate: true });
  };

  const goToAddress = () => {
    navigate("/address");
  };

  const getLocations = async () => {
    await dispatch(getLocationsThunk())
      .unwrap()
      .then((res: any) => {
        if (res.success) {
          setLocationList(res.response.data);
        }
        console.log(res);
      });
  };

  const calculateDelivery = async () => {
    if(coords?.latitude && coords?.longitude){
      const request:DeliveryRequest={
        latitude:coords?.latitude,
        longitude:coords?.longitude,
        orderValue: calculateTotal(products)
      }
      try {
        const response = await postDelivery(request);
        if (response.success) {
          console.log(response)
          setDelivery(parseInt(response.response.data));
        } else {
          throw { error: 'Failed to fetch data', success: response.success };
        }
      } catch (error) {
        return error as Error;
      } finally {
  
      }
    }
  }

  useEffect(() => {
    if(coords && coords.latitude){
      calculateDelivery()
    }
  }, [coords]);

  useEffect(() => {
    getLocations();
    const address = getAddress();
    if(address && address.detail){
      setCoords(address.coords)
      setValue("address", address.addressInput, { shouldValidate: true });
      setValue("detail", address.detail, { shouldValidate: true });
    }
  }, []);

  return (
    <Box className="">
      <Grid container spacing={0} style={{ textAlign: "center" }}>
        <Grid item xs={8} sx={{}} style={{ padding: "0 10%" }}>
          <img
            src="images/whiteLogo.png"
            alt="whitelogo"
            width={200}
            style={{ marginTop: "30px" }}
          />
          <Typography style={style.form.title} sx={{ mt: 2 }}>
            Dirección de entrega
          </Typography>
          {/* location section */}
          <Grid item xs={12} sx={{}}>
            <Typography
              style={{ ...style.form.subtitle, textAlign: "left" }}
              sx={{ mt: 2 }}
            >
              Mis ubicaciones
            </Typography>
            <FormControl variant="standard" sx={{ mt: 2, minWidth: "100%" }}>
              <InputLabel style={{ ...style.form.label }} id="labelLocation">
                Selecciona una ubicación
              </InputLabel>
              <Select
                placeholder="Seleccionar"
                label="labelLocation"
                {...register("addresSelect", {
                  required: "Este campo es obligatorio",
                })}
                labelId="dlocation"
                style={{ width: "100%", textAlign: "left" }}
                onChange={handleChange}
              >
                {locationList.length > 0 &&
                  locationList.map((item: any) => {
                    return (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Typography
              style={{ ...style.form.subtitle, textAlign: "left" }}
              sx={{ mt: 2 }}
            >
              Ingresa una dirección
            </Typography>
            <TextField
              onClick={goToAddress}
              error={!!errors.address}
              helperText={
                errors.address ? errors.address.message?.toString() : ""
              }
              {...register("address", {
                required: "Este campo es obligatorio",
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 2 }}
              id="standard-basic"
              label="Ej: Cra 26 # 33-17"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              onClick={goToAddress}
              error={!!errors.detail}
              helperText={
                errors.detail ? errors.detail.message?.toString() : ""
              }
              {...register("detail", {
                required: "Este campo es obligatorio",
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 2 }}
              id="standard-basic"
              label="Torre / Apto / Casa / Detalles"
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {/* contact section */}
          <Grid item xs={12} sx={{}}>
            <Typography
              style={{
                ...style.form.subtitle,
                textAlign: "center",
                fontSize: "20px",
              }}
              sx={{ mt: 2 }}
            >
              Contacto
            </Typography>
            <TextField
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message?.toString() : ""}
              {...register("phone", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 10,
                  message: "Ingresar mas de 10 caracteres",
                },
                maxLength: {
                  value: 10,
                  message: "Ingresar mas de 10 caracteres",
                },
              })}
              style={{ minWidth: "100%" }}
              sx={{ mt: 2 }}
              id="standard-basic"
              label="315 310 33 52"
              variant="standard"
            />
          </Grid>
          {/* payment method */}
          <Grid item xs={12} sx={{}}>
            <Typography
              style={{
                ...style.form.subtitle,
                textAlign: "center",
                fontSize: "20px",
              }}
              sx={{ mt: 2 }}
            >
              Forma de pago
            </Typography>
            <FormControl variant="standard" sx={{ mt: 2, minWidth: "100%" }}>
              <InputLabel style={{ ...style.form.label }} id="labelLocation">
                Selecciona un método de pago
              </InputLabel>
              <Select
                placeholder="Seleccionar"
                label="labelLocation"
                // variant="standard"
                id="location"
                labelId="dlocation"
                style={{ width: "100%", textAlign: "left" }}
              >
                <MenuItem value={10}>PAGO PSE</MenuItem>
                <MenuItem value={20}>T. CREDITO</MenuItem>
                <MenuItem value={30}>EN CASA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* discount section */}
          <Grid item xs={12} sx={{}}>
            <Typography
              style={{ ...style.form.subtitle, textAlign: "left" }}
              sx={{ mt: 2 }}
            >
              Código de descuento
            </Typography>
            <Grid container spacing={0}>
              <Grid item xs={9} sx={{}}>
                <TextField
                  sx={{ minWidth: "100%" }}
                  id="standard-basic"
                  label="Ej: DESCTRESJOTAS"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} sx={{ mt: 0 }}>
                <ButtonComponent disabled={false} style={style.form.button}>
                  APLICAR
                </ButtonComponent>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{}} style={{ background: "#F5F5F5" }}>
          <CartComponent
            isCheckout
            onClick={handleSubmit}
            isFormValid={isValid}
            delivery={delivery}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutComponent;

const style = {
  form: {
    title: {
      ...weblysleekBoltFontStyle,
      fontSize: "21px",
    },
    subtitle: {
      ...weblysleekBoltFontStyle,
      fontWeight: 600,
    },
    label: {
      ...weblysleekFontStyle,
      color: "#BBBBBB",
    },
    button: {
      background: "#99791C",
      color: "white",
      padding: "10px 0 15px",
      fontFamily: "HudsonNYSerif",
      width: "100%",
      borderRadius: "5px",
      fontSize: "20px",
      margin: "0 0 2px 2px",
      border: "none",
    },
  },
};
