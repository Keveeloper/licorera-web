import TabPanel from "@mui/lab/TabPanel";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import TabComponent from "../shared/tabComponent/TabComponent";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperComponent from "../shared/swiperComponent/SwiperComponent";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { ResponsePromotions } from "../../service/modules/promotions/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";
import { ApiResponse } from "../../service/tools/types";
import { userLogin } from "../../store/modules/users/actions/users.actions";
import { getPromotionsThunk } from "../../store/modules/promotions/actions/promotion.actions";
import {
  selectAllPromotion,
  selectFirstImage,
} from "../../store/modules/promotions";
import { Data, PromotionState } from "../../store/modules/promotions/types";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const promotionsDataredux = useSelector(selectAllPromotion);

  const [value, setValue] = useState("1");
  const [promotionsData, setPromotionsData] = useState<Data | undefined>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function getAsynPromotion() {
      const res = await dispatch(getPromotionsThunk()).unwrap();
      setPromotionsData(res.response);
    }
    getAsynPromotion();
  }, []);

  useEffect(() => {
    const arrayImages: string[] = [];
    if (promotionsDataredux.length > 0) {
      promotionsDataredux?.forEach((element) => {
        arrayImages.push(element.image);
      });
      setImages(arrayImages);
    }
  }, [promotionsDataredux]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <HeaderScreen />
      <TabComponent
        tabsArray={["PROMOCIONES", "DESTACADOS", "PRODUCTOS NUEVOS"]}
        // tabsArray={}
        value={value}
        setValue={setValue}
        handleChange={handleChange}
      >
        <TabPanel sx={{ height: "700px" }} value="1">
          <SwiperComponent
            modules={["Navigation", "Pagination"]}
            slidesPerView={1}
            // images={['slide_01.png', 'slide_02.png', 'slide_03.png']}
            images={images}
          />
        </TabPanel>
        <TabPanel sx={{ height: "700px" }} value="2">
          <SwiperComponent
            modules={["Navigation", "Pagination"]}
            slidesPerView={1}
            images={["slide_02.png", "slide_02.png", "slide_03.png"]}
          />
        </TabPanel>
        <TabPanel sx={{ height: "700px" }} value="3">
          <SwiperComponent
            modules={["Navigation", "Pagination"]}
            slidesPerView={1}
            images={["slide_03.png", "slide_02.png", "slide_03.png"]}
          />
        </TabPanel>
      </TabComponent>
      <FooterScreen />
    </>
  );
};

export default HomeScreen;
