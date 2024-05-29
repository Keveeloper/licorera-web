import { useState } from "react";
import FooterScreen from "../shared/footer/FooterScreen";
import {
  displayFlex,
  hudsonNYFontStyle,
  weblysleekFontStyle,
} from "../shared/recursiveStyles/RecursiveStyles";
import AddressSearch from "./components/address.search";
import AddressMap from "./components/address.map";
import AddressForm from "./components/address.form";
import './components/address.css'
import { Route, Routes } from "react-router-dom";

interface props {}
const AddressScreen: React.FC<props> = () => {
  const [step, setStep] = useState<number>(1);

 const ChangeStep = (nextStep:number) =>{
    setStep(nextStep)
 }

  return (
    <>
      <div style={styles.img} className="mt-20">
        <img src="/images/whiteLogo.png" alt="" width={250} />
      </div>
      <Routes>
        <Route path="/" element={<AddressSearch />} />
        <Route path="/map" element={<AddressMap setStep={() => ChangeStep(2)}/>} />
        <Route path="/form" element={<AddressForm />} />
      </Routes>
      <FooterScreen />
    </>
  );
};
export default AddressScreen;

const styles = {
  title: {
    ...hudsonNYFontStyle,
    fontSize: "20px",
    color: "#000000",
  },
  subtitle: {
    ...weblysleekFontStyle,
    fontSize: "16px",
    fontWeight: "300",
    color: "#000000",
  },
  img: {
    ...displayFlex,
  },
};
