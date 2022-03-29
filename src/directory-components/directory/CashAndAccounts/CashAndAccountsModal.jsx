import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { cash_and_accounts } from './СashAndAccounts';
import crossImg from './img/cross.png';
import styles from './CashAndAccounts.module.css';

import { Dropdown } from 'semantic-ui-react';
import {useState} from "react";

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
const friendOptions = [
  {
    key: 'Privat Bank (Privat24)',
    text: 'Privat Bank (Privat24)',
    value: 'OpenChildModalPrivat',
  },
  {
    key: 'Privat Bank Business(Privat24 Business)',
    text: 'Privat Bank Business(Privat24 Business)',
    value: 'OpenChildModalPrivatL',
  },
  {
    key: 'Monobank (UniversakBank)',
    text: 'Monobank (UniversakBank)',
    value: 'OpenChildModalMono',
  },
  {
    key: 'PUMB (ПУМБ)',
    text: 'PUMB (ПУМБ)',
    value: 'OpenChildModalPrivat',
  },
]
export default function CashAndAccountsModal({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  // Child modal Add
  const [openChildModal, setOpenChildModal] = React.useState(false);
  const handleCloseChildModal = () => {
    setOpenChildModal(false);
  }
  const handleOpenChildModal = () => {
    setOpenChildModal(true);
  };
  const [name, setName] = React.useState('');
  const [type_accounts, setType_accounts] = React.useState('');
  // type_accounts - 1 (Счёт) - false
  // type_accounts - 2 (Касса) - true
  const [currency, setCurrency] = React.useState('UAH');
  const [balance, setBalance] = React.useState('');

  const [cashAndAccountsList, setCashAndAccountsList] = useState([]);

  const handleAdd = () => {
    const newId = (cash_and_accounts[cash_and_accounts.length - 1]).id + 1;
    let type;
    type_accounts === 1 ? type = false : type = true;
    const body = {
      id: newId,
      id_user: 2,
      type_accounts: type,
      Name: name,
      Represent: currency.toUpperCase(),
      bank_name: null,
      checking_account: null,
      balance: balance
    }
    cash_and_accounts.push(body);

    //setCashAndAccountsList(cash_and_accounts);
    console.log(cash_and_accounts);
    // console.log(cashAndAccountsList);
    setName('');
    setType_accounts('');
    setBalance('');
    setOpen(false);
    setOpenChildModal(false);
  }

  const [bankFunction, setBankFunction] = React.useState('');
  const handleChange = (event, { value } ) => {

    setBankFunction(value)
  }



  // Child modal Privat24 for people
  const [openChildModalPrivat, setOpenChildModalPrivat] = React.useState(false);
  const [openChildModalPrivatL, setOpenChildModalPrivatL] = React.useState(false);
  const [openChildModalMono, setOpenChildModalMono] = React.useState(false);

  const handleCloseChildModalPrivat = () => {
    setOpenChildModalPrivat(false);
  }
  const handleCloseChildModalPrivatL = () => {
    setOpenChildModalPrivatL(false);
  }
  const handleCloseChildModalMono = () => {
    setOpenChildModalMono(false);
  }
  const handleModelBank = () => {
    console.log('bankFunction', bankFunction)
    //let i = `set${bankFunction}`
    //console.log('i', i)
    if(bankFunction == 'OpenChildModalPrivat') {
      setOpenChildModalPrivat(true);
    }
    if(bankFunction == 'OpenChildModalPrivatL') {
      setOpenChildModalPrivatL(true);
    }
    if(bankFunction == 'OpenChildModalMono') {
      setOpenChildModalMono(true);
    }

  };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal} sx={style}>
          <div className={openChildModal ? styles.modal_wrapper : ''}>
            <img className={styles.modal_img} onClick={handleClose} src={crossImg} alt="cross" />
            <div className={styles.modal_title}>Как хотите добавить?</div>
            <div className={styles.modal_subtitle}>Создать счёт и вносить платежи вручную.</div>
            <Button variant="outlined" onClick={handleOpenChildModal} className={styles.modal_addbtn}>Создать счёт</Button>
            <div className={styles.modal_subtitle} style={{ marginBottom: '20px' }}>или подтягивать автоматически</div>
            {/* <div className={styles.modal_buttons}>
              <Button variant="contained" className={styles.modal_bankbtn}>MonoBank</Button>
              <Button variant="contained" className={styles.modal_bankbtn}>Privat 24</Button>
              <Button variant="contained" className={styles.modal_bankbtn}>Privat 24bank</Button>
              <Button variant="contained" color="success" className={styles.modal_bankbtn}>ПУМБ</Button>
            </div> */}
            <Dropdown
              placeholder='Выберите банк'
              fluid
              search
              selection
              options={friendOptions}
              onChange={handleChange}
              value={bankFunction}
            />
            <div style={{ margin: '20px' }}>
              <Button variant="contained" color="success" onClick={handleModelBank} className={styles.modal_bankbtn}>Продолжить</Button>
            </div>

          </div>
          {/* добавление вручную нового счета */}
          <React.Fragment>
            <Modal
              hideBackdrop
              open={openChildModal}
              onClose={handleCloseChildModal}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={style} className={styles.childModal}>
                <img className={styles.modal_img} onClick={handleCloseChildModal} src={crossImg} alt="cross" />
                <div className={styles.modal_title}>Добавление нового счёта</div>
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />
                <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                  <InputLabel id="demo-simple-select-standard-label">Валюта:</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currency || 'UAH'}
                    onChange={(e) => setCurrency(e.target.value)}
                    label={'Валюта'}
                  >
                    <MenuItem value='UAH'>UAH</MenuItem>
                    <MenuItem value='RUB'>RUB</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
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
                <TextField sx={{ marginBottom: '30px', width: '70%' }} value={balance || ''} onChange={(e) => setBalance(e.target.value)}
                  label="Стартовый баланс:"
                  type="number"
                  variant="standard"
                />
                <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
              </Box>
            </Modal>
          </React.Fragment>
          {/* добавление нового счета приват банка для физ лиц*/}
          <React.Fragment>
            <Modal
              hideBackdrop
              open={openChildModalPrivat}
              onClose={handleCloseChildModalPrivat}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={style} className={styles.childModal}>
                <img className={styles.modal_img} onClick={handleCloseChildModalPrivat} src={crossImg} alt="cross" />
                <div className={styles.modal_title}>Добавление нового счёта приват банк</div>
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />
                <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                  <InputLabel id="demo-simple-select-standard-label">Валюта:</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currency || 'UAH'}
                    onChange={(e) => setCurrency(e.target.value)}
                    label={'Валюта'}
                  >
                    <MenuItem value='UAH'>UAH</MenuItem>
                    <MenuItem value='RUB'>RUB</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
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
                <TextField sx={{ marginBottom: '30px', width: '70%' }} value={balance || ''} onChange={(e) => setBalance(e.target.value)}
                  label="Стартовый баланс:"
                  type="number"
                  variant="standard"
                />
                <Button variant="contained" className={styles.modal_bankbtn}>Ок</Button>
              </Box>
            </Modal>
          </React.Fragment>
          {/* добавление нового счета приват банка для юр лиц*/}
          <React.Fragment>
            <Modal
              hideBackdrop
              open={openChildModalPrivatL}
              onClose={handleCloseChildModalPrivatL}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={style} className={styles.childModal}>
                <img className={styles.modal_img} onClick={handleCloseChildModalPrivatL} src={crossImg} alt="cross" />
                <div className={styles.modal_title}>Добавление нового счёта приват банк для юр лиц</div>
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />
                <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                  <InputLabel id="demo-simple-select-standard-label">Валюта:</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currency || 'UAH'}
                    onChange={(e) => setCurrency(e.target.value)}
                    label={'Валюта'}
                  >
                    <MenuItem value='UAH'>UAH</MenuItem>
                    <MenuItem value='RUB'>RUB</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
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
                <TextField sx={{ marginBottom: '30px', width: '70%' }} value={balance || ''} onChange={(e) => setBalance(e.target.value)}
                           label="Стартовый баланс:"
                           type="number"
                           variant="standard"
                />
                <Button variant="contained" className={styles.modal_bankbtn}>Ок</Button>
              </Box>
            </Modal>
          </React.Fragment>
          {/* добавление монобанка*/}
          <React.Fragment>
            <Modal
              hideBackdrop
              open={openChildModalMono}
              onClose={handleCloseChildModalMono}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={style} className={styles.childModal}>
                <img className={styles.modal_img} onClick={handleCloseChildModalMono} src={crossImg} alt="cross" />
                <div className={styles.modal_title}>Добавление нового счёта приват банк для юр лиц</div>

               <p>Для добавления просканируйте qr-код</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/250px-QR_code_for_mobile_English_Wikipedia.svg.png" alt=""/>
                <Button variant="contained" className={styles.modal_bankbtn}>Ок</Button>
              </Box>
            </Modal>
          </React.Fragment>
        </Box>
      </Modal>
    </div>
  );
}
