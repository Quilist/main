import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

function InformationForm({ address, setAddress, arrears, setArrears, discount, setDiscount, notes, setNotes, setMainArreas }) {

  const [currency, setCurrency] = React.useState('1-UAH');
  const currentCurrency = currency.split('-')
  useEffect(() => {
    setMainArreas((Number(currentCurrency[0]) * arrears).toFixed(1))
    // eslint-disable-next-line
  }, [arrears])

  const handleChange = (event) => {
    const currencyInUah = Number(currentCurrency[0]) * arrears;
    const nextCur = (event.target.value).split('-')
    const res = (Number(currencyInUah) / Number(nextCur[0])).toFixed(2)
    setArrears(res);
    setCurrency(event.target.value);
  };

  return (
    <>
      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Адресс:" multiline maxRows={2} value={address || ''}
        onChange={(e) => setAddress(e.target.value)} variant="standard"
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <TextField
          sx={{ marginBottom: '15px' }}
          value={arrears || ''}
          onChange={(e) => setArrears(e.target.value)}
          label="Задолженность:"
          type="number"
          variant="standard"
          InputProps={{
            endAdornment: <InputAdornment position="start">{currentCurrency[1]}</InputAdornment>,
          }}
        />
        <div>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Тип цены:</InputLabel>
            <Select
              value={currency || ''}
              onChange={handleChange}
              autoWidth
              label="Тип цены:"
            >
              <MenuItem value={'1-UAH'}>UAH</MenuItem>
              <MenuItem value={'0.37-RUB'}>RUB</MenuItem>
              <MenuItem value={'28.29-USD'}>USD</MenuItem>
              <MenuItem value={'31.95-EUR'}>EUR</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <TextField
        sx={{ marginBottom: '45px', width: '100px' }}
        value={discount || ''}
        onChange={(e) => setDiscount(e.target.value)}
        label="Скидка:"
        type="number"
        variant="standard"
        InputProps={{
          endAdornment: <InputAdornment position="start">%</InputAdornment>
        }}
      />
      <TextField
        id="standard-multiline-flexible" variant="outlined" label="Заметки:" multiline maxRows={4} value={notes || ''}
        onChange={(e) => setNotes(e.target.value)}
      />
    </>
  )
}
export default InformationForm