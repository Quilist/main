import React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


function InformationForm({ legal_name, setLegal_name, inn, setInn, low_system, setLow_system, setNds, nds, director, setDirector }) {



  return (
    <>
      <h1> Реквизиты для печати</h1>
      <TextField
        sx={{ marginBottom: '15px' }}
        id="standard-multiline-flexible"
        label="Юридическое название (заполняется автоматически):"
        multiline maxRows={2}
        value={legal_name || ''}
        onChange={(e) => setLegal_name(e.target.value)}
        variant="standard"
      />
      <TextField
        sx={{ marginBottom: '15px' }}
        variant="standard"
        label="Cистема налогообложения (заполняется автоматически):"
        multiline maxRows={2}
        value={low_system || ''}
        onChange={(e) => setLow_system(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox
          checked={nds}
          onChange={(e) => setNds(e.target.value)}
          inputProps={{ 'aria-label': 'controlled' }}
        />}
        label="Плательщик НДС (заполняется автоматически)"
      />
      <TextField
        sx={{ marginBottom: '15px' }}
        id="standard-multiline-flexible"
        label="Директор (заполняется автоматически):"
        multiline maxRows={2}
        value={director || ''}
        onChange={(e) => setDirector(e.target.value)}
        variant="standard"
      />
    </>
  )
}
export default InformationForm