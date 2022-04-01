import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import styles from '@/styles/modules/employeeEditing.module.css';


function InformationEmployee ({f_name, setF_name, s_name, setS_Name, phone, setPhone, mail, setMail, password, setPassword, role, setRole}) {

  const [values, setValues] = React.useState({showPassword: false});
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>  
      <div className={styles.employee_names}>
        <TextField 
          sx={{marginBottom: '15px', width: '45%'}} className={styles.mainName} id="standard-multiline-flexible" label="Имя:" multiline maxRows={2} value={f_name || ''} 
          onChange={(e) => setF_name(e.target.value)} variant="standard"
        />
        <TextField 
          sx={{marginBottom: '15px', width: '45%'}} className={styles.mainName} id="standard-multiline-flexible" label="Фамилия:" multiline maxRows={2} value={s_name || ''} 
          onChange={(e) => setS_Name(e.target.value)} variant="standard"
        />
      </div>
      <div className={styles.employee_names}>
        <TextField 
          sx={{marginBottom: '15px', width: '45%'}} className={styles.mainName} id="standard-multiline-flexible" label="Почта:" multiline maxRows={2} value={mail || ''} 
          onChange={(e) => setMail(e.target.value)} variant="standard"
        />
        <FormControl sx={{ marginBottom: '15px', width: '45%' }} className={styles.mainName} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Пароль:" 
          />
        </FormControl>
      </div>
      <div className={styles.employee_names}>
        <TextField 
          sx={{marginBottom: '15px', width: '45%'}} className={styles.mainName} id="standard-multiline-flexible" label="Телефон:" multiline maxRows={2} value={phone || ''} 
          onChange={(e) => setPhone(e.target.value)} variant="standard"
        />
        <FormControl variant="standard" style={{width: '45%', marginBottom: '20px'}} className={styles.mainName}>
          <InputLabel id="demo-simple-select-standard-label">Роль</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"   
            value={role || ''}
            onChange={handleChange}
            label={'Роль'}
          >
            <MenuItem id="1" value='Менеджер'>Менеджер</MenuItem>
            <MenuItem id="1" value='Бухгалтер'>Бухгалтер</MenuItem>
            <MenuItem id="1" value='Кассир'>Кассир</MenuItem>
            <MenuItem id="1" value='Кладовщик'>Кладовщик</MenuItem>
            <MenuItem id="1" value='Курьер/водитель'>Курьер/водитель</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}} className={styles.employee_names}>
        <FormControl variant="standard" style={{width: '45%', marginBottom: '20px'}} className={styles.mainName}>
          <InputLabel id="demo-simple-select-standard-label">Касса</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"   
            value={role || ''}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value='Менеджер'>Менеджер</MenuItem>
            <MenuItem value='Бухгалтер'>Бухгалтер</MenuItem>
            <MenuItem value='Кассир'>Кассир</MenuItem>
            <MenuItem value='Кладовщик'>Кладовщик</MenuItem>
            <MenuItem value='Курьер/водитель'>Курьер/водитель</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" style={{width: '45%', marginBottom: '20px'}} className={styles.mainName}>
          <InputLabel id="demo-simple-select-standard-label">Счёт</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"   
            value={role || ''}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value='Менеджер'>Менеджер</MenuItem>
            <MenuItem value='Бухгалтер'>Бухгалтер</MenuItem>
            <MenuItem value='Кассир'>Кассир</MenuItem>
            <MenuItem value='Кладовщик'>Кладовщик</MenuItem>
            <MenuItem value='Курьер/водитель'>Курьер/водитель</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" style={{width: '45%', marginBottom: '20px'}} className={styles.mainName}>
          <InputLabel id="demo-simple-select-standard-label">Склад</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"   
            value={role || ''}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value='Менеджер'>Менеджер</MenuItem>
            <MenuItem value='Бухгалтер'>Бухгалтер</MenuItem>
            <MenuItem value='Кассир'>Кассир</MenuItem>
            <MenuItem value='Кладовщик'>Кладовщик</MenuItem>
            <MenuItem value='Курьер/водитель'>Курьер/водитель</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}
export default InformationEmployee; 