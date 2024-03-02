import TabPanel from "@mui/lab/TabPanel";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import TabComponent from "../shared/tabComponent/TabComponent";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperComponent from "../shared/swiperComponent/SwiperComponent";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { getPromotionsThunk } from "../../store/modules/promotions/actions/promotion.actions";
import { ResponsePromotions } from "../../service/modules/promotions/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";
import { ApiResponse } from "../../service/tools/types";

const HomeScreen = () => {

    const dispatch = useAppDispatch();
    const promotionsData = useSelector((state: RootState) => state.promotions.data); // Accede al estado de Redux

    const [value, setValue] = useState("1");
    const [promotionImages, setPromotionImages] = useState<ResponsePromotions | undefined>();
    const [images, setImages] = useState<string[]>([]);


    useEffect(() => {        
        dispatch(getPromotionsThunk());
      }, [dispatch]);
    
      useEffect(() => {
        console.log('Promotions.data.image: ', promotionImages?.data[0].image);
        
        if (promotionsData) {
          // Crea un objeto ResponsePromotions a partir del array de promociones
          const response: ResponsePromotions = {
            success: true,
            message: '',
            data: promotionsData
          };
          setPromotionImages(response);
          const arrayImages: string[] = [];
          if (promotionImages?.data) {
              for (let index = 0; index < promotionImages?.data?.length; index++) {
                arrayImages.push(promotionImages?.data[index].image);
              }
              setImages(arrayImages);
          }

        }
      }, [promotionsData]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <HeaderScreen/>
            <TabComponent
                tabsArray={['PROMOCIONES', 'DESTACADOS', 'PRODUCTOS NUEVOS']}
                // tabsArray={}
                value={value}
                setValue={setValue}
                handleChange={handleChange}
            >
                <TabPanel sx={{height: '700px'}} value="1">
                    <SwiperComponent 
                        modules={['Navigation', 'Pagination']}
                        slidesPerView={1}
                        // images={['slide_01.png', 'slide_02.png', 'slide_03.png']}
                        images={images}
                    />
                </TabPanel>
                <TabPanel sx={{height: '700px'}} value="2">
                    <SwiperComponent 
                        modules={['Navigation', 'Pagination']}
                        slidesPerView={1}
                        images={['slide_02.png', 'slide_02.png', 'slide_03.png']}
                    />
                </TabPanel>
                <TabPanel sx={{height: '700px'}} value="3">
                    <SwiperComponent 
                        modules={['Navigation', 'Pagination']}
                        slidesPerView={1}
                        images={['slide_03.png', 'slide_02.png', 'slide_03.png']}
                    />
                </TabPanel>
            </TabComponent>
            <FooterScreen/>
        </>
    );
}

export default HomeScreen;
