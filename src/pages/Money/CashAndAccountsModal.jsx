import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import {cash_and_accounts} from '@/pages/Directory/CashAndAccount/CashAndAccount';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/CashAndAccounts.module.css';

import { Dropdown } from 'semantic-ui-react';
//import {useState} from "react";

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

let totalList = []
export default function CashAndAccountsModal({ open, setOpen }) {
  React.useEffect(() => {
    // eslint-disable-next-line
    cash_and_accounts.map((item, i) => {
      totalList.push({
        "key": item.id,
        "text": item.Name,
        "value": item.balance,
        "Represent":  item.Represent,
      })
    });
    // eslint-disable-next-line
  }, [cash_and_accounts])

  const handleClose = () => {
    setOpen(false);
  };
  // Child modal Add
  const [openChildModal, setOpenChildModal] = React.useState(false);
  // const handleCloseChildModal = () => {
  //   setOpenChildModal(false);
  // }
  // const handleOpenChildModal = () => {
  //   setOpenChildModal(true);
  // };
  const [name, setName] = React.useState('');
  const [type_accounts, setType_accounts] = React.useState('');
  // type_accounts - 1 (Счёт) - false
  // type_accounts - 2 (Касса) - true
  const [currency] = React.useState('UAH');
  const [balance, setBalance] = React.useState('');

  //const [cashAndAccountsList, setCashAndAccountsList] = useState([]);

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

  // eslint-disable-next-line
  const [bankFunction, setBankFunction] = React.useState('');
  const handleChange = (event, { value } ) => {
    console.log('value', bankFunction)
    //handleAdd(value)
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
          <div className={openChildModal ? styles.modal_wrapper : ''}>
            <img className={styles.modal_img} onClick={handleClose} src={crossImg} alt="cross" />
            <div className={styles.modal_title}>Выберите счет</div>
            <Dropdown
              placeholder='Выберите счет'
              fluid
              search
              selection
              options={totalList}
              onChange={handleChange}
              value={bankFunction}
            />
            <div style={{ margin: '20px' }}>
              <Button variant="contained" color="success" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
