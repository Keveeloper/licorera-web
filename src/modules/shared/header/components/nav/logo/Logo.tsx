import { useNavigate } from "react-router-dom";
import { displayFlex } from "../../../../recursiveStyles/RecursiveStyles";

const Logo = () => {

    const navigation = useNavigate();
    const handleClick = () => {
        navigation('/');
    }

    return(
        <figure style={styles.logoContainer}>
            <img style={styles.logoContainer.image} src="/images/logo-3jjj.png" width={80} alt="" onClick={() => handleClick()}/>
        </figure>
    );

}

const styles = {

    logoContainer: {
        width: '10%',
        height: '100%',
        ...displayFlex,
        image: {
            cursor: 'pointer'
        }
    }
}

export default Logo;