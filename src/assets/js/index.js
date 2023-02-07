import 'swiper/swiper.min.css';
import '../styles/reset.scss';
import '../styles/styles.scss';
import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);


const checkboxes = {
    requirements: ["minimum", "recommended"],
    versions: ["standard", "limited"]
};
let isPlay = false;
const classes = {
    opened: 'opened',
    hidden: 'hidden',
    active: 'active'
};

const checkbox = document.querySelectorAll('.checkbox');
const menuLink = document.querySelectorAll('.menu-link');
const header = document.querySelector('.header');
const menuButton = document.querySelector('.header-menu__button');
const video = document.getElementById('video');
const videoButton = document.querySelector('.video-btn');
const faqItem = document.querySelectorAll('.faq-item');
const section = document.querySelectorAll('.section');

    const toggleMenu = () => {
        header.classList.toggle(classes.opened);
    }

    const scrollToSection = (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');

        if(!href && !href.startsWith("#")) return;
        
        const section = href.slice(1); 

        const top = document.getElementById(section).offsetTop || 0;
        window.scrollTo({ top, behavior: 'smooth' })
    };

    const formatValue = (value) => value < 10 ? `0${value}` : value

    const getTimerValues = (diff) => {
        return{
            seconds: (diff / 1000) % 60,
            minutes: (diff / (1000 * 60)) % 60,
            hours: (diff / (1000 * 3600)) % 24,
            days: (diff / (1000 * 3600 * 24)) % 30,
        }
    };

    const setTimerValues = (values) => {
        Object.entries(values).forEach(([key, value]) => {
            const timerValue = document.getElementById(key);
            timerValue.innerText = formatValue(Math.floor(value));
        });
    }

    const startTimer = (date) => {
        setInterval(() => {
            const diff = new Date(date).getTime() - new Date().getTime();
            if(diff < 0) {
                clearInterval(id);
                return
            }
           setTimerValues(getTimerValues(diff));          
        }, 1000);
    };

    const handleVideo = ({ target }) => {
        const info = target.parentElement;

        isPlay = !isPlay;
        info.classList.toggle(classes.hidden, isPlay);
        target.innerText = isPlay ? 'Pause' : 'Play';
        isPlay ? video.play() : video.pause();
    };

    const handleCheckbox = ({ currentTarget: { checked, name }}) => {
        const { active } = classes;
        const value = checkboxes[name][Number(checked)];
        const list = document.getElementById(value);
        const tabs = document.querySelectorAll(`[data-${name}]`);
        const siblings = list.parentElement.children;

        for(const item of siblings) item.classList.remove(active);
        for(const tab of tabs){
            tab.classList.remove(active);
            tab.dataset[name] === value && tab.classList.add(active);
        }

        list.classList.add(active);
  };

  const initSlider = () => {
    new Swiper(".swiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        initialSlide: 2,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
    });
  };

  const handleFaqItem = ({currentTarget: target }) => {
    target.classList.toggle(classes.opened);
    const isOpened = target.classList.contains(classes.opened);
    const height = target.querySelector('p').clientHeight;
    const content = target.querySelector('.faq-item__content');

    content.style.height = `${isOpened ? height : 0}px`
  };
  const handleScroll = () => {
    const {scrollY: y, innerHeight: h} = window;
    section.forEach((section) => {
        if( y > section.offsetTop - h / 1.5) section.classList.remove(classes.hidden);
    });
  }

initSlider();
startTimer("March 12, 2023 00:00:00");
menuButton.addEventListener('click', toggleMenu);
window.addEventListener('scroll', handleScroll);
videoButton.addEventListener('click', handleVideo);
menuLink.forEach((link) => link.addEventListener("click", scrollToSection));
checkbox.forEach((box) => box.addEventListener("click", handleCheckbox)); 
faqItem.forEach((item) => item.addEventListener("click", handleFaqItem));
