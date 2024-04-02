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

const ProductDetail = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [quantity , setQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] =  useState<boolean>(false);

  const product = useSelector(selectProductDetails);
  const user = useSelector(selectAllUser);
  const categories = useSelector(selectArrayCategories);
  const { addToCart } = useCartHook();

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleErrorClose = () => {
    setShowError(false);
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
    };
    if (product) {
      addToCart(newProduct);
    }
    if(!product?.isExchange){
      
      setIsSuccess(false)
      setIsSuccess(true)
      console.log(isSuccess)
    }
    setShowAlert(false);
  };

  const handleSave = () => {
    if (product && product?.points <= user.points) {
      setShowAlert(true);
    } else {
      setShowError(true);
    }
  };

  const onMinus = () => {
    if(quantity !== 1){
      setQuantity(quantity - 1)
    }
  }

  const onPlus = () => {
    setQuantity(quantity + 1)

  }

  useEffect(() => {
    const categoryName = categories.find(
      (item: { id: any }) => item.id === product?.product.category_id
    );
    setCategoryName(categoryName.name);
    console.log(product);
  }, [product]);

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
        <img src={product?.product.image} alt="" width={350} height={350} />
      </Grid>
      <Grid item xs={8}>
        {categoryName && (
          <Typography style={style.category}>{categoryName}</Typography>
        )}
        <Typography style={style.name}>{product?.product.name}</Typography>

        {/* FEATURE SECTIONS */}
        <div style={style.containerFeatures}>
        {product?.features?.map((item: any) => {
            return (
                <Typography style={style.features}>{item}</Typography>
            );
          })}
        </div>

        <Typography style={style.description} sx={{ mt: 2 }}>
          {product?.product.description}
        </Typography>
        {product?.isExchange ? (
          <Typography style={style.points}>{product?.points} J</Typography>
        ) : (
          <Typography style={style.points}>
            {CurrencyFormat(product?.price)}
          </Typography>
        )}
        {product?.isExchange ? (
          <>
            <Typography style={style.quantity} sx={{ mt: 2, mb: 4 }}>
              Disponibles: {product?.quantity}
            </Typography>
            <Grid className="columnContainer" container spacing={0}>
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
        ): 
        <>
        <Grid container spacing={0} style={{marginTop: '20px'}}>
          <Grid item xs={4} style={{ alignItems: 'center', display: 'flex'}}>
          <div  className="iconContainer" onClick={onMinus}  style={ quantity === 1 ?  minusDisabled : {width:"40px", height:"40px"} }>
              <span className="icon" id="icono-menos" style={{fontSize: '50px', margin: '-13px 0px 0px -21px'}}>-</span>
          </div>
          <span className="normalText" style={{margin: '0px', fontSize:'18px', padding: '0px 20px'}}>{quantity}</span> 
          <div  className="iconContainer" onClick={onPlus} style={{width:"40px", height:"40px"}}>
              <span className="icon" id="icono-mas" style={{fontSize: '50px', margin: '-12px 0px 0px -35px'}}>+</span>
          </div>
          </Grid>
          <Grid item xs={8}>
            <ButtonComponent style={style.addButton} onClick={setCart}>
              AGREGAR
            </ButtonComponent>
          </Grid>
        </Grid>
      </>}
      </Grid>
      <ModalAlertComponent
        handleClose={handleAlertClose}
        handleSave={setCart}
        open={showAlert}
        isCancellButton
        data={{
          title: `${product?.product.name}`,
          content: `¿Quieres cajearlo por ${product?.points} J?`,
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

      {isSuccess &&  <SuccessAlert setOpen={setIsSuccess}/>}
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
    fontSize: "22px",
    fontWeight: "300",
  },
  containerFeatures:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  features: {
    ...weblysleekFontStyle,
    fontSize: "22px",
    fontWeight: "300",
    background: '#F5F5F5',
    borderRadius: '15px',
    padding: '10px'
  },
  points: {
    ...hudsonNYFontStyle,
    fontSize: "45px",
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
  addButton:{
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
  }
};

const minusDisabled ={
  background:"#fdbd0063",
  width:"40px", 
  height:"40px"
}