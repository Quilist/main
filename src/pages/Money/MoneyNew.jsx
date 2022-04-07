import * as React from "react";
import { useNavigate } from 'react-router-dom'

import API from '@/api/api';

import CurrencyExchangeModal from "./CurrencyExchangeModal";
import MovingMoneyModal from "./MovingMoneyModal";

import { useState } from "react";
//import Table from "@/components/Table/Table"
import InfiniteScroll from "react-infinite-scroll-component";

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

import CashAndAccountsModal from "./CashAndAccountsModal";
import { cash_and_accounts } from '@/pages/Directory/CashAndAccount/CashAndAccount';
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import moment from 'moment';
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

export default function EnhancedTable() {
  const [isOpen, setOpen] = useState('dropdown');
  const [open, setIsOpen] = React.useState(false);
  // eslint-disable-next-line
  const [items, setItems] = React.useState([])
  const handleOpenCurrencyExchangeModal = () => setOpenCurrencyExchangeModal(true);
  const handleOpenMovingMoney = () => setOpenMovingMoney(true);
  const [openCurrencyExchangeModal, setOpenCurrencyExchangeModal] = React.useState(false);
  const [openMovingMoney, setOpenMovingMoney] = React.useState(false);
  const [openCashModal, setOpenCashModal] = useState(false);
  const [cashAndAccountsList, setCashAndAccountsList] = useState([]);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate()
  const api = new API();

  useDocumentTitle("Деньги");
  const mockResponse = {
    "status":"OK",
    "message":{
      "items":[
        {
          "id":2,
          "id_user":4,
          "date_create":"1648813079886",
          "from_cash_account_id":1,
          "to_cash_account_id":2,
          "amount":222,
          "note":"Тук"
        },
        {
          "id":5,
          "id_user":4,
          "date_create":"1648812964279",
          "from_currency_id":1,
          "to_currency_id":1,
          "exchange_rate":1,
          "cash_account_id":1,
          "amount_pay":"111",
          "amount_receive":"111",
          "note":"Тест тест"
        },
        {
          "id":13,
          "id_user":4,
          "number":2,
          "date_create":"1648812870290",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"пп",
          "id_legal_entites":1
        },
        {
          "id":12,
          "id_user":4,
          "number":1,
          "date_create":"1648812818342",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"eqw",
          "id_legal_entites":1
        },
        {
          "id":2,
          "id_user":4,
          "date_create":"1648813079886",
          "from_cash_account_id":1,
          "to_cash_account_id":2,
          "amount":222,
          "note":"Тук"
        },
        {
          "id":5,
          "id_user":4,
          "date_create":"1648812964279",
          "from_currency_id":1,
          "to_currency_id":1,
          "exchange_rate":1,
          "cash_account_id":1,
          "amount_pay":"111",
          "amount_receive":"111",
          "note":"Тест тест"
        },
        {
          "id":13,
          "id_user":4,
          "number":2,
          "date_create":"1648812870290",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"пп",
          "id_legal_entites":1
        },
        {
          "id":12,
          "id_user":4,
          "number":1,
          "date_create":"1648812818342",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"eqw",
          "id_legal_entites":1
        },
        {
          "id":2,
          "id_user":4,
          "date_create":"1648813079886",
          "from_cash_account_id":1,
          "to_cash_account_id":2,
          "amount":222,
          "note":"Тук"
        },
        {
          "id":5,
          "id_user":4,
          "date_create":"1648812964279",
          "from_currency_id":1,
          "to_currency_id":1,
          "exchange_rate":1,
          "cash_account_id":1,
          "amount_pay":"111",
          "amount_receive":"111",
          "note":"Тест тест"
        },
        {
          "id":13,
          "id_user":4,
          "number":2,
          "date_create":"1648812870290",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"пп",
          "id_legal_entites":1
        },
        {
          "id":12,
          "id_user":4,
          "number":1,
          "date_create":"1648812818342",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"eqw",
          "id_legal_entites":1
        },
        {
          "id":2,
          "id_user":4,
          "date_create":"1648813079886",
          "from_cash_account_id":1,
          "to_cash_account_id":2,
          "amount":222,
          "note":"Тук"
        },
        {
          "id":5,
          "id_user":4,
          "date_create":"1648812964279",
          "from_currency_id":1,
          "to_currency_id":1,
          "exchange_rate":1,
          "cash_account_id":1,
          "amount_pay":"111",
          "amount_receive":"111",
          "note":"Тест тест"
        },
        {
          "id":13,
          "id_user":4,
          "number":2,
          "date_create":"1648812870290",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"пп",
          "id_legal_entites":1
        },
        {
          "id":12,
          "id_user":4,
          "number":1,
          "date_create":"1648812818342",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"eqw",
          "id_legal_entites":1
        },
        {
          "id":2,
          "id_user":4,
          "date_create":"1648813079886",
          "from_cash_account_id":1,
          "to_cash_account_id":2,
          "amount":222,
          "note":"Тук"
        },
        {
          "id":5,
          "id_user":4,
          "date_create":"1648812964279",
          "from_currency_id":1,
          "to_currency_id":1,
          "exchange_rate":1,
          "cash_account_id":1,
          "amount_pay":"111",
          "amount_receive":"111",
          "note":"Тест тест"
        },
        {
          "id":13,
          "id_user":4,
          "number":2,
          "date_create":"1648812870290",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"пп",
          "id_legal_entites":1
        },
        {
          "id":12,
          "id_user":4,
          "number":1,
          "date_create":"1648812818342",
          "id_type":1,
          "type":"payment",
          "type_order":"cash",
          "id_cash_accounts":"1",
          "note":"eqw",
          "id_legal_entites":1
        }
      ],
      "paginations":{
        "total":4,
        "last_page":1
      }
    }
  };

  React.useEffect(() => {
    if (!openCurrencyExchangeModal || !openMovingMoney) {
      api.all('money').then(data => {
        if (data.status === "error") alert(data.message)
        else setItems(data.message.items)
      })
      //setItems(mockResponse.message.items)
    }
    // eslint-disable-next-line
  }, [openCurrencyExchangeModal, openMovingMoney])

  React.useEffect(() => {
    // eslint-disable-next-line
  }, [cashAndAccountsList])

  const handleOpen = (e) => {
    if (isOpen === 'dropdown') {
      setOpen('dropdown-open');
      setIsOpen(true)
    } else {
      setOpen('dropdown');
      setIsOpen(false)
    }
  }

  const handleOpenCashModal = () => setOpenCashModal(true);


  // const [staticList, setStaticList] = useState({
  //   items: Array.from({ length: 20 }),
  //   hasMore: true
  // });

  // let staticData = {
  //   items: Array.from({ length: 20 }),
  //   hasMore: true
  // };

  const fetchMoreData = () => {
    console.log('ok')
    // if (staticList.items.length >= 500) {
    //   setStaticList({ hasMore: false });
    //   return;
    // }
    //
    // setTimeout(() => {
    //   setStaticList({
    //     items: staticList.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);

  };

  const goToEdit = (item) => {
    if(item.type) {
      navigate(`${item.type}/${item.id}`)
    }
    if(item.amount_receive) {
      handleOpenCurrencyExchangeModal();
    }
    if(item.to_cash_account_id) {
      handleOpenMovingMoney();
    }
  };


  const tableHeader = [
    {
      name: "Дата"
    },
    {
      name: "Тип оплаты"
    },
    {
      name: "Касса/счёт"
    },
    {
      name: "Контрагент"
    },
    {
      name: "Сумма"
    },
    {
      name: "Комментарий"
    }
  ];

  const formattedDate = (milliseconds) => {
    //const { date }  = new Date(milliseconds);
    //const date = dateFromMS.toString().customFormat( "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#" )
    return milliseconds;
  };

  const getType = (item) => {
    let type = null;
    if (item.type) {
      if (item.type === 'payment') {
        type = 'Оплата'
      }
    } else {
      if (item.from_cash_account_id) {
        type = 'Перемещение'
      }
      if (item.amount_pay) {
        type = 'Обмен валют'
      }
    }
    return type;
  };

  const getAccount = (item) => {
    let data = 'n';

    return data;
  };

  const getAmount = (item) => {
    let data = null;
    if (item.amount) {
      data = item.amount + ' UAH'
    }
    if (item.amount_receive) {
      data = item.amount_receive + ' UAH'
    }
    return data;
  };

  const handleCloseCreateMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    handleOpen();
  };

  const [dateState, setDateState] = useState({
    startDate: moment(),
    endDate: moment(),
  });
  const { startDate, endDate } = dateState;
  const handleDateRangePickerCallback = (startDate, endDate) => {
    setDateState({ startDate, endDate });
  };
  const dateRange =
    startDate.format('MMMM D, YYYY') + ' - ' + endDate.format('MMMM D, YYYY');

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
        <div className="wrapper" >
          <div className="wrapper__company">
            {cash_and_accounts.map((item, index) => {
              return (
                <a href="#!" className="wrapper__box">
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

            <a href="#!" className="wrapper__box" onClick={handleOpenCashModal}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M19.2 0C16.9909 0 15.2 1.79086 15.2 4V15.2L4 15.2C1.79086 15.2 0 16.9909 0 19.2V20.8C0 23.0091 1.79086 24.8 4 24.8H15.2V36C15.2 38.2091 16.9909 40 19.2 40H20.8C23.0091 40 24.8 38.2091 24.8 36V24.8H36C38.2091 24.8 40 23.0091 40 20.8V19.2C40 16.9909 38.2091 15.2 36 15.2L24.8 15.2V4C24.8 1.79086 23.0091 0 20.8 0H19.2Z"
                  fill="#AFC2FF" />
              </svg>
            </a>
          </div>
          <div className="wrapper__filters">
            <a href="#!" className="wrapper__create" onClick={handleOpen} ref={anchorRef}>
              Создать
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0.191786 6.35781C0.190775 6.35681 0.189766 6.35581 0.18876 6.3548C-0.0629201 6.10312 -0.0629202 5.69507 0.18876 5.44339L5.20155 0.430597C5.45323 0.178917 5.86128 0.178916 6.11296 0.430597C6.36464 0.682277 6.36464 1.09033 6.11296 1.34201L1.55589 5.89908L6.11298 10.4562C6.36466 10.7079 6.36466 11.1159 6.11298 11.3676C5.8613 11.6193 5.45325 11.6193 5.20157 11.3676L0.191786 6.35781Z"
                  fill="#fff" />
              </svg>
            </a>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              // disablePortal
              style={{ zIndex: "10" }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === "center bottom",
                    marginLeft: "76px",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseCreateMenu}>
                      <div>
                        <MenuList id="split-button-menu">
                          <Link to="#" onClick={handleOpenCurrencyExchangeModal}>
                            <MenuItem style={{ height: "30px" }}>
                              Обмен валют
                            </MenuItem>
                          </Link>
                        </MenuList>
                        <MenuList id="split-button-menu">
                          <Link to="#" onClick={handleOpenMovingMoney}>
                            <MenuItem style={{ height: "30px" }}>
                              Перемещение денег
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </div>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            <div className="wrapper__mounth">

              <a href="#!">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0.191786 6.35781C0.190775 6.35681 0.189766 6.35581 0.18876 6.3548C-0.0629201 6.10312 -0.0629202 5.69507 0.18876 5.44339L5.20155 0.430597C5.45323 0.178917 5.86128 0.178916 6.11296 0.430597C6.36464 0.682277 6.36464 1.09033 6.11296 1.34201L1.55589 5.89908L6.11298 10.4562C6.36466 10.7079 6.36466 11.1159 6.11298 11.3676C5.8613 11.6193 5.45325 11.6193 5.20157 11.3676L0.191786 6.35781Z"
                    fill="#7096FF" />
                </svg>
              </a>
              <DateRangePicker
                initialSettings={{
                  startDate: startDate.toDate(),
                  endDate: endDate.toDate(),
                  ranges: {
                    'Сегодня': [moment().toDate(), moment().toDate()],
                    'Вчера': [
                      moment().subtract(1, 'days').toDate(),
                      moment().subtract(1, 'days').toDate(),
                    ],
                    'Последние 7 Дней': [
                      moment().subtract(6, 'days').toDate(),
                      moment().toDate(),
                    ],
                    'Последние 30 Дней': [
                      moment().subtract(29, 'days').toDate(),
                      moment().toDate(),
                    ],
                    'Текущий месяц': [
                      moment().startOf('month').toDate(),
                      moment().endOf('month').toDate(),
                    ],
                    'Прошлый месяц': [
                      moment().subtract(1, 'month').startOf('month').toDate(),
                      moment().subtract(1, 'month').endOf('month').toDate(),
                    ],
                  },
                }}
                onCallback={handleDateRangePickerCallback}
              >
                <p style={{ cursor: 'pointer'}}>
                   {dateRange}
                </p>
              </DateRangePicker>
              <a href="#!">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0.191786 6.35781C0.190775 6.35681 0.189766 6.35581 0.18876 6.3548C-0.0629201 6.10312 -0.0629202 5.69507 0.18876 5.44339L5.20155 0.430597C5.45323 0.178917 5.86128 0.178916 6.11296 0.430597C6.36464 0.682277 6.36464 1.09033 6.11296 1.34201L1.55589 5.89908L6.11298 10.4562C6.36466 10.7079 6.36466 11.1159 6.11298 11.3676C5.8613 11.6193 5.45325 11.6193 5.20157 11.3676L0.191786 6.35781Z"
                    fill="#7096FF" />
                </svg>
              </a>
            </div>
            <a href="#!" className="wrapper__filter">
              <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.941177" width="5.64706" height="0.941176" rx="0.470588" fill="#7096FF" />
                <rect x="16" y="6.58824" width="5.64706" height="0.941176" rx="0.470588"
                  transform="rotate(-180 16 6.58824)" fill="#7096FF" />
                <rect y="10.353" width="5.64706" height="0.941176" rx="0.470588" fill="#7096FF" />
                <rect x="7.52942" y="0.941177" width="8.47059" height="0.941176" rx="0.470588" fill="#7096FF" />
                <rect x="8.47058" y="6.58824" width="8.47059" height="0.941176" rx="0.470588"
                  transform="rotate(-180 8.47058 6.58824)" fill="#7096FF" />
                <rect x="7.52942" y="10.353" width="8.47059" height="0.941176" rx="0.470588" fill="#7096FF" />
                <circle cx="5.17645" cy="1.41176" r="1.16176" fill="white" stroke="#7096FF" stroke-width="0.5" />
                <circle cx="10.8235" cy="6.11765" r="1.16176" transform="rotate(-180 10.8235 6.11765)" fill="white"
                  stroke="#7096FF" stroke-width="0.5" />
                <circle cx="5.17645" cy="10.8235" r="1.16176" fill="white" stroke="#7096FF" stroke-width="0.5" />
              </svg>
              Фильтр
            </a>
          </div>

          <div className="table">
            <div className="table__head">
              {tableHeader.map((th) => {
                return (
                  <p>{th.name}</p>
                );
              })}
            </div>

            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Загрузка(тут спинер)...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  { items.paginations && <b>Всего записей: {items.paginations.total}</b> }
                </p>
              }
            >
              {items.map((item, index) => {
                return (
                  <div className="table__item"
                       onClick={() => {
                         goToEdit(item)
                       }}
                    >
                    <div className="table__figure">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M7 0C6.2268 0 5.6 0.626802 5.6 1.4V5.60001H1.4C0.626802 5.60001 0 6.22681 0 7.00001C0 7.77321 0.626801 8.40001 1.4 8.40001H5.6V12.6C5.6 13.3732 6.2268 14 7 14C7.7732 14 8.4 13.3732 8.4 12.6V8.40001H12.6C13.3732 8.40001 14 7.77321 14 7.00001C14 6.22681 13.3732 5.60001 12.6 5.60001H8.4V1.4C8.4 0.626801 7.7732 0 7 0Z"
                              fill="#45D064" />
                      </svg>
                    </div>
                    <div className="table__mob">
                      <p>
                        {getAccount(item)}
                      </p>
                      <p>
                        <a href="#!">
                          Установить
                        </a>
                      </p>
                    </div>
                    <div className="table__data">
                      <p>
                        {formattedDate(item.date_create)}
                      </p>
                      <p>

                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {getType(item)}
                      </p>
                    </div>
                    <div className="table__account">
                      <p>
                        {getAccount(item)}
                      </p>
                    </div>
                    <div className="table__counterparty">
                      <p>
                        <a href="#!">
                          Установить
                        </a>
                      </p>
                    </div>
                    <div className="table__summury">
                      <p>
                        {getAmount(item)}
                      </p>
                    </div>
                    <div className="table__comment">
                      {item.note}
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>

          </div>

        </div>


      </section>


    </>
  );
}