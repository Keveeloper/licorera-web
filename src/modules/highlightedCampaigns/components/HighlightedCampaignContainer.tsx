import { Box, Grid, Typography } from "@mui/material";
import { displayFlex } from "../../shared/recursiveStyles/RecursiveStyles";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCampaigns } from "../../../store/modules/campaigns";
import CardComponent from "../../shared/card/card.component";

const HighlightedCampaignContainer = () => {

    const location = useLocation();
    const highlightedCampaign = location?.state?.highlightedCampaign;
    const campaingDataredux = useSelector(selectAllCampaigns);

    return (
        <Box className={'columnContainer'}>
            <Box sx={styles.headerContainer}>
                <figure style={styles.headerContainer.imgContainer}>
                    <img style={styles.headerContainer.imgContainer.campaignImage} src={highlightedCampaign.mainImageUrl} alt="" />
                </figure>
            </Box>
            <Box sx={styles.infoContainer}>
                <Typography sx={styles.infoContainer.title}>{highlightedCampaign.name}</Typography>
                <Typography sx={styles.infoContainer.description}>
                    {highlightedCampaign.description}
                    <br />
                    {highlightedCampaign.type}
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{padding: 0}}>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <figure>
                                <img src="" alt="" />
                            </figure>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                    <Grid item xs={2.4} sx={{padding: '10px 10px' + '!important', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CardComponent
                        style={{ padding: "20px", width: '100%', borderRadius: "10px" }}
                        >
                            <h1>Hola mundo</h1>
                        </CardComponent>
                    </Grid>
                </Grid>
                </Box>
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
    },
    infoContainer: {
        width: '100%',
        title: {
            marginBottom: '25px',
            textAlign: 'center',
            fontFamily: 'HudsonNYSerif',
            fontSize: '25px'
        },
        description: {
            fontFamily: 'weblysleekuil',
            fontSize: '20px'
        }
    }
}

export default HighlightedCampaignContainer;