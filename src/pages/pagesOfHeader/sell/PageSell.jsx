import * as React from 'react';

import { Link } from 'react-router-dom';

import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';

import './sell.css'
import Share from './img/share1.svg'


const receiveOptions = [
  { name: 'Печатать', link: '/sell' },
  { name: 'Отправить', link: '/sell' },
];

const Sell = () => {
  const [openReceive, setOpenReceive] = React.useState(false);
  const anchorReceiveRef = React.useRef(null);
  const [selectedReceiveIndex, setSelectedReceiveIndex] = React.useState(1);

  React.useEffect(() => {
    document.title = "Клиент"
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
    <div class="home-section">
      <div class="wrapper__setting">
        <a href="/#" class="btn">
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.51804 8.31521L11.875 0.958252L12.9944 2.07767L4.51804 10.554L0 6.036L1.11942 4.91659L4.51804 8.31521Z" fill="white" />
          </svg> Сохранить
        </a>
        <div class="wrapper__setting_btns">
          <img onClick={handleToggleReceive} src={Share} alt="React Logo" />
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
          {/* <a href="/#" class="btn">Печать</a>
          <a href="/#" class="btn">Отправить</a> */}
        </div>
      </div>
      <h3 class="wrapper__title">
        Изменение клиента
      </h3>
      <div class="form_edit">
        <form action="#" class="form__people">
          <h4>
            Кому:
          </h4>
          <div class="form__input active-disable">

            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

            <div class="select">
              <select>
                <option selected disabled>Поставщик</option>
                <option value="saab">Поставщик1</option>
                <option value="opel">Поставщик2</option>
                <option value="audi">Поставщик3</option>
              </select>
            </div>
          </div>
          <div class="form__title">
            <h4>
              Откуда:
            </h4>
          </div>
          <div class="form__title_select">
            <p>
              Вид оплаты:
            </p>
          </div>
          <div class="form__input active-disable">

            <div class="form__radio">
              <input id="radio-1" name="radio" type="radio" />
              <label for="radio-1" class="radio-label">Наличные</label>
            </div>

            <div class="form__radio">
              <input id="radio-2" name="radio" type="radio" />
              <label for="radio-2" class="radio-label">Со счета</label>
            </div>
          </div>


          <div class="form__input active-disable">
            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

            <div class="select">
              <select>
                <option selected disabled>Выберите кассу/счёт</option>
                <option value="cash1">Выберите кассу/счёт1</option>
                <option value="cash2">Выберите кассу/счёт2</option>
                <option value="cash3">Выберите кассу/счёт3</option>
              </select>
            </div>
          </div>
          <div class="form__input active-disable">
            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

            <div class="data">
              <input type="date" placeholder="Дата" />
            </div>
          </div>
          <div class="form__input active-cheked">
            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

            <textarea name="" placeholder="Комментарий:"></textarea>
          </div>
        </form>
        {/* <!-- form__details --> */}
        <form action="#" class="form__details">
          <h4>
            Детали оплаты:
          </h4>
          <div class="form__input active-disable">
            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

            <div class="select select_short">
              <select>
                <option selected disabled>Валюта</option>
                <option value="currency1">Валюта1</option>
                <option value="currency2">Валюта2</option>
                <option value="currency3">Валюта3</option>
              </select>
            </div>
            <input type="text" placeholder="Оплата:" class="short-input" />
            <div class="form__setting">
              <a href="/#">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.7298 3.67792L1.05188 0L0 1.05188L3.67792 4.7298L0.0518825 8.35583L1.10377 9.40772L4.7298 5.78168L8.35582 9.4077L9.4077 8.35582L5.78168 4.7298L9.45958 1.0519L8.4077 1.80587e-05L4.7298 3.67792Z" fill="#F6222E" />
                </svg>
              </a>
              <a href="/#">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z" fill="#7096FF" />
                </svg>
              </a>
            </div>
          </div>
          <div class="form__input active-cheked">
            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

            <div class="select select_short">
              <select>
                <option selected disabled>Валюта</option>
                <option value="currency1">Валюта1</option>
                <option value="currency2">Валюта2</option>
                <option value="currency3">Валюта3</option>
              </select>
            </div>
            <input type="text" placeholder="Сдача:" class="short-input" />
            <div class="form__setting">
              <a href="/#">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.7298 3.67792L1.05188 0L0 1.05188L3.67792 4.7298L0.0518825 8.35583L1.10377 9.40772L4.7298 5.78168L8.35582 9.4077L9.4077 8.35582L5.78168 4.7298L9.45958 1.0519L8.4077 1.80587e-05L4.7298 3.67792Z" fill="#F6222E" />
                </svg>
              </a>
              <a href="/#">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z" fill="#7096FF" />
                </svg>
              </a>
            </div>
          </div>
          <div class="form__title">
            <h4>
              Организация плательщик
            </h4>
          </div>
          <div class="form__input active-cheked">
            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

            <div class="select">
              <select>
                <option selected disabled>Организация</option>
                <option value="organization1">Организация1</option>
                <option value="organization2">Организация2</option>
                <option value="organization3">Организация3</option>
              </select>
            </div>
          </div>

        </form>
      </div>
      <div class="form__btns">
        <a href="/#" class="btn">
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.51804 8.31521L11.875 0.958252L12.9944 2.07767L4.51804 10.554L0 6.036L1.11942 4.91659L4.51804 8.31521Z" fill="white" />
          </svg> Сохранить
        </a>
        <a href="/#" class="btn">
          Отмена
        </a>
        <a href="/#" class="btn">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z" fill="white" />
          </svg> Удалить
        </a>
      </div>
    </div>
  </>
}

export default Sell;