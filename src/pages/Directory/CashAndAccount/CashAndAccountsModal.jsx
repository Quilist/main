import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { cash_and_accounts } from './CashAndAccount';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/CashAndAccounts.module.css';

import { Dropdown } from 'semantic-ui-react';
import API from '@/api/api'

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
    value: 'OpenChildModalPumb',
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
  const [item, setItem] = React.useState({});
  // type_accounts - 1 (Счёт) - false
  // type_accounts - 2 (Касса) - true
  const [currency, setCurrency] = React.useState('UAH');
  const [balance, setBalance] = React.useState('');
  const [balanceList, setBalanceList] = React.useState([{ currency_id: null, balance: null}]);
  const [currencyList] = React.useState([
    {
      name: 'UAH',
      id: 1
    },
    {
      name: 'RUB',
      id: 2
    },
    {
      name: 'USD',
      id: 3
    },
    {
      name: 'EUR',
      id: 4
    }
  ]);

  const api = new API();

  const addBalance = (e) => {
    setBalanceList([...balanceList, { currency_id: null, balance: null}]);
  }

  const removeBalance = (index) => {
    setBalanceList(balanceList.filter((o, i) => index !== i));
  };

  const updateBalance = (e, index) => {
    const { name, value } = e.target;
    balanceList[index][name] = value
    balanceList[index] = Object.assign({}, balanceList[index]);
    setItem(prevItem => ({
      ...prevItem,
      balanceList: balanceList
    }));
  };

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
      balance: balance,
      balance_list: item.balanceList
    }
    cash_and_accounts.push(body);

    api.add(body, 'cashAndAccount');

    //setCashAndAccountsList(cash_and_accounts);
    console.log(cash_and_accounts);
    // console.log(cashAndAccountsList);
    setName('');
    setType_accounts('');
    setBalance('');
    setBalanceList([])
    setItem({})
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
  const [openChildModalPumb, setOpenChildModalPumb] = React.useState(false);
  const [openChildModalMono, setOpenChildModalMono] = React.useState(false);

  const handleCloseChildModalPrivat = () => {
    setOpenChildModalPrivat(false);
  }
  const handleCloseChildModalPrivatL = () => {
    setOpenChildModalPrivatL(false);
  }
  const handleCloseChildModalPumb = () => {
    setOpenChildModalPumb(false);
  }
  const handleCloseChildModalMono = () => {
    setOpenChildModalMono(false);
  }
  const handleModelBank = () => {
    if(bankFunction === 'OpenChildModalPrivat') {
      setOpenChildModalPrivat(true);
    }
    if(bankFunction === 'OpenChildModalPrivatL') {
      setOpenChildModalPrivatL(true);
    }
    if(bankFunction === 'OpenChildModalPumb') {
      setOpenChildModalPumb(true);
    }
    if(bankFunction === 'OpenChildModalMono') {
      setOpenChildModalMono(true);
    }
  };

  const handleAccountType = (e) => {
    const { name, value } = e.target;
    setType_accounts(value)
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
                  <InputLabel id="demo-simple-select-standard-label">Тип (касса или счёт)</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type_accounts || ''}
                    onChange={(e) => handleAccountType(e)}
                    label={'Тип (касса или счёт)'}
                  >
                    <MenuItem value={1}>Счёт(безналичные)</MenuItem>
                    <MenuItem value={2}>Касса(наличные)</MenuItem>
                  </Select>
                </FormControl>

                {type_accounts === 1 &&
                  <div>
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

                    <TextField sx={{ marginBottom: '30px', width: '70%' }} value={balance || ''} onChange={(e) => setBalance(e.target.value)}
                               label="Стартовый баланс:"
                               type="number"
                               variant="standard"
                    />
                  </div>
                }


                {type_accounts === 2 &&
                  <div>
                    <FormControl variant="standard" style={{ width: '100%', marginBottom: '20px' }}>
                      {balanceList.map((c, i) => {
                        return (<div key={i}>
                          <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                            <Select
                              autoWidth
                              label="Валюта"
                              value={c.currency}
                              name="currency_id"
                              onChange={(e) => updateBalance(e, i)}
                            >
                              {currencyList.map((currency, currencyIndex) => {
                                return (<MenuItem key={currency.id} value={currency.id}>{currency.name}</MenuItem>)
                              })}
                            </Select>
                          </FormControl>
                          <TextField
                            sx={{marginBottom: '15px'}}
                            label="Баланс:"
                            type="number"
                            variant="standard"
                            value={c.value}
                            name="balance"
                            onChange={(e) => updateBalance(e, i)}
                          />
                          <button className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'}
                                  variant="outlined"
                                  style={{ marginTop: "10px"}}
                                  onClick={() => removeBalance(i)}>
                            X
                          </button>
                        </div>)
                      })}

                    </FormControl>
                    <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                      <Button onClick={addBalance}  className={styles.button}  variant="outlined">+ Добавить баланс</Button>
                    </FormControl>
                  </div>
                }

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
                <div className={styles.modal_title}>Добавление нового счёта приват банк для физ лиц</div>
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="IP адрес:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Merchant id:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />
                <TextField sx={{ marginBottom: '30px', width: '70%' }} value={balance || ''} onChange={(e) => setBalance(e.target.value)}
                  label="Номер карты:"
                  type="number"
                  variant="standard"
                />
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Пароль:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
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
              sx={{ marginBottom: '70px' }}
            >
              <Box sx={style} className={styles.childModal}>
                <img className={styles.modal_img} onClick={handleCloseChildModalPrivatL} src={crossImg} alt="cross" />
                <div className={styles.modal_title}>Добавление нового счёта приват банк для юр лиц</div>
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />

                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="ID Автоклиент:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />

                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Token:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />

                <Button variant="contained" className={styles.modal_bankbtn}>Ок</Button>
              </Box>
            </Modal>
          </React.Fragment>
          {/* добавление нового счета приват банка для юр лиц*/}
          <React.Fragment>
            <Modal
              hideBackdrop
              open={openChildModalPumb}
              onClose={handleCloseChildModalPumb}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
              sx={{ marginBottom: '70px' }}
            >
              <Box sx={style} className={styles.childModal}>
                <img className={styles.modal_img} onClick={handleCloseChildModalPumb} src={crossImg} alt="cross" />
                <div className={styles.modal_title}>Добавление нового счёта пумб</div>
                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />

                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Ваш логин в ПУМБ онлайн банкинг:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
                />

                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Пароль:" multiline maxRows={2} value={name || ''}
                  onChange={(e) => setName(e.target.value)} variant="standard"
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
