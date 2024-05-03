import { useLocation } from "react-router-dom";
import FooterScreen from "../shared/footer/FooterScreen";
import HeaderScreen from "../shared/header/HeaderScreen";
import HighlightedCampaignContainer from "./components/HighlightedCampaignContainer";
import { useCallback, useEffect } from "react";
import { getCampaignsThunk } from "../../store/modules/campaigns/actions/campaigns.actions";
import { useAppDispatch } from "../../store/store";

const HighlightedCampaignScreen = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const highlightedCampaign = location?.state?.highlightedCampaign;

    const getCampaigns = useCallback(async () => {
        if (highlightedCampaign.type === 1) await dispatch(getCampaignsThunk(`/${highlightedCampaign.id}`)).unwrap();
    }, []);

    useEffect(() => {
        getCampaigns();
    }, []);

    return (
        <>
            <HeaderScreen/>
            <HighlightedCampaignContainer/>
            <FooterScreen/>
        </>
    );

}

export default HighlightedCampaignScreen;