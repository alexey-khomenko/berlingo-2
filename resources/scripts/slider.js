import Swiper from 'swiper';
import SwiperCore, { Navigation, Autoplay } from 'swiper/core';

import 'swiper/swiper-bundle.css';

// configure Swiper to use modules
SwiperCore.use([Navigation, Autoplay]);

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,

  autoplay: {
    delay: 3000,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});