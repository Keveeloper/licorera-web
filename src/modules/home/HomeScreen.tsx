import { useState } from "react";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import TabComponent from "../shared/tabComponent/TabComponent";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Material ui imports
import WelcomeScreen from "../welcome/welcome.screen";
import { useAppSelector } from "../../store/store";
import { selectAllPersonalInfo, selectIsWelcome } from "../../store/modules/users/selectors/users.selector";


const HomeScreen = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const isWelcome = useAppSelector(selectIsWelcome);

  return (
    <>
      <HeaderScreen />
      <TabComponent
        handleChange={handleChange}
        value={value}
        setValue={setValue}
      />
      {!isWelcome && (<WelcomeScreen/>)}
      <FooterScreen />
    </>
  );
};

export default HomeScreen;
