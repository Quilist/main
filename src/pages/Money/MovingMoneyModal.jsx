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
  }
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
      api.find(id, 'moneyMoving').then(data => {
        if (data.status === "error") alert(data.message)
        else setItem(data.message);
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
    if (open) {
      const date = new Date();
      const milliseconds = date.getTime();
      setItem({ created_at: milliseconds })
    }
    // eslint-disable-next-line
  }, [open])

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
    setItem(prevItem => ({
      ...prevItem,
      [name]: v
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
      api.add(item, 'moneyMoving').then(data => {
        if (data.status === "error") return console.log(data.message)
        setId(null);
        setOpen(false);
      })
    } else {
      api.edit(id, item, 'moneyMoving').then(data => {
        if (data.status === "error") return console.log(data.message)
        setId(null);
        setOpen(false);
      })
    }
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
          <div className={styles.modal_title}>Перемещение денег</div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Отправитель</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Отправитель"
              sx={{ marginBottom: '15px' }}
              name="from_cash_account_id"
              value={item.from_cash_account_id || null}
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
            <InputLabel id="demo-simple-select-label">Получатель</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Отправитель"
              sx={{ marginBottom: '15px' }}
              name="to_cash_account_id"
              value={item.to_cash_account_id || null}
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
            <InputLabel id="demo-simple-select-autowidth-label">Перемещение:</InputLabel>
            <Select
              autoWidth
              label="Валюта:"
              sx={{ marginBottom: '15px' }}
              name="currency_id"
              value={item.currency_id || null}
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
              label="Сумма:"
              type="text"
              variant="standard"
              value={item.amount}
              name="amount"
              onChange={handleChange}
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
        </Box>
      </Modal>
    </div>
  );
}