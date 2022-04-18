import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';

import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/CashAndAccounts.module.css';

import { Dropdown } from 'semantic-ui-react';
import API from '@/api/api'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
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

export default function CashAndAccountsModal({ open, setOpen }) {
  const api = new API();
  const [item, setItem] = React.useState({});
  const [openChildModal, setOpenChildModal] = React.useState(false);
  const [auxiliaryList, setAuxiliaryList] = React.useState({
    cash_accounts: []
  });

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    api.add(item, 'cashAccountUser').then(data => {
      if (data.status === "error") return alert(data.message)
      setItem({})
      setOpen(false)
      setOpenChildModal(false);
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: Number(value)
    }));
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
            <div className={styles.modal_title}>Выберите счет</div>
            <FormControl variant="standard" style={{ width: '70%', marginBottom: '20px' }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label={'Выберите счет'}
                value={item.cash_account_id}
                name="cash_account_id"
                onChange={(e) => handleChange(e)}
              >
                {auxiliaryList.cash_accounts.map((c, cIndex) => {
                  return (<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
                })}
              </Select>
            </FormControl>
            <div style={{ margin: '20px' }}>
              <Button variant="contained" color="success" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
