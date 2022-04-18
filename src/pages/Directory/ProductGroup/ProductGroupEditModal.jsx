import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/Measure.module.css';
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
export default function ProductGroupEditModal({ open, setOpenEditModal, id }) {
  const [item, setItem] = React.useState([]);
  const [name, setName] = React.useState('');

  const handleCloseModal = () => {
    setOpenEditModal(false);
  }
  const api = new API()

  React.useEffect(() => {
    api.find(id, 'productGroup').then(data => {
      if (data.status === "error") alert(data.message)
      else setItem(data.message); setName(data.message.name);
    })
      // eslint-disable-next-line
  }, [])

  const handleSave = () => {
    const body = item;
    body.name = name;

    api.edit(id, body, 'productGroup').then(data => {
      if (data.status === "error") return alert(data.message)
      handleCloseModal();
    })

  }
  
  const handleDelete = () => {
    api.remove(id, 'productGroup').then(data => {
      if (data.status === "error") return alert(data.message)
      handleCloseModal();
    })

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
          <div className={styles.modal_title}>Редактирование группы</div>
          <TextField
            sx={{marginBottom: '20px', width: '70%'}}
            id="standard-multiline-flexible"
            label="Название:" multiline maxRows={2} value={name || ''}
            onChange={(e) => setName(e.target.value)}
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