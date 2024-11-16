import { Typography } from "@mui/material";
import { displayFlex, hudsonNYFontStyle, weblysleekFontStyle } from "../shared/recursiveStyles/RecursiveStyles";
import HeaderScreen from "../shared/header/HeaderScreen";
import FooterScreen from "../shared/footer/FooterScreen";
import { useEffect } from "react";

interface props {}
const AboutUs: React.FC<props> = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderScreen />
        <div className="columnContainer" style={{padding:"30px 0px"}}>
            <div style={styles.img}>
                <img src="/images/whiteLogo.png" alt="" width={320}/>
            </div>
            <Typography style={styles.title}>Quienes Somos<br /><br /></Typography>
            <Typography style={styles.subtitle}>
              Desde aquella época en la que alquilábamos películas hasta el día de hoy, nuestra meta es ser los <b>cómplices de tus mejores momentos.</b>
              Más que una tienda de licores especializada somos <b> un espacio para los amantes de la buena vida,</b> un lugar donde la pasión por los sabores y las experiencias se encuentra con la calidez y la atención personalizada. Creemos que <b> la felicidad se cultiva con los pequeños detalles,</b> y por eso nos apasiona ofrecerte la más amplia selección de <b>licores nacionales e importados</b> de la más alta calidad.
              <br /><br />
              Nos encontramos en constante <b>búsqueda de nuevos productos y tendencias,</b> para ofrecerte siempre la mejor experiencia. Trabajamos de la mano con <b>los mejores proveedores,</b> asegurándonos de que cada botella que llega a nuestras manos cumpla con los más altos estándares de calidad.
              <br /><br />
              Si te preguntas por qué nos llamamos Tres Jotas, la historia no es muy divertida pero vamos a sacarte de la duda: Jorge, Josué y John Jairo eran los dueños de este negocio y con su desbordante creatividad eligieron este nombre.  Cuando Luzma lo compró, estaba tan ocupada que decidió dejar el nombre quieto y no darle mucha mente a eso. 
              <br /><br />
              En nuestra tienda encuentras licores importados, nacionales, aperitivos cervezas, gaseosas, agua, mecato, sales especiales para tequila y muchos productos seleccionados de manera atenta y cuidadosa. Estamos abiertos todos los días desde las 9am hasta la 1am.  
              <br /><br />
              Tres Jotas es un <b>espacio para compartir y celebrar la vida.</b> Aquí podrás encontrar el licor perfecto para brindar por tus logros, acompañar tus ocasiones especiales o simplemente disfrutar de un buen rato en familia o con amigos.
              <br /><br />
              <b>¡Salud!</b>
            </Typography><br /> <br />
            {/* <Typography style={styles.title}>Nuestra historia<br /><br /></Typography>
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
            </Typography> */}
        
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
