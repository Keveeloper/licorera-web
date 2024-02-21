import { displayFlex } from "../../../../recursiveStyles/RecursiveStyles";

const Logo = () => {

    return(
        <figure style={styles.logoContainer}>
            <img src="/images/logo-3jjj.png" width={80} alt="" />
        </figure>
    );

}

const styles = {

    logoContainer: {
        width: '10%',
        height: '100%',
        ...displayFlex
    }
}

export default Logo;