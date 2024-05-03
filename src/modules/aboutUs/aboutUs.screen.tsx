import { Typography } from "@mui/material";
import { displayFlex, hudsonNYFontStyle, weblysleekFontStyle } from "../shared/recursiveStyles/RecursiveStyles";
import HeaderScreen from "../shared/header/HeaderScreen";
import FooterScreen from "../shared/footer/FooterScreen";

interface props {}
const AboutUs: React.FC<props> = () => {
  return (
    <>
      <HeaderScreen />
        <div className="columnContainer" style={{padding:"30px 0px"}}>
            <div style={styles.img}>
                <img src="/images/whiteLogo.png" alt="" />
            </div>
            <Typography style={styles.title}>Quienes Somos<br /><br /></Typography>
            <Typography style={styles.subtitle}>
                Licorera Tres Jotas, es un establecimiento comercial fundado en 1996 en
                la ciudad de Floridablanca en Santander. Somos una compañía que se
                encarga de la distribución de bebidas alcohólicas en Santander. Licorera
                Tres Jotas, es un establecimiento comercial fundado en 1996 en la ciudad
                de Floridablanca en Santander. Somos una compañía que se encarga de la
                distribución de bebidas alcohólicas en Santander. Licorera Tres Jotas,
                es un establecimiento comercial fundado en 1996 en la ciudad de
                Floridablanca en Santander. Somos una compañía que se encarga de la
                distribución de bebidas alcohólicas en Santander.
                <br /><br />
                Licorera Tres Jotas, es un establecimiento comercial fundado en 1996 en
                la ciudad de Floridablanca en Santander. Somos una compañía que se
                encarga de la distribución de bebidas alcohólicas en Santander.
            </Typography><br /> <br />
            <Typography style={styles.title}>Nuestra historia<br /><br /></Typography>
            <Typography style={styles.subtitle}>
                Licorera Tres Jotas, es un establecimiento comercial fundado en 1996 en
                la ciudad de Floridablanca en Santander. Somos una compañía que se
                encarga de la distribución de bebidas alcohólicas en Santander. Licorera
                Tres Jotas, es un establecimiento comercial fundado en 1996 en la ciudad
                de Floridablanca en Santander. Somos una compañía que se encarga de la
                distribución de bebidas alcohólicas en Santander. Licorera Tres Jotas,
                es un establecimiento comercial fundado en 1996 en la ciudad de
                Floridablanca en Santander. Somos una compañía que se encarga de la
                distribución de bebidas alcohólicas en Santander.
                <br /><br />
                Licorera Tres Jotas, es un establecimiento comercial fundado en 1996 en
                la ciudad de Floridablanca en Santander. Somos una compañía que se
                encarga de la distribución de bebidas alcohólicas en Santander.
                <br /> <br />
                Licorera Tres Jotas, es un establecimiento comercial fundado en 1996 en
                la ciudad de Floridablanca en Santander. Somos una compañía que se
                encarga de la distribución de bebidas alcohólicas en Santander. Licorera
                Tres Jotas, es un establecimiento comercial fundado en 1996 en la ciudad
                de Floridablanca en Santander. Somos una compañía que se encarga de la
                distribución de bebidas alcohólicas en Santander. Licorera Tres Jotas,
                es un establecimiento comercial fundado en 1996 en la ciudad de
                Floridablanca en Santander. Somos una compañía que se encarga de la
                distribución de bebidas alcohólicas en Santander.
                <br /> <br />
            </Typography>
        
        </div>
      <FooterScreen />
    </>
  );
};

export default AboutUs;

const styles = {
    title:{
        ...hudsonNYFontStyle,
        fontSize:"20px",
        color: "#000000"
    },
    subtitle: {
        ...weblysleekFontStyle,
        fontSize:"16px",
        fontWeight:"300",
        color: "#000000"
    },
    img:{
        ...displayFlex
    }
}
