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
import { getCampaignsThunk } from "../../store/modules/campaigns/actions/campaigns.actions";
import { getNewProductsThunk } from "../../store/modules/newProducts/actions/newProducts.actions";
import SwiperNewProducts from "../newProducts/SwiperNewProducts";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const promotionsDataredux = useSelector(selectAllPromotion);
  
  const loadingStatus = useSelector(selectLoading);

  const [value, setValue] = useState("1");

  useEffect(() => {
    async function getAsynPromotion() {
      dispatch(getPromotionsThunk()).unwrap();
    }
    getAsynPromotion();

    async function getCategories() {
      await dispatch(Categories()).unwrap();
    }
    getCategories();

    async function getSponsors() {
      await dispatch(getSponsorsThunk()).unwrap();
    }
    getSponsors();

    async function getCampaigns() {
      await dispatch(getCampaignsThunk()).unwrap();      
    }
    getCampaigns();
    
    async function getNewProducts() {
      await dispatch(getNewProductsThunk()).unwrap();      
    }
    getNewProducts();

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
            bannerType="Promotions"
          />
        </TabPanel>
        <TabPanel sx={{padding: '0', height: '600px' }} value="2">
          <SwiperComponent
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loadingStatus={loadingStatus}
            bannerType="Campaigns"
          />
        </TabPanel>
        <TabPanel sx={{padding: '0', height: '600px' }} value="3">
          <SwiperNewProducts
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loadingStatus={loadingStatus}
            bannerType="Promotions"
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
