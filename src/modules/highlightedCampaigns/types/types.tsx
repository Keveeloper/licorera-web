import { Products } from "../../../store/modules/campaigns/types";

export interface CampaignInterface {
    campaignProducts: Products[],
    setCampaignProducts: React.Dispatch<React.SetStateAction<Products[]>>
}