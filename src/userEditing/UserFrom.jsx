import React from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import styles from './UserEditing.module.css';

function UserForm({ name, setName, phone, setPhone, mail, setMail, company, setCompany, group, setGroup }) {
  // PHONE
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const firstMobile = phone[0];
  const secondMobile = phone[1];
  const thirdMobile = phone[2];
  // MAIL
  const [openMail, setOpenMail] = React.useState(false);
  const handleClickMail = () => {
    setOpenMail(!openMail);
  };
  const firstMail = mail[0];
  const secondMail = mail[1];
  const thirdMail = mail[2];
  return (
    <>
      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Имя:" multiline maxRows={2} value={name || ''}
        onChange={(e) => setName(e.target.value)} variant="standard"
      />


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Мобильный:" multiline maxRows={2} value={firstMobile || ''}
          onChange={(e) => setPhone([e.target.value, secondMobile, thirdMobile])} variant="standard"
        />
        <ListItemButton className={styles.menu_arrow} onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{ textAlign: 'left', paddingLeft: '20px' }} component="div" disablePadding>
          <TextField
            sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Мобильный 2:" multiline maxRows={2} value={secondMobile || ''}
            onChange={(e) => setPhone([firstMobile, e.target.value, thirdMobile])} variant="standard"
          />
        </List>
        <List style={{ textAlign: 'left', paddingLeft: '20px' }} component="div" disablePadding>
          <TextField
            sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Мобильный 3:" multiline maxRows={2} value={thirdMobile || ''}
            onChange={(e) => setPhone([firstMobile, secondMobile, e.target.value])} variant="standard"
          />
        </List>
      </Collapse>


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="e-mail:" multiline maxRows={2} value={firstMail || ''}
          onChange={(e) => setMail([e.target.value, secondMail, thirdMail])} variant="standard"
        />
        <ListItemButton className={styles.menu_arrow} onClick={handleClickMail}>
          {openMail ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </div>
      <Collapse in={openMail} timeout="auto" unmountOnExit>
        <List style={{ textAlign: 'left', paddingLeft: '20px' }} component="div" disablePadding>
          <TextField
            sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="e-mail 2:" multiline maxRows={2} value={secondMail || ''}
            onChange={(e) => setMail([firstMail, e.target.value, thirdMail])} variant="standard"
          />
        </List>
        <List style={{ textAlign: 'left', paddingLeft: '20px' }} component="div" disablePadding>
          <TextField
            sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="e-mail 3:" multiline maxRows={2} value={thirdMail || ''}
            onChange={(e) => setMail([firstMail, secondMail, e.target.value])} variant="standard"
          />
        </List>
      </Collapse>


      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Компания:" multiline maxRows={2} value={company || ''}
        onChange={(e) => setCompany(e.target.value)} variant="standard"
      />
      <TextField
        sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Группа:" multiline maxRows={2} value={group || ''}
        onChange={(e) => setGroup(e.target.value)} variant="standard"
      />
    </>
  )
}
export default UserForm 