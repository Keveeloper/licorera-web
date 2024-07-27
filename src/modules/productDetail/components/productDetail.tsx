import { Grid, Typography } from "@mui/material";
import ButtonComponent from "../../shared/button/button.component";
import { useSelector } from "react-redux";
import {
  selectAllCategories,
  selectArrayCategories,
  selectProductDetails,
} from "../../../store/modules/store/selectors/store.selector";
import {
  displayFlex,
  hudsonNYFontStyle,
  weblysleekFontStyle,
} from "../../shared/recursiveStyles/RecursiveStyles";
import useCartHook from "../../shared/hooks/cartHook/useCartHook";
import { Product } from "../../exchangeProducts/types";
import ModalAlertComponent from "../../shared/modal/modalAlert.component";
import { useEffect, useState } from "react";
import { selectAllUser } from "../../../store/modules/users/selectors/users.selector";
import { CurrencyFormat } from "../../../utils/helpers";
import SuccessAlert from "../../shared/modal/lottie.Alert";
import LoginScreen from "../../user/login.screen";
import { Margin } from "@mui/icons-material";
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { productExchange } from "../../exchangeProducts/types";
import { storeActions } from "../../../store/modules/store";
import { useAppDispatch } from "../../../store/store";
import useProductDetailHook from "../hooks/useProductDetail";

const ProductDetail = () => {
  const { id } = useParams();
  
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);

  const product = useSelector(selectProductDetails);
  const user = useSelector(selectAllUser);
  const categories = useSelector(selectArrayCategories);
  const { addToCart } = useCartHook();
  const dispatch = useAppDispatch();
  const { getStoreProduct } = useProductDetailHook();

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleErrorClose = () => {
    setShowError(false);
  };

  const handleClose = (isOpen: boolean) => {
    setOpenModal(isOpen);
  };

  const setCart = () => {
    const newProduct: Product = {
      quantity: quantity,
      points: product?.points,
      price: product?.price,
      name: product?.product.name || "",
      id: product?.product.id || 0,
      image: product?.product.image || "",
      description: product?.product.description || "",
      category_id: product?.product.category_id || 0,
      presentation: product?.product.presentation,
      discount: product?.product.discount
    };
    if (product) {
      addToCart(newProduct);
    }
    if (!product?.isExchange) {
      setIsSuccess(false);
      setIsSuccess(true);
      console.log(isSuccess);
    }
    setShowAlert(false);
  };

  const handleSave = () => {
    if(Object.keys(user).length > 0){
      if (product && product?.points <= user.points) {
        setShowAlert(true);
      } else {
        setShowError(true);
      }
    }else{
      setOpenModal(true)
    }
  };

  const onMinus = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    if(!id){
      const categoryName = categories.find(
        (item: { id: any }) => item.id === product?.product.category_id
      );
      setCategoryName(categoryName.name);
    }
    if(product?.product.discount && product?.price){
      console.log(product);
      const discountValue = product?.price - (product?.price * product?.product.discount / 100)  ;
      setDiscount(discountValue)
    }
  }, [product]);

  useEffect(() => {
    if(id){
      handleProduct(parseInt(id))
    }
  }, []);

  const handleProduct = (id:number) => {
    getStoreProduct(id)
    .then((res) => {
      console.log(res);
      const product = res.data;
      const mappedProduct: productExchange = {
        id: product.id,
        quantity: product.quantity,
        points: product.points|| 0,
        price: product.price,
        status: product.status,
        start_date: product.start_date || "",
        end_date: product?.end_date || "",
        isExchange: product.points > 0 ? true : false,
        product_id: product.id,
        features: product.features_string,
        product: {
          id: product.product.id,
          name: product.product.name,
          serial: product.product.serial,
          lot: product.product.lot,
          image: product.product.image,
          quantity: product.quantity,
          points: product.points || undefined,
          description: product.product.description,
          category_id: product.product.category_id,
          created_at: product.product.created_at,
          updated_at: product.product.updated_at,
          deleted_at: product.product.deleted_at,
          presentation: product.presentation,
          discount: product.discount,
          price: product.price,
        }
      }
      
      dispatch(storeActions.setProductDetail(mappedProduct))
    })
    .catch((err) => console.log(err));

  }

  return (
    <Grid
      className="columnContainer"
      container
      spacing={2}
      style={{
        padding: "30px 5%",
      }}
    >
      <Grid item xs={4} style={displayFlex}>
        <div style={{ position: "relative" }}>
          {product?.product?.discount ? (
            <div className="promotion">
              <p style={{ fontSize: "33px", marginTop: "3px" }}>
                {product.product.discount}
              </p>
              <p style={{ fontSize: "17px", marginTop: "5px" }}>% off</p>
              <img src="icons/discount-detail.png" alt="" width="100px" />
            </div>
          ): ''}
          <img src={product?.product.image} alt="" width={350} height={350} />
        </div>
      </Grid>
      <Grid item xs={8}>
        {categoryName && !product?.isExchange && (
          <Typography style={style.category}>{categoryName}</Typography>
        )}
        <Typography style={style.name}>{product?.product.name}</Typography>

        {/* FEATURE SECTIONS */}
        <div style={style.containerFeatures}>
          {product?.features?.map((item: any, index) => {
            return (
              <Typography style={style.features} key={index}>
                {item}
              </Typography>
            );
          })}
        </div>

        <Typography style={style.description} sx={{ mt: 3 }}>
          {product?.product.description}
        </Typography>
        {product?.isExchange ? (
          <Typography style={style.points} sx={{ mt: 3 }}>{product?.points} J</Typography>
        ) : (
          <>
            {product?.product.discount ? (
              <div  style={{ margin:"20px 0 40px 0"}}>
                <span style={{ ...style.points, ...style.beforePrice }}>
                  ANTES: <span style={{textDecoration: 'line-through'}}>{CurrencyFormat(product?.price)}</span>
                </span>
                <span style={{...style.points, marginLeft:"20px"}}>
                  AHORA: {CurrencyFormat(discount)}  
                </span>
              </div>
            ) : (
              <span style={style.points}>{CurrencyFormat(product?.price)}</span>
            )}
          </>
        )}
        {product?.isExchange ? (
          <>
            <Typography style={style.quantity} sx={{ mt: 3, mb: 4 }}>
              Disponibles: {product?.quantity}
            </Typography>
            <Grid className="" container spacing={0}>
              <Grid item xs={6}>
                <ButtonComponent style={style.shareButton}>
                  COMPARTIR
                </ButtonComponent>
              </Grid>
              <Grid item xs={6}>
                <ButtonComponent style={style.saveButton} onClick={handleSave}>
                  CANJEAR
                </ButtonComponent>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container spacing={0} style={{ marginTop: "20px" }}>
              <Grid
                item
                xs={4}
                style={{ alignItems: "center", display: "flex" }}
              >
                <FaMinusCircle style={quantity === 1 ? {color:'#fdbd0063', fontSize: '40px', cursor:'pointer'} : {color:'#fdbd00', fontSize: '40px', cursor:'pointer'}} onClick={onMinus}/>
                <span
                  className="normalText"
                  style={{
                    margin: "0px",
                    fontSize: "22px",
                    padding: "0px 20px",
                    fontFamily: 'weblysleekuisb'
                  }}
                >
                  {quantity}
                </span>
                <FaPlusCircle style={{color:'#fdbd00', fontSize: '40px', cursor:'pointer'}}  onClick={onPlus}/>
              </Grid>
              <Grid item xs={8}>
                <ButtonComponent style={style.addButton} onClick={setCart} >
                  AGREGAR
                </ButtonComponent>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <ModalAlertComponent
        handleClose={handleAlertClose}
        handleSave={setCart}
        open={showAlert}
        isCancellButton
        data={{
          title: `${product?.product.name}`,
          content: `¿Quieres canjearlo por ${product?.points} J?`,
          img: `${product?.product.image}`,
        }}
      />

      <ModalAlertComponent
        handleClose={handleErrorClose}
        handleSave={handleErrorClose}
        open={showError}
        data={{
          title: "INFORMACIÓN",
          content: `No tienes los puntos suficientes para canjear este producto. Sigue comprando y acumula.`,
          img: "icons/alert.png",
        }}
      />

      {isSuccess && <SuccessAlert setOpen={setIsSuccess} />}
      <LoginScreen handleClose={() => handleClose(false)} modalOpen={openModal}/>
    </Grid>
  );
};
export default ProductDetail;

const style = {
  category: {
    ...weblysleekFontStyle,
    fontSize: "20px",
    fontWeight: "300",
    fontStyle: "italic",
  },
  name: {
    ...hudsonNYFontStyle,
    fontSize: "45px",
  },
  description: {
    ...weblysleekFontStyle,
    fontSize: "17px",
    fontWeight: "300",
  },
  containerFeatures: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    gap: "20px"
  },
  features: {
    ...weblysleekFontStyle,
    fontSize: "22px",
    fontWeight: "300",
    background: "#F5F5F5",
    borderRadius: "15px",
    padding: "10px",
  },
  points: {
    ...hudsonNYFontStyle,
    fontSize: "45px"
  },
  beforePrice:{
    color: '#BBBBBB',
    fontSize: '35px',
    marginRight: '10px',
  },
  quantity: {
    ...weblysleekFontStyle,
    fontSize: "22px",
    fontWeight: "600",
  },
  shareButton: {
    ...hudsonNYFontStyle,
    fontSize: "22px",
    background: "#FFFFFF",
    width: "278px",
    height: "48px",
    borderRadius: "5px",
    padding: "0 0 5px 0",
    border: "1px solid #000000",
  },
  saveButton: {
    ...hudsonNYFontStyle,
    color: "#FFFFFF",
    fontSize: "22px",
    background: "#99791C",
    width: "278px",
    height: "48px",
    border: "none",
    borderRadius: "5px",
    padding: "0 0 5px 0",
    cursor: "pointer",
  },
  addButton: {
    ...hudsonNYFontStyle,
    color: "#FFFFFF",
    fontSize: "22px",
    background: "#99791C",
    width: "100%",
    height: "48px",
    border: "none",
    borderRadius: "5px",
    padding: "0 0 5px 0",
    cursor: "pointer",
  },
};

const minusDisabled = {
  background: "#fdbd0063",
  width: "40px",
  height: "40px",
};
