// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { swiperType } from './types/types';
import { useEffect } from 'react';
import { Navigation, Pagination } from 'swiper/modules';

const modulesArray: any = [];

const SwiperComponent = (props: swiperType) => { 
    
    const { modules, slidesPerView, images } = props;
    
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
                            <img height={'90%'} src={`${img}`} alt="" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );

}

export default SwiperComponent;