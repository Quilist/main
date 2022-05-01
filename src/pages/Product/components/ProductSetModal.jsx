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
  width: '50% !important',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: 'auto',
  height: '40%'
};

export default function ProductSetModal({ open, setOpen, item, setItem, auxiliaryList, id }) {
  const handleClose = () => setOpen(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const findArrayDiff = (arr1, arr2, field1, field2) => {
    const filteredArray = arr1.filter(e=>arr2.findIndex(i=>i[field2] == e[field1]) === -1);

    return filteredArray;
  };

  const checkIfCanAddProduct = () => {
    let state = true;
    let f1 = 'name', f2 = 'name';
    if(id) {
      f1 = 'id';
      f2 = 'product_child_id';
    }

    const filteredArray = findArrayDiff(auxiliaryList.products, item.childs, f1, f2);
    if(filteredArray.length === 0) {
      state = false
    }
    return state;
  };

  const filteredTypeProductList = () => {
    let f1 = 'name', f2 = 'name';
    if(id) {
      f1 = 'id';
      f2 = 'product_child_id';
    }
    const filteredArray = findArrayDiff(auxiliaryList.products, item.childs, f1, f2)

    return filteredArray;
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    const index = auxiliaryList.products.findIndex((item) => item.id === value)
    if (index !== -1) {
      setSelectedProduct(auxiliaryList.products[index])
    }
  };

  //add
  const handleAdd = () => {
    const array =  [...item.childs, selectedProduct]
    setItem(prevItem => ({
      ...prevItem,
      childs: array
    }));
    setSelectedProduct(null)

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
          <div className={styles.modal_title}>Добавление Товара/Услуги</div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">Товар/Услуга:</InputLabel>
            <Select
              autoWidth
              label="Товар/Услуга"
              name="product_id"
              onChange={(e) => handleSelect(e)}
            >
              {filteredTypeProductList().map((type, typeIndex) => {
                return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
              })}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn} style={{ marginTop: '15px' }}>Ок</Button>
        </Box>
      </Modal>
    </div>
  );
}