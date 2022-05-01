import React from 'react';

import Tab from './Tabs';

import './BuyForm.css'
import '../../sell/sell.css'
import Select from "react-select";
import DatePicker from "@mui/lab/DatePicker";
import TextField from '@mui/material/TextField';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import FormControl from "@mui/material/FormControl";

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

const optionsIdType = [
    {value: '0', label: 'Поставщик', isDisabled: true},
    {value: '1', label: 'Поставщик1'},
    {value: '2', label: 'Поставщик2'},
    {value: '3', label: 'Поставщик3'},
];

const optionsStorage = [
    {value: '0', label: 'Склад', isDisabled: true},
    {value: '1', label: 'Склад1'},
    {value: '2', label: 'Склад2'},
    {value: '3', label: 'Склад3'},
];

const optionsTypePrice = [
    {value: '0', label: 'Тип цены ', isDisabled: true},
    {value: 'saab', label: 'Закупочный'},
    {value: 'opel', label: 'Розница'},
    {value: 'audi', label: 'Цена без НДС'},
];

const optionsCurrency = [
    {value: '0', label: 'Валюта', isDisabled: true},
    {value: '1', label: 'Валюта1'},
    {value: '2', label: 'Валюта2'},
    {value: '3', label: 'Валюта3'},
];

const optionsOrg = [
    {value: '0', label: 'Организация', isDisabled: true},
    {value: '1', label: 'Организация1'},
    {value: '2', label: 'Организация2'},
    {value: '3', label: 'Организация3'},
];

/*const optionsСourier = [
    {value: '0', label: 'Выберете курьера', isDisabled: true},
    {value: '1', label: 'Курьер 1'},
    {value: '2', label: 'Курьер 2'},
    {value: '3', label: 'Курьер 3'},
];*/

const CustomType = ({innerRef, innerProps, isDisabled, children}) =>
    !isDisabled ? (
        <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
            {children}
            <div className="customReactSelectFooter">
                <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
                <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
            </div>
        </div>
    ) : null;

const CustomStorage = ({innerRef, innerProps, isDisabled, children}) =>
    !isDisabled ? (
        <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
            {children}
            <div className="customReactSelectFooter">
                <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
                <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
            </div>
        </div>
    ) : null;

const CustomOrg = ({innerRef, innerProps, isDisabled, children}) =>
    !isDisabled ? (
        <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
            {children}
            <div className="customReactSelectFooter">
                <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
                <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
            </div>
        </div>
    ) : null;


function BuyForm(props) {


    const [item, setItem] = React.useState(props);

    /*const handleDate = (value) => {
        setItem(prevItem => ({
            ...prevItem,
            date: value
        }));
    }*/

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

    const handleChangeValue = (id, e) => {
        const {name, value} = e;

        setName(prevItem => ({
            ...prevItem,
            [id]: value ? value : 'true',
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
                            <div className="select">
                                <Select
                                    name="purchase"
                                    styles={customStyles}
                                    options={optionsPurchase}
                                    defaultValue={optionsPurchase[0]}
                                    onChange={handleChangeValue.bind(this, 'purchase')}
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
                            <button type="button" className="btn btn-green">Оплатить</button>
                        </div>
                        {/* ------------------------------ Поставщик ------------------------------ */}
                        <div
                            className={"form__input mobile-hidden " + (name.idType ? 'active-cheked' : 'active-disable')}>
                            <div className="select">
                                <Select
                                    name="id_type"
                                    styles={customStyles}
                                    options={optionsIdType}
                                    defaultValue={optionsIdType[0]}
                                    components={{Menu: CustomType}}
                                    onChange={handleChangeValue.bind(this, 'idType')}
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
                        {/* ------------------------------ Склад ------------------------------ */}

                        <div
                            className={"form__input mobile-hidden " + (name.storage ? 'active-cheked' : 'active-disable')}>
                            <div className="select">
                                <Select
                                    name="id_storage"
                                    styles={customStyles}
                                    options={optionsStorage}
                                    defaultValue={optionsStorage[0]}
                                    components={{Menu: CustomStorage}}
                                    onChange={handleChangeValue.bind(this, 'storage')}
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
                    <form action="#" className="form__details debt desctop-hidden">
                        <div className="form__output">
                            <h3>Задолженность</h3>
                            <h2>5000 uah</h2>
                        </div>
                        {/*  Организация */}
                        <div className={"form__input " + (name.org ? 'active-cheked' : 'active-disable')}>
                            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

                            <div className="select">
                                <Select
                                    name="id_org"
                                    styles={customStyles}
                                    options={optionsOrg}
                                    defaultValue={optionsOrg[0]}
                                    components={{Menu: CustomOrg}}
                                    onChange={handleChangeValue.bind(this, 'org')}
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
                        {/*  Цена */}
                        <div
                            className={"form__input " + (name.typePrice && name.currency ? 'active-cheked' : 'active-disable')}>
                            <div className="select">
                                <Select
                                    name="id_type_price"
                                    styles={customStyles}
                                    options={optionsTypePrice}
                                    defaultValue={optionsTypePrice[0]}
                                    onChange={handleChangeValue.bind(this, 'typePrice')}
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
                            &nbsp;
                            <div className="select select_short">
                                <Select
                                    name="id_currency"
                                    styles={customStyles}
                                    options={optionsCurrency}
                                    defaultValue={optionsCurrency[0]}
                                    onChange={handleChangeValue.bind(this, 'currency')}
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

            <Tab data={data}/>
            <div className="form_footer">
                <div className="form_footer-l">
                    <label htmlFor="">Заметки</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="form_footer-r">
                    <p className="form_footer-sum">Итого: <span>67 380,00</span></p>
                </div>
            </div>
        </>
    )
}

export default BuyForm;
