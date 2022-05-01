import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/CashAndAccounts.module.css';

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

export default function DirectoryModal({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  // Child modal Add
  const [openChildModal, setOpenChildModal] = React.useState(false);

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
            <div className={styles.modal_title}>Заполнить из справочника</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
