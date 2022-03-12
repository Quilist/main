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

const payOptions = [
  { name: 'Поставщику', link: '/pay_supplier'},
  { name: 'Клиенту(возврат)', link: '/pay_customer'},
  { name: 'Прочий расход', link: '/expend'},
  { name: 'Зарплата', link: '/salary'},
  { name: 'Собственнику', link: '/pay_owner'},
];

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

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
            <Link to='#'>
              <div className={styles.wrapper}>
                <IconButton onClick={handleToggle} className={styles.nav__button} style={{ background: '#fff', height: '47px', width: '47px' }} sx={{ p: 0 }}>
                  <img className={styles.nav__img} src={PayImg} alt="" />
                </IconButton>
                <span onClick={handleToggle} className={styles.wrapper__text}>Оплатить</span>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                </ButtonGroup>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
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
                          <MenuList id="split-button-menu">
                            {payOptions.map((option, index) => (
                              <MenuItem
                                key={option.name}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
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