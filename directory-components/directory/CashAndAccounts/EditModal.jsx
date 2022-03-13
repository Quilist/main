import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import crossImg from './img/cross.png';
import {cash_and_accounts} from './СashAndAccounts';
import styles from './CashAndAccounts.module.css';

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
export default function EditModal({ open, setOpenEditModal, cashId }) {
  const [currentCashAndAccount, setCurrentCashAndAccount] = React.useState([]);
  const [name, setName] = React.useState('');
  const [type_accounts, setType_accounts] = React.useState('');
  // type_accounts - 1 (Счёт) - false
  // type_accounts - 2 (Касса) - true
  const [currency, setCurrency] = React.useState('');
  const [currencyInUah, setCurrencyInUah] = React.useState('');
  const [resultBalance, setResultBalance] = React.useState('');

  // const resultBalance = (currencyInUah * Number(currency.split('-')[0])).toFixed(2);
  // console.log(currencyInUah, resultBalance);
  
  const handleChangeCurrency = (e) => {
    const newCurrency = (e.target.value).split('-')[0];
    const result = (currencyInUah / Number(newCurrency)).toFixed(2);
    setResultBalance(result);  
    setCurrency(e.target.value);
  }

  const handleCloseChildModal = () => {
    setOpenEditModal(false);
  }
  const formatRepresent = (Represent) => {
    Represent = Represent.toUpperCase();
    if(Represent === 'UAH'){
      return '1-UAH'
    }else if(Represent === 'USD'){
      return '28.29-USD'
    }else if(Represent === 'RUB'){
      return '0.37-RUB'
    }else{
      return '31.95-EUR'
    }
  }

  React.useEffect(() => {
    cash_and_accounts.forEach((elem) => {
      if(elem.id === cashId){
        const { Name, type_accounts, Represent, balance } = elem;
        let type_acc;
        type_accounts ? type_acc = 2 : type_acc = 1; 
        const currency = formatRepresent(Represent) 
        const curInNumber = currency.split('-');
        const currencyInUah = (balance * Number(curInNumber[0])).toFixed(2)
        setName(Name);
        setType_accounts(type_acc);
        setCurrency(currency);
        setCurrentCashAndAccount(elem);
        setCurrencyInUah(currencyInUah);
        setResultBalance(balance);
      }
    }) 
      // eslint-disable-next-line
  }, [])

  const handleSave = () => {
    const body = currentCashAndAccount;
    let type;
    type_accounts === 1 ? type = false : type = true; 
    body.type_accounts = type;
    body.Name = name;
    body.Represent = (currency.split('-')[1]).toUpperCase();
    body.balance = resultBalance; 
    cash_and_accounts.forEach((elem) => {
      if(elem.id === cashId){
        return elem = body;
      }
    }) 
    handleCloseChildModal();
  }
  
  const handleDelete = () => {
    handleCloseChildModal();  
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseChildModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style} className={styles.childModal}>
          <img className={styles.modal_img} onClick={handleCloseChildModal} src={crossImg} alt="cross" />
          <div className={styles.modal_title}>Редактирование счёта</div>
          <TextField 
            sx={{marginBottom: '20px', width: '70%'}} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={name || ''} 
            onChange={(e) => setName(e.target.value)} variant="standard"
          />
          <FormControl variant="standard" style={{width: '70%', marginBottom: '20px'}}>
            <InputLabel id="demo-simple-select-standard-label">Валюта:</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"   
              value={currency || 'UAH'}
              onChange={(e) => handleChangeCurrency(e)}
              label={'Валюта'}
            >
              <MenuItem value='1-UAH'>UAH</MenuItem>
              <MenuItem value='0.37-RUB'>RUB</MenuItem>
              <MenuItem value='28.29-USD'>USD</MenuItem>
              <MenuItem value='31.95-EUR'>EUR</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" style={{width: '70%', marginBottom: '20px'}}>
            <InputLabel id="demo-simple-select-standard-label">Тип (касса или счёт)</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"   
              value={type_accounts || ''}
              onChange={(e) => setType_accounts(e.target.value)}
              label={'Тип (касса или счёт)'}
            >
              <MenuItem value={1}>Счёт(безналичные)</MenuItem>
              <MenuItem value={2}>Касса(наличные)</MenuItem>
            </Select>
          </FormControl>
          <TextField 
            sx={{marginBottom: '30px', width: '70%'}} 
            value={resultBalance || ''}
            disabled
            label="Стартовый баланс:"
            type="number"
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