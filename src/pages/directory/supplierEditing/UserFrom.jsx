import React from 'react';
import TextField from '@mui/material/TextField';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import Collapse from '@mui/material/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import styles from './UserEditing.module.css';
import Button from '@mui/material/Button';


function UserForm({ name, setName, phone, setPhone, mail, setMail, company, setCompany, group, setGroup, edrpou, setEdrpou, handleSearch }) {

  const firstMobile = phone;
  const firstMail = mail;

  return (
    <>
      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Имя:" multiline maxRows={2} value={name || ''}
        onChange={(e) => setName(e.target.value)} variant="standard"
      />


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Мобильный:" multiline maxRows={2} value={firstMobile || ''}
          onChange={(e) => setPhone(e.target.value)} variant="standard"
        />
      </div>


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="mail:" multiline maxRows={2} value={firstMail || ''}
          onChange={(e) => setMail(e.target.value)} variant="standard"
        />
      </div>



      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Компания:" multiline maxRows={2} value={company || ''}
        onChange={(e) => setCompany(e.target.value)} variant="standard"
      />

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <Button onClick={handleSearch} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Поиск</Button>
        </div>

        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="EDRPOU:" multiline maxRows={2} value={edrpou || ''}
          onChange={(e) => setEdrpou(e.target.value)} variant="standard"
        />
        
      </div>
      
      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Группа:" multiline maxRows={2} value={group || ''}
        onChange={(e) => setGroup(e.target.value)} variant="standard"
      />
      
    </>
  )
}
export default UserForm 