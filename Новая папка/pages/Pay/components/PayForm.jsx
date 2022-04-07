import React, { useState } from 'react';
import Select from 'react-select';

import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

/*import Select from '@mui/material/Select';*/
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
import { currenciesList } from "../../Directory/Currency/Currency";

function PayForm({ item, setItem, error, setError, pageTypes, currentPathName }) {
  const payTypes = { cash: 'Наличные', bank_account: 'Касса' }
  const [payType, setPayType] = React.useState('cash');
  const [paymentList, setPaymentList] = React.useState([{ currency_id: null, amount: null }]);

  const [changeList, setChangeList] = React.useState([{ currency_id: null, amount: null }]);
  const [payCurrencyList, setPayCurrencyList] = React.useState([
    {
      name: 'UAH',
      id: 1
    },
    {
      name: 'RUB',
      id: 2
    },
    {
      name: 'USD',
      id: 3
    },
    {
      name: 'EUR',
      id: 4
    }
  ]);
  const [changeCurrencyList, setChangeCurrencyList] = React.useState([
    {
      name: 'UAH',
      id: 1
    },
    {
      name: 'RUB',
      id: 2
    },
    {
      name: 'USD',
      id: 3
    },
    {
      name: 'EUR',
      id: 4
    }
  ]);
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
  const [selectedOption, setSelectedOption] = useState(null);
  React.useEffect(() => {
    setItem({ "type_order": 'cash', "type": "payment" });
    // eslint-disable-next-line
  }, [])

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
    setPaymentList([...paymentList, { currency_id: null, amount: null }]);
    handleAddValues()
  }

  const addChange = (e) => {
    setChangeList([...changeList, { currency_id: null, amount: null }]);
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

  const updatePayment = (e, index, types) => {
    var type = 'payment';
    var name = types;
    var value = e.value;

    if (name === 'currency_id') {
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

  /*const updatePayment = (e, index, type) => {

    const { name, value } = e.target;

    console.log(index)
    console.log(type)
    console.log(name)
    console.log(value)

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
  };*/

  const makeChangeCurrencyList = (currencyId) => {
    const index = payCurrencyList.findIndex((item) => item.id === currencyId)

    if (index !== -1) {
      let n = payCurrencyList;

      n.splice(index, 1)
    }
  };

  const updateChange = (e, index, types) => {

    var value = e.value;
    var type = types;
    var name = 'currency_id';


    /*console.log(name,'..id');
    console.log(value,'value');
    console.log(index,'index');
    console.log(types,'change');

    console.log(id,'..id');
    console.log(value,'value');
    console.log(index,'index');
    console.log(types,'change');*/


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
        totalList.push({
          "currency_id": item.currency_id,
          "amount": item.amount - itemChange.amount,
          "type_pay": "total",
          "type_amount": "debit"
        })
      }
    });
    if (totalList.length > 0) {
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
  const [valueState, setValueState] = useState("");

  const handleChange = (nameSelect, event) => {
    const value = event.value;
    const name = nameSelect;

    console.log(name)
    console.log(value)

    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));

    setError(prevItem => ({
      ...prevItem,
      [name]: validate(name, value)
    }));
  };
  const handleChangeDate = e => {
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

  const optionsIdType = [
    { value: '0', label: pageTypes[currentPathName], isDisabled: true },
    { value: '1', label: 'Поставщик1' },
    { value: '2', label: 'Поставщик2' },
    { value: '3', label: 'Поставщик3' },
  ];

  var optionsIdCashAccounts = cashAccountList.map((item, index) => {
    return { value: String(item.id), label: item.name }
  });
  optionsIdCashAccounts.unshift({ value: '0', label: 'Выберите кассу/счёт', isDisabled: true });

  var optionsIdCurrency = changeCurrencyList.map((item, index) => {
    return { value: String(item.id), label: item.name }
  });
  optionsIdCurrency.unshift({ value: '0', label: 'Валюта', isDisabled: true });

  const optionsIdCurrencySecond = [
    { value: '0', label: 'Валюта', isDisabled: true },
    { value: '1', label: 'UAH' },
  ];

  const optionsOrg = [
    { value: '0', label: 'Организация', isDisabled: true },
    { value: '1', label: 'Организация1' },
    { value: '2', label: 'Организация2' },
    { value: '3', label: 'Организация3' },
  ];

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


  return (
    <>
      <div className="form_edit">
        <form action="#" className="form__people">
          <h4>
            Кому:
          </h4>
          <div className={"form__input " + (item.id_type && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <Select
                name="id_type"
                /*menuIsOpen={true}*/
                styles={customStyles}
                onChange={handleChange.bind(this, 'id_type')}
                options={optionsIdType}
                defaultValue={optionsIdType[0]}
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
          <div className={"form__input " + (item.type_order && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="form__radio">
              <input id="radio-1" name="type_order" type="radio" value="cash" onChange={togglePayType} />
              <label htmlFor="radio-1" className="radio-label" >Наличные</label>
            </div>

            <div className="form__radio">
              <input id="radio-2" name="type_order" type="radio" value="bank_account" onChange={togglePayType} />
              <label htmlFor="radio-2" className="radio-label">Со счета</label>
            </div>
          </div>

          <div className={"form__input " + (item.id_cash_accounts && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <Select
                name="id_cash_accounts"
                styles={customStyles}
                onChange={handleChange.bind(this, 'id_cash_accounts')}
                options={optionsIdCashAccounts}
                defaultValue={optionsIdCashAccounts[0]}
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
          <div className={"form__input " + (item.date && !error.id_type ? 'active-cheked' : 'active-disable')}>
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
                      value={item.date}
                      name="date"
                      onChange={handleChangeDate}
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
                  options={optionsIdCurrencySecond}
                  defaultValue={optionsIdCurrencySecond[0]}
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
              <input type="text" placeholder="Сумма:" className="short-input" />
            </div>
          }
          {payType === 'cash' &&
            <div>
              {paymentList.map((c, i) => {
                return (
                  <div className={"form__input " + (item.payments && item.payments[i] && !error.id_type ? 'active-cheked' : 'active-disable')} key={i}>
                    <div className="select select_short">
                      <Select
                        name="id_cash_accounts"
                        styles={customStyles}
                        onChange={(e) => updatePayment(e, i, 'id_cash_accounts')}
                        options={optionsIdCurrency}
                        defaultValue={optionsIdCurrency[0]}
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
                      value={c.value}
                      name="amount"
                      onChange={(e) => updatePayment(e, i, 'payment')}
                    />
                    <div className="form__setting">
                      <a href="#!" onClick={() => removePayment(i)}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.7298 3.67792L1.05188 0L0 1.05188L3.67792 4.7298L0.0518825 8.35583L1.10377 9.40772L4.7298 5.78168L8.35582 9.4077L9.4077 8.35582L5.78168 4.7298L9.45958 1.0519L8.4077 1.80587e-05L4.7298 3.67792Z"
                            fill="#F6222E" />
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
                        fill="#7096FF" />
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
                        onChange={(e) => updateChange(e, i, 'change')}
                        options={optionsIdCurrency}
                        defaultValue={optionsIdCurrency[0]}
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
                      value={c.value}
                      name="amount"
                      onChange={(e) => updateChange(e, i, 'change')}
                    />
                    <div className="form__setting">
                      <a href="#!" onClick={() => removeChange(i)}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.7298 3.67792L1.05188 0L0 1.05188L3.67792 4.7298L0.0518825 8.35583L1.10377 9.40772L4.7298 5.78168L8.35582 9.4077L9.4077 8.35582L5.78168 4.7298L9.45958 1.0519L8.4077 1.80587e-05L4.7298 3.67792Z"
                            fill="#F6222E" />
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
                        fill="#7096FF" />
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
          <div className={"form__input " + (item.id_legal_entites && !error.id_type ? 'active-cheked' : 'active-disable')}>
            <div className="select">
              <Select
                name="id_legal_entites"
                styles={customStyles}
                onChange={handleChange.bind(this, 'id_legal_entites')}
                options={optionsOrg}
                defaultValue={optionsOrg[0]}
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
