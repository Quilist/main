import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import UserForm from './UserFrom';
import InformationForm from './InformationForm';

import Button from '@mui/material/Button';
import Sidebar from '@/components/layout/Sidebar/Sidebar';

import styles from '@/styles/modules/UserEditing.module.css'
import API from '@/api/api'


function UserEditing() {
  const [isSuccess, setIsSuccess] = React.useState(null)

  const [isRedirect, setIsRedirect] = React.useState(false)

  // ========================================
  const [currentUser, setCurrentUser] = React.useState(null)
  const api = new API();
  const { id } = useParams()

  React.useEffect(() => {
    document.title = "B-Fin: Изменить поставщика"
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (id) {
      api.find(id, 'supplier').then(data => {
        setCurrentUser(data.message)
      })
    }
    // eslint-disable-next-line
  }, [])
  // =========================================

  // User`s data 
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [group, setGroup] = React.useState('');
  const [edrpou, setEdrpou] = React.useState('');
  // ============================================

  // Information data
  const [mainArreas, setMainArreas] = React.useState(0)
  const [address, setAddress] = React.useState('')
  const [arrears, setArrears] = React.useState(0)
  const [discount, setDiscount] = React.useState('')
  const [note, setNote] = React.useState('')
  const [codeNdc, setCodeNds] = React.useState('')
  // ============================================

  const navigate = useNavigate()
  React.useEffect(() => {
    if (isRedirect) {
      navigate('/suppliers')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  React.useEffect(() => {
    if (id && currentUser) {
      // ==============================================================
      const { address, company, discount, duty, group, mail, mobile, name, note, edrpou, code_nds } = currentUser;
      setName(name)
      setPhone(mobile)
      setMail(mail)
      setCompany(company)
      setGroup(group)
      setAddress(address)
      setArrears(duty)
      setDiscount(discount)
      setNote(note)
      setEdrpou(edrpou)
      setCodeNds(code_nds)
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
        note,
        edrpou
      }

      api.add(body, 'supplier').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }

  const handleRemove = () => {
    id !== 0 ? setIsSuccess('удалили пользователя') : setIsSuccess('')
    setTimeout(() => {
      api.remove(id, 'supplier').then(data => {
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
        note,
        edrpou
      }

      api.edit(id, body, 'supplier').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }
  // ======================================================================

  const handleSearch = () => {
    api.edrpouInfo(edrpou).then(data => {
      if (data.status === "error") return alert(data.message)

      setCompany(data.message.company)
      setCodeNds(data.message.code_nds)
    })
  }

  const handleReturn = () => {
    setIsRedirect(true)
  }

  return <>
    <Sidebar />
    <section className="home-section">
      <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            <Button onClick={!id ? handleAdd : handleChoose} className={styles.button} variant="contained">Сохранить</Button>
          </div>
          <div>
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
              edrpou={edrpou}
              setEdrpou={setEdrpou}
              handleSearch={handleSearch}
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
              note={note}
              setNote={setNote}
              setMainArreas={setMainArreas}
              codeNdc={codeNdc}
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
