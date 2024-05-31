const useHelperHook = () => {
  
    const calculateTotal = (products:any) => {
        let newtotal = 0;
        products.forEach((item:any) => {
            if (item.price) {
                newtotal += item.quantity * item.price;
            }
        });
        return newtotal;
    };
  
  
    return {
      calculateTotal
    };
  };
  
  export default useHelperHook;