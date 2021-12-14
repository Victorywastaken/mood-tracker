import React,{useEffect,useRef} from 'react';
import Swiper from 'swiper';
import 'Swiper.css'

const SwipingComponent = () => {
    const swiper = useRef(null)
    useEffect(()=>{
        swiper.current=new Swiper('.swiper-container',{speed: 400,
          spaceBetween: 100,})
//add necessary parameters required by checking the offical docs of swiper
},[])
return(
    <div className="swiper-container">
        <div className="swiper-wrapper">
            <div className="swiper-slide">Slide 1</div>
            <div className="swiper-slide">Slide 2</div>
            <div className="swiper-slide">Slide 3</div>
            <div className="swiper-slide">Slide 4</div>
        </div>
    </div>
  )
}

export default SwipingComponent;
