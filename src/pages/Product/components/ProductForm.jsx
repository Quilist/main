import React from 'react';

import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Button from "@mui/material/Button";

import styles from '@/styles/modules/ProductForm.module.css'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
const filterAutocomplete = createFilterOptions();

function ProductForm({ item, setItem, auxiliaryList, typePriceList, setTypePriceList, storehouseList, setStorehouseList }) {

  React.useEffect(() => {
    setTypePriceList(auxiliaryList.type_prices);
    setStorehouseList(auxiliaryList.storehouses);
    // eslint-disable-next-line
  }, [auxiliaryList] )

  const currentPathName = new URL(window.location.href).pathname.split('/')[1];

  const addPrice = (e) => {
    setTypePriceList([...typePriceList, { name: null, currency_id: null, amount: null}]);
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

    setItem(prevItem => ({
      ...prevItem,
      [name]: v
    }));
  };


  //единицы измерения
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: '',
      id: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    id: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      id: parseInt(dialogValue.id, 10),
    });

    handleClose();
  };

  const updateTypePrice = (e, index) => {
    const { name, value } = e.target;
    let v = value
    const intFields = ['amount', 'currency_id'];
    if(intFields.includes(name)) {
      v = parseInt(value)
    }
    typePriceList[index][name] = v
    typePriceList[index] = Object.assign({}, typePriceList[index], {"type": "price"});
  };

  const updateStorehouse = (e, index) => {
    const { name, value } = e.target;
    let v = value
    const intFields = ['amount', 'currency_id'];
    if(intFields.includes(name)) {
      v = parseInt(value)
    }
    storehouseList[index][name] = v
    storehouseList[index] = Object.assign({}, storehouseList[index], {"type": "leftover"});
  };

  return (
    <>
      <div className={styles.boxesWrapper__user}>
        {currentPathName !== 'receive_balance' && <div>
          <FormControl fullWidth>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Наименовение:"
              type="text"
              variant="standard"
              value={item.name}
              name="name"
              onChange={handleChange}
            />
          </FormControl>


          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Вид</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.type}
              label="Вид"
              sx={{ marginBottom: '15px' }}
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
              value={item.unit_id}
              label="Единица измерения"
              sx={{ marginBottom: '15px' }}
            >
              {auxiliaryList.units.map((type, typeIndex) => {
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
          {/*  options={units}*/}
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
              value={item.vendor_code}
              name="vendor_code"
              onChange={handleChange}
            />
            <TextField
              sx={{marginBottom: '15px'}}
              label="Штрихкод:"
              type="text"
              variant="standard"
              value={item.barcode}
              name="barcode"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Группа</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.group_id}
              label="Группа"
              sx={{ marginBottom: '15px' }}
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
              value={item.supplier_id}
              label="Основной поставщик"
              sx={{ marginBottom: '15px' }}
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
              value={item.min_stock}
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
              value={item.note}
              name="note"
              onChange={handleChange}
            />
          </FormControl>

          <h3>Цвета и размеры</h3>
          <Button className={styles.button}  variant="outlined">+ Добавить</Button>
        </div>}

      </div>

      <div className={styles.boxesWrapper__information} >


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
                label="0,00"
                type="number"
                variant="standard"
                name="amount"
                onChange={(e) => updateTypePrice(e, i)}
              />
              <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                <Select
                  autoWidth
                  label="Тип цены:"
                  name="currency_id"
                  onChange={(e) => updateTypePrice(e, i)}
                >
                  {auxiliaryList.currencies.map((type, typeIndex) => {
                    return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                  })}
                </Select>
              </FormControl>

              <button className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removePrice(i)}>X</button>
            </div>)
          })}
          <Button onClick={addPrice}  className={styles.button}  variant="outlined">+ Добавить цену</Button>

          <br/>

          <h4>Остатки</h4>
          {storehouseList.map((storehouse, i) => {
            return (<div key={i}>
              <TextField
                sx={{marginBottom: '15px'}}
                label="Наименование:"
                type="text"
                variant="standard"
                value={storehouse.name}
              />
              <TextField
                sx={{marginBottom: '15px', marginLeft: '5px'}}
                label="0,00"
                type="number"
                variant="standard"
                name="amount"
                onChange={(e) => updateStorehouse(e, i)}
              />
              <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                <Select
                  autoWidth
                  label="Тип цены:"
                  name="currency_id"
                  onChange={(e) => updateStorehouse(e, i)}
                >
                  {auxiliaryList.currencies.map((type, typeIndex) => {
                    return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                  })}
                </Select>
              </FormControl>

              <button className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removePrice(i)}>X</button>
            </div>)
          })}
        </div>


      </div>
    </>
  )
}
export default ProductForm;