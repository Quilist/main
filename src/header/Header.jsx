import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

import AcceptImg from './img/Accept.png';
import BuyImg from './img/Buy.png';
import IntervezationImg from './img/Intervezation.png';
import PayImg from './img/Pay.png';
import ReturnImg from './img/Return.png';
import SellImg from './img/Sell.png';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import styles from './Header.module.css'
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";

const payOptions = [
  { name: 'Поставщику', link: '/pay_supplier' },
  { name: 'Клиенту(возврат)', link: '/pay_customer' },
  { name: 'Прочий расход', link: '/expend' },
  { name: 'Зарплата', link: '/salary' },
  { name: 'Собственнику', link: '/pay_owner' }
];

const receiveOptions = [
  { name: 'От клиента', link: '/receive_customer' },
  { name: 'От поставщика', link: '/receive_supplier' },
  { name: 'Прочее поступление', link: '/receive_income' },
  { name: 'Взнос от собственника', link: '/receive_owner' },
  { name: 'Ввод остатков', link: '/receive_balance' }
];

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [searchState, setSearchState] = React.useState('navigation');
  const [isActiveSidebar, setActiveSidebar] = useState(true);
  const [openReceive, setOpenReceive] = React.useState(false);
  const anchorRef = React.useRef(null);
  const anchorReceiveRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedReceiveIndex, setSelectedReceiveIndex] = React.useState(1);
  const headerTitle = document.title;

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const toggleSidebar = (e) => {
    e.preventDefault();
    setActiveSidebar(!isActiveSidebar);
  };

  const handleSearchState = () => {
    if (searchState == 'navigation') {
      setSearchState('navigation active');
    } else {
      setSearchState('navigation');
    }

  };

  const handleMenuItemClickReceive = (event, index) => {
    setSelectedReceiveIndex(index);
    setOpenReceive(false);
  };

  const handleToggleReceive = () => {
    setOpenReceive((prevOpen) => !prevOpen);
  };

  const handleCloseReceive = (event) => {
    if (anchorReceiveRef.current && anchorReceiveRef.current.contains(event.target)) {
      return;
    }

    setOpenReceive(false);
  };

  return (
    <>
      <div className="menu-fixed">
        <Link to="#" className="navigation__logo">
          <div>
            <i className="fas fa-wallet"></i> &nbsp;
            B-Fin
            <p className='navigation__logo__title'>
              {headerTitle}
            </p>
          </div>

        </Link>

        <div className="wrapper__scroll">
          <div className="wrapper__menu">
            <ul>
              <li>
                <Link to="#">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M15.9327 0.395599C15.8675 0.0802085 15.5521 -0.0462195 15.2408 0.0149553L12.2799 1.14737C12.1908 1.1752 12.1099 1.22445 12.0442 1.29081C11.9786 1.35717 11.9302 1.43862 11.9033 1.52801L9.76765 8.50058H2.65506C2.40492 7.74881 1.14608 3.22187 1.14608 3.22187C1.02101 2.91192 0.705622 2.71888 0.455485 2.84123C0.305027 2.87471 0.173999 2.96651 0.0911644 3.0965C0.00832969 3.22649 -0.0195422 3.38403 0.0136673 3.53455L1.65315 9.1871C1.68639 9.31219 1.75967 9.42297 1.86179 9.50251C1.96391 9.58204 2.08925 9.62596 2.21868 9.62756H9.39245C9.2565 10.1346 9.0757 10.8266 8.94655 11.2018H2.14935C2.07516 11.2011 2.00157 11.2151 1.93282 11.243C1.86407 11.2708 1.80154 11.3121 1.74882 11.3643C1.69611 11.4165 1.65427 11.4786 1.62571 11.5471C1.59716 11.6156 1.58246 11.689 1.58246 11.7632C1.58246 12.0841 1.8326 12.2689 2.14935 12.2689H9.39245C9.51258 12.2694 9.6301 12.2339 9.72991 12.1671C9.82972 12.1002 9.90725 12.005 9.95253 11.8937L10.7097 9.1871C10.8362 8.87579 12.7802 2.59109 12.9161 2.15471C13.3525 1.96983 15.6173 1.08755 15.6173 1.08755C15.7303 1.06336 15.8309 0.999425 15.9007 0.907372C15.9706 0.815318 16.0051 0.701256 15.998 0.58592C16.0027 0.551307 15.9992 0.516075 15.9879 0.483033C15.9765 0.449991 15.9577 0.420051 15.9327 0.395599ZM2.46474 12.7053C2.13168 12.7082 1.81324 12.8425 1.57874 13.0791C1.34424 13.3156 1.21268 13.6352 1.21269 13.9682C1.22348 14.2974 1.35869 14.6102 1.59105 14.8436C1.82342 15.077 2.13564 15.2135 2.46474 15.2257C2.79445 15.2144 3.10771 15.079 3.34187 14.8466C3.57602 14.6142 3.71381 14.3019 3.72766 13.9723C3.72552 13.638 3.59178 13.3181 3.35539 13.0817C3.11901 12.8453 2.79903 12.7115 2.46474 12.7094V12.7053ZM9.26194 12.7053C8.92803 12.7075 8.60847 12.8414 8.37274 13.0778C8.13701 13.3143 8.00417 13.6343 8.0031 13.9682C8.01494 14.2982 8.1514 14.6114 8.385 14.8448C8.6186 15.0781 8.93196 15.2143 9.26194 15.2257C9.591 15.214 9.90346 15.0783 10.1367 14.8458C10.3699 14.6134 10.5066 14.3014 10.5194 13.9723C10.5184 13.6386 10.3857 13.3189 10.1503 13.0824C9.91483 12.8459 9.59561 12.7119 9.26194 12.7094V12.7053Z"
                      fill="#7096FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.98295 2.69713C5.98413 2.77298 6.01261 2.84586 6.06316 2.90241C6.12949 2.973 6.2128 3.02542 6.30514 3.05467V2.33688C6.21514 2.35823 6.13337 2.40549 6.06996 2.47283C6.01283 2.5334 5.98161 2.61388 5.98295 2.69713Z"
                      fill="#7096FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M6.66949 3.73438V4.55005C6.78418 4.53574 6.89131 4.48527 6.97537 4.40595C7.01259 4.37117 7.0422 4.32906 7.06233 4.28226C7.08245 4.23546 7.09265 4.185 7.09228 4.13406C7.09289 4.08965 7.08453 4.04557 7.06772 4.00446C7.0509 3.96335 7.02596 3.92605 6.9944 3.8948C6.90261 3.81291 6.79032 3.75747 6.66949 3.73438Z"
                      fill="#7096FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M6.48188 0.407835C5.86347 0.407835 5.25895 0.591213 4.74477 0.934781C4.23058 1.27835 3.82983 1.76667 3.59317 2.33801C3.35652 2.90934 3.2946 3.53802 3.41524 4.14454C3.53589 4.75106 3.83368 5.30819 4.27096 5.74547C4.70824 6.18275 5.26536 6.48054 5.87189 6.60118C6.47841 6.72183 7.10709 6.65991 7.67842 6.42325C8.24975 6.1866 8.73808 5.78584 9.08164 5.27166C9.42521 4.75747 9.60859 4.15295 9.60859 3.53455C9.60859 2.70529 9.27917 1.91 8.6928 1.32363C8.10642 0.737255 7.31113 0.407835 6.48188 0.407835ZM7.50826 4.60579C7.29054 4.84143 6.98979 4.98327 6.66948 5.00138V5.20802C6.67166 5.23317 6.66859 5.2585 6.66046 5.28241C6.65232 5.30631 6.63931 5.32826 6.62225 5.34687C6.60518 5.36547 6.58444 5.38033 6.56133 5.39049C6.53821 5.40066 6.51324 5.40591 6.48799 5.40591C6.46275 5.40591 6.43778 5.40066 6.41466 5.39049C6.39155 5.38033 6.37081 5.36547 6.35374 5.34687C6.33668 5.32826 6.32367 5.30631 6.31553 5.28241C6.3074 5.2585 6.30433 5.23317 6.30651 5.20802V5.01226C6.05014 4.99476 5.80509 4.89996 5.60368 4.74037C5.52703 4.67729 5.46134 4.60195 5.40928 4.51742C5.38474 4.47498 5.37122 4.42707 5.36994 4.37807C5.36867 4.32906 5.37968 4.28051 5.40199 4.23686C5.42429 4.1932 5.45717 4.15582 5.49762 4.12813C5.53807 4.10044 5.58482 4.08331 5.63359 4.07832H5.69612C5.74972 4.0724 5.80389 4.08208 5.85212 4.10619C5.90035 4.13031 5.94059 4.16784 5.96801 4.21427C5.99303 4.26085 6.02361 4.30421 6.05909 4.34341C6.12667 4.41893 6.21027 4.47839 6.30379 4.51742V3.64602C6.03604 3.59769 5.78703 3.47577 5.58465 3.29393C5.51032 3.21816 5.45204 3.12818 5.41326 3.02938C5.37449 2.93058 5.35603 2.82498 5.35898 2.71888C5.35731 2.61036 5.37959 2.50281 5.42424 2.40389C5.46888 2.30496 5.53479 2.2171 5.61727 2.14656C5.81084 1.98256 6.05311 1.88699 6.30651 1.87467V1.85156C6.30433 1.82641 6.3074 1.80108 6.31553 1.77717C6.32367 1.75327 6.33668 1.73132 6.35374 1.71271C6.37081 1.69411 6.39155 1.67925 6.41466 1.66909C6.43778 1.65892 6.46275 1.65367 6.48799 1.65367C6.51324 1.65367 6.53821 1.65892 6.56133 1.66909C6.58444 1.67925 6.60518 1.69411 6.62225 1.71271C6.63931 1.73132 6.65232 1.75327 6.66046 1.77717C6.66859 1.80108 6.67166 1.82641 6.66948 1.85156V1.87467C6.89783 1.888 7.11763 1.96629 7.30298 2.10034C7.31628 2.11048 7.32899 2.12137 7.34104 2.13296C7.37192 2.16041 7.3966 2.19413 7.41344 2.23186C7.43028 2.26959 7.43888 2.31048 7.43868 2.3518C7.43848 2.39311 7.42949 2.43391 7.41229 2.47148C7.39509 2.50905 7.37009 2.54253 7.33895 2.56968C7.30781 2.59683 7.27124 2.61704 7.23168 2.62896C7.19211 2.64087 7.15047 2.64423 7.10951 2.63879C7.06855 2.63336 7.02922 2.61926 6.99413 2.59745C6.95905 2.57563 6.92901 2.54658 6.90602 2.51225C6.84928 2.42783 6.76606 2.3647 6.66948 2.3328V3.14847C7.07731 3.23819 7.3492 3.3551 7.48514 3.49784C7.55539 3.56718 7.61088 3.65002 7.64826 3.74137C7.68564 3.83272 7.70414 3.93069 7.70265 4.02938C7.71134 4.23894 7.64208 4.44429 7.50826 4.60579Z"
                      fill="#7096FF" />
                  </svg>
                  Продать
                </Link>
              </li>
              <li>
                <Link to="#">
                  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M15.2644 0.509241C15.2018 0.207081 14.8997 0.085957 14.6014 0.144566L11.7648 1.22948C11.6794 1.25614 11.6019 1.30333 11.539 1.3669C11.4761 1.43048 11.4297 1.50851 11.404 1.59415L9.35791 8.27423H2.54368C2.30404 7.554 1.098 3.21696 1.098 3.21696C0.978182 2.92001 0.676023 2.73507 0.436378 2.85228C0.292232 2.88435 0.1667 2.97231 0.0873402 3.09684C0.00798027 3.22138 -0.0187224 3.37231 0.013094 3.51651L1.5838 8.93195C1.61565 9.0518 1.68585 9.15793 1.78369 9.23413C1.88152 9.31032 2.00161 9.3524 2.12561 9.35393H8.99845C8.8682 9.83973 8.69498 10.5027 8.57125 10.8621H2.05919C1.98811 10.8614 1.9176 10.8748 1.85174 10.9016C1.78588 10.9283 1.72596 10.9678 1.67546 11.0178C1.62496 11.0678 1.58487 11.1274 1.55752 11.193C1.53016 11.2586 1.51608 11.3289 1.51608 11.4C1.51608 11.7074 1.75572 11.8845 2.05919 11.8845H8.99845C9.11354 11.885 9.22613 11.851 9.32175 11.7869C9.41738 11.7229 9.49165 11.6317 9.53504 11.5251L10.2605 8.93195C10.3816 8.6337 12.2441 2.61264 12.3743 2.19456C12.7924 2.01744 14.9622 1.17217 14.9622 1.17217C15.0705 1.14899 15.1668 1.08774 15.2337 0.999546C15.3006 0.911354 15.3337 0.802077 15.3269 0.691579C15.3314 0.658418 15.3281 0.624664 15.3172 0.593008C15.3064 0.561352 15.2883 0.532668 15.2644 0.509241ZM2.36135 12.3026C2.04226 12.3053 1.73717 12.434 1.51252 12.6606C1.28786 12.8873 1.16181 13.1934 1.16182 13.5125C1.17216 13.8279 1.3017 14.1276 1.52431 14.3512C1.74693 14.5747 2.04605 14.7056 2.36135 14.7173C2.67722 14.7064 2.97735 14.5767 3.20168 14.354C3.42601 14.1314 3.55802 13.8322 3.57129 13.5164C3.56924 13.1962 3.44111 12.8896 3.21464 12.6632C2.98817 12.4367 2.68161 12.3086 2.36135 12.3065V12.3026ZM8.87341 12.3026C8.55351 12.3047 8.24736 12.4329 8.02151 12.6595C7.79567 12.8861 7.6684 13.1926 7.66738 13.5125C7.67872 13.8287 7.80946 14.1287 8.03326 14.3523C8.25706 14.5759 8.55728 14.7063 8.87341 14.7173C9.18867 14.706 9.48802 14.576 9.71145 14.3533C9.93487 14.1306 10.0659 13.8317 10.0781 13.5164C10.0771 13.1968 9.95004 12.8904 9.72447 12.6639C9.49891 12.4373 9.19309 12.3089 8.87341 12.3065V12.3026Z"
                      fill="#7096FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M6.47045 7.24272L8.75098 4.4803C8.79153 4.43106 8.81722 4.37129 8.82506 4.30798C8.83289 4.24467 8.82255 4.18044 8.79523 4.1228C8.76791 4.06515 8.72474 4.01647 8.67078 3.98246C8.61682 3.94844 8.55429 3.93048 8.4905 3.93068H4.45301C4.38922 3.93048 4.32669 3.94844 4.27273 3.98246C4.21877 4.01647 4.1756 4.06515 4.14828 4.1228C4.12096 4.18044 4.11061 4.24467 4.11845 4.30798C4.12629 4.37129 4.15198 4.43106 4.19253 4.4803L6.47045 7.24272Z"
                      fill="#7096FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.77288 4.02706C7.77288 4.02706 8.42409 -1.90735e-06 0.349121 -1.90735e-06C0.349121 -1.90735e-06 5.03781 1.34279 5.03781 4.02706"
                      fill="#7096FF" />
                  </svg>
                  Купить
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleToggle} ref={anchorRef} >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.3815 2.44441H13.5716V1.64472C13.5768 1.43131 13.5355 1.21935 13.4505 1.02383C13.3656 0.828299 13.2392 0.653968 13.0801 0.513148C12.957 0.421299 12.816 0.356922 12.6663 0.324292C12.5166 0.291661 12.3618 0.291523 12.2121 0.323886L1.55906 2.44441C1.21738 2.45759 0.89323 2.60042 0.651449 2.84433C0.409668 3.08823 0.268083 3.41523 0.255015 3.75991V12.374C0.258077 12.5506 0.295923 12.7249 0.366352 12.8866C0.436781 13.0484 0.538389 13.1944 0.665264 13.3162C0.79214 13.438 0.941753 13.5331 1.1054 13.5961C1.26905 13.659 1.44347 13.6885 1.61852 13.6828H14.3815C14.5565 13.6883 14.7307 13.6587 14.8942 13.5957C15.0577 13.5327 15.2072 13.4375 15.3339 13.3157C15.4607 13.194 15.5621 13.048 15.6325 12.8863C15.7028 12.7247 15.7406 12.5505 15.7437 12.374V3.75991C15.7437 3.07217 15.1214 2.44441 14.3815 2.44441ZM12.3389 0.822363C12.5212 0.762386 12.6494 0.886339 12.7723 0.955646C12.9584 1.13446 13.0687 1.37901 13.0801 1.63805V2.43775H4.28342L12.3389 0.822363ZM14.3815 13.1803H1.61852C1.40829 13.1767 1.2075 13.0916 1.05772 12.9427C0.907945 12.7939 0.820643 12.5926 0.813892 12.3806V3.75991C0.817582 3.5453 0.903377 3.34044 1.05334 3.18817C1.2033 3.0359 1.40581 2.94802 1.61852 2.94289H14.3815C14.5944 2.94736 14.7973 3.03504 14.9474 3.18745C15.0975 3.33986 15.1831 3.54509 15.1862 3.75991V5.13405H9.05039C8.98643 5.13845 8.92623 5.16616 8.88102 5.21202C8.83581 5.25787 8.80867 5.31875 8.80465 5.38329V10.7506C8.80867 10.8151 8.83581 10.876 8.88102 10.9219C8.92623 10.9677 8.98643 10.9954 9.05039 10.9998H15.1862V12.374C15.18 12.5862 15.0929 12.7878 14.943 12.9368C14.7931 13.0858 14.592 13.1707 14.3815 13.1737V13.1803ZM15.1862 5.6312V10.5013H9.30275V5.6312H15.1862ZM14.3815 13.8627H1.61852C1.2277 13.8576 0.854155 13.6995 0.576798 13.4217C0.299441 13.1439 0.139994 12.7682 0.132141 12.374V3.75991C0.132141 2.94289 0.749152 2.32579 1.55906 2.25648L12.1553 0.134625H12.4023C12.6919 0.121191 12.9769 0.211349 13.207 0.389195C13.5394 0.721787 13.7385 1.16652 13.7658 1.63805V2.25648H14.3868C14.7791 2.2634 15.1532 2.4243 15.4298 2.70502C15.7063 2.98574 15.8635 3.36417 15.8679 3.75991V12.374C15.86 12.7682 15.7006 13.1439 15.4232 13.4217C15.1459 13.6995 14.7723 13.8576 14.3815 13.8627ZM12.3971 0.449172H12.2108L1.61852 2.58169H1.55906C1.26093 2.60252 0.98124 2.73485 0.774743 2.95278C0.568246 3.1707 0.449813 3.45853 0.442628 3.75991V12.374C0.442628 12.5297 0.473053 12.6839 0.532163 12.8277C0.591273 12.9716 0.677909 13.1022 0.787118 13.2123C0.896327 13.3223 1.02597 13.4096 1.16862 13.469C1.31128 13.5285 1.46416 13.559 1.61852 13.5588H14.3815C14.6899 13.5488 14.9829 13.4208 15.2011 13.2007C15.4193 12.9806 15.5462 12.685 15.5561 12.374V3.75991C15.5471 3.44852 15.4205 3.15237 15.2021 2.9321C14.9838 2.71182 14.6902 2.58408 14.3815 2.57503H13.4567V1.64205C13.4523 1.44785 13.4053 1.25704 13.3192 1.0833C13.2331 0.909551 13.1099 0.757179 12.9586 0.6371C12.8035 0.504054 12.6027 0.437976 12.3997 0.45317L12.3971 0.449172ZM14.3789 13.3096H1.61852C1.49657 13.3114 1.37551 13.2885 1.26249 13.2422C1.14948 13.196 1.04682 13.1273 0.960578 13.0403C0.87434 12.9534 0.806282 12.8498 0.760434 12.7358C0.714586 12.6218 0.69188 12.4996 0.693661 12.3766V3.75991C0.691328 3.63674 0.713656 3.51437 0.759308 3.40011C0.80496 3.28585 0.872998 3.18206 0.959348 3.09495C1.0457 3.00785 1.14858 2.93921 1.26185 2.89316C1.37511 2.8471 1.49642 2.82458 1.61852 2.82693H14.3815C14.8757 2.82693 15.3738 3.2601 15.3738 3.75991V5.25401H9.05039C9.01698 5.25637 8.9857 5.27145 8.96289 5.2962C8.94008 5.32094 8.92744 5.3535 8.92752 5.38729V10.7506C8.92968 10.7827 8.94332 10.813 8.96591 10.8358C8.98851 10.8586 9.01852 10.8724 9.05039 10.8745H15.3738V12.374C15.3738 12.8711 14.8757 13.3069 14.3815 13.3069L14.3789 13.3096ZM1.61852 3.13215C1.4472 3.13025 1.28155 3.19399 1.15501 3.3105C1.02847 3.42702 0.950475 3.58763 0.936766 3.75991V12.374C0.936766 12.6818 1.24725 12.9964 1.61852 12.9964H14.3815C14.5454 12.9957 14.7025 12.9301 14.8189 12.8136C14.9353 12.6972 15.0017 12.5393 15.0038 12.374V11.1891H9.05039C8.9933 11.19 8.93662 11.1793 8.88376 11.1575C8.8309 11.1357 8.78296 11.1033 8.74284 11.0624C8.70271 11.0214 8.67123 10.9726 8.65029 10.9191C8.62935 10.8655 8.61938 10.8082 8.621 10.7506V5.38329C8.61938 5.32572 8.62935 5.26841 8.65029 5.21482C8.67123 5.16124 8.70271 5.11249 8.74284 5.07151C8.78296 5.03053 8.8309 4.99818 8.88376 4.9764C8.93662 4.95462 8.9933 4.94387 9.05039 4.94479H15.0038V3.75991C15.0038 3.67747 14.9877 3.59584 14.9565 3.51968C14.9252 3.44351 14.8793 3.37431 14.8216 3.31602C14.7638 3.25772 14.6952 3.21148 14.6197 3.17994C14.5442 3.14839 14.4632 3.13215 14.3815 3.13215H1.61852ZM15.3738 10.6213H9.17987V5.50191H15.3738V10.6213ZM9.48508 10.3121H15.0038V5.82179H9.48508V10.3121ZM13.2017 2.58169H4.28342V2.25648L12.2742 0.702409C12.3389 0.633102 12.3389 0.633102 12.3971 0.633102C12.4788 0.630996 12.56 0.64683 12.635 0.679509C12.7101 0.712188 12.7772 0.760931 12.8317 0.822363C12.9516 0.920339 13.0473 1.04495 13.1115 1.18645C13.1757 1.32796 13.2065 1.48252 13.2017 1.63805V2.58169ZM5.82793 2.25648H12.8912V1.63805C12.8758 1.42604 12.7907 1.22528 12.6494 1.0676C12.6178 1.03122 12.5791 1.00188 12.5356 0.98146C12.4922 0.961036 12.445 0.949974 12.3971 0.948982H12.3389L5.82793 2.25648ZM12.1553 9.37644C12.3296 9.38204 12.5032 9.35225 12.6659 9.28883C12.8285 9.22541 12.9769 9.12966 13.1022 9.00726C13.2274 8.88486 13.327 8.73831 13.3951 8.57632C13.4631 8.41433 13.4981 8.2402 13.4981 8.06427C13.4981 7.88835 13.4631 7.71422 13.3951 7.55223C13.327 7.39024 13.2274 7.24369 13.1022 7.12129C12.9769 6.99889 12.8285 6.90313 12.6659 6.83971C12.5032 6.77629 12.3296 6.7465 12.1553 6.75211C11.9784 6.74225 11.8014 6.76889 11.6351 6.83038C11.4688 6.89187 11.3167 6.98693 11.188 7.10974C11.0594 7.23255 10.9569 7.38055 10.8869 7.54467C10.8168 7.70879 10.7807 7.88559 10.7807 8.06427C10.7807 8.24295 10.8168 8.41976 10.8869 8.58388C10.9569 8.748 11.0594 8.89599 11.188 9.0188C11.3167 9.14162 11.4688 9.23668 11.6351 9.29817C11.8014 9.35966 11.9784 9.38629 12.1553 9.37644ZM12.1553 7.25458C12.257 7.25711 12.3571 7.28018 12.4498 7.32242C12.5425 7.36467 12.6259 7.42523 12.695 7.50052C12.7641 7.57582 12.8175 7.66433 12.8521 7.76081C12.8867 7.8573 12.9018 7.95981 12.8965 8.06227C12.8965 8.49944 12.5899 8.87796 12.1553 8.87796C11.9419 8.87796 11.7372 8.79245 11.5863 8.64022C11.4354 8.488 11.3506 8.28155 11.3506 8.06627C11.3506 7.851 11.4354 7.64454 11.5863 7.49232C11.7372 7.3401 11.9419 7.25458 12.1553 7.25458ZM12.1553 9.56037C11.9568 9.56635 11.7591 9.53207 11.574 9.45957C11.3889 9.38708 11.2201 9.27783 11.0776 9.13832C10.9351 8.9988 10.8218 8.83185 10.7445 8.64736C10.6671 8.46287 10.6273 8.26459 10.6273 8.06427C10.6273 7.86396 10.6671 7.66568 10.7445 7.48119C10.8218 7.29669 10.9351 7.12974 11.0776 6.99023C11.2201 6.85071 11.3889 6.74147 11.574 6.66897C11.7591 6.59647 11.9568 6.5622 12.1553 6.56818C12.5353 6.588 12.8934 6.75428 13.1554 7.03268C13.4175 7.31107 13.5636 7.68035 13.5636 8.06427C13.5636 8.4482 13.4175 8.81747 13.1554 9.09587C12.8934 9.37427 12.5353 9.54054 12.1553 9.56037ZM12.1553 6.87606C11.8504 6.88637 11.5614 7.01579 11.3494 7.237C11.1373 7.45821 11.0188 7.75389 11.0188 8.06161C11.0188 8.36933 11.1373 8.665 11.3494 8.88621C11.5614 9.10742 11.8504 9.23684 12.1553 9.24716C12.4645 9.23817 12.7586 9.11061 12.9778 8.89046C13.1971 8.67031 13.3248 8.37414 13.3351 8.06227C13.3245 7.75038 13.1967 7.45424 12.9776 7.23394C12.7585 7.01364 12.4645 6.88569 12.1553 6.87606ZM12.1553 8.99792C11.91 8.99792 11.6747 8.89962 11.5013 8.72465C11.3279 8.54969 11.2304 8.31238 11.2304 8.06494C11.2304 7.8175 11.3279 7.58019 11.5013 7.40522C11.6747 7.23026 11.91 7.13196 12.1553 7.13196C12.4006 7.13196 12.6358 7.23026 12.8092 7.40522C12.9827 7.58019 13.0801 7.8175 13.0801 8.06494C13.0801 8.31238 12.9827 8.54969 12.8092 8.72465C12.6358 8.89962 12.4006 8.99792 12.1553 8.99792ZM12.1553 7.43851C11.7866 7.43851 11.4748 7.69308 11.4748 8.06227C11.4748 8.43147 11.7866 8.6887 12.1553 8.6887C12.3196 8.6887 12.4772 8.62284 12.5934 8.50562C12.7096 8.38839 12.7749 8.22939 12.7749 8.06361C12.7749 7.89782 12.7096 7.73882 12.5934 7.6216C12.4772 7.50437 12.3196 7.43851 12.1553 7.43851Z"
                      fill="#7096FF" />
                    <path
                      d="M14.3815 13.996H1.6185C1.19264 13.9909 0.785504 13.8187 0.483373 13.5159C0.181243 13.2131 0.00786918 12.8035 0 12.374L0 3.75991C0 2.89091 0.647399 2.2045 1.53922 2.12453L12.1381 0.00134191H12.4023C12.721 -0.0129063 13.0345 0.0866758 13.2875 0.282568L13.3007 0.294564C13.6572 0.65277 13.8699 1.13125 13.8979 1.63805V2.1232H14.3868C14.8139 2.1308 15.2212 2.30596 15.5224 2.61153C15.8236 2.9171 15.9949 3.32903 16 3.75991V12.374C15.9921 12.8035 15.8188 13.2131 15.5166 13.5159C15.2145 13.8187 14.8074 13.9909 14.3815 13.996ZM1.6185 3.26543C1.48205 3.26311 1.34974 3.31269 1.24789 3.40432C1.14604 3.49595 1.08213 3.6229 1.06887 3.75991V12.374C1.08423 12.5097 1.14893 12.6348 1.25046 12.7251C1.35198 12.8155 1.48312 12.8647 1.6185 12.8631H14.3815C14.5103 12.8621 14.6336 12.8104 14.7251 12.719C14.8167 12.6277 14.8693 12.5039 14.8717 12.374V11.3224H9.05037C8.97583 11.3237 8.90181 11.3097 8.83276 11.2814C8.76371 11.253 8.70106 11.2108 8.64859 11.1574C8.59612 11.104 8.55492 11.0404 8.52747 10.9705C8.50002 10.9006 8.48688 10.8258 8.48885 10.7506V5.38329C8.48688 5.30811 8.50002 5.23331 8.52747 5.16339C8.55492 5.09347 8.59612 5.02988 8.64859 4.97646C8.70106 4.92303 8.76371 4.88087 8.83276 4.85252C8.90181 4.82418 8.97583 4.81022 9.05037 4.81151H14.8717V3.75991C14.8713 3.62888 14.8196 3.50331 14.7277 3.41065C14.6359 3.31799 14.5114 3.26578 14.3815 3.26543H1.6185ZM9.61718 10.1788H14.8717V5.95507H9.61718V10.1788ZM1.71759 2.69098H4.15128V2.20184L1.71759 2.69098ZM5.61784 2.31113H5.81866L5.81338 2.26715L5.61784 2.31113ZM7.17027 2.1232H12.759V1.63805C12.7427 1.46139 12.6699 1.29486 12.5516 1.16357C12.5328 1.13959 12.5089 1.12012 12.4817 1.10652C12.4545 1.09293 12.4247 1.08556 12.3944 1.08493H12.3481L7.17027 2.1232ZM12.1552 9.69365C11.8334 9.70614 11.5151 9.62129 11.2414 9.45C10.9676 9.2787 10.7509 9.02879 10.619 8.73233C10.4871 8.43587 10.446 8.10641 10.5011 7.78624C10.5561 7.46606 10.7048 7.1698 10.9279 6.93547C11.1511 6.70115 11.4386 6.53946 11.7536 6.47117C12.0685 6.40287 12.3965 6.4311 12.6954 6.55221C12.9943 6.67332 13.2505 6.88179 13.4311 7.15086C13.6117 7.41993 13.7085 7.73732 13.709 8.06227C13.7137 8.48537 13.5535 8.89341 13.2629 9.19853C12.9723 9.50365 12.5745 9.68145 12.1552 9.69365ZM12.1552 7.57179C12.087 7.56636 12.0184 7.57486 11.9536 7.59678C11.8887 7.61871 11.8289 7.65361 11.7777 7.6994C11.7265 7.74519 11.685 7.80093 11.6557 7.86328C11.6263 7.92563 11.6097 7.99331 11.6069 8.06227C11.6069 8.38615 11.8831 8.55542 12.1552 8.55542C12.2845 8.55542 12.4086 8.5036 12.5 8.41137C12.5914 8.31914 12.6428 8.19404 12.6428 8.0636C12.6428 7.93317 12.5914 7.80807 12.5 7.71584C12.4086 7.62361 12.2845 7.57179 12.1552 7.57179Z"
                      fill="#7096FF" />
                  </svg>
                  Оплатить
                </Link>

                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  style={{ zIndex: 1 }}
                // disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu" style={{ display: "block" }}>
                            {payOptions.map((option, index) => (
                              <MenuItem
                                style={{ maxWidth: "100%" }}
                                key={option.name}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                              >
                                <Link to={option.link}>{option.name}</Link>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </li>
              <li>
                <Link to="#" onClick={handleToggleReceive} ref={anchorReceiveRef}>
                  <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.49933 14.9858C4.27818 14.9868 4.05955 14.9389 3.85907 14.8455C3.65859 14.7522 3.48121 14.6157 3.33961 14.4458L0.203391 10.6345C0.0961119 10.5046 0.0279825 10.3469 0.00695033 10.1798C-0.0140818 10.0126 0.0128505 9.84291 0.0846054 9.69049C0.15636 9.53806 0.269979 9.40918 0.412207 9.31888C0.554435 9.22858 0.719407 9.18059 0.887878 9.1805H1.46166V1.50803C1.46237 1.10853 1.6213 0.725574 1.90366 0.442956C2.18603 0.160339 2.56884 0.00107042 2.96834 0C4.17957 0.000714958 5.341 0.482098 6.1976 1.33844C7.05419 2.19478 7.53592 3.35607 7.53699 4.5673V9.1805H8.11077C8.27936 9.18034 8.44451 9.22814 8.58694 9.31834C8.72937 9.40854 8.84319 9.5374 8.91511 9.68988C8.98703 9.84235 9.01408 10.0121 8.99309 10.1794C8.97211 10.3467 8.90396 10.5045 8.79661 10.6345L5.66039 14.435C5.51957 14.6069 5.34241 14.7454 5.14165 14.8407C4.9409 14.9359 4.72153 14.9855 4.49933 14.9858ZM1.29425 10.2606L4.17261 13.7465C4.21224 13.795 4.26217 13.8342 4.3188 13.861C4.37542 13.8879 4.43732 13.9019 4.5 13.9019C4.56268 13.9019 4.62458 13.8879 4.6812 13.861C4.73783 13.8342 4.78776 13.795 4.82739 13.7465L7.70575 10.2606H6.45693V4.5673C6.45622 3.64241 6.0884 2.75563 5.43428 2.10176C4.78015 1.44789 3.89323 1.08042 2.96834 1.08006C2.85471 1.08006 2.74572 1.12511 2.66524 1.20533C2.58477 1.28555 2.53938 1.3944 2.53902 1.50803V10.2606H1.29425Z"
                      fill="#7096FF" />
                  </svg>
                  Принять
                </Link>
                <Popper
                  open={openReceive}
                  anchorEl={anchorReceiveRef.current}
                  role={undefined}
                  transition
                  style={{ zIndex: 1 }}
                // disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleCloseReceive}>
                          <MenuList id="split-button-menu" style={{ display: "block" }}>
                            {receiveOptions.map((option, index) => (
                              <MenuItem
                                style={{ maxWidth: "100%" }}
                                key={option.name}
                                selected={index === selectedReceiveIndex}
                                onClick={(event) => handleMenuItemClickReceive(event, index)}
                              >
                                <Link to={option.link} style={{ color: 'black' }}>{option.name}</Link>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </li>
              <li>
                <Link to="#">
                  <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.02795 14.9756C4.81716 14.9742 3.65643 14.4923 2.80065 13.6357C1.94488 12.7792 1.46401 11.6181 1.46365 10.4073V5.80114H0.89025C0.721145 5.80135 0.555485 5.75334 0.412705 5.66273C0.269924 5.57212 0.155945 5.44267 0.0841388 5.28957C0.0123322 5.13646 -0.0143236 4.96606 0.00729827 4.79834C0.0289202 4.63062 0.0979231 4.47255 0.206212 4.34267L3.34037 0.546055C3.48152 0.375253 3.65866 0.237739 3.85912 0.143343C4.05958 0.0489472 4.27842 0 4.5 0C4.72158 0 4.94042 0.0489472 5.14088 0.143343C5.34134 0.237739 5.51848 0.375253 5.65962 0.546055L8.79378 4.34267C8.90215 4.47264 8.97117 4.63084 8.99274 4.79868C9.01432 4.96652 8.98755 5.13703 8.91557 5.29018C8.8436 5.44333 8.72942 5.57276 8.58644 5.66327C8.44346 5.75378 8.27762 5.80161 8.1084 5.80114H7.53499V13.4632C7.53535 13.6614 7.49665 13.8578 7.4211 14.0411C7.34556 14.2244 7.23465 14.3911 7.09471 14.5315C6.95477 14.6719 6.78853 14.7835 6.6055 14.8597C6.42246 14.9359 6.22621 14.9753 6.02795 14.9756ZM1.29635 4.72179H2.543V10.4073C2.543 11.3319 2.91004 12.2187 3.56348 12.8729C4.21691 13.5271 5.10331 13.8952 6.02795 13.8963C6.14151 13.8959 6.25029 13.8505 6.33046 13.7701C6.41063 13.6897 6.45565 13.5808 6.45564 13.4672V4.72179H7.70364L4.82718 1.23279C4.7873 1.18469 4.7373 1.14597 4.68075 1.1194C4.6242 1.09282 4.56248 1.07904 4.5 1.07904C4.43751 1.07904 4.3758 1.09282 4.31925 1.1194C4.2627 1.14597 4.2127 1.18469 4.17282 1.23279L1.29635 4.72179Z"
                      fill="#7096FF" />
                  </svg>
                  Возврат
                </Link>
              </li>
              <li>
                <Link to="#">
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.1025 2.13318C14.1215 1.02806 12.8796 0.370285 11.1063 0.172491H10.0576C8.29468 0.438133 6.98487 1.09246 5.99935 2.13318H5.8648C2.59776 2.66101 0.699169 4.49175 0.172485 7.81975V8.86851C0.699169 12.1375 2.59661 14.0345 5.8648 14.5597H6.91357C8.68221 14.2986 9.92418 13.5788 10.9097 12.5978L10.9718 12.5346H11.1029C12.8715 12.4001 14.1181 11.679 15.099 10.636C16.2027 9.49994 16.8135 7.9742 16.7987 6.39034C16.8021 4.49175 16.0822 3.1141 15.1025 2.13318ZM8.48787 13.3177C7.42615 13.731 6.26608 13.8218 5.15298 13.5788C3.11984 13.0567 1.68009 11.679 1.14995 9.71834C0.892362 8.67532 0.892362 7.29766 1.3512 6.32479C1.69398 5.43425 2.28655 4.6616 3.05774 4.09962C3.8566 3.43829 4.8333 3.02817 5.8648 2.9209C7.83239 2.79096 9.27215 3.57293 10.1898 4.49175C11.1075 5.41057 11.8941 6.77673 11.763 8.73972C11.633 11.0327 10.1933 12.5978 8.48787 13.3177ZM12.6818 11.3559C12.3638 11.4945 12.0335 11.6027 11.6951 11.679C12.2927 10.6714 12.6103 9.52249 12.6151 8.35103C12.6151 6.45244 11.8952 5.01614 10.9143 4.03177C9.90965 3.00785 8.5974 2.34102 7.17806 2.13318L7.24476 2.06993C8.05894 1.45256 9.03767 1.09004 10.0576 1.02806C12.024 0.82912 13.4638 1.549 14.3826 2.52992C15.3026 3.44299 16.1501 4.81489 16.0201 6.77673C15.9334 7.77162 15.5766 8.72392 14.9882 9.53091C14.3999 10.3379 13.6024 10.9689 12.6818 11.3559Z"
                      fill="#7096FF" />
                    <path
                      d="M6.92968 14.731H5.84181C2.50577 14.1974 0.540483 12.2368 0 8.90072V8.87312V7.7979C0.534733 4.41816 2.44367 2.50807 5.83951 1.96299H5.86596H5.92346C6.94808 0.905021 8.29123 0.264492 10.0323 0H10.0576H11.1259C12.8773 0.195494 14.1813 0.836023 15.2278 2.01359C16.387 3.1762 16.9746 4.64815 16.9746 6.3892C16.9886 8.01694 16.361 9.58473 15.2278 10.7533C14.1112 11.9412 12.7669 12.5794 11.119 12.7082H11.0465L11.035 12.7209C9.91843 13.8318 8.57988 14.4895 6.94233 14.731H6.92968ZM5.88206 14.386H6.89978C8.47638 14.156 9.71259 13.5443 10.7867 12.4748L10.9017 12.3598H11.0971C12.6737 12.2379 13.9065 11.6514 14.9748 10.5199C16.0462 9.41402 16.6398 7.93119 16.6273 6.3915C16.6273 4.74245 16.073 3.35214 14.9783 2.25163L14.9714 2.24473C13.9882 1.13731 12.7554 0.532433 11.0971 0.344989H10.0714C8.38668 0.600281 7.09527 1.22471 6.1247 2.25163L6.07411 2.30568H5.88206C2.66677 2.82891 0.855573 4.6378 0.344989 7.83815V8.85472C0.859023 12.0183 2.72196 13.8778 5.88206 14.386ZM6.36505 13.8858C5.94291 13.8874 5.52198 13.8407 5.11044 13.7467C2.9945 13.2027 1.5306 11.7917 0.986668 9.76319C0.756676 8.84322 0.671579 7.36782 1.19251 6.25465C1.54715 5.3375 2.15836 4.54185 2.95311 3.96277C3.77893 3.28323 4.78625 2.86135 5.84986 2.74956C8.17509 2.59547 9.64474 3.69828 10.3152 4.36986C11.4996 5.56467 12.0493 7.03893 11.9355 8.74892C11.8205 10.866 10.5555 12.6335 8.55458 13.4764C7.85682 13.7488 7.11409 13.8877 6.36505 13.8858ZM6.30295 3.07615C6.1661 3.07615 6.02466 3.07615 5.87976 3.08995C4.88324 3.19526 3.93976 3.59161 3.167 4.22957C2.41912 4.7733 1.84444 5.52171 1.5122 6.3846V6.3961C1.02692 7.43106 1.10856 8.81102 1.32591 9.67694C1.83534 11.5732 3.2107 12.8968 5.19668 13.4109C6.27489 13.646 7.39848 13.558 8.42693 13.1579C10.2991 12.3667 11.4835 10.7108 11.5962 8.72822C11.7032 7.11827 11.1914 5.73832 10.076 4.61365C9.58271 4.11716 8.99427 3.72537 8.34594 3.46177C7.69761 3.19817 7.00273 3.06818 6.30295 3.0796V3.07615ZM11.3628 11.9159L11.5514 11.5893C12.1323 10.6074 12.4411 9.48846 12.4461 8.34758C12.4461 6.24315 11.5491 4.90344 10.7959 4.15137C9.81612 3.15187 8.53549 2.50145 7.15047 2.29993L6.80548 2.24358L7.15047 1.92734C8.07044 1.25806 9.02376 0.906171 10.0541 0.850973C11.8205 0.672729 13.4074 1.22471 14.5137 2.40687C15.7361 3.63273 16.3042 5.10699 16.1926 6.78478C16.1022 7.81133 15.7338 8.79384 15.127 9.62676C14.5202 10.4597 13.6979 11.1115 12.7485 11.5123L12.6852 11.3513L12.7404 11.5157C12.4144 11.6564 12.076 11.7665 11.7296 11.8446L11.3628 11.9159ZM7.60011 2.03659C8.90769 2.30427 10.1054 2.95661 11.0396 3.90988C11.8446 4.71485 12.791 6.12816 12.791 8.35103C12.7888 9.41662 12.5317 10.4662 12.0413 11.4122C12.2287 11.3524 12.4185 11.2765 12.6162 11.1995L12.6887 11.3559L12.6208 11.1972C13.5123 10.8214 14.2845 10.2098 14.8544 9.42817C15.4244 8.64649 15.7705 7.72428 15.8557 6.76063C15.9592 5.18748 15.4256 3.80408 14.2676 2.65182C13.2246 1.54555 11.74 1.03497 10.0748 1.19941C9.18935 1.24931 8.33403 1.53866 7.60011 2.03659Z"
                      fill="#7096FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.86481 6.89058C5.86481 6.61919 6.1362 6.3915 6.36275 6.34895C6.86068 6.30525 7.13552 6.75259 7.26892 7.11712C7.58631 7.02743 7.86115 6.84688 8.17509 6.75259C8.04169 6.03156 7.49661 5.62332 6.81813 5.44623V4.8977H6.0948V5.48993C4.6907 5.53363 4.28361 7.34482 5.09894 8.15669C5.63482 8.70177 7.04697 8.73972 7.13667 9.3331C7.31721 10.0576 6.2742 10.3255 5.77626 9.83104C5.63482 9.65049 5.63482 9.4665 5.55202 9.19971C5.18863 9.28596 4.87009 9.4228 4.50555 9.4665C4.68955 10.3255 5.23118 10.8741 6.09365 11.0534V11.7296H6.81928C6.81928 11.4996 6.72843 11.142 6.81928 10.958C8.40278 10.9143 8.76732 8.92257 7.8623 8.15439C7.31721 7.66221 5.86481 7.56906 5.86481 6.89058Z"
                      fill="#7096FF" />
                  </svg>
                  Инвестиция
                </Link>
              </li>
            </ul>
            <div className="wrapper__search">
              <form>
                <input type="text" placeholder="Поиск" />
                <button type="submit"></button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
export default Header;