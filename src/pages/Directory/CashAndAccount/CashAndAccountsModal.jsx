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
import styles from '@/styles/modules/CashAndAccounts.module.css';

import btn from '@/styles/modules/UserEditing.module.css';

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

export default function CashAndAccountsModal({ open, setOpen, auxiliaryList }) {
  const handleClose = () => setOpen(false);

  // Child modal Add
  const [openChildModal, setOpenChildModal] = React.useState(false);

  const handleOpenChildModal = () => {
    setType('custom')
    setOpenChildModal(true);
  };

  const [type_accounts, setType_accounts] = React.useState('');
  const [item, setItem] = React.useState({ stream: {} });

  const [balanceList, setBalanceList] = React.useState([{ currency_id: null, balance: null }]); 
  const [accountList, setAccountList] = React.useState([]);

  const [account, setAccount] = React.useState('');
  const [token, setToken] = React.useState('');
  const [acc, setAcc] = React.useState('');

  const [elem, setElem] = React.useState({});

  const auxiliaryCurrency = [...auxiliaryList.currencies];

  const handleSearch = () => {
    api.account(account, token).then(data => {
      if (data.status === "error") alert(data.message)
      else setAccountList(data.message)
    });
  }

  const api = new API();

  const addBalance = () => {
    setBalanceList([...balanceList, { currency_id: null, balance: null }]);
  }

  const removeBalance = (index) => {
    setBalanceList(balanceList.filter((o, i) => index !== i));
  };

  const updateBalance = (e, index = 0, add) => {
    const { name, value } = e.target;

    if (add) {
      const index = auxiliaryCurrency.findIndex(elem => elem.name === value);
      console.log(value)
      if (index !== -1) auxiliaryCurrency.splice(index, 1);
    }

    balanceList[index][name] = value
    balanceList[index] = Object.assign({}, balanceList[index]);

    setItem(prevItem => ({
      ...prevItem,
      balance: balanceList
    }));
  };

  const clearForm = () => {
    setType_accounts('');
    setAcc('');
    setBalanceList([{ currency_id: null, balance: null }])
    setItem({ stream: {} })
    setOpenChildModal(false);
    setOpenChildModalPrivat(false);
    setOpenChildModalPrivatL(false);
    setOpenChildModalPumb(false);
    setOpenChildModalMono(false);
  };

  const handleCloseChildModal = () => {
    setOpenChildModal(false);
    clearForm();
  }

  const setType = (type) => {
    setItem(prevItem => ({
      ...prevItem,
      type: type
    }));
  }

  const handleAdd = async () => {
    if (elem.acc) {
      item.stream = {
        acc: elem.acc,
        balance: elem.balanceIn,
        currency: elem.currency,
        id: account,
        token: token
      };
    }

    api.add(item, 'cashAndAccount').then(res => {
      if (res.status === "error") return alert(res.message);
      setOpen(false);
      clearForm();
    })
  }

  const [bankFunction, setBankFunction] = React.useState('');
  const handleChange = (event, { value }) => {
    setBankFunction(value)
  }

  // Child modal Privat24 for people
  const [openChildModalPrivat, setOpenChildModalPrivat] = React.useState(false);
  const [openChildModalPrivatL, setOpenChildModalPrivatL] = React.useState(false);
  const [openChildModalPumb, setOpenChildModalPumb] = React.useState(false);
  const [openChildModalMono, setOpenChildModalMono] = React.useState(false);

  const handleCloseChildModalPrivat = () => {
    setOpenChildModalPrivat(false);
    clearForm();
  }

  const handleCloseChildModalPrivatL = () => {
    setOpenChildModalPrivatL(false);
    clearForm();
  }

  const handleCloseChildModalPumb = () => {
    setOpenChildModalPumb(false);
    clearForm();
  }

  const handleCloseChildModalMono = () => {
    setOpenChildModalMono(false);
    clearForm();
  }

  const handleModelBank = () => {
    switch (bankFunction) {
      case "OpenChildModalPrivat":
        setType('privatbank_individual');
        setOpenChildModalPrivat(true);
        break;
      case "OpenChildModalPrivatL":
        setType('privatbank_legal_entity');
        setOpenChildModalPrivatL(true);
        break;
      case "OpenChildModalPumb":
        setType('pumb');
        setOpenChildModalPumb(true);
        break;
      case "OpenChildModalMono":
        setType('monobank');
        setOpenChildModalMono(true);
        break;
    }
  };

  const handleAccountType = (e) => {
    const { name, value } = e.target;
    setType_accounts(value)
    handleChangeField(e)
  };

  const handleChangeField = e => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleChangeStreamField = e => {
    const { name, value } = e.target;

    let streamData = item.stream
    streamData[name] = value
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
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:" multiline maxRows={2}
                  variant="standard"
                  value={item.name || ''}
                  name="name"
                  onChange={handleChangeField}
                />

                <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                  <InputLabel id="demo-simple-select-standard-label">Тип (касса или счёт)</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label={'Тип (касса или счёт)'}
                    value={item.type_order || ''}
                    name="type_order"
                    onChange={(e) => handleAccountType(e)}
                  >
                    {auxiliaryList.types.map((type, typeIndex) => {
                      return (<MenuItem key={type.value} value={type.value}>{type.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>

                {type_accounts === 'account' &&
                  <div>
                    <FormControl variant="standard" style={{ width: '100%', marginBottom: '20px' }}>
                      <div>
                        <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                          <InputLabel id="demo-simple-select-standard-label">Валюта:</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={item.balance ? item.balance[0].currency_id : ''}
                            name="currency_id"
                            onChange={(e) => updateBalance(e)}
                          >
                            {auxiliaryCurrency.map((currency, currencyIndex) => {
                              return (<MenuItem key={currency.id} value={currency.id}>{currency.name}</MenuItem>)
                            })}
                          </Select>
                        </FormControl>

                        <TextField sx={{ marginBottom: '30px', width: '70%' }}
                          label="Стартовый баланс:"
                          type="number"
                          variant="standard"
                          value={item.balance ? item.balance[0].balance : ''}
                          name="balance"
                          onChange={(e) => updateBalance(e)}
                        />
                      </div>
                    </FormControl>
                  </div>
                }

                {type_accounts === 'cash' &&
                  <div>
                    <FormControl variant="standard" style={{ width: '100%', marginBottom: '20px' }}>
                      {balanceList.map((c, i) => {
                        return (<div key={i}>
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                            <Select
                              autoWidth
                              label="Валюта"
                              value={c.currency}
                              name="currency_id"
                              onChange={(e) => updateBalance(e, i, "add")}
                            >
                              {auxiliaryCurrency.map((currency, currencyIndex) => {
                                return (<MenuItem key={currency.id} value={currency.id}>{auxiliaryList.currencies[currencyIndex].name}</MenuItem>)
                              })}
                            </Select>
                          </FormControl>
                          <TextField
                            sx={{ marginBottom: '15px' }}
                            label="Баланс:"
                            type="number"
                            variant="standard"
                            value={c.value}
                            name="balance"
                            onChange={(e) => updateBalance(e, i)}
                          />
                          <button className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'}
                            variant="outlined"
                            style={{ marginTop: "10px" }}
                            onClick={() => removeBalance(i)}>
                            X
                          </button>
                        </div>)
                      })}

                    </FormControl>
                    <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                      <Button onClick={addBalance} className={styles.button} variant="outlined">+ Добавить баланс</Button>
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
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible"
                  label="Название:" multiline maxRows={2}
                  variant="standard"
                  value={item.name}
                  name="name"
                  onChange={handleChangeField}
                />
                <TextField sx={{ marginBottom: '30px', width: '70%' }}
                  label="Номер карты:"
                  type="number"
                  variant="standard"
                  value={item.stream.card_number}
                  name="card_number"
                  onChange={handleChangeStreamField}
                />
                <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
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
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:"
                  multiline
                  maxRows={2}
                  variant="standard"
                  value={item.name}
                  name="name"
                  onChange={handleChangeField}
                />

                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible"
                  label="Token:" multiline
                  maxRows={2}
                  variant="standard"
                  value={token}
                  name="token"
                  onChange={(e) => setToken(e.target.value)}
                />

                <div>
                  <TextField
                    sx={{ marginBottom: '20px', width: '53.8%' }} id="standard-multiline-flexible"
                    label="ID Автоклиент:"
                    multiline
                    maxRows={2}
                    variant="standard"
                    value={account}
                    name="autoclient_id"
                    onChange={(e) => setAccount(e.target.value)}
                  />
                  <Button onClick={handleSearch} className={btn.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Поиск</Button>
                </div>

                <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                  <InputLabel id="demo-simple-select-standard-label">Счет:</InputLabel>
                  <Select
                    autoWidth
                    label="Счета"
                    value={acc || ''}
                    name="account_id"
                    onChange={(e) => setAcc(e.target.value)}
                  >
                    {accountList.map((elem) => {
                      return (<MenuItem key={elem.acc} value={`${elem.balanceIn} ${elem.currency}`} onClick={() => setElem(elem)}>{elem.balanceIn} {elem.currency}</MenuItem>)
                    })}
                  </Select>
                </FormControl>

                <div>
                  <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
                </div>
              </Box>
            </Modal>
          </React.Fragment>
          {/* добавление нового счета пумб*/}
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
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible"
                  label="Название:"
                  multiline maxRows={2}
                  variant="standard"
                  value={item.name}
                  name="name"
                  onChange={handleChangeField}
                />

                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible"
                  label="Ваш логин в ПУМБ онлайн банкинг:"
                  multiline
                  maxRows={2}
                  variant="standard"
                  value={item.stream.login}
                  name="login"
                  onChange={handleChangeStreamField}
                />

                <TextField
                  sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible"
                  label="Пароль:"
                  multiline
                  maxRows={2}
                  variant="standard"
                  value={item.stream.password}
                  name="password"
                  onChange={handleChangeStreamField}
                />

                <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/250px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="" />
                <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
              </Box>
            </Modal>
          </React.Fragment>
        </Box>
      </Modal>
    </div >
  );
}
