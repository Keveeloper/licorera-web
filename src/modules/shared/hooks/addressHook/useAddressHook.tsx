import { useDispatch, useSelector } from "react-redux";


import { Product } from "../../../exchangeProducts/types";
import { addressActions } from "../../../../store/modules/address";
import { selectAddressSelected } from "../../../../store/modules/address/selectors/address.selector";

export interface  AddressSelected{
  coords?:{
    latitude:number,
    longitude:number
  },
  addressInput: string
  detail?: string
}

const useAddressHook = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectAddressSelected);

  const getAddress = () => {
    return cart;
  };

  const addToAddress = (product: AddressSelected) => {
    const newCart = {...cart, product};
    dispatch(addressActions.setAddressSelected(product))
  };

  const updateAddressItem = (updatedProduct: AddressSelected) => {
    const newCart = {...cart, ...updatedProduct};
    dispatch(addressActions.setAddressSelected(newCart))
  };

  const removeAddressItem = (productId: number) => {
    dispatch(addressActions.setAddressSelected({}))
  };

  return {
    getAddress,
    addToAddress,
    updateAddressItem,
    removeAddressItem
  };
};

export default useAddressHook;

