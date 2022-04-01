import React from 'react';
import TextField from '@mui/material/TextField';

function UserForm({ name, setName, mfo, setMfo, checkingAccount, setCheckingAccount }) {

  return (
    <>
      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Название банка:" multiline maxRows={2} value={name || ''}
        onChange={(e) => setName(e.target.value)} variant="standard"
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="МФО:" multiline maxRows={2} value={mfo || ''}
          onChange={(e) => setMfo(e.target.value)} variant="standard"
        />
      </div>

      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Расчетный счет:" multiline maxRows={2} value={checkingAccount || ''}
        onChange={(e) => setCheckingAccount(e.target.value)} variant="standard"
      />
    </>
  )
}
export default UserForm