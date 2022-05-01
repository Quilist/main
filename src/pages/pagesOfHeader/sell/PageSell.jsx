import * as React from 'react';

import { Link } from 'react-router-dom';

import PageSell from './components/PageSell'

import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';

import Share from '../sell/img/share1.svg'



const receiveOptions = [
    { name: 'Печатать', link: '/sell' },
    { name: 'Отправить', link: '/sell' },
];
function PageSellWrap() {
    const [openReceive, setOpenReceive] = React.useState(false);
    const anchorReceiveRef = React.useRef(null);
    const [selectedReceiveIndex, setSelectedReceiveIndex] = React.useState(1);
    const [item, setItem] = React.useState({});


    React.useEffect(() => {
        document.title = "Закупка"
    }, [])

    const handleCloseReceive = (event) => {
        if (anchorReceiveRef.current && anchorReceiveRef.current.contains(event.target)) {
            return;
        }
        setOpenReceive(false);
    };

    const handleMenuItemClickReceive = (event, index) => {
        setSelectedReceiveIndex(index);
        setOpenReceive(false);
    };

    const handleToggleReceive = () => {
        setOpenReceive((prevOpen) => !prevOpen);
    };

    return <>
        <section className='home-section'>
            <div class="wrapper__setting">
                <a href="/#" class="btn btn-green">
                    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.51804 8.31521L11.875 0.958252L12.9944 2.07767L4.51804 10.554L0 6.036L1.11942 4.91659L4.51804 8.31521Z" fill="white" />
                    </svg> Сохранить
                </a>

                <div class="wrapper__setting_btns">
                    <img onClick={handleToggleReceive} src={Share} alt="Logo" />
                    <ButtonGroup variant="contained" ref={anchorReceiveRef} aria-label="split button">
                    </ButtonGroup>
                    <Popper
                        open={openReceive}
                        anchorEl={anchorReceiveRef.current}
                        role={undefined}
                        transition
                        style={{ paddingRight: 10 }}
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
                                        <MenuList id="split-button-menu">
                                            {receiveOptions.map((option, index) => (
                                                <MenuItem
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
                </div>
            </div>
            <PageSell
                item={item}
                setItem={setItem}
            />
            <div class="form__btns">
                <a href="/#" class="btn btn-green">
                    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.51804 8.31521L11.875 0.958252L12.9944 2.07767L4.51804 10.554L0 6.036L1.11942 4.91659L4.51804 8.31521Z" fill="white" />
                    </svg> Сохранить
                </a>
                <a href="/#" class="btn btn-red-border">
                    Отмена
                </a>
                <a href="/#" class="btn btn-red">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z" fill="white" />
                    </svg> Удалить
                </a>
            </div>
        </section>
    </>


}
export default PageSellWrap;
