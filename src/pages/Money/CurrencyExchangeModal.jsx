import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/Modal.module.css';
import API from '@/api/api';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import {Link} from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function CurrencyExchangeModal({ open, setOpen, id, setId }) {
  const handleClose = () => {
    setId(null);
    setOpen(false);
  };
  const [item, setItem] = React.useState({});
  const [auxiliaryList, setAuxiliaryList] = React.useState({
    cash_accounts: [],
    currencies: [],
    legal_entites: [],
    items: []
  });
  const api = new API();

  React.useEffect(() => {
    if(id) {
      api.find(id, 'moneyExchange').then(data => {
        if (data.status === "error") {
          alert(data.message)
        }
        else {
          const res = data.message;
          const date = new Date(+res.created_at);
          const formatDate = date.toISOString().split('T')[0]
          res.created_at = formatDate;
          setItem(res);
        }
      })
    }
  }, [id])

  React.useEffect(() => {
    const params = {
      type: 'pay_supplier'
    }
    api.auxiliary('money', params).then(data => {
      if (data.status === "error") alert(data.message)
      else setAuxiliaryList(data.message[0])
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (open && !id) {
      const date = new Date();
      const milliseconds = date.getTime();
      setItem({ exchange_rate: 1, created_at: milliseconds })
    }
    // eslint-disable-next-line
  }, [open])

  const handleChange = e => {
    const { name, value } = e.target;
    if ((name === 'exchange_rate' && item.amount_pay) || name === 'amount_pay') {
      let amountReceive;
      if (name === 'exchange_rate') {
        amountReceive = item.amount_pay / value;
      } else {
        amountReceive = value / item.exchange_rate;
      }
      amountReceive = amountReceive.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      setItem(prevItem => ({
        ...prevItem,
        amount_receive: amountReceive
      }));
    }
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleDate = (value) => {
    const date = new Date(value);
    const milliseconds = date.getTime();
    setItem(prevItem => ({
      ...prevItem,
      created_at: milliseconds
    }));
  }

  const handleAdd = () => {
    if(!id) {
      api.add(item, 'moneyExchange').then(data => {
        if (data.status === "error") return console.log(data.message)
        setId(null);
        setOpen(false);
      })
    } else {
      const data = item;
      const date = new Date(data.created_at);
      const milliseconds = date.getTime();
      data.created_at = String(milliseconds)
      api.edit(id, item, 'moneyExchange').then(data => {
        if (data.status === "error") return console.log(data.message)
        setId(null);
        setOpen(false);
      })
    }
  }

  const handleDelete = () => {
    api.remove(id, 'moneyExchange').then(data => {
      if (data.status === "error") return alert(data.message)
      setOpen(false);
    })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal} sx={style}>
          <img className={styles.modal_img} onClick={handleClose} src={crossImg} alt="cross" />
          <div className={styles.modal_title}>Обмен валют</div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Касса</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Касса"
              sx={{ marginBottom: '15px' }}
              value={item.cash_account_id || null}
              name="cash_account_id"
              onChange={handleChange}
            >
              {auxiliaryList.cash_accounts.map((item, index) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">Отдаю:</InputLabel>
            <Select
              autoWidth
              label="Валюта:"
              sx={{ marginBottom: '15px' }}
              value={item.from_currency_id || null}
              name="from_currency_id"
              onChange={handleChange}
            >
              {auxiliaryList.currencies.map((item, index) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">Получаю:</InputLabel>
            <Select
              autoWidth
              label="Валюта:"
              sx={{ marginBottom: '15px' }}
              value={item.to_currency_id || null}
              name="to_currency_id"
              onChange={handleChange}
            >
              {auxiliaryList.currencies.map((item, index) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <TextField
              sx={{ marginBottom: '15px' }}
              label="Сумма отдачи:"
              type="text"
              variant="standard"
              value={item.amount_pay}
              name="amount_pay"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <TextField
              sx={{ marginBottom: '15px' }}
              label="Курс обмена:"
              type="text"
              variant="standard"
              value={item.exchange_rate}
              name="exchange_rate"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <TextField
              sx={{ marginBottom: '15px' }}
              label="Сумма получения:"
              type="text"
              name="amount_receive"
              value={item.amount_receive}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </FormControl>



          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Дата"
                value={item.created_at}
                onChange={(newValue) => {
                  handleDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <TextField
              sx={{ marginBottom: '15px' }}
              label="Заметки:"
              type="text"
              variant="standard"
              value={item.note}
              name="note"
              onChange={handleChange}
            />
          </FormControl>

          <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
          {id && <Button variant="contained" color="error" onClick={handleDelete} className={styles.modal_bankbtn}>Удалить</Button> }
        </Box>
      </Modal>
    </div>
  );
}