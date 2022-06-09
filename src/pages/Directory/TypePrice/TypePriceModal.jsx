import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/TypePrice.module.css';
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

export default function TypePriceModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState('');
  const api = new API();

  const handleAdd = () => {
    const body = {
      name: name
    }

    api.add(body, 'typePrice').then(data => {
      if (data.status === "error") return alert(data.message)
      setName('');
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
          <div className={styles.modal_title}>Добавление типа цены</div>

          <TextField sx={{ marginBottom: '30px', width: '70%' }} value={name} onChange={(e) => setName(e.target.value)}
                     label="Наименование:"
                     type="text"
                     variant="standard"
          />
          <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
        </Box>
      </Modal>
    </div>
  );
}