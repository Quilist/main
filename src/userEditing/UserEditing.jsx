import React from 'react';
import { useNavigate } from 'react-router-dom'
import useUserId from '../hooks/useUserId';

import UserForm from './UserFrom';
import InformationForm from './InformationForm';

import Button from '@mui/material/Button';
import Sidebar from '../sidebar/Sidebar';

import styles from './UserEditing.module.css'
import API from '../api/api'


function UserEditing() {
  const { userId } = useUserId();
  const [isSuccess, setIsSuccess] = React.useState(null)

  const [isRedirect, setIsRedirect] = React.useState(false)
  let isAdd = userId === 'Add'

  // ========================================
  const [currentUser, setCurrentUser] = React.useState(null)
  const api = new API();
  React.useEffect(() => {
    if (!isAdd) {
      api.getClient(userId).then(data => {
        setCurrentUser(data.message)
      })
    }
    // eslint-disable-next-line
  }, [])
  // =========================================

  // User`s data 
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState(['', '', '']);
  const [mail, setMail] = React.useState(['', '', '']);
  const [company, setCompany] = React.useState('');
  const [group, setGroup] = React.useState('');
  // ============================================

  // Information data
  const [mainArreas, setMainArreas] = React.useState(0)
  const [address, setAddress] = React.useState('')
  const [arrears, setArrears] = React.useState(0)
  const [discount, setDiscount] = React.useState('')
  const [notes, setNotes] = React.useState('')
  // ============================================

  const navigate = useNavigate()
  React.useEffect(() => {
    if (isRedirect) {
      navigate('/clients')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  React.useEffect(() => {
    if (!isAdd && currentUser) {
      // ==============================================================
      const { address, company, discount, duty, group, mail, mobile, name, notes } = currentUser;
      setName(name)
      setPhone(mobile)
      setMail(mail || ['', '', ''])
      setCompany(company)
      setGroup(group)
      setAddress(address)
      setArrears(duty)
      setDiscount(discount)
      setNotes(notes)
      // =============================================================== 

    }
    // eslint-disable-next-line
  }, [currentUser])

  // ======================================================================
  const handleAdd = () => {
    userId !== 0 ? setIsSuccess('добавили пользователя') : setIsSuccess('')

    setTimeout(() => {
      let body = {
        name,
        mobile: phone,
        mail,
        company,
        group,
        address,
        duty: mainArreas,
        discount,
        notes
      }

      api.addClient(body).then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }

  const handleRemove = () => {
    userId !== 0 ? setIsSuccess('удалили пользователя') : setIsSuccess('')
    setTimeout(() => {
      api.removeClient(userId).then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }

  const handleChoose = () => {
    userId !== 0 ? setIsSuccess('изменили пользователя') : setIsSuccess('')

    setTimeout(() => {
      let body = {
        name,
        mobile: phone,
        mail,
        company,
        group,
        address,
        duty: mainArreas,
        discount,
        notes
      }

      api.editClient(userId, body).then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }
  // ======================================================================

  const handleReturn = () => {
    setIsRedirect(true)
  }

  return <>
    <Sidebar />
    <section className="home-section">
      <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            <Button onClick={isAdd ? handleAdd : handleChoose} className={styles.button} variant="contained">Сохранить</Button>
            {/* {!isAdd && <Button onClick={handleRemove} className={styles.button} variant="contained">Удалить</Button>} */}
          </div>
          <div>
            {/* <Button onClick={handleReturn} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Отмена</Button> */}
          </div>
        </div>
        {isSuccess &&
          <div className={styles.success}>
            Вы успешно {isSuccess}!
          </div>
        }

        <div className={styles.boxesWrapper}>
          <div className={styles.boxesWrapper__user}>
            <UserForm
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              mail={mail}
              setMail={setMail}
              company={company}
              setCompany={setCompany}
              group={group}
              setGroup={setGroup}
            />
          </div>

          <div className={styles.boxesWrapper__information}>
            <InformationForm
              address={address}
              setAddress={setAddress}
              arrears={arrears}
              setArrears={setArrears}
              discount={discount}
              setDiscount={setDiscount}
              notes={notes}
              setNotes={setNotes}
              setMainArreas={setMainArreas}
            />
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            {!isAdd && <Button onClick={handleRemove} className={styles.button} variant="contained">Удалить</Button>}
          </div>
          <div>
            <Button onClick={handleReturn} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Отмена</Button>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default UserEditing;