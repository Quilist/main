import React from 'react';
import TextField from '@mui/material/TextField';
import styles from '@/styles/modules/UserEditing.module.css';
import Button from '@mui/material/Button';

export default function LegalEntitesForm({ name, setName, account, setAccount, mobile, setPhone, mail, setMail, address, setAddress, setSite, site, setEdrpou, edrpou, handleSearch }) {

  return (
    <>
      <h1> Информация о юрлице</h1>
      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Имя:" multiline maxRows={2} value={name || ''}
        onChange={(e) => setName(e.target.value)} variant="standard"
      />



      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Основной счет (для печати):" multiline maxRows={2} value={account || ''}
        onChange={(e) => setAccount(e.target.value)} variant="standard"
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Мобильный:" multiline maxRows={2} value={mobile || ''}
          onChange={(e) => setPhone(e.target.value)} variant="standard"
        />
      </div>


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="mail:" multiline maxRows={2} value={mail || ''}
          onChange={(e) => setMail(e.target.value)} variant="standard"
        />
      </div>



      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Адресс:" multiline maxRows={2} value={address || ''}
        onChange={(e) => setAddress(e.target.value)} variant="standard"
      />
      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Сайт:" multiline maxRows={2} value={site || ''}
        onChange={(e) => setSite(e.target.value)} variant="standard"
      />

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <Button onClick={handleSearch} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Поиск</Button>
        </div>

        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="ЭДРПОУ:" multiline maxRows={2} value={edrpou || ''}
          onChange={(e) => setEdrpou(e.target.value)} variant="standard"
        />
        
      </div>

      
    </>
  )
}
