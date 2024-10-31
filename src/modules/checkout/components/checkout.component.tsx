import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CartComponent from "../../cart/components/cart.component";
import { Controller, useForm } from "react-hook-form";
import {
  weblysleekBoltFontStyle,
  weblysleekFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import { useEffect, useRef, useState } from "react";
import ButtonComponent from "../../shared/button/button.component";
import useAddressHook, {
  AddressSelected,
} from "../../shared/hooks/addressHook/useAddressHook";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { useAppDispatch } from "../../../store/store";
import { getLocationsThunk } from "../../../store/modules/address/actions/address.actions";
import { postDisccount } from "../../../service/modules/address/address";
import { useSelector } from "react-redux";
import {
  selectAllCart,
  selectCartProducts,
} from "../../../store/modules/cart/selectors/cart.selector";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import usePaymentHook from "../../shared/hooks/paymentHook/usePaymentHook";
import { postOrderThunk, updateOrderThunk } from "../../../store/modules/cart/actions/cart.actions";
import { requestOrder, requestUpdateOrder } from "../../../service/modules/orders/order";
import NumberFormat from "../../shared/hooks/numberFormater/NumberFormat";
import { cartActions } from "../../../store/modules/cart";
import { paletteColors } from "../../../paletteColors/paletteColors";
import useCartHook from "../../shared/hooks/cartHook/useCartHook";
import { addressActions } from "../../../store/modules/address";
import { paymentMethodsActions } from "../../../store/modules/paymentMethods";
import ArrowRightIcon from "./ArrowrightIcon";
import CustomModal from "../../shared/modal/customModal";
import WarningAlertScreen from "../../cart/alert.screens/warningAlertScreen";
import useHelperHook from "../../shared/hooks/helper/useHelper";
import Loader from "../../shared/Loader/components/Loader";
import { AnyARecord } from "dns";

type disccount = {
  title?: string;
  content?: string;
  img?: string;
};
type PaymentMethod = {
  value: string;
  label: string;
};

const CheckoutComponent = () => {
  const cartStore = useSelector(selectAllCart);
  const products = useSelector(selectCartProducts);

  const [locationList, setLocationList] = useState<any>([]);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [alertDisccount, setAlertDisccount] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [showWarningAlert, setShoWarningAlert] = useState<boolean>(false);
  const [showWarningProduct, setShowWarningProduct] = useState<boolean>(false);
  const [disccountResult, setDisccountResult] = useState<disccount>();
  const [successData, setSuccessData] = useState<any>();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [warningText, setWarningText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [warningProductError, setWarningProductError] = useState<any>({title:'',img:''})

  const { getAddress, updateAddressItem } = useAddressHook();
  const { getPayment } = usePaymentHook();
  const { updatePhone, updateTotal, updateOrder } = useCartHook();
  
  const { calculateTotal } = useHelperHook();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const debounceRef = useRef<any>(null);

  const {
    register,
    formState: { errors, isValid },
    reset,
    control,
    getValues,
    setValue,
    watch,
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
        const total = parseInt(data.value);
        setSuccessData({
          time: data.time,
          value: NumberFormat(total),
        });
        setSuccessAlert(true);
        dispatch(cartActions.clearState());
        dispatch(addressActions.clearAddressSelected())
        dispatch(paymentMethodsActions.clearPaymentSelected())
      }
    }
  };

  const handlePhoneChange = (event:any, onChange:any) => {
    const phone = event.target.value;
    onChange(phone); 
    updatePhone(phone);
  };

  const handleWarningClose = () => {
    setShoWarningAlert(false);
  };

  const handleWarningProductClose = () => {
    setShowWarningProduct(false);
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
    setValue("address", addressFind.address, { shouldValidate: true });
    setValue("detail", addressFind.detail, { shouldValidate: true });
  };

  const goToAddress = () => {
    navigate("/address");
  };

  const goToPaymentMethods = () => {
    const {  address, paymentSelect } = getValues();
    if(!address){
      alert("Se debe seleccionar una Dirección Valida")
      return
    }
    !paymentSelect ? postOrder() : navigate("/paymentMethods");
  };

  const goToHome = () => {
    navigate("/home");
  };

  const getTotal = async () => {
    const newtotal = await calculateTotal(products);
    if (newtotal[1]) {
      setTotal(newtotal[0] + newtotal[1]);
      updateTotal(newtotal[0] + newtotal[1]);
    } else {
      setTotal(newtotal[0]);
      updateTotal(newtotal[0]);
    } 
  };

  const postOrder = async () => {
    setLoading(true)
    getTotal()
    if (products.length > 0 && cartStore.total > 0) {
      const resultado = products.reduce((acumulador: any, producto: any) => {
        if (acumulador !== "") {
          acumulador += ",";
        }
        acumulador += `${producto.id}:${producto.quantity}`;
        return acumulador;
      }, "");
      const request: requestOrder = {
        products: resultado,
        amount: total,
        instructions: "test",
        source: "Web",
      };
      const Payment = await dispatch(
        postOrderThunk({ reqData: request })
      ).unwrap();
      if (Payment.success && Payment.response.success) {
        setLoading(false)
        updateOrder(Payment.response.data.id);
        navigate("/paymentMethods");
      }else if(Payment.success && !Payment.response.success){
        setLoading(false)
        if(Payment.response.statusCode === 9){
          const cadena = Payment.response.message.split(' ')[2]
          const numero = parseInt(cadena);

            const product = products.find((element:{id:number}) => {
              if(element.id === numero){
                return element
              }else{
                return null
              }
            })
            console.log(product);
            setWarningProductError({title: product?.name, img: product?.image})
            console.log(warningProductError);
            setShowWarningProduct(true)
        }
       
      }else{
        setLoading(false)
        setWarningText("Ha ocurrido un problema y no pudimos procesar tu solicitud. Intenta de nuevo más tarde o contáctanos.")
        setShoWarningAlert(true)
      }
    }else{
      setLoading(false)
    }
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
            "El codigo que ingresaste no es válido. Revísalo e intenta nuevamente.",
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
      setValue("address", address.addressInput, {
        shouldValidate: true,
        shouldTouch: true,
      });
      setValue("detail", address.detail, {
        shouldValidate: true,
        shouldTouch: true,
      });
    }

    const payment = getPayment();
    if (payment && payment.type) {
      const newPayment = [{ value: payment.type, label: payment.type }];
      setPaymentMethods(newPayment);
      console.log(paymentMethods, payment, newPayment);

      setValue("paymentSelect", payment.type, { shouldValidate: true });
    }

    if (cartStore.phone) {
      setValue("phone", cartStore.phone, {
        shouldValidate: true,
        shouldTouch: true,
      });
    }
  }, []);

  const onchangeDetail = (event:any) => {
    setValue("detail", event.target.value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  
    debounceRef.current = setTimeout(() => {
      const { detail } = getValues();
      const newAddress: any = {
        detail
      };
      updateAddressItem(newAddress);
    }, 500);
  }

  const styles = stylesAddPayment(errors, isValid);
  if (loading) {
        return <Loader screenLoader={true}/>;
  }
  
  return (
    <Box className="">
      <Grid container spacing={0} style={{ textAlign: "center" }}>
        <Grid item xs={8} sx={{}} style={{ padding: "0 10%" }}>
          <img
            src="images/whiteLogo.png"
            alt="whitelogo"
            width={200}
            style={{ marginTop: "30px" }}
            onClick={goToHome}
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
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onClick={goToAddress}
                  error={!!errors.address}
                  helperText={
                    errors.address ? errors.address.message?.toString() : ""
                  }
                  style={{ minWidth: "100%" }}
                  sx={{ mt: 2 }}
                  id="standard-basic"
                  label="Ej: Cra 26 # 33-17"
                  variant="standard"
                />
              )}
            />
            <Controller
              name="detail"
              control={control}
              defaultValue=""
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field: { value } }) => (
                <TextField
                  value={value}
                  onChange={(e) => onchangeDetail(e)}
                  error={!!errors.detail}
                  helperText={
                    errors.detail ? errors.detail.message?.toString() : ""
                  }
                  style={{ minWidth: "100%" }}
                  sx={{ mt: 2 }}
                  id="standard-basic"
                  label="Torre / Apto / Casa / Detalles"
                  variant="standard"
                />
              )}
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
            {/* <TextField
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
            /> */}
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Este campo es obligatorio",
                minLength: {
                  value: 13,
                  message: "El número de celular debe tener 10 caracteres",
                },
                maxLength: {
                  value: 13,
                  message:
                    "El número de celular no debe exceder los 10 caracteres",
                },
                validate: (value) =>
                  value.replace(/\s/g, "").length === 10 ||
                  "El número de celular debe tener 10 dígitos",
              }}
              render={({ field: { onChange, value } }) => (
                <InputMask
                  style={styles.cardInput}
                  mask="999 999 99 99"
                  maskChar=" "
                  placeholder="Número de celular"
                  className="card-input-payment"
                  value={value || ""}
                  onChange={(e) => handlePhoneChange(e, onChange)}
                  type="text"
                />
              )}
            />
            <Typography
              color={"#d32f2f"}
              fontSize={"0.75rem"}
              textAlign={"left"}
            >
              {errors.phone ? errors.phone.message?.toString() : ""}
            </Typography>
          </Grid>
          {/* discount section */}
          <Grid item xs={12} sx={{}}>
            <Typography
              style={{
                ...style.form.subtitle,
                textAlign: "center",
                fontSize: "20px",
                marginBottom:"25px",
                marginTop:"25px",
              }}
              sx={{ mt: 2 }}
            >
              ¿Tienes un código de descuento?
            </Typography>
            <Grid container spacing={0}>
              <Grid item xs={8} sx={{}}>
                <TextField
                  sx={{ minWidth: "100%" }}
                  id="standard-basic"
                  label="Ej: DESCTRESJOTAS"
                  variant="standard"
                  {...register("disccount", {})}
                />
              </Grid>
              <Grid item xs={4} sx={{ mt: 0 }}>
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
          {/* payment method */}
          {/* <Grid item xs={12} sx={{}}>
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
            <FormControl
              sx={{ mt: 2, minWidth: "100%" }}
              error={!!errors.paymentSelect}
            >
              <InputLabel
                style={{ ...style.form.label, marginLeft: "-15px" }}
                id="labelPayment"
              >
                Selecciona un método de pago
              </InputLabel>
              <Controller
                name="paymentSelect"
                control={control}
                defaultValue=""
                rules={{ required: "Este campo es obligatorio" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%", textAlign: "left" }}
                    labelId="labelPayment"
                    id="labelPayment"
                    variant="standard"
                    placeholder="Seleccionar Metodo de pago"
                    onClick={goToPaymentMethods}
                    readOnly
                    IconComponent={ArrowRightIcon}
                  >
                    {paymentMethods.map((method) => (
                      <MenuItem key={method.value} value={method.value}>
                        {method.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid> */}
        </Grid>
        <Grid
          item
          xs={4}
          sx={{}}
          style={{ background: "#F5F5F5", position: "relative" }}
        >
          <CartComponent
            isCheckout
            onClick={postOrder}
            isFormValid={isValid}
            products={products}
          />
        </Grid>
      </Grid>
        {/* Modal with dont Product*/}
        <CustomModal
          modalStyle="cartModal"
          modalContentStyle="cartModalContent"
          open={showWarningProduct}
          onClose={handleWarningProductClose}
        >
          <WarningAlertScreen
            title={warningProductError.title}
            img={warningProductError.img}
            Text="Lo sentimos. Se nos agotó este producto. Cámbialo por otro para generar la orden."
            onClose={handleWarningProductClose}
          />
        </CustomModal>
       {/* Modal Warning*/}
       <CustomModal
        modalStyle="cartModal"
        modalContentStyle="cartModalContent"
        open={showWarningAlert}
        onClose={handleWarningClose}
      >
        <WarningAlertScreen
          title="INFORMACIÓN"
          Text={warningText}
          onClose={handleWarningClose}
        />
      </CustomModal>
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
      background:"white",
      padding: "10px 0 15px",
      fontFamily: "HudsonNYSerif",
      width: "100%",
      borderRadius: "5px",
      fontSize: "20px",
      margin: "0 0 2px 5px",
      border: "2px solid #000001",
      cursor: "pointer",
    },
  },
};

const stylesAddPayment = (errors: any, isValid: boolean) => ({
  cardInput: {
    padding: "4px 0 5px",
    height: "48px",
    marginTop: "24px",
    width: "100%",
    fontFamily: "weblysleekuil",
    fontSize: "16px",
    fontWeight: 300,
    color: paletteColors.black,
    border: "none",
    borderBottom: `1px solid ${errors.cardnumber ? "red" : "black"}`,
  },
});
