import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import './sliderStyle.css'

// Import slide image
import slideImage_1 from "../../../assets/image-1.jpeg";
import slideImage_2 from "../../../assets/image-2.avif";
import slideImage_3 from "../../../assets/image-3.jpg";
import slideImage_4 from "../../../assets/image-4.avif";
import slideImage_5 from "../../../assets/image-5.webp";
import slideImage_6 from "../../../assets/image-6.webp";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Slide from "./Slide/Slide";


const Slider = () => {
  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            {/* Slide-1 */}
          <Slide
            slideImage={slideImage_1}
            heading={"Explore Innovative Tech Products"}
            text={"Discover the future—web apps, AI tools, mobile apps & more."}
          ></Slide>
        </SwiperSlide>
        {/* Slide-2 */}
        <SwiperSlide>
          <Slide
            slideImage={slideImage_2}
            heading={"Launch Your Idea into the World"}
            text={"Submit, share, and let the world upvote your creation."}
          ></Slide>
        </SwiperSlide>
        {/* Slide-3 */}
        <SwiperSlide>
          <Slide
            slideImage={slideImage_3}
            heading={"Community-Powered Discovery"}
            text={"Vote, review, and shape the future of technology together."}
          ></Slide>
        </SwiperSlide>
        {/* Slide-4 */}
        <SwiperSlide>
          <Slide
            slideImage={slideImage_4}
            heading={"Go Premium. Get Discovered."}
            text={"Unlock advanced insights and boost your product’s reach"}
          ></Slide>
        </SwiperSlide>
        {/* Slide-5 */}
        <SwiperSlide>
          <Slide
            slideImage={slideImage_5}
            heading={"Built for Makers, Dreamers & Explorers"}
            text={"Your journey starts here. Discover, build, grow, repeat."}
          ></Slide>
        </SwiperSlide>
        {/* Slide-6 */}
        <SwiperSlide>
          <Slide
            slideImage={slideImage_6}
            heading={"Your Hub for Digital Discovery"}
            text={"Find AI tools, mobile apps, games, software & more — all in one place."}
          ></Slide>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};

export default Slider;
