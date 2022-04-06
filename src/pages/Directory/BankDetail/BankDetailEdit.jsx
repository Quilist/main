import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar/Sidebar';

import BankDetailForm from './BankDetailForm';

import Button from '@mui/material/Button';

import styles from '@/styles/modules/BankDetailForm.module.css'
import {useDocumentTitle} from "@/hooks/useDocumentTitle";
import API from '@/api/api'


function BankDetailEdit() {
  const [isSuccess, setIsSuccess] = React.useState(null)
  const { id } = useParams()

  const [isRedirect, setIsRedirect] = React.useState(false)

  // ========================================
  const [name, setName] = React.useState('');
  const [mfo, setMfo] =  React.useState('');
  const [checkingAccount, setCheckingAccount] = React.useState('');

  const navigate = useNavigate()

  const api = new API();
  useDocumentTitle("Изменить банки и реквизиты");
  React.useEffect(() => {
    api.find(id, 'bankDetail').then(data => {
      const res = data.message
      setName(res.bank_name)
      setMfo(res.MFO)
      setCheckingAccount(res.checking_account)
    })
    // eslint-disable-next-line
  }, [])
  // =========================================


  React.useEffect(() => {
    if (isRedirect) {
      navigate('/banks_details')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  const handleRemove = () => {
    setTimeout(() => {
      api.remove(id, 'bankDetail').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }

  const handleChoose = () => {
    const body = {
      bank_name: name,
      MFO: mfo,
      checking_account: checkingAccount
    };

    api.edit(id, body, 'bankDetail').then(data => {
      if (data.status === "error") return alert(data.message)
      setIsSuccess(null)
      setIsRedirect(true)
    })
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
            <Button onClick={handleChoose} className={styles.button} variant="contained">Сохранить</Button>
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
            <BankDetailForm
              name={name}
              setName={setName}
              mfo={mfo}
              setMfo={setMfo}
              checkingAccount={checkingAccount}
              setCheckingAccount={setCheckingAccount}
            />
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            <Button onClick={handleRemove} className={styles.button} variant="contained">Удалить</Button>
          </div>
          <div>
            <Button onClick={handleReturn} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Отмена</Button>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default BankDetailEdit;