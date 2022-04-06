import React from 'react';

import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Button from "@mui/material/Button";

import styles from '@/styles/modules/PayForm.module.css'

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {currenciesList} from "../../Directory/Currency/Currency";

function PayForm({ item, setItem, error, setError, pageTypes, currentPathName, auxiliaryList }) {
  const payTypes = { cash: 'Наличные', bank_account: 'Касса'}
  const [payType, setPayType] = React.useState('cash');
  const [paymentList, setPaymentList] = React.useState([{ currency_id: null, amount: null}]);

  const [changeList, setChangeList] = React.useState([{ currency_id: null, amount: null}]);
  const [payCurrencyList, setPayCurrencyList] = React.useState([]);
  const [changeCurrencyList, setChangeCurrencyList] = React.useState([]);
  const [legalEntityList, setLegalEntityList] = React.useState([]);
  const [itemList, setItemList] = React.useState([]);
  const [cashAccountList] = React.useState([
    {
      id: 1,
      name: 'Тестовая ГРН',
      currency_id: 1,
      currency: {
        name: 'UAH',
        id: 1
      }
    },
    {
      id: 2,
      name: 'Тестовая ДОЛ',
      currency_id: 3,
      currency: {
        name: 'USD',
        id: 3
      }
    }
  ]);


  React.useEffect(() => {
    console.log('auxiliaryList', auxiliaryList)
    setPayCurrencyList(auxiliaryList.currencies);
    setChangeCurrencyList(auxiliaryList.currencies);
    setLegalEntityList(auxiliaryList.legal_entites);
    setItemList(auxiliaryList.items);
    setItem({"type_order": 'cash', "type": currentPathName});
    // eslint-disable-next-line
  }, [auxiliaryList] )

  const togglePayType = (e) => {

    setPayType(e.target.value)
    //e.target.name = 'type_order'
    // if(e.target.value === 'cash') {
    //
    // }
    //
    // if(e.target.value === 'bank_account') {
    //   e.target.name = 'bank_account'
    // }

    handleChange(e)
  }

  const paymentTypes = {
    payment: {
      "type_pay": "payment",
      "type_amount": "debit"
    },
    change: {
      "type_pay": "change",
      "type_amount": "debit"
    }
  }

  const addPayment = (e) => {
    setPaymentList([...paymentList, { currency_id: null, amount: null}]);
    handleAddValues()
  }

  const addChange = (e) => {
    setChangeList([...changeList, { currency_id: null, amount: null}]);
  }

  const removePayment = (index) => {
    setPaymentList(paymentList.filter((o, i) => index !== i));
  };

  const removeChange = (index) => {
    setChangeList(changeList.filter((o, i) => index !== i));
  };

  const handleAddValues = () => {
    setItem(prevItem => ({
      ...prevItem,
      payments: paymentList
    }));
  }

  const updatePayment = (e, index, type) => {
    const { name, value } = e.target;

    if(name === 'currency_id') {
      //makeChangeCurrencyList(value);
    }
    paymentList[index][name] = value
    paymentList[index] = Object.assign({}, paymentList[index], paymentTypes[type]);
    setItem(prevItem => ({
      ...prevItem,
      payments: paymentList
    }));
    handleTotalPay();
  };

  const makeChangeCurrencyList = (currencyId) => {
    const index = payCurrencyList.findIndex((item) => item.id === currencyId)

    if (index !== -1) {
      let n = payCurrencyList;

      n.splice(index, 1)
    }
  };

  const updateChange = (e, index, type) => {
    const { name, value } = e.target;
    changeList[index][name] = value
    changeList[index] = Object.assign({}, changeList[index], paymentTypes[type]);
    setItem(prevItem => ({
      ...prevItem,
      changes: changeList
    }));
    handleTotalPay();
  };

  const handleTotalPay = () => {
    let totalList = []
    // eslint-disable-next-line
    paymentList.map((item, i) => {
      const indexChange = changeList.findIndex((itemChange) => item.currency_id === itemChange.currency_id)
      if (indexChange !== -1) {
        let itemChange = changeList[indexChange];
        if(itemChange.amount && item.currency_id) {
          totalList.push({
            "currency_id": item.currency_id,
            "amount": item.amount - itemChange.amount,
            "type_pay": "total",
            "type_amount": "debit"
          })
        }

      }
    });
    if(totalList.length > 0) {
      setItem(prevItem => ({
        ...prevItem,
        totals: totalList
      }));
    }
  };

  const validate = (name, value) => {
    if (!value || value.trim() === "") {
      return "Field is Required";
    } else {
      return "";
    }

    // switch (name) {
    //   case "name":
    //     if (!value || value.trim() === "") {
    //       return "Field is Required";
    //     } else {
    //       return "";
    //     }
    //   default: {
    //     return "";
    //   }
    // }
  };

  const handleDate = (value) => {
    setItem(prevItem => ({
      ...prevItem,
      date: value
    }));
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));

    setError(prevItem => ({
      ...prevItem,
      [name]: validate(name, value)
    }));
  };

  const handleItemNameField = (item) => {
    let name = null;
    if(item.name) {
      name = item.name;
    }
    if(item.username) {
      name = item.username;
    }
    if(item.f_name) {
      name = item.f_name + ' ' + item.s_name;
    }

    return name;
  };

  return (
    <>
      <div className="form_edit">
        <form action="#" className="form__people">
          <h4>
            Кому:
          </h4>
          <div className={"form__input " + ( item.id_type && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <select
                value={item.id_type}
                name="id_type"
                onChange={handleChange}
              >
                <option selected disabled>{pageTypes[currentPathName]}</option>
                {itemList.map((item, index) => {
                  return (<option key={item.id} value={item.id}>
                    {handleItemNameField(item)}
                  </option>)
                })}
              </select>
            </div>
          </div>
          <div className="form__title">
            <h4>
              Откуда:
            </h4>
          </div>
          <div className="form__title_select">
            <p>
              Вид оплаты:
            </p>
          </div>
          <div className={"form__input " + ( item.type_order && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="form__radio">
              <input id="radio-1" name="type_order" type="radio" value="cash" onChange={togglePayType}/>
              <label htmlFor="radio-1" className="radio-label" >Наличные</label>
            </div>

            <div className="form__radio">
              <input id="radio-2" name="type_order" type="radio" value="bank_account" onChange={togglePayType}/>
              <label htmlFor="radio-2" className="radio-label">Со счета</label>
            </div>
          </div>


          <div className={"form__input " + ( item.id_cash_accounts && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <select
                value={item.id_cash_accounts}
                name="id_cash_accounts"
                onChange={handleChange}
              >
                <option selected disabled>Выберите кассу/счёт</option>
                {cashAccountList.map((item, index) => {
                  return (<option key={item.id} value={item.id}>{item.name}</option>)
                })}
              </select>
            </div>
          </div>
          <div className={"form__input " + ( item.date && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="data">
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Дата"
                  value={item.date_create}
                  onChange={(newValue) => {
                    handleDate(newValue);
                  }}
                  renderInput={(params) =>
                    <input type="date" placeholder="Дата"
                           value={item.date}
                           name="date"
                           onChange={handleChange}
                           {...params}
                    />
                  }
                />
              </LocalizationProvider>

            </div>
          </div>
          <div className="form__input">
            <textarea placeholder="Комментарий:"
                      value={item.note}
                      name="note"
                      onChange={handleChange}
            ></textarea>
          </div>
        </form>

        <form action="#" className="form__details">
          <h4>
            Детали оплаты:
          </h4>
            {payType === 'bank_account' &&
              <div className="form__input active-disable">
                <div className="select select_short">
                  <select>
                    <option selected disabled>Валюта</option>
                    <option value="1">UAH</option>
                  </select>
                </div>
                <input type="text" placeholder="Сумма:" className="short-input"/>
              </div>
            }
          {payType === 'cash' &&
            <div>
              {paymentList.map((c, i) => {
                return (
                  <div className={"form__input " + ( item.payments && item.payments[i] && !error.id_type ? 'active-cheked' : 'active-disable')} key={i}>
                    <div className="select select_short">
                      <select
                        value={c.currency}
                        name="currency_id"
                        onChange={(e) => updatePayment(e, i, 'payment')}
                      >
                        <option selected disabled>Валюта</option>
                        {payCurrencyList.map((currency, currencyIndex) => {
                          return (<option key={currency.id} value={currency.id}>{currency.name}</option>)
                        })}
                      </select>
                    </div>
                    <input type="text" placeholder="Оплата:" className="short-input"
                           value={c.value}
                           name="amount"
                           onChange={(e) => updatePayment(e, i, 'payment')}
                    />
                    <div className="form__setting">
                      <a href="#!" onClick={() => removePayment(i)}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.7298 3.67792L1.05188 0L0 1.05188L3.67792 4.7298L0.0518825 8.35583L1.10377 9.40772L4.7298 5.78168L8.35582 9.4077L9.4077 8.35582L5.78168 4.7298L9.45958 1.0519L8.4077 1.80587e-05L4.7298 3.67792Z"
                                fill="#F6222E"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                )
              })}
              <div className="form__input" >
                <div className="form__setting">
                  <a href="#!" onClick={addPayment}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z"
                            fill="#7096FF"/>
                    </svg>
                  </a>
                </div>
              </div>
              {changeList.map((c, i) => {
                return (
                  <div className="form__input active-cheked">
                    <div className="select select_short">
                      <select
                        value={c.currency}
                        name="currency_id"
                        onChange={(e) => updateChange(e, i, 'change')}
                      >
                        <option selected disabled>Валюта</option>
                        {changeCurrencyList.map((currency, currencyIndex) => {
                          return (<option key={currency.id} value={currency.id}>{currency.name}</option>)
                        })}
                      </select>
                    </div>
                    <input type="text" placeholder="Сдача:" className="short-input"
                           value={c.value}
                           name="amount"
                           onChange={(e) => updateChange(e, i, 'change')}
                    />
                    <div className="form__setting">
                      <a href="#!" onClick={() => removeChange(i)}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.7298 3.67792L1.05188 0L0 1.05188L3.67792 4.7298L0.0518825 8.35583L1.10377 9.40772L4.7298 5.78168L8.35582 9.4077L9.4077 8.35582L5.78168 4.7298L9.45958 1.0519L8.4077 1.80587e-05L4.7298 3.67792Z"
                                fill="#F6222E"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                )
              })}
              <div className="form__input" >
                <div className="form__setting">
                  <a href="#!" onClick={addChange}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z"
                            fill="#7096FF"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          }

          <div className="form__title">
            <h4>
              Организация плательщик
            </h4>
          </div>
          <div className={"form__input " + ( item.id_legal_entites && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <select value={item.id_legal_entites}
                      name="id_legal_entites"
                      onChange={handleChange}
              >
                <option selected disabled>Организация</option>
                {legalEntityList.map((item, currencyIndex) => {
                  return (<option key={item.id} value={item.id}>{item.legal_name}</option>)
                })}
              </select>
            </div>
          </div>

        </form>
      </div>
    </>
  )
}
export default PayForm