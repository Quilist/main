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

import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import styles from './../BuyForm.module.css'

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {Link} from "react-router-dom";
const filterAutocomplete = createFilterOptions();

function BuyForm({ item, setItem }) {
  const payTypes = { cash: 'Наличные', bank_account: 'Касса'}
  const pageTypes = {
    pay_supplier: 'Поставщик',
    pay_customer: 'Клиенту(возврат)',
    expend: 'Прочий расход',
    salary: 'Зарплата',
    pay_owner: 'Собственнику',
    receive_customer: 'От клиента',
    receive_supplier: 'От поставщика',
    receive_income: 'Прочее поступление',
    receive_owner: 'Взнос от собственника',
    receive_balance: 'Ввод остатков',
  }
  const [payType, setPayType] = React.useState('cash');
  const [priceList, setPriceList] = React.useState([
    { name: 'Анкл ндс', price: null, currency: null },
    { name: 'Закупочная' },
    { name: 'Мини опт(от 5 до 10 ящ)', price: null, currency: null },
    { name: 'Опт(от 10 до 22ящ)', price: null, currency: null },
    { name: 'Цена обычная без НДС', price: null, currency: null },
    { name: 'Цена обычная с НДС', price: null, currency: null }
  ]);

  const currentPathName = new URL(window.location.href).pathname.split('/')[1];

  const togglePayType = (e) => {
    setPayType(e.target.value)
  }

  const addPrice = (e) => {
    setPriceList([...priceList, { name: null, currency: null, value: null}]);
  }
  

  const removePrice = (index) => {
    setPriceList(priceList.filter((o, i) => index !== i));
  };
  

  const handleChange = e => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  //цены
  const prices = [
    { name: 'Анкл ндс' },
    { name: 'Закупочная' },
    { name: 'Мини опт(от 5 до 10 ящ)' },
    { name: 'Опт(от 10 до 22ящ)' },
    { name: 'Цена обычная без НДС' },
    { name: 'Цена обычная с НДС' }
  ];

  //единицы измерения
  const units = [
    { title: 'шт', id: 1 }
  ];
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: '',
      id: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    id: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      id: parseInt(dialogValue.id, 10),
    });

    handleClose();
  };

  return (
    <>
      <div className={styles.boxesWrapper__user}>
        {currentPathName !== 'receive_balance' && <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Поставщик</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Поставщик"
              sx={{ marginBottom: '15px' }}
            >
              <MenuItem value={1}>Тестовый поставщик</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Склад</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Склад"
              sx={{ marginBottom: '15px' }}
            >
              <MenuItem value={1}>Тестовый склад</MenuItem>
            </Select>
          </FormControl>


          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Тип цены</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Тип цены"
              sx={{ marginBottom: '15px' }}
            >
              {prices.map((option, index) => (
                <MenuItem
                  key={option.name}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
            <Select
              autoWidth
              label="Валюта:"
              sx={{ marginBottom: '15px' }}
            >
              <MenuItem value={'UAH'}>UAH</MenuItem>
              <MenuItem value={'RUB'}>RUB</MenuItem>
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Заметки:"
              type="text"
              variant="standard"
              value={item.name}
              name="name"
              onChange={handleChange}
            />
          </FormControl>

          <h3>Товары и услуги</h3>
          <Button className={styles.button}  variant="outlined">+ Добавить</Button>
        </div>}

      </div>

    </>
  )
}
export default BuyForm;