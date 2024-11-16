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
import { searchContext } from "../../context/searchContext";
import Loader from "../shared/Loader/components/Loader";
import { getInfoThunk } from "../../store/modules/users/actions/users.actions";
import { selectAllInfo } from "../../store/modules/users/selectors/users.selector";
import ModalAlertComponent from "../shared/modal/modalAlert.component";
import useHomeHook from "./hooks/useHomeHook";

const HomeScreen = () => {

  const { searching } = useContext(searchContext);
  const dispatch = useAppDispatch();
  const { isActiveApi } = useHomeHook()
  
  const loadingStatus = useSelector(selectLoading);
  const loadingNewProducts = useSelector(selectNewProductsLoading);
  const loadInfo = useSelector(selectAllInfo);

  const [value, setValue] = useState("1");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [tabs, setTabs] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    await dispatch(getCampaignsThunk('')).unwrap();      
  }, []);
  
  const getNewProducts = useCallback(async () => {
    await dispatch(getNewProductsThunk()).unwrap();      
  }, []);

  const getInfo = useCallback(async () => {
    await dispatch(getInfoThunk()).unwrap();     
  }, []);

  const isActive = () => {
    isActiveApi()
    .then((res)=>{
      if(res.success && !res.data.active){
        let newArray=[];
        newArray.push(res.data.open.split(" ")[1])
        newArray.push(res.data.close.split(" ")[1])
        setSchedule(newArray)
        setCloseAlert(true)
      }
    })
  }

  const alertClose = () => {
    setCloseAlert(false)
  }
  
  useEffect(() => {
    isActive()
    getCategories();
    getSponsors();
    if(!loadInfo || !loadInfo.success){
      getInfo();
    }
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
    setDisabled(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      let responsePromotions: any;
      let responseCampaigns: any;
      let responseNewProducts: any;
      try {
        await dispatch(getPromotionsThunk()).unwrap().then((response: any) => {
          responsePromotions = response.response.data;
          if (responsePromotions.length > 0) setTabs(oldTabs => [...oldTabs, 'PROMOCIONES']);
        });
        await dispatch(getCampaignsThunk('')).unwrap().then((response: any) => {
          responseCampaigns = response.response.data;
          if (responseCampaigns.length > 0) setTabs(oldTabs => [...oldTabs, 'DESTACADOS']);
        });
        await dispatch(getNewProductsThunk()).unwrap().then((response: any) => {
          responseNewProducts = response.response.data;
          if (responseNewProducts.length > 0) setTabs(oldTabs => [...oldTabs, 'PRODUCTOS NUEVOS']);
        })
        await setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader screenLoader={true}/>;
  }

  return (
    <>
      <HeaderScreen/>
      <Box sx={styles.mainContainer}>
        {searching && (<Box sx={styles.mainContainer.backdrop}/>)}
        <TabComponent
          tabsArray={tabs}
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
        {/* <Experience /> */}
        <SuggestedProducts/>
        <Sponsors/>
        <FooterScreen />
       
      </Box>
      <ModalAlertComponent
        handleClose={alertClose}
        handleSave={alertClose}
        open={closeAlert}
        withSchedule
        schedule={schedule}
        data={{
          title: "INFORMACIÓN",
          content: `No podemos despachar tu pedido. Nuestros horarios de atención`,
          img: "/icons/alert.png",
        }}
      />
    </>
  );
};

const styles = {
  mainContainer: {
    position: 'relative',
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
