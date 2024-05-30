import { useLocation, useNavigate } from "react-router-dom";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import HighlightedCampaignContainer from "./components/HighlightedCampaignContainer";
import { useCallback, useEffect, useState } from "react";
import { getCampaignsThunk } from "../../store/modules/campaigns/actions/campaigns.actions";
import { useAppDispatch } from "../../store/store";
import { Products } from "../../store/modules/campaigns/types";
import Loader from "../shared/Loader/components/Loader";

const HighlightedCampaignScreen = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const highlightedCampaign = location?.state?.highlightedCampaign;
    console.log('highlightedCampaign: ', highlightedCampaign);
    // console.log('campaignProducts: ', campaignProducts);
    
    const [loading, setLoading] = useState<boolean>(true);
    const [ campaignProducts, setCampaignProducts ] = useState<Products[]>([{
        id: 0,
        campaigns_id: 0,
        store_product_id: 0,
        created_at: '',
        updated_at: '',
        deleted_at: '',
        store: null
    }]);
    
    

    const getCampaigns = useCallback(async () => {
        if (highlightedCampaign.type === 1) {
            await dispatch(getCampaignsThunk(`/${highlightedCampaign.id}`)).unwrap().then((response: any) => {
                setCampaignProducts(response.response.data.products);
            });
        }
    }, []);

    useEffect(() => {
        getCampaigns();

        const fetchData = async () => {
            let responseCampaigns: any;
            try {
              // Hacer las solicitudes a las APIs
              await Promise.all([
                dispatch(getCampaignsThunk(`/${highlightedCampaign.id}`)).unwrap().then((response: any) => {
                    // setCampaignProducts(response.response.data.products);
                    responseCampaigns = response.response.data.products;
                })
              ]);
              setCampaignProducts(responseCampaigns);
              setLoading(false);
            } catch (error) {
              console.error('Error al cargar datos:', error);
            }
          };
      
          fetchData();
    }, []);

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            <HeaderScreen/>
            <HighlightedCampaignContainer
                campaignProducts={campaignProducts}
                setCampaignProducts={setCampaignProducts}
            />
            <FooterScreen/>
        </>
    );

}

export default HighlightedCampaignScreen;