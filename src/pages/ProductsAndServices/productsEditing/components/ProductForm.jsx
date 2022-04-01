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

function ProductForm({ item, setItem }) {
  const [priceList, setPriceList] = React.useState([
    { name: 'Анкл ндс', price: null, currency: null },
    { name: 'Закупочная' },
    { name: 'Мини опт(от 5 до 10 ящ)', price: null, currency: null },
    { name: 'Опт(от 10 до 22ящ)', price: null, currency: null },
    { name: 'Цена обычная без НДС', price: null, currency: null },
    { name: 'Цена обычная с НДС', price: null, currency: null }
  ]);

  const currentPathName = new URL(window.location.href).pathname.split('/')[1];

  const addPrice = (e) => {
    setPriceList([...priceList, { name: null, currency: null, value: null}]);
  }
  

  const removePrice = (index) => {
    setPriceList(priceList.filter((o, i) => index !== i));
  };
  

  const handleChange = e => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };


  //единицы измерения
  const units = [
    { title: 'шт', id: 1 }
  ];
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
              <MenuItem value={'product'}>Товар</MenuItem>
              <MenuItem value={'set'}>Комплект</MenuItem>
              <MenuItem value={'service'}>Услуга</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                // timeout to avoid instant validation of the dialog's form.
                setTimeout(() => {
                  toggleOpen(true);
                  setDialogValue({
                    title: newValue,
                    id: '',
                  });
                });
              } else if (newValue && newValue.inputValue) {
                toggleOpen(true);
                setDialogValue({
                  title: newValue.inputValue,
                  id: '',
                });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filterAutocomplete(options, params);

              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `Добавить "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            id="free-solo-dialog-demo"
            options={units}
            getOptionLabel={(option) => {
              // e.g value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.title;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Единица измерения" />}
          />
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Добавление единицы измерения</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={dialogValue.title}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      title: event.target.value,
                    })
                  }
                  label="title"
                  type="text"
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="name"
                  value={dialogValue.id}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      id: event.target.value,
                    })
                  }
                  label="id"
                  type="number"
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Отменить</Button>
                <Button type="submit">Добавить</Button>
              </DialogActions>
            </form>
          </Dialog>

          <FormControl fullWidth>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Артикул:"
              type="text"
              variant="standard"
              value={item.name}
              name="name"
              onChange={handleChange}
            />
            <TextField
              sx={{marginBottom: '15px'}}
              label="Штрихкод:"
              type="text"
              variant="standard"
              value={item.name}
              name="name"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Группа</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.type}
              label="Группа"
              sx={{ marginBottom: '15px' }}
            >
              <MenuItem >Нет данных</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Основной поставщик</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.type}
              label="Основной поставщик"
              sx={{ marginBottom: '15px' }}
            >
              <MenuItem >Нет данных</MenuItem>
            </Select>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Мин запас:"
              type="text"
              variant="standard"
              value={item.name}
              name="name"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Заметки:"
              type="text"
              variant="standard"
              value={item.name}
              name="name"
              onChange={handleChange}
            />
          </FormControl>

          <h3>Цвета и размеры</h3>
          <Button className={styles.button}  variant="outlined">+ Добавить</Button>
        </div>}

      </div>

      <div className={styles.boxesWrapper__information} >


          <div>
            {priceList.map((priceItem, i) => {
              return (<div key={i}>
                <TextField
                  sx={{marginBottom: '15px'}}
                  label="Наименование:"
                  type="text"
                  variant="standard"
                  value={priceItem.name}
                />
                <TextField
                  sx={{marginBottom: '15px', marginLeft: '5px'}}
                  label="0,00"
                  type="number"
                  variant="standard"
                />
                <FormControl sx={{m: 1, minWidth: 120}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                  <Select
                    autoWidth
                    label="Тип цены:"
                  >
                    <MenuItem value={'UAH'}>UAH</MenuItem>
                    <MenuItem value={'RUB'}>RUB</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                  </Select>
                </FormControl>

                <button className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removePrice(i)}>X</button>
              </div>)
            })}
            <Button onClick={addPrice}  className={styles.button}  variant="outlined">+ Добавить цену</Button>

          </div>


      </div>
    </>
  )
}
export default ProductForm;