import React, { useState } from 'react';
import Select from 'react-select';

import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

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
import moment from "moment";

function PayForm({ item, setItem, error, setError, pageTypes, currentPathName, auxiliaryList, id }) {
  const payTypes = { cash: 'Наличные', bank_account: 'Касса'}
  const [payType, setPayType] = React.useState('cash');
  const [paymentList, setPaymentList] = React.useState([{ currency_id: null, amount: null, type_pay: 'payment'}]);

  const [changeList, setChangeList] = React.useState([{ currency_id: null, amount: null, type_pay: 'change'}]);
  const [payCurrencyList, setPayCurrencyList] = React.useState([{ value: 0, label: 'Валюта', isDisabled: true }]);
  const [changeCurrencyList, setChangeCurrencyList] = React.useState([{ value: 0, label: 'Валюта', isDisabled: true }]);
  const [legalEntityList, setLegalEntityList] = React.useState([{ value: 0, label: 'Организация', isDisabled: true }]);
  const [cashAccountList, setCashAccountList] = React.useState([{ value: 0, label: 'Выберите кассу/счёт', isDisabled: true }]);
  const [itemList, setItemList] = React.useState([{ value: 0, label: pageTypes[currentPathName], isDisabled: true }]);


  React.useEffect(() => {
    if(auxiliaryList.items.length > 0) {
      const itemArr = auxiliaryList.items.map((item, index) => {
        return { value: item.id, label: item.name }
      });
      itemArr.unshift({ value: 0, label: pageTypes[currentPathName], isDisabled: true });

      setItemList(itemArr)
    }

    if(auxiliaryList.currencies.length > 0) {
      const cArr = auxiliaryList.currencies.map((item, index) => {
        return { value: item.id, label: item.name }
      });
      cArr.unshift({ value: 0, label: 'Валюта', isDisabled: true });

      setPayCurrencyList(cArr)
      setChangeCurrencyList(cArr)
    }

    if(auxiliaryList.cash_accounts.length > 0) {
      const caArr = auxiliaryList.cash_accounts.map((item, index) => {
        return { value: item.id, label: item.name }
      });
      caArr.unshift({ value: 0, label: 'Выберите кассу/счёт', isDisabled: true });

      setCashAccountList(caArr)
    }

    if(auxiliaryList.legal_entites.length > 0) {
      const leArr = auxiliaryList.legal_entites.map((item, index) => {
        return { value: item.id, label: item.name }
      });
      leArr.unshift({ value: 0, label: 'Организация', isDisabled: true });

      setLegalEntityList(leArr)
    }

    const currentDate = moment().format("YYYY-MM-DD");
    if(!item.type) {
      setItem({type_order: 'cash', type: currentPathName, created_at: currentDate});
    }

    // eslint-disable-next-line
  }, [auxiliaryList] )

  React.useEffect(() => {
    if(id) {
      if (item.payments && item.payments.length > 0) {
        setPaymentList(item.payments);
      }

      if (item.changes && item.changes.length > 0) {
        setChangeList(item.changes);
      }
    }

  }, [item] )

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
    setPaymentList([...paymentList, { currency_id: null, amount: null, type_pay: 'payment'}]);
    handleAddValues()
  }

  const addChange = (e) => {
    setChangeList([...changeList, { currency_id: null, amount: null, type_pay: 'change'}]);
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

  const updatePayment = (e) => {
    const {name, type, index} = e
    const value = parseInt(e.value) !== 'NaN' ? parseInt(e.value) : e.value

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

  const updateChange = (e) => {
    const {name, type, index} = e
    const value = parseInt(e.value) !== 'NaN' ? parseInt(e.value) : e.value
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
    if (!value || (typeof value === 'string' ? value.trim() === "" : '')) {
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
      created_at: value
    }));
  }

  const handleChange = e => {
    let name = null, value = null;
    if(e.target) {
       name = e.target.name
       value = parseInt(e.target.value) !== 'NaN' ? e.target.value : parseInt(e.target.value)
    } else {
       name = e.name
       value = parseInt(e.value) !== 'NaN' ? e.value : parseInt(e.value)
    }

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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected || state.isFocused ? 'white' : 'black',
      background: state.isSelected || state.isFocused ? '#7196ff' : 'white',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }

  const CustomMenuType = ({ innerRef, innerProps, isDisabled, children }) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
        {children}
        <div className="customReactSelectFooter">
          <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
          <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
        </div>
      </div>
    ) : null;

  const CustomMenuCashAccounts = ({ innerRef, innerProps, isDisabled, children }) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
        {children}
        <div className="customReactSelectFooter">
          <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
          <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
        </div>
      </div>
    ) : null;


  const CustomLegalEntites = ({ innerRef, innerProps, isDisabled, children }) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
        {children}
        <div className="customReactSelectFooter">
          <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
          <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
        </div>
      </div>
    ) : null;

  const selectedValue = (type, indexType) => {
    const defaultType = {
      type_id: { value: 0, label: pageTypes[currentPathName], isDisabled: true },
      legal_entity_id: { value: 0, label: 'Организация', isDisabled: true },
      cash_account_id: { value: 0, label: 'Выберите кассу/счёт', isDisabled: true },
      pay_currency: { value: 0, label: 'Валюта', isDisabled: true },
      change_currency: { value: 0, label: 'Валюта', isDisabled: true }
    }
    let array = []
    let itemTypeValue = item[type]
    if(type == 'type_id') {
      array = itemList
    }
    if(type == 'legal_entity_id') {
      array = legalEntityList
    }
    if(type == 'cash_account_id') {
      array = cashAccountList
    }
    if(type == 'pay_currency') {
      array = payCurrencyList
      if(item.payments && item.payments.length > 0) {
        itemTypeValue = item.payments[indexType].currency_id
      }

    }
    if(type == 'change_currency') {
      array = changeCurrencyList
      if(item.changes && item.payments.length > 0) {
        itemTypeValue = item.changes[indexType].currency_id
      }
    }

    const index = array.findIndex((t) => t.value === itemTypeValue)
    let res = null;
    if (index !== -1) {
      const obj = array[index]
      res = { id: obj.id, label: obj.label }
    } else {
      res = defaultType[type]
    }

    return res;
  };

  const selectedTypeId = (type) => {
    return selectedValue(type);
  }

  const selectedLegalEntityId = (type) => {
    return selectedValue(type);
  }

  const selectedCashAccountId = (type) => {
    return selectedValue(type);
  }

  const selectedPayCurrency = (type, index) => {
    return selectedValue(type, index);
  }

  const selectedChangeCurrency = (type, index) => {
    return selectedValue(type, index);
  }

  return (
    <>
      <div className="form_edit">
        <form action="#" className="form__people">
          <h4>
            Кому:
          </h4>
          <div className={"form__input " + ( item.type_id && !error.type_id ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <Select
                name="type_id"
                /*menuIsOpen={true}*/
                value={selectedTypeId('type_id')}
                styles={customStyles}
                onChange={event => handleChange(Object.assign(event, { name: 'type_id'}))}
                options={itemList}
                defaultValue={itemList[0]}
                components={{ Menu: CustomMenuType }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 12,
                  colors: {
                    ...theme.colors,
                    primary25: '#4369cf',
                    primary: '#7196ff',
                  },
                })}
              >
              </Select>
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
          <div className={"form__input " + ( item.type_order && !error.type_id ? 'active-cheked' : 'active-disable')}>
            <div className="form__radio">
              <input id="radio-1" name="type_order" type="radio" value="cash" checked={item.type_order === 'cash'} onChange={togglePayType}/>
              <label htmlFor="radio-1" className="radio-label" >Наличные</label>
            </div>

            <div className="form__radio">
              <input id="radio-2" name="type_order" type="radio" value="bank_account" checked={item.type_order === 'bank_account '} onChange={togglePayType}/>
              <label htmlFor="radio-2" className="radio-label">Со счета</label>
            </div>
          </div>


          <div className={"form__input " + ( item.cash_account_id && !error.type_id ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <Select
                name="cash_account_id"
                styles={customStyles}
                value={selectedCashAccountId('cash_account_id')}
                onChange={event => handleChange(Object.assign(event, { name: 'cash_account_id'}))}
                options={cashAccountList}
                defaultValue={cashAccountList[0]}
                components={{ Menu: CustomMenuCashAccounts }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 12,
                  colors: {
                    ...theme.colors,
                    primary25: '#4369cf',
                    primary: '#7196ff',
                  },
                })}
              >
              </Select>
            </div>
          </div>
          <div className={"form__input " + ( item.created_at && !error.type_id ? 'active-cheked' : 'active-disable')}>
            <div className="data">
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Дата"
                  value={item.created_at}
                  onChange={(newValue) => {
                    handleDate(newValue);
                  }}
                  renderInput={(params) =>
                    <input type="date" placeholder="Дата"
                           value={item.created_at}
                           name="created_at"
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
                  <Select
                    styles={customStyles}
                    value={selectedChangeCurrency('change_currency')}
                    options={changeCurrencyList}
                    defaultValue={changeCurrencyList[0]}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 12,
                      colors: {
                        ...theme.colors,
                        primary25: '#4369cf',
                        primary: '#7196ff',
                      },
                    })}
                  >
                  </Select>
                </div>
                <input type="text" placeholder="Сумма:" className="short-input"/>
              </div>
            }
          {payType === 'cash' &&
            <div>
              {paymentList.map((c, i) => {
                return (
                  <div className={"form__input " + ( item.payments && item.payments[i] && !error.type_id ? 'active-cheked' : 'active-disable')} key={i}>
                    <div className="select select_short">
                      <Select
                        name="currency_id"
                        styles={customStyles}
                        value={selectedPayCurrency('pay_currency', i)}
                        onChange={event => updatePayment(Object.assign(event, { name: 'currency_id', type: 'payment', index: i}))}
                        options={payCurrencyList}
                        defaultValue={payCurrencyList[0]}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 12,
                          colors: {
                            ...theme.colors,
                            primary25: '#4369cf',
                            primary: '#7196ff',
                          },
                        })}
                      >
                      </Select>
                    </div>
                    <input type="text" placeholder="Оплата:" className="short-input"
                           value={c.amount}
                           name="amount"
                           onChange={event => updatePayment({ name: event.target.name, value: event.target.value, type: 'payment', index: i})}
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
                      <Select
                        name="currency_id"
                        styles={customStyles}
                        value={selectedPayCurrency('pay_currency', i)}
                        onChange={event => updateChange(Object.assign(event, { name: 'currency_id', type: 'change', index: i}))}
                        options={payCurrencyList}
                        defaultValue={payCurrencyList[0]}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 12,
                          colors: {
                            ...theme.colors,
                            primary25: '#4369cf',
                            primary: '#7196ff',
                          },
                        })}
                      >
                      </Select>
                    </div>
                    <input type="text" placeholder="Сдача:" className="short-input"
                           value={c.amount}
                           name="amount"
                           onChange={event => updateChange({ name: event.target.name, value: event.target.value, type: 'change', index: i})}
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
          <div className={"form__input " + ( item.legal_entity_id && !error.type_id ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <Select
                name="legal_entity_id"
                styles={customStyles}
                value={selectedLegalEntityId('legal_entity_id')}
                onChange={event => handleChange(Object.assign(event, { name: 'legal_entity_id'}))}
                options={legalEntityList}
                defaultValue={legalEntityList[0]}
                components={{ Menu: CustomLegalEntites }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 12,
                  colors: {
                    ...theme.colors,
                    primary25: '#4369cf',
                    primary: '#7196ff',
                  },
                })}
              >
              </Select>
            </div>
          </div>

        </form>
      </div>
    </>
  )
}
export default PayForm