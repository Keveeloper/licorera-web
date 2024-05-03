import { Box } from "@mui/material";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";

const HighlightedCampaignContainer = () => {

    return (
        <Box sx={styles.headerContainer}>
            <figure style={styles.headerContainer.imgContainer}>
                <img style={styles.headerContainer.imgContainer.campaignImage} src="https://images.applicorera3jjjs.com/ImageCache/1302/796/L2hvb/WUvbG/ljb3J/lcmEz/ampqc/y5jb2/0vaW1/hZ2Vz/Ly4uL/3N0b3/JhZ2U/vMjAx/OV8wM/l8yN1/8yMV8/wMF8x/OF9id/WNoYW/5hbnM/tMTIt/MTAwM/G1sLW/Rlc2N/1ZW50/by5wb/mc=.png" alt="" />
            </figure>
        </Box>
    );

}

const styles = {
    headerContainer: {
        margin: '50px 0',
        width: '100%',
        height: '600px',
        imgContainer: {
            margin: 0,
            width: '100%',
            height: '100%',
            ...displayFlex,
            campaignImage: {
                height: '100%',
                borderRadius: 20,
            }
        }
    }
}

export default HighlightedCampaignContainer;