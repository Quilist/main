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

import styles from './Header.module.css'


const Header = () => {
  return (
    <AppBar position="fixed" className={styles.header}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "none" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box className={styles.container} sx={{ flexGrow: 1, display: 'flex'}}>
            <Link to='/sell'>
              <div className={styles.wrapper}>
                <IconButton className={styles.nav__button} style={{ background: '#fff', height: '47px', width: '47px' }} sx={{ p: 0 }}>
                  <img className={styles.nav__img} src={SellImg} alt="" />
                </IconButton>
                <span className={styles.wrapper__text}>Продать</span>
              </div>
            </Link>
            <Link to='/buy'>
              <div className={styles.wrapper}>
                <IconButton className={styles.nav__button} style={{ background: '#fff', height: '47px', width: '47px' }} sx={{ p: 0 }}>
                  <img className={styles.nav__img} src={BuyImg} alt="" />
                </IconButton>
                <span className={styles.wrapper__text}>Купить</span>
              </div>
            </Link>
            <Link to='/pay'>
              <div className={styles.wrapper}>
                <IconButton className={styles.nav__button} style={{ background: '#fff', height: '47px', width: '47px' }} sx={{ p: 0 }}>
                  <img className={styles.nav__img} src={PayImg} alt="" />
                </IconButton>
                <span className={styles.wrapper__text}>Оплатить</span>
              </div>
            </Link>
            <Link to='/accept'>
              <div className={styles.wrapper}>
                <IconButton className={styles.nav__button} style={{ background: '#fff', height: '47px', width: '47px' }} sx={{ p: 0 }}>
                  <img className={styles.nav__img} src={AcceptImg} alt="" />
                </IconButton>
                <span className={styles.wrapper__text}>Принять</span>
              </div>
            </Link>
            <Link to='/retrieve' className={styles.nav__wide}> 
              <div className={styles.wrapper}>
                <IconButton className={styles.nav__button} style={{ background: '#fff', height: '47px', width: '47px' }} sx={{ p: 0 }}>
                  <img className={styles.nav__img} src={ReturnImg} alt="" />
                </IconButton>
                <span className={styles.wrapper__text}>Возврат</span>
              </div>
            </Link>
            <Link to='/inventory' className={styles.nav__wide}>
              <div className={styles.wrapper}>
                <IconButton className={styles.nav__button} style={{ background: '#fff', height: '47px', width: '47px' }} sx={{ p: 0 }}>
                  <img className={styles.nav__img} src={IntervezationImg} alt="" />
                </IconButton>
                <span className={styles.wrapper__text}>Инвентаризация</span>
              </div>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;