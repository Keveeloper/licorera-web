import TabPanel from "@mui/lab/TabPanel";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import TabComponent from "../shared/tabComponent/TabComponent";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperComponent from "../shared/swiperComponent/SwiperComponent";
import { memo, useCallback, useContext, useEffect, useState } from "react";
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
import { selectNewProductsLoading } from "../../store/modules/newProducts/selectors/newProducts.selector";
import { Box } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { searchContext } from "../../context/searchContext";

const HomeScreen = () => {

  const { searching } = useContext(searchContext);
  const dispatch = useAppDispatch();
  const promotionsDataredux = useSelector(selectAllPromotion);
  
  const loadingStatus = useSelector(selectLoading);
  const loadingNewProducts = useSelector(selectNewProductsLoading);

  const [value, setValue] = useState("1");
  const [disabled, setDisabled] = useState<boolean>(false);


  const getAsynPromotion = useCallback(async () => {
    dispatch(getPromotionsThunk()).unwrap();
  }, []);

  const getCategories = useCallback( async () => {
    await dispatch(Categories()).unwrap();
  }, []);
  
  const getSponsors = useCallback(async () => {
    await dispatch(getSponsorsThunk()).unwrap();
  }, []);
  
  const getCampaigns = useCallback(async () => {
    await dispatch(getCampaignsThunk()).unwrap();      
  }, []);
  
  const getNewProducts = useCallback(async () => {
    await dispatch(getNewProductsThunk()).unwrap();      
  }, []);

  // const handleDisabled = (tab: string) => {
  //   console.log('Fuera del timeOut');
  // }
  
  useEffect(() => {
    getCategories();
    getSponsors();
  }, []);

  useEffect(() => {

    switch (value) {
      case "1":
        getAsynPromotion();
        break;
      case "2":
        getCampaigns();
        break;
      case "3":
        getNewProducts();
        break;
      default:
        break;
    }

  }, [value]);

  // useEffect(() => {
  //   const arrayImages: string[] = [];
  //   if (promotionsDataredux.length > 0) {
  //     promotionsDataredux?.forEach((element) => {
  //       arrayImages.push(element.image);
  //     });
  //     // setImages(arrayImages);
  //   }
  // }, [promotionsDataredux]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
    setDisabled(true);
    
  };

  return (
    <>
      <HeaderScreen/>
      <Box sx={styles.mainContainer}>
        {searching && (<Box sx={styles.mainContainer.backdrop}/>)}
        <TabComponent
          tabsArray={["PROMOCIONES", "DESTACADOS", "PRODUCTOS NUEVOS"]}
          // tabsArray={}
          value={value}
          setValue={setValue}
          handleChange={handleChange}
          disabled={disabled}
        >
          <TabPanel sx={{padding: '0', height: '600px' }} value="1" className="columnContainer">
            <SwiperComponent
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              loadingStatus={loadingStatus}
              bannerType="Promotions"
            />
          </TabPanel>
          <TabPanel sx={{padding: '0', height: '600px' }} value="2" className="columnContainer" >
            <SwiperComponent
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              loadingStatus={loadingStatus}
              bannerType="Campaigns"
            />
          </TabPanel>
          <TabPanel sx={{padding: '0', height: '600px' }} value="3" className="columnContainer" >
            <SwiperNewProducts
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              loadingStatus={loadingNewProducts}
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
      </Box>
    </>
  );
};

const styles = {
  mainContainer: {
    position: 'relative',
    // width: '100%',
    backdrop: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 2,
    }
  }
}
export default memo(HomeScreen);
