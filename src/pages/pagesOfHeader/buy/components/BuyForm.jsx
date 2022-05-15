import React from 'react';

import Tab from './Tabs';

import './BuyForm.css'
import '../../sell/sell.css'
import SelectComponent from "@/components/Select/SelectComponent";
import DatePicker from "@mui/lab/DatePicker";
import TextField from '@mui/material/TextField';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import FormControl from "@mui/material/FormControl";
import { Link } from 'react-router-dom';

const data = [
    {
        id: '1',
        tabTitle: "Товары и услуги",
    },
    {
        id: '2',
        tabTitle: "Доп. расходы",
    },
    {
        id: '3',
        tabTitle: "Детали",
    }
]


const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected || state.isFocused ? 'white' : 'black',
        background: state.isSelected || state.isFocused ? '#7196ff' : 'white',
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {...provided, opacity, transition};
    }
}

const optionsPurchase = [
    {value: '0', label: 'Закупка'},
    {value: '1', label: 'Заказ поставщику'},
];


function BuyForm({ item, setItem, auxiliaryList, id }) {

    /*const handleDate = (value) => {
        setItem(prevItem => ({
            ...prevItem,
            date: value
        }));
    }*/

    React.useEffect(() => {
        if(auxiliaryList.storehouses?.length > 0) {
            setItem(prevItem => ({
                ...prevItem,
                storehouse_id: auxiliaryList.storehouses[0].id
            }));
        }
        if(auxiliaryList.type_prices?.length > 0) {
            setItem(prevItem => ({
                ...prevItem,
                type_price_id: auxiliaryList.type_prices[0].id
            }));
        }
        if(auxiliaryList.currencies?.length > 0) {
            setItem(prevItem => ({
                ...prevItem,
                currency_id: auxiliaryList.currencies[0].id
            }));
        }

        // eslint-disable-next-line
    }, [auxiliaryList])

    const handleDate = (value) => {
        const date = new Date(value);
        const milliseconds = date.getTime();
        setItem(prevItem => ({
            ...prevItem,
            date: milliseconds
        }));
    }

    const [name, setName] = React.useState({
        'purchase': true,
        'idType': "",
        'storage': "",
        'org': "",
        'date': "",
        'typePrice': "",
        'currency': "",
    });

    const formatField = (value) => {
        let n;
        let h = parseInt(value);
        if(!isNaN(h)) {
            n = h;
        } else {
            n = value;
        }
        return n;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        let v = formatField(value);
        if(name === 'note') {
            v = String(v);
        }

        setItem(prevItem => ({
            ...prevItem,
            [name]: v
        }));
    };

    return (
        <>
            <div className="form_edit_wrap">
                <div className="form_edit mobile-block">
                    <form action="#" className="form__people info">
                        {/* ------------------------------ Закупка ------------------------------ */}
                        <div
                            className={"form__input purchase-wrap " + (name.purchase ? 'active-cheked' : 'active-disable')}>
                            <SelectComponent
                              list={auxiliaryList?.types_doc}
                              value={item.type_doc}
                              label="Закупка"
                              field="type_doc"
                              setItem={setItem}
                            />
                            { id && <Link to={{pathname: '/pay_supplier',
                                search: `?supplier_id=${item.supplier_id}`,
                            }}
                                          className="btn btn-green">Оплатить</Link> }
                        </div>
                        {/* ------------------------------ Поставщик ------------------------------ */}
                        <div
                            className={"form__input mobile-hidden " + (name.idType ? 'active-cheked' : 'active-disable')}>
                            <SelectComponent
                              list={auxiliaryList?.suppliers}
                              value={item.supplier_id}
                              label="Поставщик"
                              field="supplier_id"
                              setItem={setItem}
                            />
                        </div>
                        {/* ------------------------------ Склад ------------------------------ */}

                        <div
                            className={"form__input mobile-hidden " + (name.storage ? 'active-cheked' : 'active-disable')}>
                            <SelectComponent
                              list={auxiliaryList?.storehouses}
                              value={item.storehouse_id}
                              label="Склад"
                              field="storehouse_id"
                              setItem={setItem}
                            />
                        </div>

                    </form>
                    <form action="#" className="form__details debt desctop-hidden">
                        <div className="form__output">
                            <h3>Задолженность</h3>
                            <h2>5000 uah</h2>
                        </div>
                        {/*  Организация */}
                        <div className={"form__input " + (name.org ? 'active-cheked' : 'active-disable')}>
                            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

                            <SelectComponent
                              list={auxiliaryList?.legal_entities}
                              value={item.legal_entity_id}
                              label="Организация"
                              field="legal_entity_id"
                              setItem={setItem}
                            />
                        </div>
                        {/*  Цена */}
                        <div
                            className={"form__input " + (name.typePrice && name.currency ? 'active-cheked' : 'active-disable')}>
                            <SelectComponent
                              list={auxiliaryList?.type_prices}
                              value={item.type_price_id}
                              label="Тип цены"
                              field="type_price_id"
                              setItem={setItem}
                            />
                            &nbsp;
                            <SelectComponent
                              list={auxiliaryList?.currencies}
                              value={item.currency_id}
                              label="Валюта"
                              field="currency_id"
                              setItem={setItem}
                              isShort={true}
                            />
                        </div>
                        {/*  Дата */}
                        <div className={"form__input " + (item.date ? 'active-cheked' : 'active-disable')}>
                            <div className="data">
                                <FormControl fullWidth className="date-picker">
                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                        <DatePicker
                                            label="Дата"
                                            value={item.date}

                                            onChange={(newValue) => {
                                                handleDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </div>
                        </div>
                        {/*  Курьер */}
                        {/*<div className={"form__input " + (name.courier ? 'active-cheked' : 'active-disable')}>
                            <div className="select">
                                <Select
                                    name="courier"
                                    styles={customStyles}
                                    options={optionsСourier}
                                    defaultValue={optionsСourier[0]}
                                    onChange={handleChangeValue.bind(this, 'courier')}
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
                        </div>*/}
                    </form>
                </div>
            </div>

            <Tab data={data}
                 item={item}
                 setItem={setItem}
                 auxiliaryList={auxiliaryList}
            />
            <div className="form_footer">
                <div className="form_footer-l">
                    <label htmlFor="">Заметки</label>
                    <textarea cols="30"
                              rows="10"
                              value={item.note}
                              name="note"
                              onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form_footer-r">
                    <p className="form_footer-sum">Итого: <span>{item.sum || 0}</span></p>
                </div>
            </div>
        </>
    )
}

export default BuyForm;
