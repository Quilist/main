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

export default function EditModal({ open, setOpenEditModal, cashId, cash_and_accounts, auxiliaryList }) {
  const [currentCashAndAccount, setCurrentCashAndAccount] = React.useState([]);
  const [name, setName] = React.useState('');
  const [type_accounts, setType_accounts] = React.useState('');
  // type_accounts - 1 (Счёт) - false
  // type_accounts - 2 (Касса) - true
  const [currency, setCurrency] = React.useState('');
  const [resultBalance, setResultBalance] = React.useState('');

  const handleCloseChildModal = () => {
    setOpenEditModal(false);
  }

  React.useEffect(() => {
    cash_and_accounts.forEach((elem) => {

      if (elem.id === cashId) {
        const { name, type_order } = elem;

        const type_acc = type_order === "account" ? 2 : 1;

        const index = auxiliaryList.currencies.findIndex(data => data.id === elem.cash_accounts_balance[0].id)

        setName(name);
        setType_accounts(type_acc);
        setCurrency(auxiliaryList[index].name);
        setCurrentCashAndAccount(elem);
        setResultBalance(elem.cash_accounts_balance[0].balance);
      }

    });
    // eslint-disable-next-line
  }, []);

  const handleSave = () => {
    const body = currentCashAndAccount;

    const type = type_accounts === 1 ? false : true;

    body.type_accounts = type;
    body.Name = name;
    body.Represent = currency.toUpperCase();
    body.balance = resultBalance;

    cash_and_accounts.forEach((elem) => {
      if (elem.id === cashId) {
        return elem = body;
      }
    });

    handleCloseChildModal();
  }

  const api = new API();

  const handleDelete = () => {
    api.remove(cashId, 'cashAndAccount').then(data => {
      if (data.status === "error") return alert(data.message)
      handleCloseChildModal();
    });
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
          {type_accounts === 2 &&
            <div>
              <img className={styles.modal_img} onClick={handleCloseChildModal} src={crossImg} alt="cross" />
              <div className={styles.modal_title}>Редактирование счёта</div>
              <TextField
                sx={{ marginBottom: '20px', width: '70%' }} id="standard-multiline-flexible" label="Название:" multiline maxRows={2} value={name || ''}
                onChange={(e) => setName(e.target.value)} variant="standard"
              />
              {/* <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
                <InputLabel id="demo-simple-select-standard-label">Валюта:</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={currency}
                  onChange={(e) => handleChangeCurrency(e)}
                  label={'Валюта'}
                >
                  {auxiliaryList.currencies.map((currency, currencyIndex) => {
                    return (<MenuItem key={currency.id} value={currency.name}>{currency.name}</MenuItem>)
                  })}
                </Select>
              </FormControl> */}
              <TextField
                sx={{ marginBottom: '30px', width: '70%' }}
                value={currency}
                disabled
                label="Валюта: "
                type="number"
                variant="standard"
              />
              <TextField
                sx={{ marginBottom: '30px', width: '70%' }}
                value={resultBalance || ''}
                label="Стартовый баланс: "
                type="number"
                variant="standard"
              />
              <div className={styles.btn_wrapper}>
                <Button variant="contained" onClick={handleSave} className={styles.modal_bankbtn}>Ок</Button>
                <Button variant="contained" color="error" onClick={handleDelete} className={styles.modal_bankbtn}>Удалить</Button>
              </div>
            </div>
          }
        </Box>


      </Modal>
    </div>
  );
}
