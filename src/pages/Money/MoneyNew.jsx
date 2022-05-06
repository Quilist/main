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
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import moment from 'moment';
import {useDocumentTitle} from "@/hooks/useDocumentTitle";
import { useSelector } from "react-redux";

export default function EnhancedTable() {
  const [isOpen, setOpen] = useState('dropdown');
  const [open, setIsOpen] = React.useState(false);
  // eslint-disable-next-line
  const [items, setItems] = React.useState([])

  const [openCurrencyExchangeModal, setOpenCurrencyExchangeModal] = React.useState(false);
  const [openMovingMoney, setOpenMovingMoney] = React.useState(false);
  const [currencyExchangeId, setCurrencyExchangeId] = React.useState(null);
  const [movingMoneyId, setMovingMoneyId] = React.useState(null);
  const [openCashModal, setOpenCashModal] = useState(false);
  const [cashAndAccountsList, setCashAndAccountsList] = useState([]);
  const [cashAccountUserList, setCashAccountUserList] = useState([]);
  const [queryParams, setQueryParams] = useState({ date_from: moment().startOf('day').valueOf(), date_to: moment().endOf('day').valueOf() });
  const anchorRef = React.useRef(null);
  const navigate = useNavigate()
  const api = new API();
  
  const [currency, setCurrency] = React.useState('');

  React.useEffect(() => {
    api.auxiliary('cashAndAccount').then(data => {
      if (data.status === "error") alert(data.message)
      else setCurrency(data.message.currencies)
    })
    // eslint-disable-next-line
  }, [open]);

  const handleOpenCurrencyExchangeModal = (id) => {
    setOpenCurrencyExchangeModal(true);
    let h = parseInt(id);
    if(!isNaN(h)) {
      setCurrencyExchangeId(id);
    }
  };

  const handleOpenMovingMoney = (id) => {
    setOpenMovingMoney(true);
    let h = parseInt(id);
    if(!isNaN(h)) {
      setMovingMoneyId(id);
    }
  };

  useDocumentTitle("Деньги");

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [dateState, setDateState] = useState({
    startDate: moment(),
    endDate: moment(),
  });

  const payOptions = [
    { name: 'Поставщику', link: '/pay_supplier' },
    { name: 'Клиенту(возврат)', link: '/pay_customer' },
    { name: 'Прочий расход', link: '/pay_expend' },
    { name: 'Зарплата', link: '/pay_salary' },
    { name: 'Собственнику', link: '/pay_owner' }
  ];

  const receiveOptions = [
    { name: 'От клиента', link: '/receive_customer' },
    { name: 'От поставщика', link: '/receive_supplier' },
    { name: 'Прочее поступление', link: '/receive_income' },
    { name: 'Взнос от собственника', link: '/receive_owner' },
    { name: 'Ввод остатков', link: '/receive_balance' }
  ];

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const getAll = () => {
    console.log('queryParams', queryParams)
    api.all('money', queryParams).then(data => {
      if (data.status === "error") console.log(data.message)
      else setItems(data.message.items)
    })
  };

  const getAllCashAccountUser = () => {
    api.all('cashAccountUser').then(data => {
      if (data.status === "error") console.log(data.message)
      else setCashAccountUserList(data.message.items)
    })
  };

  const search = useSelector((state) => state);

  React.useEffect(() => {
    searchData(search.searchReducer);
    // eslint-disable-next-line
  }, [search])

  React.useEffect(() => {
    getAll();
    // eslint-disable-next-line
  }, [queryParams])

  React.useEffect(() => {
    if(!openCashModal) {
      getAllCashAccountUser();
    }
    // eslint-disable-next-line
  }, [openCashModal])

  React.useEffect(() => {
    if (!openCurrencyExchangeModal || !openMovingMoney) {
      getAll();
      //setItems(mockResponse.message.items)
    }
    // eslint-disable-next-line
  }, [openCurrencyExchangeModal, openMovingMoney])


  React.useEffect(() => {
    // eslint-disable-next-line
  }, [cashAndAccountsList])

  const listElement =  React.useRef(null);
  const listElementTwo =  React.useRef(null);

  const showDropDown = (item) => {
    listElement.current.classList.toggle("hidden");

    listElementTwo.current.classList.add("hidden");
  };

  const showDropDownTwo = (item) => {
    listElementTwo.current.classList.toggle("hidden");

    listElement.current.classList.add("hidden");
  };

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
      navigate(`/${item.type}/${item.id}`)
    }
    if(item.amount_receive) {
      handleOpenCurrencyExchangeModal(item.id);
    }
    if(item.to_cash_account_id) {
      handleOpenMovingMoney(item.id);
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
    const date = new Date(+milliseconds);
    const formatDate = date.toISOString().split('T')[0]
    return formatDate;
  };

  const getType = (item) => {
    let type = null;
    if (item.type) {
      if (item.type.indexOf('pay') !== -1) {
        type = 'Оплата'
        const payIndex = payOptions.findIndex((payItem) => payItem.link === '/'+item.type)
        if (payIndex !== -1) {
          type = type + ' ' + payOptions[payIndex].name;
        }
      }
      if (item.type.indexOf('receive') !== -1) {
        type = 'Прием'
        const payIndex = receiveOptions.findIndex((payItem) => payItem.link === '/'+item.type)
        if (receiveOptions !== -1) {
          type = type + ' ' + receiveOptions[payIndex].name;
        }
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

  const getAmountList = (item) => {
    let amountList = [];
    if(item.payments && item.payments.length > 0) {
      const totalList = item.payments.filter(v => v.type_pay === "total");
      if (totalList.length > 0) {
        amountList = totalList.map((item, index) => {
          return item
        });
      } else {
        const payList = item.payments.filter(v => v.type_pay === "payment");
        if (payList.length > 0) {
          amountList = payList.map((item, index) => {
            return item
          });
        }
      }
    }

    return amountList;
  };

  const searchData = (search) => {
    setQueryParams(prevItem => ({
      ...prevItem,
      search: search,
    }));
  };

  const handleCloseCreateMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    handleOpen();
  };

  const removeCashAccountUser = (item) => {
    api.remove(item.id, 'cashAccountUser').then(data => {
      if (data.status === "error") return alert(data.message)
      getAllCashAccountUser();
    })
  };

  const { startDate, endDate } = dateState;
  const handleDateRangePickerCallback = (startDate, endDate) => {
    setQueryParams(prevItem => ({
      ...prevItem,
      date_from: startDate.valueOf(),
      date_to: endDate.valueOf()
    }));
    setDateState({ startDate, endDate });
  };
  const dateRange =
    startDate.format('MMMM D, YYYY');

  return (
    <>
      <CurrencyExchangeModal
        open={openCurrencyExchangeModal}
        setOpen={setOpenCurrencyExchangeModal}
        id={currencyExchangeId}
        setId={setCurrencyExchangeId}
      />

      <MovingMoneyModal
        open={openMovingMoney}
        setOpen={setOpenMovingMoney}
        id={movingMoneyId}
        setId={setMovingMoneyId}
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
            {cashAccountUserList.map((item, index) => {
              return (
                <a href="#!" className="wrapper__box">
                  <span style={{ color: 'red' }} onClick={() => removeCashAccountUser(item)}>X</span>
                  <h3>
                    {`
                    ${item.cash_account.name}
                    ${item.cash_account.cash_accounts_balance[0].balance} 
                    ${currency[currency.findIndex(elem => elem.id === item.cash_account.cash_accounts_balance[0].currency_id)].name}
                    `}
                  </h3>
                  <p>
                    {`
                    ${item.cash_account.name}
                    ${item.cash_account.cash_accounts_balance[0].balance} 
                    ${currency[currency.findIndex(elem => elem.id === item.cash_account.cash_accounts_balance[0].currency_id)].name}
                    `}
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
              style={{ zIndex: "10"}}
              placement="bottom-start"
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === "center bottom",
                    marginTop: "5px",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseCreateMenu}>
                      <div>
                        <MenuList id="split-button-menu">

                          <div className="dropDownWrap">
                            <button onClick={showDropDown} className={'dropDownBtn'}>
                              Оплатить
                            </button>
                            <div className="dropDownMenu hidden" ref={listElement}>
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
                            </div>
                          </div>

                          <div className="dropDownWrap">
                            <button onClick={showDropDownTwo} className={'dropDownBtn'}>
                              Принять
                            </button>
                            <div className="dropDownMenu hidden" ref={listElementTwo}>
                              {receiveOptions.map((option, index) => (
                                <MenuItem
                                  style={{ maxWidth: "100%" }}
                                  key={option.name}
                                  selected={index === selectedIndex}
                                  onClick={(event) => handleMenuItemClick(event, index)}
                                >
                                  <Link to={option.link}>{option.name}</Link>
                                </MenuItem>
                              ))}
                            </div>
                          </div>

                        </MenuList>
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
                  {dateState.startDate.format('MMMM D, YYYY')} - {dateState.endDate.format('MMMM D, YYYY')}
                </p>
              </DateRangePicker>
              <a href="#!">

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
              loader={<b><i>Нету данных</i></b>}
              height={470}
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
                      { item.type && item.type.indexOf('receive') !== -1 && <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M7 0C6.2268 0 5.6 0.626802 5.6 1.4V5.60001H1.4C0.626802 5.60001 0 6.22681 0 7.00001C0 7.77321 0.626801 8.40001 1.4 8.40001H5.6V12.6C5.6 13.3732 6.2268 14 7 14C7.7732 14 8.4 13.3732 8.4 12.6V8.40001H12.6C13.3732 8.40001 14 7.77321 14 7.00001C14 6.22681 13.3732 5.60001 12.6 5.60001H8.4V1.4C8.4 0.626801 7.7732 0 7 0Z"
                              fill="#45D064" />
                      </svg> }
                      { item.type && item.type.indexOf('pay') !== -1 && <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="14" y="0.600006" width="2.8" height="14" rx="1.4" transform="rotate(90 14 0.600006)" fill="#EE2727"/>
                      </svg> }
                    </div>
                    <div className="table__mob">
                      {item.type ?
                        <p>{item.type_item ? item.type_item.name : ''}</p>
                        :
                        <p>
                          {item.type && <a href="#!">
                            Установить
                          </a> }
                        </p>
                      }
                      <p>
                        {item.cash_account?.name}
                      </p>
                      {item.from_cash_account &&
                        <p>{item.from_cash_account.name}</p>
                      }
                      {item.to_cash_account &&
                        <p>{item.to_cash_account.name}</p>
                      }
                    </div>
                    <div className="table__data">
                      <p>
                        {formattedDate(item.created_at)}
                        {item.number && <span>.#.№{item.number}</span> }
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
                        {item.cash_account?.name}
                        {item.from_cash_account &&
                          <p>{item.from_cash_account.name}</p>
                        }
                      </p>
                    </div>
                    <div className="table__counterparty">
                      {item.type ?
                        <p>{item.type_item ? item.type_item.name : ''}</p>
                        :
                        <p>
                          {item.type && <a href="#!">
                            Установить
                          </a> }
                        </p>
                      }
                      {item.to_cash_account &&
                        <p>{item.to_cash_account.name}</p>
                      }
                    </div>
                    <div className="table__summury">
                      <p>
                        {getAmountList(item).map((amountItem) => {
                          return (
                            <p>{amountItem.amount} {amountItem.currency.name}</p>
                          );
                        })}
                        {item.from_currency &&
                          <p>Отдал: {item.amount_pay} {item.from_currency.name}</p>
                        }
                        {item.to_currency &&
                          <p>Получил: {item.amount_receive} {item.to_currency.name}</p>
                        }
                        {item.amount &&
                          <p>{item.amount}  {item.currency.name}</p>
                        }
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
