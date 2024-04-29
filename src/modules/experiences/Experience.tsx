import { Box, Typography } from "@mui/material";
import { displaySpaceBetween } from "../shared/recursiveStyles/RecursiveStyles";
import { useSelector } from "react-redux";
import { selectAllCampaigns } from "../../store/modules/campaigns";
import { useEffect, useState } from "react";

const Experience = () => {

    const campaignsDataRedux = useSelector(selectAllCampaigns);
    console.log('campaignsDataRedux: ', campaignsDataRedux);
    
    const [ imagesRandom, setImagesRandom ] = useState<string []>([]);

    function generateRandomNumbers(arrayLength: number) {
        var number1 = Math.floor(Math.random() * arrayLength) + 1;
        var number2;
        
        do {
            number2 = Math.floor(Math.random() * arrayLength) + 1;
        } while (number2 === number1);
    
        return [number1, number2];
    }

    useEffect(() => {
        let arrayImages: string [] = [];
        const ramdonNumbers: number [] = generateRandomNumbers(campaignsDataRedux.length - 1);
        console.log('Números random obtenidos: ', generateRandomNumbers(campaignsDataRedux.length - 1));
        for (let index = 0; index < campaignsDataRedux.length; index++) {
            if (ramdonNumbers.includes(index)) {
                arrayImages.push(campaignsDataRedux[index].mainImageUrl);
            }
        }        
        setImagesRandom(arrayImages);
    }, [campaignsDataRedux]);

    return(
        <Box className='columnContainer' sx={styles.experiencesContainer}>
            <Typography sx={styles.experiencesContainer.subtitle}>las mejores experiencias</Typography>
            <Box sx={styles.experiencesContainer.imageContainer}>
                {imagesRandom.map((image: any, index: any) => (
                    <img key={index} style={styles.experiencesContainer.imageContainer.image}  src={image} alt={`Campaign: ${index}`} />
                ))}
            </Box>
        </Box>
    );
}

const styles = {
    experiencesContainer: {
        subtitle: {
            margin: '50px 0 30px 0',
            fontFamily: 'HudsonNYSerif',
            fontWeight: 600,
            fontSize: '25px',
        },
        imageContainer: {
            width: '100%',
            ...displaySpaceBetween,
            image: {
                width: '49%',
                borderRadius: 20,
            }
        }
    }
}

export default Experience;