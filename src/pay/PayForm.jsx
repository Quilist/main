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

import styles from "./Pay.module.css";

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import TextareaAutosize from '@mui/material/TextareaAutosize';

function UserForm({ name, setName, mfo, setMfo, checkingAccount, setCheckingAccount }) {
  const payTypes = { cash: 'Наличные', bank_account: 'Касса'}
  const pageTypes = { pay_supplier: 'Поставщик', pay_customer: 'Клиенту(возврат)', expend: 'Прочий расход', salary: 'Зарплата', pay_owner: 'Собственнику' }
  const [payType, setPayType] = React.useState('cash');
  const [paymentList, setPaymentList] = React.useState([{ currency: null, value: null}]);
  const [changeList, setChangeList] = React.useState([{ currency: null, value: null}]);

  const currentPathName = new URL(window.location.href).pathname.split('/')[1];

  const togglePayType = (e) => {
    setPayType(e.target.value)
  }

  const addPayment = (e) => {
    setPaymentList([...paymentList, { currency: null, value: null}]);
  }

  const addChange = (e) => {
    setChangeList([...changeList, { currency: null, value: null}]);
  }

  const removeChange = (index) => {
    setChangeList(changeList.filter((o, i) => index !== i));
  };

  return (
    <>
      <div className={styles.boxesWrapper}>
        <h5>Кому</h5>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{pageTypes[currentPathName]}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="Поставщик"
          >
            <MenuItem >Нету данных</MenuItem>
          </Select>
        </FormControl>

        <h5>Откуда</h5>
        <FormControl >
          <FormLabel id="demo-row-radio-buttons-group-label">Вид оплаты</FormLabel>
          <RadioGroup
            row
            defaultValue="cash"
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="cash" control={<Radio />} label="Наличные" onChange={togglePayType}/>
            <FormControlLabel value="bank_account" control={<Radio />} label="Со счета" onChange={togglePayType} />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{payTypes[payType]}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="Поставщик"
          >
            <MenuItem >Нету данных</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Дата"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          placeholder="Заметки"
          style={{ width: 200 }}
        />
      </div>

      <div className={styles.boxesWrapper__information}>
        {payType == 'bank_account' &&
          <div>
            <TextField
              sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Сумма:" multiline   variant="standard"
            />
          </div>
        }
        {payType == 'cash' &&
          <div>
            {paymentList.map((c, i) => {
              return (<div key={i}>
                <FormControl sx={{m: 1, minWidth: 120}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                  <Select
                    autoWidth
                    label="Тип цены:"
                  >
                    <MenuItem value={'UAH'}>UAH</MenuItem>
                    <MenuItem value={'RUB'}>RUB</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{marginBottom: '15px'}}
                  label="Оплата:"
                  type="number"
                  variant="standard"
                />
              </div>)
            })}
            <div className={styles.buttonsWrapper}>
              <div>
                <Button onClick={addPayment}  className={styles.button}  variant="outlined">+ Добавить валюту</Button>
              </div>
            </div>

            {changeList.map((c, i) => {
              return (<div key={i}>
                <FormControl sx={{m: 1, minWidth: 120}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                  <Select
                    autoWidth
                    label="Тип цены:"
                  >
                    <MenuItem value={'UAH'}>UAH</MenuItem>
                    <MenuItem value={'RUB'}>RUB</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{marginBottom: '15px'}}
                  label="Оплата:"
                  type="number"
                  variant="standard"
                />
                <p onClick={() => removeChange(i)}>Удалить</p>
              </div>)
            })}
            <div className={styles.buttonsWrapper}>
              <div>
                <Button onClick={addChange}  className={styles.button}  variant="outlined">+ Добавить валюту</Button>
              </div>
            </div>
          </div>
        }

        <h5>Печать</h5>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Организация</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="Организация"
          >
            <MenuItem >Нету данных</MenuItem>
          </Select>
        </FormControl>

      </div>
    </>
  )
}
export default UserForm