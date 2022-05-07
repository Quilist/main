import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import UserForm from './UserFrom';
import InformationForm from './InformationForm';

import Button from '@mui/material/Button';

import styles from '@/styles/modules/UserEditing.module.css'
import {useDocumentTitle} from "@/hooks/useDocumentTitle";
import API from '@/api/api'


function UserEditing() {
  const [isSuccess, setIsSuccess] = React.useState(null)
  const { id } = useParams()

  const [isRedirect, setIsRedirect] = React.useState(false)

  // ========================================
  const [currentUser, setCurrentUser] = React.useState(null)
  const api = new API();

  useDocumentTitle("Изменить клиента");

  React.useEffect(() => {
    if(id) {
      api.find(id, 'client').then(data => {
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
    if (id && currentUser) {
      // ==============================================================
      const { address, company, discount, duty, group, mail, mobile, name, notes } = currentUser;
      const dutyFixed = parseFloat( currentUser.debit ) - parseFloat( currentUser.credit );
      setName(name)
      setPhone(mobile)
      setMail(mail || ['', '', ''])
      setCompany(company)
      setGroup(group)
      setAddress(address)
      setArrears(dutyFixed)
      setDiscount(discount)
      setNotes(notes)
      // =============================================================== 

    }
    // eslint-disable-next-line
  }, [currentUser])

  // ======================================================================
  const handleAdd = () => {
    id !== 0 ? setIsSuccess('добавили пользователя') : setIsSuccess('')

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

      api.add(body, 'client').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }

  const handleRemove = () => {
    id !== 0 ? setIsSuccess('удалили пользователя') : setIsSuccess('')
    setTimeout(() => {
      api.remove(id, 'client').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }

  const handleChoose = () => {
    id !== 0 ? setIsSuccess('изменили пользователя') : setIsSuccess('')

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

      api.edit(id, body, 'client').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }
  // ======================================================================

  const handleReturn = () => {
    navigate(-1)
    setIsRedirect(true)
  }

  return <>
    <section className="home-section">
      <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            <Button onClick={!id ? handleAdd : handleChoose} className={styles.button} variant="contained">Сохранить</Button>
            {/* {!id && <Button onClick={handleRemove} className={styles.button} variant="contained">Удалить</Button>} */}
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
              currentUser={currentUser}
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
              currentUser={currentUser}
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
            {id && <Button onClick={handleRemove} className={styles.button} variant="contained">Удалить</Button>}
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