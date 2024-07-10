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
import { Link, Route, Routes } from "react-router-dom";

interface props {}
  const AddressScreen: React.FC<props> = () => {

  return (
    <>
      <div style={styles.img} className="mt-20">
        <Link to={'/'}>
          <img src="/images/whiteLogo.png" alt="" width={200} />
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<AddressSearch />} />
        <Route path="/map" element={<AddressMap/>} />
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
