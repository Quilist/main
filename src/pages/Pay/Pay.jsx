import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar/Sidebar';

import PayForm from './components/PayForm';

import Button from '@mui/material/Button';

import styles from '@/styles/modules/PayForm.module.css'
import API from '@/api/api'
import Share from "../pagesOfHeader/sell/img/share1.svg";
import ButtonGroup from "@mui/material/ButtonGroup";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function Pay() {
  const [isSuccess, setIsSuccess] = React.useState(null);
  const [isRedirect, setIsRedirect] = React.useState(false);
  const [auxiliaryList, setAuxiliaryList] = React.useState({
    currencies: [],
    items: []
  });

  const [openReceive, setOpenReceive] = React.useState(false);
  const anchorReceiveRef = React.useRef(null);
  const [selectedReceiveIndex, setSelectedReceiveIndex] = React.useState(1);

  const pageTypes = {
    pay_supplier: 'Поставщик',
    pay_customer: 'Клиенту(возврат)',
    pay_expend: 'Прочий расход',
    pay_salary: 'Зарплата',
    pay_owner: 'Собственнику',
    receive_customer: 'От клиента',
    receive_supplier: 'От поставщика',
    receive_income: 'Прочее поступление',
    receive_owner: 'Взнос от собственника',
    receive_balance: 'Ввод остатков',
  }
  const currentPathName = new URL(window.location.href).pathname.split('/')[1];

  const receiveOptions = [
    { name: 'Печатать', link: '/sell' },
    { name: 'Отправить', link: '/sell' },
  ];

  useDocumentTitle("Оплата");

  React.useEffect(() => {
    const params = {
      type: currentPathName
    }
    api.auxiliary('money', params).then(data => {
      if (data.status === "error") alert(data.message)
      else setAuxiliaryList(data.message)
    })
    console.log('auxiliaryList1', auxiliaryList)
    // eslint-disable-next-line
  }, [currentPathName])

  // ========================================
  const [data] = React.useState(null)
  const api = new API();

  const [item, setItem] = React.useState({});
  const [error, setError] = React.useState({
    id_cash_accounts: "",
    id_type: "",
    type: "",
    type_order: ""
  });

  const navigate = useNavigate()
  React.useEffect(() => {
    if (isRedirect) {
      navigate('#')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  React.useEffect(() => {
    if (data) {
      const { item } = data;
      setItem(item)
    }
    // eslint-disable-next-line
  }, [data])

  const validate = (name, value) => {
    if (!value || value.trim() === "") {
      return "Field is Required";
    } else {
      return "";
    }
  };

  const handleAdd = () => {
    console.log('item', item)
    console.log('error', error)

    let validationErrorList = {};
    Object.keys(error).forEach(name => {
      console.log('name)', name)
      const error = validate(name, item[name]);
    console.log('errorerror', error)
      if (error && error.length > 0) {
        validationErrorList[name] = error;
      }
    });
    if (Object.keys(validationErrorList).length > 0) {
      setError(validationErrorList);
      alert('Заполните обязательные поля')
      return;
    }

    api.add(item, 'payment').then(data => {
      if (data.status === "error") return alert(data.message)
      setIsSuccess(null)
      setIsRedirect(true)
    })
  }

  const handleReturn = () => {
    navigate(-1)
    setIsRedirect(true)
  }

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
    <div className="home-section">
      <div className="wrapper__setting">
        <a href="#!" className="btn"  onClick={handleAdd}>
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.51804 8.31521L11.875 0.958252L12.9944 2.07767L4.51804 10.554L0 6.036L1.11942 4.91659L4.51804 8.31521Z"
                  fill="white"/>
          </svg>
          Сохранить
        </a>
        <div className="wrapper__setting_btns">
          <img onClick={handleToggleReceive} src={Share} alt="React Logo"/>
          <ButtonGroup variant="contained" ref={anchorReceiveRef} aria-label="split button">
          </ButtonGroup>
          <Popper
            open={openReceive}
            anchorEl={anchorReceiveRef.current}
            role={undefined}
            transition
            style={{paddingRight: 10}}
          >
            {({TransitionProps, placement}) => (
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
                          <Link to={option.link} style={{color: 'black'}}>{option.name}</Link>
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
      <h3 className="wrapper__title">
        Изменение {pageTypes[currentPathName]}
      </h3>
      <PayForm
        item={item}
        setItem={setItem}
        error={error}
        setError={setError}
        pageTypes={pageTypes}
        currentPathName={currentPathName}
        auxiliaryList={auxiliaryList}
      />
      <div className="form__btns">
        <a href="#!" className="btn">
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.51804 8.31521L11.875 0.958252L12.9944 2.07767L4.51804 10.554L0 6.036L1.11942 4.91659L4.51804 8.31521Z"
                  fill="white"/>
          </svg>
          Сохранить
        </a>
        <a href="#!"  onClick={handleReturn} className="btn">
          Отмена
        </a>
        <a href="/#" className="btn">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z"
                  fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z"
                  fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z"
                  fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.70392 3.65204L1.05188 0L0 1.05188L3.65204 4.70392L0.00012467 8.35583L1.05201 9.40772L4.70392 5.7558L8.35582 9.4077L9.4077 8.35582L5.7558 4.70392L9.40782 1.0519L8.35594 1.80587e-05L4.70392 3.65204Z"
                  fill="white"/>
          </svg>
          Удалить
        </a>
      </div>
    </div>
    {/*<section className="home-section">*/}
    {/*  <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>*/}
    {/*    <div className={styles.buttonsWrapper}>*/}
    {/*      <div className={styles.main_btns}>*/}
    {/*        <Button onClick={handleAdd} className={styles.button} variant="contained">Сохранить</Button>*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*        <Button className={styles.button} variant="outlined">Печать</Button>*/}
    {/*        <Button className={styles.button} variant="outlined">Отправить</Button>*/}
    {/*      </div>*/}
    {/*    </div>*/}
    {/*    {isSuccess &&*/}
    {/*      <div className={styles.success}>*/}
    {/*        Вы успешно {isSuccess}!*/}
    {/*      </div>*/}
    {/*    }*/}

    {/*    <div className={styles.boxesWrapper}>*/}
    {/*      <PayForm*/}
    {/*        item={item}*/}
    {/*        setItem={setItem}*/}
    {/*        pageTypes={pageTypes}*/}
    {/*        currentPathName={currentPathName}*/}
    {/*      />*/}
    {/*    </div>*/}

    {/*    <div className={styles.buttonsWrapper}>*/}
    {/*      <div className={styles.main_btns}>*/}
    {/*        <Button className={styles.button} variant="contained">Удалить</Button>*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*        <Button onClick={handleReturn} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Отмена</Button>*/}
    {/*      </div>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*</section>*/}
  </>
}

export default Pay;