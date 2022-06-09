import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/Currency.module.css';
import API from '@/api/api';

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

export default function CurrencyExchangeModal({ open, setOpen, auxiliaryList }) {

  const handleClose = () => setOpen(false);

  const [representFrom, setFromRepresent] = React.useState(null);
  const [representTo, setToRepresent] = React.useState(null);

  const [exchangeRate, setExchangeRate] = React.useState(null);

  const api = new API();

  const handleAdd = () => {

    const body = {
      from_currency_id: representFrom,
      to_currency_id: representTo,
      exchange_rate: exchangeRate
    }

    api.add(body, 'currencyExchange').then(data => {
      if (data.status === "error") return alert(data.message)
      setFromRepresent(null);
      setToRepresent(null);
      setExchangeRate(null);
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
          <div className={styles.modal_title}>Добавление валюты</div>

          <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
            <InputLabel id="demo-simple-select-standard-label">Конвертировать из:</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={representFrom}
              onChange={(e) => setFromRepresent(e.target.value)}
              label={'Валюта'}
            >
              {auxiliaryList.map((c, i) => {
                return (<MenuItem value={c.id} key={i}>{c.name}</MenuItem>)
              })}
            </Select>
          </FormControl>

          <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
            <InputLabel id="demo-simple-select-standard-label">Конвертировать в:</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={representTo}
              onChange={(e) => setToRepresent(e.target.value)}
              label={'Валюта'}
            >
              {auxiliaryList.map((c, i) => {
                return (<MenuItem value={c.id} key={i}>{c.name}</MenuItem>)
              })}
            </Select>
          </FormControl>

          <TextField sx={{ marginBottom: '30px', width: '70%' }} value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)}
                     label="Обменный курс:"
                     type="number"
                     variant="standard"
          />
          <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
        </Box>
      </Modal>
    </div>
  );
}
