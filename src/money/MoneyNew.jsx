import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import useUserId from "../hooks/useUserId";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import API from '../api/api';

import styles from "./Money.module.css";
import CurrencyExchangeModal from "./CurrencyExchangeModal";
import MovingMoneyModal from "./MovingMoneyModal";

import store from "../store/store";
import {useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import CashAndAccountsModal from './CashAndAccountsModal';
import {cash_and_accounts} from '@/directory-components/directory/CashAndAccounts/СashAndAccounts';

// require('./css/main.css');
export default function EnhancedTable() {
  const [isOpen, setOpen] = useState('dropdown');
  const handleOpenCurrencyExchangeModal = () => setOpenCurrencyExchangeModal(true);
  const handleOpenMovingMoney = () => setOpenMovingMoney(true);
  const [openCurrencyExchangeModal, setOpenCurrencyExchangeModal] = React.useState(false);
  const [openMovingMoney, setOpenMovingMoney] = React.useState(false);
  const [openCashModal, setOpenCashModal] = useState(false);
  const [cashAndAccountsList, setCashAndAccountsList] = useState([]);

  React.useEffect(() => {
    console.log('cashAndAccountsList', cashAndAccountsList)
    // eslint-disable-next-line
  }, [cashAndAccountsList])

  const handleOpen = (e) => {
    if (isOpen === 'dropdown') {
      setOpen('dropdown-open');
    } else {
      setOpen('dropdown');
    }
  }

  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

  const handleOpenCashModal = () => setOpenCashModal(true);


  const [staticList, setStaticList] = useState({
    items: Array.from({ length: 20 }),
    hasMore: true
  });

  // let staticData = {
  //   items: Array.from({ length: 20 }),
  //   hasMore: true
  // };

  const fetchMoreData = () => {
    if (staticList.items.length >= 500) {
      setStaticList({ hasMore: false });
      return;
    }

    setTimeout(() => {
      setStaticList({
        items: staticList.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);

  };

  return (
    <>
      <CurrencyExchangeModal
        open={openCurrencyExchangeModal}
        setOpen={setOpenCurrencyExchangeModal}
      />

      <MovingMoneyModal
        open={openMovingMoney}
        setOpen={setOpenMovingMoney}
      />

      <CashAndAccountsModal
        open={openCashModal}
        setOpen={setOpenCashModal}
        cashAndAccountsList={cashAndAccountsList}
        setCashAndAccountsList={setCashAndAccountsList}
      />

      <section className="home-section">

        {/*<div>*/}
        {/*  <h1>Тест ГГ</h1>*/}
        {/*  <hr />*/}
        {/*  <InfiniteScroll*/}
        {/*    dataLength={staticList.items.length}*/}
        {/*    next={fetchMoreData}*/}
        {/*    hasMore={staticList.hasMore}*/}
        {/*    loader={<h4>Загрузка(тут спинер)...</h4>}*/}
        {/*    height={400}*/}
        {/*    endMessage={*/}
        {/*      <p style={{ textAlign: "center" }}>*/}
        {/*        <b>Конец :)</b>*/}
        {/*      </p>*/}
        {/*    }*/}
        {/*  >*/}
        {/*    {staticList.items.map((i, index) => (*/}
        {/*      <div style={style} key={index}>*/}
        {/*        div - #{index}*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </InfiniteScroll>*/}
        {/*</div>*/}

        <div className="wrapper" >
          <div className="wrapper__company">
            {cash_and_accounts.map((item, index) => {
                return (
                <a href="#" className="wrapper__box">
                  <h3>
                    {item.Name}
                  </h3>
                  <p>
                    {item.balance} {item.Represent}
                  </p>
                </a>
                );
              })
            }

            <a href="#" className="wrapper__box" onClick={handleOpenCashModal}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M19.2 0C16.9909 0 15.2 1.79086 15.2 4V15.2L4 15.2C1.79086 15.2 0 16.9909 0 19.2V20.8C0 23.0091 1.79086 24.8 4 24.8H15.2V36C15.2 38.2091 16.9909 40 19.2 40H20.8C23.0091 40 24.8 38.2091 24.8 36V24.8H36C38.2091 24.8 40 23.0091 40 20.8V19.2C40 16.9909 38.2091 15.2 36 15.2L24.8 15.2V4C24.8 1.79086 23.0091 0 20.8 0H19.2Z"
                      fill="#AFC2FF"/>
              </svg>
            </a>
          </div>
          <div className="wrapper__filters">
            <a href="#" className="wrapper__create" onClick={handleOpen}>
              Создать
              <span></span>
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M0.191786 6.35781C0.190775 6.35681 0.189766 6.35581 0.18876 6.3548C-0.0629201 6.10312 -0.0629202 5.69507 0.18876 5.44339L5.20155 0.430597C5.45323 0.178917 5.86128 0.178916 6.11296 0.430597C6.36464 0.682277 6.36464 1.09033 6.11296 1.34201L1.55589 5.89908L6.11298 10.4562C6.36466 10.7079 6.36466 11.1159 6.11298 11.3676C5.8613 11.6193 5.45325 11.6193 5.20157 11.3676L0.191786 6.35781Z"
                      fill="#fff"/>
              </svg>
            </a>

            {/*<div className={isOpen}>*/}
            {/*  <ul>*/}
            {/*    <li onClick={handleOpenCurrencyExchangeModal}>Перемещение денег</li>*/}
            {/*    <li onClick={handleOpenMovingMoney}>Обмен валют</li>*/}
            {/*  </ul>*/}
            {/*</div>*/}
            <div className="wrapper__mounth">
              <a href="#">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.191786 6.35781C0.190775 6.35681 0.189766 6.35581 0.18876 6.3548C-0.0629201 6.10312 -0.0629202 5.69507 0.18876 5.44339L5.20155 0.430597C5.45323 0.178917 5.86128 0.178916 6.11296 0.430597C6.36464 0.682277 6.36464 1.09033 6.11296 1.34201L1.55589 5.89908L6.11298 10.4562C6.36466 10.7079 6.36466 11.1159 6.11298 11.3676C5.8613 11.6193 5.45325 11.6193 5.20157 11.3676L0.191786 6.35781Z"
                        fill="#7096FF"/>
                </svg>
              </a>
              <p>
                Март
              </p>
              <a href="#">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.191786 6.35781C0.190775 6.35681 0.189766 6.35581 0.18876 6.3548C-0.0629201 6.10312 -0.0629202 5.69507 0.18876 5.44339L5.20155 0.430597C5.45323 0.178917 5.86128 0.178916 6.11296 0.430597C6.36464 0.682277 6.36464 1.09033 6.11296 1.34201L1.55589 5.89908L6.11298 10.4562C6.36466 10.7079 6.36466 11.1159 6.11298 11.3676C5.8613 11.6193 5.45325 11.6193 5.20157 11.3676L0.191786 6.35781Z"
                        fill="#7096FF"/>
                </svg>
              </a>
            </div>
            <a href="#" className="wrapper__filter">
              <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.941177" width="5.64706" height="0.941176" rx="0.470588" fill="#7096FF"/>
                <rect x="16" y="6.58824" width="5.64706" height="0.941176" rx="0.470588"
                      transform="rotate(-180 16 6.58824)" fill="#7096FF"/>
                <rect y="10.353" width="5.64706" height="0.941176" rx="0.470588" fill="#7096FF"/>
                <rect x="7.52942" y="0.941177" width="8.47059" height="0.941176" rx="0.470588" fill="#7096FF"/>
                <rect x="8.47058" y="6.58824" width="8.47059" height="0.941176" rx="0.470588"
                      transform="rotate(-180 8.47058 6.58824)" fill="#7096FF"/>
                <rect x="7.52942" y="10.353" width="8.47059" height="0.941176" rx="0.470588" fill="#7096FF"/>
                <circle cx="5.17645" cy="1.41176" r="1.16176" fill="white" stroke="#7096FF" stroke-width="0.5"/>
                <circle cx="10.8235" cy="6.11765" r="1.16176" transform="rotate(-180 10.8235 6.11765)" fill="white"
                        stroke="#7096FF" stroke-width="0.5"/>
                <circle cx="5.17645" cy="10.8235" r="1.16176" fill="white" stroke="#7096FF" stroke-width="0.5"/>
              </svg>
              Фильтр
            </a>
          </div>
          <div className="table">
            <div className="table__head">
              <p>
                Дата
              </p>
              <p>
                Тип оплаты
              </p>
              <p>
                Касса/счёт
              </p>
              <p>
                Контрагент
              </p>
              <p>
                Сумма
              </p>
              <p>
                Комментарий
              </p>
            </div>

            <div className="table__item">
              <div className="table__figure">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 0C6.2268 0 5.6 0.626802 5.6 1.4V5.60001H1.4C0.626802 5.60001 0 6.22681 0 7.00001C0 7.77321 0.626801 8.40001 1.4 8.40001H5.6V12.6C5.6 13.3732 6.2268 14 7 14C7.7732 14 8.4 13.3732 8.4 12.6V8.40001H12.6C13.3732 8.40001 14 7.77321 14 7.00001C14 6.22681 13.3732 5.60001 12.6 5.60001H8.4V1.4C8.4 0.626801 7.7732 0 7 0Z"
                        fill="#45D064"/>
                </svg>
              </div>
              <div className="table__mob">
                <p>
                  Николай
                </p>
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__data">
                <p>
                  28.02.2022
                </p>
                <p>
                  17.16.45
                </p>
              </div>
              <div className="table__paysend">
                <p>
                  От клиента
                </p>
              </div>
              <div className="table__account">
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__counterparty">
                <p>
                  Николай
                </p>
              </div>
              <div className="table__summury">
                <p>
                  15 200 ₴
                </p>
              </div>
              <div className="table__comment">

              </div>
            </div>

            <div className="table__item">
              <div className="table__figure">
                <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="0.600006" width="2.8" height="14" rx="1.4" transform="rotate(90 14 0.600006)"
                        fill="#EE2727"/>
                </svg>
              </div>
              <div className="table__mob">
                <p>
                  Николай
                </p>
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__data">
                <p>
                  28.02.2022
                </p>
                <p>
                  17.16.45
                </p>
              </div>
              <div className="table__paysend">
                <p>
                  От клиента
                </p>
              </div>
              <div className="table__account">
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__counterparty">
                <p>
                  Николай
                </p>
              </div>
              <div className="table__summury">
                <p>
                  15 200 ₴
                </p>
              </div>
              <div className="table__comment">

              </div>
            </div>

            <div className="table__item">
              <div className="table__figure">
                <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="0.600006" width="2.8" height="14" rx="1.4" transform="rotate(90 14 0.600006)"
                        fill="#EE2727"/>
                </svg>
              </div>
              <div className="table__mob">
                <p>
                  Николай
                </p>
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__data">
                <p>
                  28.02.2022
                </p>
                <p>
                  17.16.45
                </p>
              </div>
              <div className="table__paysend">
                <a href="#">
                  Установить
                </a>
              </div>
              <div className="table__account">
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__counterparty">
                <a href="#">
                  Установить
                </a>
              </div>
              <div className="table__summury">
                <p>
                  15 200 ₴
                </p>
              </div>
              <div className="table__comment">

              </div>
            </div>

            <div className="table__item">
              <div className="table__figure">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 0C6.2268 0 5.6 0.626802 5.6 1.4V5.60001H1.4C0.626802 5.60001 0 6.22681 0 7.00001C0 7.77321 0.626801 8.40001 1.4 8.40001H5.6V12.6C5.6 13.3732 6.2268 14 7 14C7.7732 14 8.4 13.3732 8.4 12.6V8.40001H12.6C13.3732 8.40001 14 7.77321 14 7.00001C14 6.22681 13.3732 5.60001 12.6 5.60001H8.4V1.4C8.4 0.626801 7.7732 0 7 0Z"
                        fill="#45D064"/>
                </svg>
              </div>
              <div className="table__mob">
                <p>
                  Николай
                </p>
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__data">
                <p>
                  28.02.2022
                </p>
                <p>
                  17.16.45
                </p>
              </div>
              <div className="table__paysend">
                <p>
                  От клиента
                </p>
              </div>
              <div className="table__account">
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__counterparty">
                <p>
                  Николай
                </p>
              </div>
              <div className="table__summury">
                <p>
                  15 200 ₴
                </p>
              </div>
              <div className="table__comment">

              </div>
            </div>
            <div className="table__item">
              <div className="table__figure">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 0C6.2268 0 5.6 0.626802 5.6 1.4V5.60001H1.4C0.626802 5.60001 0 6.22681 0 7.00001C0 7.77321 0.626801 8.40001 1.4 8.40001H5.6V12.6C5.6 13.3732 6.2268 14 7 14C7.7732 14 8.4 13.3732 8.4 12.6V8.40001H12.6C13.3732 8.40001 14 7.77321 14 7.00001C14 6.22681 13.3732 5.60001 12.6 5.60001H8.4V1.4C8.4 0.626801 7.7732 0 7 0Z"
                        fill="#45D064"/>
                </svg>
              </div>
              <div className="table__mob">
                <p>
                  Николай
                </p>
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__data">
                <p>
                  28.02.2022
                </p>
                <p>
                  17.16.45
                </p>
              </div>
              <div className="table__paysend">
                <p>
                  От клиента
                </p>
              </div>
              <div className="table__account">
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__counterparty">
                <p>
                  Николай
                </p>
              </div>
              <div className="table__summury">
                <p>
                  15 200 ₴
                </p>
              </div>
              <div className="table__comment">

              </div>
            </div>
            <div className="table__item">
              <div className="table__figure">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 0C6.2268 0 5.6 0.626802 5.6 1.4V5.60001H1.4C0.626802 5.60001 0 6.22681 0 7.00001C0 7.77321 0.626801 8.40001 1.4 8.40001H5.6V12.6C5.6 13.3732 6.2268 14 7 14C7.7732 14 8.4 13.3732 8.4 12.6V8.40001H12.6C13.3732 8.40001 14 7.77321 14 7.00001C14 6.22681 13.3732 5.60001 12.6 5.60001H8.4V1.4C8.4 0.626801 7.7732 0 7 0Z"
                        fill="#45D064"/>
                </svg>
              </div>
              <div className="table__mob">
                <p>
                  Николай
                </p>
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__data">
                <p>
                  28.02.2022
                </p>
                <p>
                  17.16.45
                </p>
              </div>
              <div className="table__paysend">
                <p>
                  От клиента
                </p>
              </div>
              <div className="table__account">
                <p>
                  ФОП Руднев
                </p>
              </div>
              <div className="table__counterparty">
                <p>
                  Николай
                </p>
              </div>
              <div className="table__summury">
                <p>
                  15 200 ₴
                </p>
              </div>
              <div className="table__comment">

              </div>
            </div>

            <div className="table__setting">
              <div className="table__fullscreen">

              </div>
              <div className="table__sum">
                Общая сумма:
                <span>
                            200 000 грн
                        </span>
              </div>
              <div className="table__show">
                <a href="#" className="table__show_over">
                  Показать <span>10</span>
                  <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4L0.334936 0.25L4.66506 0.25L2.5 4Z" fill="#717171"/>
                  </svg>
                </a>
              </div>
              <div className="table__pages">
                1-10 с 25
                <div className="table__btns">
                  <a href="#">
                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M-1.09278e-07 2.5L3.75 0.334936L3.75 4.66506L-1.09278e-07 2.5Z" fill="#717171"/>
                    </svg>
                  </a>
                  <a href="#">
                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 2.5L0.25 4.66506L0.25 0.334936L4 2.5Z" fill="#717171"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>


      </section>


    </>
  );
}
