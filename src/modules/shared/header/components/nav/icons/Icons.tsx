import { Box } from "@mui/system";
import { displaySpaceAround } from "../../../../recursiveStyles/RecursiveStyles";

const Icons = () => {
    
    return(
        <Box sx={styles.iconsContainer}>
            <img src="/icons/account-icon.png" alt="" />
            <img src="/icons/web-shopping-cart-icon.png" alt="" />
            <img src="/icons/delivery-icon.png" alt="" />
        </Box>
    );

}

const styles = {
    iconsContainer: {
        width: '15%',
        height: '100%',
        ...displaySpaceAround,
        'img': {
            width: '17%'
        },
        'img:hover': {
            cursor: 'pointer'
        }
    }
}

export default Icons;