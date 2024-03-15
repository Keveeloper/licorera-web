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
import { useSelector } from "react-redux";
import { getPromotionsThunk } from "../../store/modules/promotions/actions/promotion.actions";
import {
  selectAllPromotion,
} from "../../store/modules/promotions";
import { selectLoading } from "../../store/modules/promotions/selectors/promotion.selector";

// Material UI
import { Navigation, Pagination } from "swiper/modules";
import SwiperCategories from "../shared/swiperCategories/SwiperCategories";
import { Categories } from "../../store/modules/store/actions/store.actions";
import Experience from "../experiences/Experience";
import SuggestedProducts from "../productDetail/components/suggestedProducts";
import Sponsors from "../sponsors/Sponsors";
import { getSponsorsThunk } from "../../store/modules/sponsors/actions/sponsors.actions";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const promotionsDataredux = useSelector(selectAllPromotion);
  
  const loadingStatus = useSelector(selectLoading);

  const [value, setValue] = useState("1");
  // const [promotionsData, setPromotionsData] = useState<Data | undefined>();
  // const [categories, setCategories] = useState<any>([]);
  // const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function getAsynPromotion() {
      // const res = await dispatch(getPromotionsThunk()).unwrap();
      dispatch(getPromotionsThunk()).unwrap();
      // setPromotionsData(res.response);
    }
    getAsynPromotion();

    async function getCategories() {
      // const categories = await dispatch(Categories()).unwrap();
      await dispatch(Categories()).unwrap();
      // setCategories(categories.response.data);
    }
    getCategories();

    async function getSponsors() {
      // const categories = await dispatch(Categories()).unwrap();
      await dispatch(getSponsorsThunk()).unwrap();
      // setCategories(categories.response.data);
    }
    getSponsors();
  }, []);

  useEffect(() => {
    const arrayImages: string[] = [];
    if (promotionsDataredux.length > 0) {
      promotionsDataredux?.forEach((element) => {
        arrayImages.push(element.image);
      });
      // setImages(arrayImages);
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
        <TabPanel sx={{padding: '0', height: '600px' }} value="1">
          <SwiperComponent
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loadingStatus={loadingStatus}
          />
        </TabPanel>
        <TabPanel sx={{padding: '0', height: '600px' }} value="2">
          <SwiperComponent
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loadingStatus={loadingStatus}
          />
        </TabPanel>
        <TabPanel sx={{padding: '0', height: '600px' }} value="3">
          <SwiperComponent
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loadingStatus={loadingStatus}
          />
        </TabPanel>
      </TabComponent>
      <SwiperCategories
        modules={[Navigation]}
        slidesPerView={7}
        loadingStatus={loadingStatus}
      />
      <Experience />
      <SuggestedProducts/>
      <Sponsors/>
      <FooterScreen />
    </>
  );
};

export default HomeScreen;
