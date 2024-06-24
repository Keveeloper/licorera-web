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
import useAddressHook, {
  AddressSelected,
} from "../../shared/hooks/addressHook/useAddressHook";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { getLocationsThunk } from "../../../store/modules/address/actions/address.actions";
import {
  postDisccount,
} from "../../../service/modules/address/address";
import { useSelector } from "react-redux";
import {
  selectAllCart,
} from "../../../store/modules/cart/selectors/cart.selector";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import usePaymentHook from "../../shared/hooks/paymentHook/usePaymentHook";
import { updateOrderThunk } from "../../../store/modules/cart/actions/cart.actions";
import { requestUpdateOrder } from "../../../service/modules/orders/order";
import NumberFormat from "../../shared/hooks/numberFormater/NumberFormat";
import { cartActions } from "../../../store/modules/cart";

type disccount = {
  title?: string;
  content?: string;
  img?: string;
};
const CheckoutComponent = () => {
  const cartStore = useSelector(selectAllCart);
  const [locationList, setLocationList] = useState<any>([]);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [alertDisccount, setAlertDisccount] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [disccountResult, setDisccountResult] = useState<disccount>();
  const [successData, setSuccessData] = useState<any>();

  const { getAddress, updateAddressItem } = useAddressHook();
  const { getPayment } = usePaymentHook();

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
    const { disccount, detail, address, phone } = getValues();

    const addressHook = getAddress();
    const payment = getPayment();

    const requestUpdate: requestUpdateOrder = {
      latitude: addressHook.coords.latitude,
      longitude: addressHook.coords.longitude,
      address: address,
      addressDetails: detail,
      paymentMethod: payment.type,
      pay_method: payment.type,
      amount: cartStore.total,
      phone: phone,
      discountCode: disccount,
      instructions: "",
      description: "",
      transactionId: "",
    };
    const updateOrder = await dispatch(
      updateOrderThunk({ id: cartStore.order, reqData: requestUpdate })
    ).unwrap();
    if (updateOrder.success) {
      console.log(updateOrder);
      if (updateOrder.response && updateOrder.response.success) {
        const data = updateOrder.response.data;
        const total = parseInt(data.delivery) + parseInt(data.value);
        setSuccessData({
          time: data.time,
          value: NumberFormat(total),
        });
        setSuccessAlert(true);
        dispatch(cartActions.clearState())
      }
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const addressSelected = event.target.value;
    const addressFind = locationList.find(
      (item: any) => item.id === addressSelected
    );
    setCoords({
      latitude: addressFind.latitude,
      longitude: addressFind.longitude,
    });
    console.log(addressFind);
    const newAddress: AddressSelected = {
      coords: {
        latitude: addressFind.latitude,
        longitude: addressFind.longitude,
      },
      addressInput: addressFind.address,
      detail: addressFind.detail,
    };
    updateAddressItem(newAddress);
    setValue("address", addressFind.name, { shouldValidate: true });
    setValue("detail", addressFind.detail, { shouldValidate: true });
  };

  const goToAddress = () => {
    navigate("/address");
  };

  const goToPaymentMethods = () => {
    navigate("/paymentMethods");
  };

  const goToHome = () => {
    navigate("/home");
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

  const getDisccount = async () => {
    const { disccount } = getValues();
    const request = {
      code: disccount,
    };
    const res = await postDisccount(request);
    if (res.success) {
      if (res?.response?.data?.length > 0) {
        setDisccountResult({
          title: "¡FELICITACIONES!",
          content: `Recibirás ${res.response.data[0].discount}% de descuento sobre tu pedido`,
          img: "/icons/success-icon.png",
        });
        setAlertDisccount(true);
      } else {
        setDisccountResult({
          title: "LO SENTIMOS",
          content:
            "El codigo que ingresaste no es valido. Revísalo e intenta nuevamente.",
          img: "/icons/alert.png",
        });
        setAlertDisccount(true);
      }
    } else {
      throw { error: "Failed to fetch data", success: res.success };
    }
  };

  const alertDiscountClose = () => {
    setAlertDisccount(false);
  };

  const successClose = () => {
    setSuccessAlert(false);
  };

  useEffect(() => {
    getLocations();
    const address = getAddress();
    if (address && address.detail) {
      setCoords(address.coords);
      setValue("address", address.addressInput, { shouldValidate: true });
      setValue("detail", address.detail, { shouldValidate: true });
    }
    const payment = getPayment();

    if (payment && payment.type) {
      setValue("paymentSelect", payment.type, { shouldValidate: true });
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
                {...register("addresSelect", {})}
                labelId="dlocation"
                style={{ width: "100%", textAlign: "left" }}
                onChange={handleChange}
              >
                {locationList?.length > 0 &&
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
              label="315 352 19 66"
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
              <TextField
                error={!!errors.paymentSelect}
                helperText={
                  errors.paymentSelect
                    ? errors.paymentSelect.message?.toString()
                    : ""
                }
                {...register("paymentSelect", {
                  required: "Este campo es obligatorio",
                })}
                style={{ minWidth: "100%" }}
                sx={{ mt: 2 }}
                id="labelLocation"
                label="Seleccionar Metodo de pago"
                variant="standard"
                onClick={goToPaymentMethods}
              />
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
                  {...register("disccount", {})}
                />
              </Grid>
              <Grid item xs={3} sx={{ mt: 0 }}>
                <ButtonComponent
                  disabled={false}
                  style={style.form.button}
                  onClick={getDisccount}
                >
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
          />
        </Grid>
      </Grid>
      {/* modal to disccount ok */}
      <ModalAlertComponent
        handleClose={alertDiscountClose}
        handleSave={alertDiscountClose}
        open={alertDisccount}
        data={{
          title: disccountResult?.title || "",
          content: disccountResult?.content || "",
          img: disccountResult?.img || "",
        }}
      />
      {/* modal already submit done */}
      <ModalAlertComponent
        handleClose={successClose}
        handleSave={goToHome}
        open={successAlert}
        data={{
          title: `PEDIDO RECIBIDO`,
          content: `Gracias por tu pedido lo recibiras en <b>${successData?.time} min aprox <br/><br/> Total: $${successData?.value}</b>`,
          img: `icons/SuccessCheckout.png`,
        }}
      />
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
      cursor: "pointer",
    },
  },
};
