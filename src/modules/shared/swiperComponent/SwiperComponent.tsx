// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { swiperType } from './types/types';
import { useEffect } from 'react';
import { Navigation, Pagination } from 'swiper/modules';

// Material UI
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

const modulesArray: any = [];

const SwiperComponent = (props: swiperType) => { 
    
    const { modules, slidesPerView, images, loadingStatus } = props;
    
    useEffect(() => {
        modules.forEach(module => {
            switch (module) {
                case 'Navigation':
                    modulesArray.push(Navigation);
                    break;
                case 'Pagination':
                    modulesArray.push(Pagination);
                    break;
                default:
                    break;
              }
        });
    }, [modules]);

    return(
        <>
            {/* {loadingStatus === 'loading' && (
                <Box sx={{margin: '0 auto 0 auto', width: '1000px', height: '90%'}}>
                    <Skeleton sx={{marginTop: '30px', marginBottom: '10px'}} variant="rectangular" width={'100%'} height={'60%'} />
                    <Skeleton sx={{marginBottom: '10px'}} variant="rectangular" width={'30%'} height={'10%'} />
                    <Skeleton sx={{marginBottom: '10px'}} variant="rectangular" width={'90%'} height={'20%'} />
                    <Skeleton sx={{marginBottom: '10px'}} variant="rectangular" width={'10%'} height={'10%'} />
                    
                </Box>
            )} */}
            <Swiper style={{ height: '100%'}}
                modules={modulesArray}
                navigation={{
                    enabled: true
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                spaceBetween={10}
                slidesPerView={slidesPerView}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper: any) => console.log(swiper)}
            >
                {images.map((img, index) => {
                    return(
                        <SwiperSlide key={index} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                                {loadingStatus === 'loading' ? 
                                    <Skeleton sx={{width: '100%', maxWidth: '1000px', borderRadius: '20px'}} variant="rectangular" height={'90%'} />
                                :
                                    <Box sx={{position: 'relative', height: '90%', borderRadius: '20px', display: 'inline-block', overflow: 'hidden'}}>
                                        <img height={'100%'} src={`${img}`} alt="" />
                                        <Box sx={{position: 'absolute', padding: '20px', width: '100%' , bottom: 0, border: '1px solid black', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', backgroundColor: 'white',}}>
                                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                <h1>BUCHANANS MASTER</h1>
                                                <h2>$ 149.000</h2>
                                            </Box>
                                            <p style={{marginBottom: '30px'}}>Resultado de la creación del Master Blender Keith Law, quien seleccionó las mejores maltas de Escocia en su punto más alto de maduración. Vivamos 
                                                grandes momentos y no te pierdas la grandeza de un Buchanan's Master. con este descuento. Aquí va toda la descripción de la promoción.</p>
                                            <p>Válido hasta: Agosto 23, 2023</p>
                                        </Box>
                                    </Box>
                                }
                        </SwiperSlide>
                        
                    )
                })}
            </Swiper>
        </>
    );

}

export default SwiperComponent;