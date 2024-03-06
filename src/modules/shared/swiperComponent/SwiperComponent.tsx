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
                                    <img style={{borderRadius: '20px'}} height={'90%'} src={`${img}`} alt="" />
                                }
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );

}

export default SwiperComponent;