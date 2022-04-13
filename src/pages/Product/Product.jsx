import * as React from "react";
import { useNavigate } from 'react-router-dom'

import API from '@/api/api';

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const anchorRef = React.useRef(null);
  const navigate = useNavigate()
  const api = new API();

  useDocumentTitle("Товары и Услуги");
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

  const [selectedIndex, setSelectedIndex] = React.useState(1);

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

  React.useEffect(() => {
    api.all('product').then(data => {
      if (data.status === "error") alert(data.message)
      else setItems(data.message.items)
    })
    //setItems(mockResponse.message.items)
    // eslint-disable-next-line
  }, [])


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
  };

  const tableHeader = [
    {
      name: "Наименование"
    },
    {
      name: "Остаток"
    },
    {
      name: "Цена"
    },
    {
      name: "Ед. Изм."
    },
    {
      name: "Артикул"
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

  return (
    <>
      <section className="home-section">
        <div className="wrapper" >
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
                          <Link to="/products/create">
                            <MenuItem style={{ height: "30px" }}>
                              Товар или Услуга
                            </MenuItem>
                          </Link>
                        </MenuList>
                        <MenuList id="split-button-menu">
                          <Link to="/revaluation">
                            <MenuItem style={{ height: "30px" }}>
                              Переоценка
                            </MenuItem>
                          </Link>
                        </MenuList>
                        <MenuList id="split-button-menu">
                          <Link to="/import_products">
                            <MenuItem style={{ height: "30px" }}>
                              Импорт товаров
                            </MenuItem>
                          </Link>
                        </MenuList>
                        <MenuList id="split-button-menu">
                          <Link to="/revaluation">
                            <MenuItem style={{ height: "30px" }}>
                              Скачать прайс-лист
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </div>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
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
              loader={<h4></h4>}
              height={600}
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
                    </div>
                    <div className="table__data">
                      <p>
                        {item.name}
                      </p>
                      <p>

                      </p>
                    </div>
                    <div className="table__paysend">
                      <p>
                        {item.min_stock}
                      </p>
                    </div>
                    <div className="table__account">
                      <p>
                        0
                      </p>
                    </div>
                    <div className="table__comment">
                      {item.vendor_code}
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