import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/Measure.module.css';
import stylesForm from '@/styles/modules/ProductForm.module.css'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
const filterAutocomplete = createFilterOptions();

const style = {
  position: 'absolute',
  top: '50% !important',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90% !important',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: 'auto',
  height: '90%'
};

export default function ProductComplectModal({ open, setOpen, subItem, setSubItem, item, setItem, auxiliaryList, typePriceList, setTypePriceList, storehouseList, setStorehouseList }) {
  const handleClose = () => setOpen(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleSelect = () = {

  };

  //add
  const handleAdd = () => {
    const array =  [...item.childs, selectedProduct]
    setItem(prevItem => ({
      ...prevItem,
      childs: array
    }));

    handleClose();
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
          <img className={styles.modal_img} onClick={handleClose} src={crossImg} alt="cross" />
          <div className={styles.modal_title}>Добавление цвета и размера</div>

          <div className={stylesForm.boxesWrapper__user}>
            <div className={stylesForm.boxesWrapper__user}>

              <div>
                <FormControl sx={{m: 1, minWidth: 120}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Товар/Услуга:</InputLabel>
                  <Select
                    autoWidth
                    label="Товар/Услуга"
                    name="currency_id"
                    onChange={(e) => handleSelect(e, i)}
                  >
                    {auxiliaryList.products.map((type, typeIndex) => {
                      return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </div>

            </div>
          </div>

          <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
        </Box>
      </Modal>
    </div>
  );
}