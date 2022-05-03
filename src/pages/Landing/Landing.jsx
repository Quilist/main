import './Landing.css';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Wow from 'wow.js';
import Parallax from 'parallax-js'
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';

/*************** IMG ****************/
/* screen 1 */
import FinancingMain from './img/1-screen/financing-main-img.png';
import FinancingPercenti from './img/1-screen/75%.png';
import FinancingDiagramma from './img/1-screen/diagramma.png';
import FinancingLineOne from './img/1-screen/line-1.png';
import FinancingLineTwo from './img/1-screen/line-2.png';
import FinancingLineThree from './img/1-screen/line-3.png';
/* screen 2 */
import Phone from './img/2-screen/phone.png';
/* screen 3 */
import LineScreenThree from './img/3-screen/line.png';
/* screen 4 */
import LineScreenFour from './img/4-screen/line.png';

function ScrollTop(props) {
    const {children, window} = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );
        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const pages = [
    {url: '#functional', name: 'Функционал'},
    {url: '#benefits', name: 'Переваги'},
    {url: '#cost', name: 'Вартість'},
    {url: '#contact', name: 'Контакти'},
];

export default function Landing(props) {
    const wow = new Wow();
    wow.init();

    const sceneEl = React.useRef(null);
    const sceneElLine = React.useRef(null);
    const sceneElThree = React.useRef(null);
    const sceneElFour = React.useRef(null);
    const sceneElFive = React.useRef(null);

    React.useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
            relativeInput: true,
        });
        parallaxInstance.enable();

        return () => parallaxInstance.disable();
    }, [])

    React.useEffect(() => {
        const parallaxInstanceTwo = new Parallax(sceneElLine.current, {
            relativeInput: true,
            scalarX: false
        });
        parallaxInstanceTwo.enable();

        return () => parallaxInstanceTwo.disable();
    }, [])

    React.useEffect(() => {
        const parallaxInstanceThree= new Parallax(sceneElThree.current, {
            relativeInput: true,
        });
        parallaxInstanceThree.enable();

        return () => parallaxInstanceThree.disable();
    }, [])

    React.useEffect(() => {
        const parallaxInstanceFour= new Parallax(sceneElFour.current, {
            relativeInput: true,
        });
        parallaxInstanceFour.enable();

        return () => parallaxInstanceFour.disable();
    }, [])

    React.useEffect(() => {
        const parallaxInstanceFive= new Parallax(sceneElFive.current, {
            relativeInput: true,
        });
        parallaxInstanceFive.enable();

        return () => parallaxInstanceFive.disable();
    }, [])

    const [openMenu, setOpenMenu] = React.useState(false)
    const toggleMenu = () => {
        let body = document.body;

        setOpenMenu(!openMenu);

        if(openMenu){
            body.classList.remove('fixed')
        } else {
            body.classList.add('fixed')
        }
    }

    return (
        <>
            <div className={openMenu ? 'overflow show' : 'overflow hide'} onClick={toggleMenu}></div>

            <div className="header-wrap">
                <Container className="container-wrap">
                    <div className="header-inside">
                        <button className="header-btn-mob" onClick={toggleMenu}></button>
                        <a href="/" className="logo">
                            B-Fin
                        </a>
                        <div className={openMenu ? 'header-menu show' : 'header-menu hide'}>
                            <div className="header-menu-head">
                                <p className="header-menu-title">Меню</p>
                                <button className="header-menu-close" onClick={toggleMenu}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.34315 4.34314L15.6569 15.6568" stroke="#4A4E55" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"></path>
                                        <path d="M15.6568 4.34314L4.34314 15.6568" stroke="#4A4E55" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"></path>
                                    </svg>
                                </button>
                            </div>
                            <ul className="header-pages" >
                                {pages.map((page) => {
                                    return (
                                        <li><a href={page.url} onClick={toggleMenu}>{page.name}</a></li>
                                    );
                                })}
                            </ul>
                        </div>
                        <Link class="btn-login" to="/registration" underline="none">Войти</Link>
                    </div>
                </Container>
            </div>

            <Toolbar id="back-to-top-anchor" />

            <section className="financing-section" id="financing">
                <p className="title-block wow fadeInUp">Фінанси <b>вашого бізнеса</b> онлайн 24/7</p>
                <div className="financing-img-wrap-lines">
                    <div className="financing-img-wrap" ref={sceneEl}>
                        <div className="" data-depth="0.2">
                            <img className="financing-img-main" src={FinancingMain} alt=""/>
                        </div>
                        <div className="financing-img-per-wrap" data-depth="0.1">
                            <img className="financing-img-per wow fadeInDown"  data-wow-offset="100" data-wow-delay="0.3s"  src={FinancingPercenti} alt=""/>
                        </div>
                        <div className="financing-img-dia-wrap" data-depth="0.3">
                            <img className="financing-img-dia wow fadeInUp" data-depth="0.3" data-wow-offset="100"  data-wow-delay="0.3s" src={FinancingDiagramma} alt=""/>
                        </div>
                    </div>
                    <div className="financing-img-lines" ref={sceneElLine}>
                        <div className="financing-img-lie-wrap" data-depth="0.7">
                            <img className="financing-img-line-1" src={FinancingLineOne} alt=""/>
                        </div>
                        <div className="financing-img-lie-wrap" data-depth="1">
                            <img className="financing-img-line-2" src={FinancingLineTwo} alt=""/>
                        </div>
                        <div className="financing-img-lie-wrap" data-depth="0.5">
                            <img className="financing-img-line-3" src={FinancingLineThree} alt=""/>
                        </div>
                    </div>
                </div>
            </section>

            <Container className="container-wrap">
                <section className="business-section wrap-block block-section" id="business">
                    <div className="left-block wow fadeInLeft" ref={sceneElThree} data-wow-offset="200">
                        <div className="" data-depth="0.3">
                            <img src={Phone} alt=""/>
                        </div>
                    </div>
                    <div className="right-block wow fadeInRight" data-wow-offset="200">
                        <p className="title-block">Для якого <b>бізнесу</b> підходить</p>
                        <p className="desc-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p className="desc-block">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </section>
            </Container>

            <Container className="container-wrap">
                <section className="functional-section block-section" id="functional">
                    <p className="title-block text-center wow fadeInUp" data-wow-offset="200">Функціонал <b>B-Fin</b></p>
                    <div className="functional-img-line-wrap" ref={sceneElFour}>
                        <div className="" data-depth="0.3">
                            <img src={LineScreenThree} alt="" className="functional-img-line" />
                        </div>
                    </div>
                    <div className="functional-list">
                        <div className="functional-item wow fadeInUp" data-wow-offset="200" data-wow-delay="0.1s">
                            Облік з/п
                        </div>
                        <div className="functional-item wow fadeInUp" data-wow-offset="200" data-wow-delay="0.2s">
                            Облік коштів
                        </div>
                        <div className="functional-item wow fadeInUp" data-wow-offset="200" data-wow-delay="0.3s">
                            Автоматизація
                            обліку
                        </div>
                        <div className="functional-item wow fadeInUp" data-wow-offset="200" data-wow-delay="0.4s">
                            Облік податків
                        </div>
                        <div className="functional-item wow fadeInUp" data-wow-offset="200" data-wow-delay="0.5s">
                            Гнучке
                            налаштування звітів
                        </div>
                        <div className="functional-item wow fadeInUp" data-wow-offset="200" data-wow-delay="0.6s">
                            Інтеграція з CRM
                        </div>
                        <div className="functional-item wow fadeInUp" data-wow-offset="100" data-wow-delay="0.7s">
                            Облік складу
                        </div>
                        <div className="functional-item wow fadeInUp" data-wow-offset="100" data-wow-delay="0.8s">
                            Облік клієнтів
                        </div>
                        <div className="btn-black-wrap wow fadeInRight" data-wow-offset="100" data-wow-delay="0.9s">
                            <a href="#" className="btn-black">Подробнее</a>
                        </div>
                    </div>
                </section>
            </Container>

            <Container className="container-wrap">
                <section className="benefits-section block-section" id="benefits">
                    <p className="title-block text-center wow fadeInUp" data-wow-offset="200">Переваги</p>
                    <div className="benefits-img-line-wrap" ref={sceneElFive}>
                        <div data-depth="0.2">
                            <img src={LineScreenFour} alt="" className="benefits-img-line"/>
                        </div>
                    </div>

                    <div className="benefits-list">
                        <div className="benefits-item-wrap wow fadeInLeft" data-wow-offset="200" data-wow-delay="0.1s">
                            <div className="benefits-item">Гнучкі налаштування прав доступу</div>
                        </div>
                        <div className="benefits-item-wrap wow fadeInLeft" data-wow-offset="200" data-wow-delay="0.2s">
                            <div className="benefits-item">Вартість <br/> дешевого <br/> серверу 1С</div>
                        </div>
                        <div className="benefits-item-wrap wow fadeInLeft" data-wow-offset="200" data-wow-delay="0.3s">
                            <div className="benefits-item">Швидкість <br/> роботи</div>
                        </div>
                        <div className="benefits-item-wrap wow fadeInLeft" data-wow-offset="200" data-wow-delay="0.4s">
                            <div className="benefits-item">Адапивано <br/> під мобільний</div>
                        </div>
                    </div>
                </section>
            </Container>

            <Container className="container-wrap">
                <section className="cost-section block-section" id="cost">
                    <p className="title-block text-center wow fadeInUp" data-wow-offset="200">Вартість</p>
                    <div className="cost-list">
                        <div className="cost-item-wrap wow fadeIn" data-wow-offset="200" data-wow-delay="0.1s">
                            <div className="cost-item">
                                <p className="cost-item-title">1 місяць <br/> безкоштовно</p>
                                <a href="" className="btn-arrow-right cost-item-btn">Почати</a>
                            </div>
                        </div>
                        <div className="cost-item-wrap wow fadeIn" data-wow-offset="200" data-wow-delay="0.2s">
                            <div className="cost-item">
                                <p className="cost-item-title">Всі функції <br/> 10$/місяць</p>
                                <a href="" className="btn-arrow-right cost-item-btn">Почати</a>
                            </div>
                        </div>
                        <div className="cost-item-wrap wow fadeIn" data-wow-offset="200" data-wow-delay="0.3s">
                            <div className="cost-item">
                                <p className="cost-item-title">Індивідувальні <br/> налаштування <br/>за домовленістю
                                </p>
                                <a href="" className="btn-arrow-right cost-item-btn">Почати</a>
                            </div>
                        </div>
                    </div>
                    <p className="cost-note text-center wow fadeInUp" data-wow-offset="100" data-wow-delay="0.4s">Ви можете замовити базове налаштування за 50$</p>
                </section>
            </Container>

            <Container className="container-wrap">
                <section className="contact-section block-section" id="contact">
                    <p className="title-block text-center wow fadeInUp" data-wow-offset="200">Контакти</p>
                    <div className="wrap-block">
                        <div className="left-block wow fadeInLeft" data-wow-offset="200">
                            <div className="contact-block">
                                <div className="contact-item">
                                    <div className="contact-item-icon">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 -2.54413e-07 20.1797 -5.68248e-07 13C-8.82083e-07 5.8203 5.82029 8.82083e-07 13 5.68248e-07C20.1797 2.54413e-07 26 5.8203 26 13ZM20.8362 17.6719C20.852 17.404 20.6919 17.1619 20.4077 16.9784L17.0371 15.2011C16.6377 15.0139 16.2101 15.1203 15.9247 15.3994L15.1106 16.2135C15.0418 16.2637 14.9642 16.2968 14.8789 16.2976C13.6705 15.9854 12.5558 15.0384 11.7892 14.2028C11.0226 13.3673 9.98478 12.4693 9.73891 11.3036C9.69871 11.1595 9.68431 10.983 9.78014 10.8799L10.7434 9.93408C10.9908 9.60761 11.1108 9.13532 10.9084 8.78674L10.9084 8.77088L9.01524 5.56376C8.72016 5.09299 8.14979 5.04422 7.80284 5.38126L5.61132 7.5902C5.27679 7.91642 5.16432 8.34979 5.16382 8.77084C5.21961 10.633 6.13359 12.3926 7.07287 13.8379C8.79868 16.2101 10.9392 18.3862 13.5253 19.7523C14.6097 20.2763 15.9933 20.8917 17.2037 20.833C17.659 20.8278 18.1051 20.7046 18.3986 20.3839L20.6076 18.1749C20.754 18.0028 20.8267 17.8326 20.8362 17.6719Z"
                                                fill="#7096FF"/>
                                        </svg>
                                    </div>
                                    <a href="tel:0635674521" className="contact-item-title">063 567 45 21</a>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-item-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="26px" height="26px" viewBox="0 0 728.000000 724.000000" preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,724.000000) scale(0.100000,-0.100000)" fill="#7096FF" stroke="none">
                                                <path d="M3385 7209 c-902 -64 -1714 -437 -2336 -1075 -382 -392 -658 -840 -834 -1354 -129 -376 -189 -747 -189 -1165 0 -397 55 -748 175 -1115 107 -327 281 -678 464 -933 289 -403 610 -713 1006 -969 980 -637 2227 -752 3311 -307 1146 471 1978 1508 2182 2719 38 223 49 366 49 605 0 413 -55 759 -180 1140 -287 874 -928 1625 -1758 2059 -566 296 -1255 440 -1890 395z m617 -1264 c316 -32 680 -104 886 -177 415 -146 688 -414 810 -798 46 -145 90 -389 124 -685 19 -166 16 -668 -5 -830 -119 -911 -399 -1268 -1137 -1450 -332 -81 -558 -106 -1035 -112 l-380 -5 -40 -42 c-94 -96 -446 -467 -505 -531 -127 -139 -245 -255 -258 -255 -10 0 -12 85 -10 458 1 251 -1 466 -5 478 -5 14 -37 35 -95 61 -48 22 -122 57 -164 76 -351 162 -590 472 -698 906 -153 616 -102 1604 106 2046 245 522 868 833 1759 879 131 7 493 -4 647 -19z"/>
                                                <path d="M3160 5775 c-733 -74 -1231 -353 -1422 -798 -100 -231 -162 -651 -162 -1102 0 -479 63 -843 192 -1100 112 -225 299 -400 539 -505 164 -72 232 -110 263 -149 53 -64 60 -107 60 -390 l1 -256 41 45 c23 25 142 149 265 277 179 185 232 235 266 247 33 12 115 16 402 20 368 5 480 12 713 46 420 62 725 174 923 342 103 87 222 274 278 438 98 283 162 773 147 1115 -21 453 -95 863 -192 1062 -58 118 -112 190 -217 290 -99 92 -221 167 -365 224 -233 91 -631 170 -991 199 -178 13 -584 11 -741 -5z m561 -555 c368 -38 618 -147 833 -364 227 -229 349 -519 371 -881 9 -143 -2 -189 -49 -205 -47 -15 -81 0 -94 42 -6 18 -16 83 -22 143 -30 314 -146 589 -325 771 -176 180 -455 300 -795 344 -49 7 -92 18 -102 27 -34 30 -18 106 25 123 29 12 38 12 158 0z m-1020 -46 c47 -14 67 -29 155 -117 55 -56 134 -150 176 -210 92 -130 184 -305 193 -369 10 -63 -20 -125 -88 -181 -139 -116 -161 -143 -178 -215 -18 -83 66 -287 183 -443 62 -82 215 -232 228 -224 4 3 10 -2 13 -9 7 -18 151 -113 233 -154 86 -43 169 -66 213 -57 20 4 44 8 54 9 26 3 101 78 141 141 34 52 123 117 163 118 36 1 173 -34 173 -45 0 -4 6 -8 13 -8 13 0 245 -153 322 -213 206 -160 255 -222 255 -320 0 -89 -94 -255 -198 -349 -89 -80 -262 -158 -352 -158 -146 0 -661 267 -999 517 -208 155 -494 425 -621 589 -36 46 -71 83 -77 84 -7 0 -12 4 -10 8 1 5 -24 45 -55 89 -189 263 -425 708 -472 889 -20 79 -20 195 0 265 50 170 197 321 354 363 72 19 115 19 181 0z m1157 -300 c42 -8 109 -26 149 -40 343 -114 588 -463 571 -814 -2 -53 -9 -95 -17 -104 -15 -17 -86 -22 -110 -7 -8 5 -21 56 -32 131 -33 214 -85 347 -179 452 -99 111 -239 180 -454 225 -134 27 -152 34 -161 63 -8 27 3 76 22 95 19 20 112 20 211 -1z m137 -374 c98 -48 175 -121 215 -205 73 -154 49 -309 -44 -291 -45 9 -56 25 -75 113 -31 145 -94 219 -216 254 -125 36 -138 43 -147 71 -13 39 9 80 52 95 54 20 126 7 215 -37z"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <a href="https://viber/bfin" target="_blank"
                                       className="contact-item-title">viber/bfin</a>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-item-icon">
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M26 13.0796C26 5.85577 20.18 0 13.0016 0C5.82002 0.0016248 0 5.85577 0 13.0812C0 19.6081 4.75416 25.0186 10.9674 26V16.8605H7.66904V13.0812H10.9706V10.1972C10.9706 6.92001 12.9123 5.10999 15.8808 5.10999C17.3041 5.10999 18.7908 5.36508 18.7908 5.36508V8.58218H17.1514C15.5379 8.58218 15.0342 9.59118 15.0342 10.6262V13.0796H18.638L18.0629 16.8589H15.0326V25.9984C21.2458 25.017 26 19.6064 26 13.0796Z"
                                                fill="#7096FF"/>
                                        </svg>
                                    </div>
                                    <a href="https://facebook.com/bfin" target="_blank"
                                       className="contact-item-title">facebook.com/bfin</a>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-item-icon">
                                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20.857 2.89822L14.2941 20.586C13.8796 21.7036 12.6857 22.2777 11.6285 21.8675C11.3666 21.764 11.1291 21.6076 10.9309 21.408C10.7326 21.2085 10.5779 20.9702 10.4764 20.7081L8.39611 15.4611C8.00517 14.4539 7.2302 13.6423 6.24085 13.204L1.23358 11.0249C0.191774 10.5706 -0.282274 9.31113 0.173033 8.21115C0.280727 7.94555 0.440142 7.70389 0.642052 7.50016C0.843962 7.29644 1.08436 7.13468 1.34933 7.02426L18.2343 0.149361C19.3003 -0.285133 20.4832 0.26046 20.8746 1.36924C21.0477 1.85984 21.0411 2.40323 20.8581 2.89822H20.857Z"
                                                fill="#7096FF"/>
                                        </svg>
                                    </div>
                                    <a href="https://goo.gl/maps/TeqNutw6tUvc41zv6" target="_blank"
                                       className="contact-item-title">м. Вишневе, вул. Промислова 8</a>
                                </div>
                            </div>
                        </div>
                        <div className="right-block wow fadeInRight" data-wow-offset="200">
                            <p className="title-block-two">Реквізити</p>
                            <p className="desc-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className="desc-block">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                    </div>
                </section>
            </Container>

            <div className="footer-wrap">
                <Container>
                    <div className="footer-inside">
                        <a href="/" className="logo-footer">
                            B-Fin 2022
                        </a>
                        <ul className="footer-pages">
                            {pages.map((page) => {
                                return (
                                    <li><a href={page.url}>{page.name}</a></li>
                                );
                            })}
                        </ul>
                        <Link class="btn-login light" to="/registration" underline="none">Войти</Link>
                    </div>
                </Container>
            </div>

            <ScrollTop {...props}>
                <Fab size="small" color="color-one" aria-label="Вверх">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </>
    );
}
