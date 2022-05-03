import './Landing.css';
import { Link } from 'react-router-dom';

import * as React from 'react';

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
                <p className="title-block">Фінанси <b>вашого бізнеса</b> онлайн 24/7</p>
                <div className="financing-img-wrap-lines">
                    <div className="financing-img-wrap">
                        <img className="financing-img-main" src={FinancingMain} alt=""/>
                        <img className="financing-img-per" src={FinancingPercenti} alt=""/>
                        <img className="financing-img-dia" src={FinancingDiagramma} alt=""/>
                    </div>
                    <div className="financing-img-lines">
                        <img className="financing-img-line-1" src={FinancingLineOne} alt=""/>
                        <img className="financing-img-line-2" src={FinancingLineTwo} alt=""/>
                        <img className="financing-img-line-3" src={FinancingLineThree} alt=""/>
                    </div>
                </div>
            </section>

            <Container className="container-wrap">
                <section className="business-section wrap-block block-section" id="business">

                    <div className="left-block">
                        <img src={Phone} alt=""/>
                    </div>
                    <div className="right-block">
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
                    <p className="title-block text-center">Функціонал <b>B-Fin</b></p>
                    <img src={LineScreenThree} alt="" className="functional-img-line"/>
                    <div className="functional-list">
                        <div className="functional-item">
                            Облік з/п
                        </div>
                        <div className="functional-item">
                            Облік коштів
                        </div>
                        <div className="functional-item">
                            Автоматизація
                            обліку
                        </div>
                        <div className="functional-item">
                            Облік податків
                        </div>
                        <div className="functional-item">
                            Гнучке
                            налаштування звітів
                        </div>
                        <div className="functional-item">
                            Інтеграція з CRM
                        </div>
                        <div className="functional-item">
                            Облік складу
                        </div>
                        <div className="functional-item">
                            Облік клієнтів
                        </div>
                        <div className="btn-black-wrap">
                            <a href="#" className="btn-black">Подробнее</a>
                        </div>
                    </div>
                </section>
            </Container>

            <Container className="container-wrap">
                <section className="benefits-section block-section" id="benefits">
                    <p className="title-block text-center">Переваги</p>
                    <img src={LineScreenFour} alt="" className="benefits-img-line"/>
                    <div className="benefits-list">
                        <div className="benefits-item-wrap">
                            <div className="benefits-item">Гнучкі налаштування прав доступу</div>
                        </div>
                        <div className="benefits-item-wrap">
                            <div className="benefits-item">Вартість <br/> дешевого <br/> серверу 1С</div>
                        </div>
                        <div className="benefits-item-wrap">
                            <div className="benefits-item">Швидкість <br/> роботи</div>
                        </div>
                        <div className="benefits-item-wrap">
                            <div className="benefits-item">Адапивано <br/> під мобільний</div>
                        </div>
                    </div>
                </section>
            </Container>

            <Container className="container-wrap">
                <section className="cost-section block-section" id="cost">
                    <p className="title-block text-center">Вартість</p>
                    <div className="cost-list">
                        <div className="cost-item-wrap">
                            <div className="cost-item">
                                <p className="cost-item-title">1 місяць <br/> безкоштовно</p>
                                <a href="" className="btn-arrow-right cost-item-btn">Почати</a>
                            </div>
                        </div>
                        <div className="cost-item-wrap">
                            <div className="cost-item">
                                <p className="cost-item-title">Всі функції <br/> 10$/місяць</p>
                                <a href="" className="btn-arrow-right cost-item-btn">Почати</a>
                            </div>
                        </div>
                        <div className="cost-item-wrap">
                            <div className="cost-item">
                                <p className="cost-item-title">Індивідувальні <br/> налаштування <br/>за домовленістю
                                </p>
                                <a href="" className="btn-arrow-right cost-item-btn">Почати</a>
                            </div>
                        </div>
                    </div>
                    <p className="cost-note text-center">Ви можете замовити базове налаштування за 50$</p>
                </section>
            </Container>

            <Container className="container-wrap">
                <section className="contact-section block-section" id="contact">
                    <p className="title-block text-center">Контакти</p>
                    <div className="wrap-block">
                        <div className="left-block">
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
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13 0C5.82021 0 0 5.82021 0 13C0 20.1798 5.82021 26 13 26C20.1798 26 26 20.1798 26 13C26 5.82021 20.1798 0 13 0ZM17.9996 14.667C17.9996 14.667 19.1493 15.8018 19.4323 16.3285C19.4404 16.3394 19.4445 16.3502 19.4472 16.3556C19.5623 16.5493 19.5894 16.6996 19.5325 16.812C19.4377 16.9989 19.1127 17.0909 19.0017 17.0991H16.9704C16.8296 17.0991 16.5344 17.0625 16.1769 16.816C15.902 16.6238 15.6311 16.3082 15.3671 16.0008C14.973 15.5431 14.6318 15.1477 14.2878 15.1477C14.2441 15.1476 14.2007 15.1545 14.1592 15.168C13.8992 15.252 13.566 15.623 13.566 16.6116C13.566 16.9203 13.3223 17.0977 13.1503 17.0977H12.22C11.9031 17.0977 10.2524 16.9867 8.7899 15.4443C6.99969 13.5552 5.38823 9.76625 5.37469 9.73104C5.27312 9.48594 5.48302 9.35458 5.71187 9.35458H7.76344C8.03698 9.35458 8.12635 9.52115 8.18865 9.66875C8.26177 9.84073 8.5299 10.5246 8.97 11.2937C9.68365 12.5477 10.121 13.0569 10.4718 13.0569C10.5375 13.0561 10.6021 13.0394 10.66 13.0081C11.1177 12.7535 11.0324 11.1218 11.0121 10.7832C11.0121 10.7196 11.0107 10.0533 10.7765 9.73375C10.6085 9.50219 10.3228 9.41417 10.1495 9.38167C10.2196 9.28486 10.3121 9.20636 10.419 9.15281C10.7331 8.99573 11.2992 8.97271 11.8611 8.97271H12.174C12.7833 8.98083 12.9404 9.0201 13.1611 9.07562C13.608 9.1826 13.6175 9.47104 13.5782 10.4582C13.566 10.7385 13.5539 11.0554 13.5539 11.4292C13.5539 11.5104 13.5498 11.5971 13.5498 11.6892C13.5363 12.1916 13.52 12.7617 13.8748 12.9959C13.9211 13.025 13.9745 13.0404 14.0292 13.0406C14.1524 13.0406 14.5234 13.0406 15.5282 11.3168C15.8381 10.7619 16.1074 10.1853 16.334 9.59156C16.3543 9.55635 16.4139 9.44802 16.4843 9.40604C16.5362 9.37955 16.5939 9.36607 16.6522 9.36677H19.064C19.3267 9.36677 19.5068 9.40604 19.5406 9.5076C19.6002 9.66875 19.5298 10.1603 18.4289 11.6512L17.9373 12.2999C16.9393 13.608 16.9393 13.6744 17.9996 14.667Z"
                                                fill="#7096FF"/>
                                        </svg>
                                    </div>
                                    <a href="https://vk.com/bfin" target="_blank"
                                       className="contact-item-title">vk.com/bfin</a>
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
                        <div className="right-block">
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
