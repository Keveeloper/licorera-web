import { displayFlex } from "../../../recursiveStyles/RecursiveStyles";

const PaymentFooter = () => {
    return(
        <>
            <figure style={styles.ePaycoContainer}>
                <img style={styles.ePaycoContainer.padlock} src="/icons/padlock-icon 1.png" alt="" />
                <p style={styles.ePaycoContainer.text}>Pago seguro con ePayco</p>
            </figure>
            <img width={300} src="/images/payments-image.png" alt="" />
        </>
    );
}

const styles = {
    ePaycoContainer: {
        marginBottom: '10px',
        ...displayFlex,
        padlock: {
            marginRight: '10px',
            width: '25px'
        },
        text: {
            fontFamily: 'weblysleekuil'
        }
    }
}

export default PaymentFooter;