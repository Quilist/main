import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/Measure.module.css';
import stylesForm from '@/styles/modules/ProductForm.module.css'
import API from '@/api/api';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

export default function ColorSizeModal({ open, setOpen, auxiliaryList, colorSizeItem, setColorSizeItem, typePriceList, setTypePriceList, storehouseList, setStorehouseList }) {
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState('');
  const api = new API();

  const addPrice = (e) => {
    setTypePriceList([...typePriceList, { name: null, currency_id: null, price: null}]);
  }


  const removePrice = (index) => {
    setTypePriceList(typePriceList.filter((o, i) => index !== i));
  };


  const handleChange = e => {
    const { name, value } = e.target;
    let v = value
    const intFields = ['min_stock'];
    if(intFields.includes(name)) {
      v = parseInt(value)
    }

    setColorSizeItem(prevItem => ({
      ...prevItem,
      [name]: v
    }));
  };

  const updateTypePrice = (e, index) => {
    const { name, value } = e.target;
    let v = value
    const intFields = ['amount', 'currency_id'];
    if(intFields.includes(name)) {
      v = parseInt(value)
    }
    typePriceList[index][name] = v
  };

  const updateStorehouse = (e, index) => {
    const { name, value } = e.target;
    let v = value
    const intFields = ['amount', 'currency_id'];
    if(intFields.includes(name)) {
      v = parseInt(value)
    }
    storehouseList[index][name] = v
  };

  const handleAdd = () =>  {

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
                <FormControl fullWidth>
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Наименовение:"
                    type="text"
                    variant="standard"
                    value={colorSizeItem.name}
                    name="name"
                    onChange={handleChange}
                  />
                </FormControl>


                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Вид</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={colorSizeItem.type}
                    label="Вид"
                    sx={{ marginBottom: '15px' }}
                    name="type"
                    onChange={handleChange}
                  >
                    {auxiliaryList.types.map((type, typeIndex) => {
                      return (<MenuItem key={type.value} value={type.value}>{type.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Единица измерения</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={colorSizeItem.measure_id}
                    label="Единица измерения"
                    sx={{ marginBottom: '15px' }}
                    name="measure_id"
                    onChange={handleChange}
                  >
                    {auxiliaryList.measures.map((type, typeIndex) => {
                      return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>

                {/*<Autocomplete*/}
                {/*  value={value}*/}
                {/*  onChange={(event, newValue) => {*/}
                {/*    if (typeof newValue === 'string') {*/}
                {/*      // timeout to avoid instant validation of the dialog's form.*/}
                {/*      setTimeout(() => {*/}
                {/*        toggleOpen(true);*/}
                {/*        setDialogValue({*/}
                {/*          title: newValue,*/}
                {/*          id: '',*/}
                {/*        });*/}
                {/*      });*/}
                {/*    } else if (newValue && newValue.inputValue) {*/}
                {/*      toggleOpen(true);*/}
                {/*      setDialogValue({*/}
                {/*        title: newValue.inputValue,*/}
                {/*        id: '',*/}
                {/*      });*/}
                {/*    } else {*/}
                {/*      setValue(newValue);*/}
                {/*    }*/}
                {/*  }}*/}
                {/*  filterOptions={(options, params) => {*/}
                {/*    const filtered = filterAutocomplete(options, params);*/}

                {/*    if (params.inputValue !== '') {*/}
                {/*      filtered.push({*/}
                {/*        inputValue: params.inputValue,*/}
                {/*        title: `Добавить "${params.inputValue}"`,*/}
                {/*      });*/}
                {/*    }*/}

                {/*    return filtered;*/}
                {/*  }}*/}
                {/*  id="free-solo-dialog-demo"*/}
                {/*  options={measures}*/}
                {/*  getOptionLabel={(option) => {*/}
                {/*    // e.g value selected with enter, right from the input*/}
                {/*    if (typeof option === 'string') {*/}
                {/*      return option;*/}
                {/*    }*/}
                {/*    if (option.inputValue) {*/}
                {/*      return option.inputValue;*/}
                {/*    }*/}
                {/*    return option.title;*/}
                {/*  }}*/}
                {/*  selectOnFocus*/}
                {/*  clearOnBlur*/}
                {/*  handleHomeEndKeys*/}
                {/*  renderOption={(props, option) => <li {...props}>{option.title}</li>}*/}
                {/*  sx={{ width: 300 }}*/}
                {/*  freeSolo*/}
                {/*  renderInput={(params) => <TextField {...params} label="Единица измерения" />}*/}
                {/*/>*/}
                {/*<Dialog open={open} onClose={handleClose}>*/}
                {/*  <form onSubmit={handleSubmit}>*/}
                {/*    <DialogTitle>Добавление единицы измерения</DialogTitle>*/}
                {/*    <DialogContent>*/}
                {/*      <TextField*/}
                {/*        autoFocus*/}
                {/*        margin="dense"*/}
                {/*        id="name"*/}
                {/*        value={dialogValue.title}*/}
                {/*        onChange={(event) =>*/}
                {/*          setDialogValue({*/}
                {/*            ...dialogValue,*/}
                {/*            title: event.target.value,*/}
                {/*          })*/}
                {/*        }*/}
                {/*        label="title"*/}
                {/*        type="text"*/}
                {/*        variant="standard"*/}
                {/*      />*/}
                {/*      <TextField*/}
                {/*        margin="dense"*/}
                {/*        id="name"*/}
                {/*        value={dialogValue.id}*/}
                {/*        onChange={(event) =>*/}
                {/*          setDialogValue({*/}
                {/*            ...dialogValue,*/}
                {/*            id: event.target.value,*/}
                {/*          })*/}
                {/*        }*/}
                {/*        label="id"*/}
                {/*        type="number"*/}
                {/*        variant="standard"*/}
                {/*      />*/}
                {/*    </DialogContent>*/}
                {/*    <DialogActions>*/}
                {/*      <Button onClick={handleClose}>Отменить</Button>*/}
                {/*      <Button type="submit">Добавить</Button>*/}
                {/*    </DialogActions>*/}
                {/*  </form>*/}
                {/*</Dialog>*/}

                <FormControl fullWidth>
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Артикул:"
                    type="text"
                    variant="standard"
                    value={colorSizeItem.vendor_code}
                    name="vendor_code"
                    onChange={handleChange}
                  />
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Штрихкод:"
                    type="text"
                    variant="standard"
                    value={colorSizeItem.barcode}
                    name="barcode"
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Группа</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={colorSizeItem.group_id}
                    label="Группа"
                    sx={{ marginBottom: '15px' }}
                    name="group_id"
                    onChange={handleChange}
                  >
                    {auxiliaryList.groups.map((type, typeIndex) => {
                      return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Основной поставщик</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={colorSizeItem.supplier_id}
                    label="Основной поставщик"
                    sx={{ marginBottom: '15px' }}
                    name="supplier_id"
                    onChange={handleChange}
                  >
                    {auxiliaryList.suppliers.map((type, typeIndex) => {
                      return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                    })}
                  </Select>
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Мин запас:"
                    type="text"
                    variant="standard"
                    value={colorSizeItem.min_stock}
                    name="min_stock"
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Заметки:"
                    type="text"
                    variant="standard"
                    value={colorSizeItem.note}
                    name="note"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>

            </div>
            <div className={stylesForm.boxesWrapper__information} >


              <div>
                <h4>Цены</h4>
                {typePriceList.map((priceItem, i) => {
                  return (<div key={i}>
                    <TextField
                      sx={{marginBottom: '15px'}}
                      label="Наименование:"
                      type="text"
                      variant="standard"
                      value={priceItem.name}
                      name="name"
                      onChange={(e) => updateTypePrice(e, i)}
                    />
                    <TextField
                      sx={{marginBottom: '15px', marginLeft: '5px'}}
                      label="Цена"
                      type="number"
                      variant="standard"
                      value={priceItem.price}
                      name="price"
                      onChange={(e) => updateTypePrice(e, i)}
                    />
                    <FormControl sx={{m: 1, minWidth: 120}}>
                      <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                      <Select
                        autoWidth
                        label="Тип цены:"
                        value={priceItem.currency_id}
                        name="currency_id"
                        onChange={(e) => updateTypePrice(e, i)}
                      >
                        {auxiliaryList.currencies.map((type, typeIndex) => {
                          return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                        })}
                      </Select>
                    </FormControl>

                    <button  style={{marginTop: '15px'}} className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removePrice(i)}>X</button>
                  </div>)
                })}
                <Button onClick={addPrice}  className={styles.button}  variant="outlined">+ Добавить цену</Button>

                <h4 style={{marginTop: '15px'}}>Остатки</h4>
                {storehouseList.map((storehouse, i) => {
                  return (<div key={i}>
                    <TextField
                      sx={{marginBottom: '15px'}}
                      label={storehouse.storehouse ? storehouse.storehouse.name : storehouse.name}
                      type="text"
                      variant="standard"
                      value={storehouse.number}
                      name="number"
                      onChange={(e) => updateStorehouse(e, i)}
                    />
                    <span style={{marginBottom: '15px', marginLeft: '5px', marginTop: '5px'}}>шт на</span>
                    <TextField
                      sx={{marginBottom: '15px', marginLeft: '5px'}}
                      label="Цена"
                      type="number"
                      variant="standard"
                      value={storehouse.price}
                      name="price"
                      onChange={(e) => updateStorehouse(e, i)}
                    />
                    <FormControl sx={{m: 1, minWidth: 120}}>
                      <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                      <Select
                        autoWidth
                        label="Тип цены:"
                        value={storehouse.currency_id}
                        name="currency_id"
                        onChange={(e) => updateStorehouse(e, i)}
                      >
                        {auxiliaryList.currencies.map((type, typeIndex) => {
                          return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                        })}
                      </Select>
                    </FormControl>

                    <button  style={{marginTop: '15px'}} className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removePrice(i)}>X</button>
                  </div>)
                })}
              </div>


            </div>
          </div>

          <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
        </Box>
      </Modal>
    </div>
  );
}