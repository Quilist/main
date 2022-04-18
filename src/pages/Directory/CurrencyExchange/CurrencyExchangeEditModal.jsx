import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import crossImg from '@/static/img/cross.png';
import { currenciesList } from './CurrencyExchange';
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
export default function CurrencyExchangeEditModal({ open, setOpenEditModal, currencyId }) {
  const [currentCurrency, setCurrentCurrency] = React.useState([]);
  const [exchangeRate, setExchangeRate] = React.useState('');

  const handleCloseModal = () => {
    setOpenEditModal(false);
  }
  const api = new API()

  React.useEffect(() => {
    api.find(currencyId, 'currencyExchange').then(data => {
      if (data.status === "error") alert(data.message)
      else setCurrentCurrency(data.message); setExchangeRate(data.message.exchange_rate);
    })
      // eslint-disable-next-line
  }, [])

  const handleSave = () => {
    const body = currentCurrency;
    body.exchange_rate = exchangeRate;

    api.edit(currencyId, body, 'currencyExchange').then(data => {
      if (data.status === "error") return alert(data.message)
      handleCloseModal();
    })

  }
  
  const handleDelete = () => {
    api.remove(currencyId, 'currencyExchange').then(data => {
      if (data.status === "error") return alert(data.message)
      handleCloseModal();
    })

  }

  const findCurrencyName = (event) => {
    let name = '';
    const index = currenciesList.findIndex((item) => item.id === event)

    if (index !== -1) {
      name = currenciesList[index].represent
    }
    return name
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style} className={styles.childModal}>
          <img className={styles.modal_img} onClick={handleCloseModal} src={crossImg} alt="cross" />
          <div className={styles.modal_title}>Редактирование валюты</div>
          <TextField
            sx={{marginBottom: '20px', width: '70%'}} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={findCurrencyName(currentCurrency.id_from_currencies)}
            disabled
            variant="standard"
          />
          <TextField
            sx={{marginBottom: '20px', width: '70%'}} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={findCurrencyName(currentCurrency.id_to_currencies)}
            disabled
            variant="standard"
          />
          <TextField
            sx={{marginBottom: '20px', width: '70%'}}
            id="standard-multiline-flexible"
            label="Обменный курс:" multiline maxRows={2} value={exchangeRate || ''}
            onChange={(e) => setExchangeRate(e.target.value)}
            variant="standard"
          />

          <div className={styles.btn_wrapper}>
            <Button variant="contained" onClick={handleSave} className={styles.modal_bankbtn}>Ок</Button>
            <Button variant="contained" color="error" onClick={handleDelete} className={styles.modal_bankbtn}>Удалить</Button>
          </div>
        </Box> 
      </Modal>
    </div>
  );
}