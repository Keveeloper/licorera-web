import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../../store/modules/cart/cart.slice";
import { selectCartProducts } from "../../../../store/modules/cart/selectors/cart.selector";
import { Product } from "../../../exchangeProducts/types";


const useCartHook = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartProducts);

  const getCart = () => {
    return cart;
  };

  const addToCart = (product: Product) => {
    const oldCart = cart.filter(item => item.id === product.id);
    if(oldCart.length > 0){
      updateCartItem(product)
      return
    }
    const newCart = [...cart, product];
    dispatch(cartActions.setCartProducts(newCart))
  };

  const updateCartItem = (updatedProduct: Product) => {
    const updatedCart = cart.map(item => {
      if (item.id === updatedProduct.id) {
        return { ...item, quantity: updatedProduct.quantity };
      }
      return item;
    });
    dispatch(cartActions.setCartProducts(updatedCart));
  };

  const updateOrder = (order: number) => {
    dispatch(cartActions.setCartOrder(order));
  };

  const updateTotal = (total: number) => {
    dispatch(cartActions.setCartTotal(total));
  };

  const updatePhone = (phone: string) => {
    dispatch(cartActions.setCartPhone(phone));
  };

  const removeCartItem = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    dispatch(cartActions.setCartProducts(updatedCart))
  };

  return {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    updateOrder,
    updateTotal,
    updatePhone
  };
};

export default useCartHook;

