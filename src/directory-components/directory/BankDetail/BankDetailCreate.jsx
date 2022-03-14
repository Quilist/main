import React from 'react';
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../sidebar/Sidebar';

import BankDetailForm from './BankDetailForm';

import Button from '@mui/material/Button';

import styles from './BankDetailForm.module.css'
import API from '../../../api/api'

function BankDetailCreate() {
  const [isSuccess, setIsSuccess] = React.useState(null)

  const [isRedirect, setIsRedirect] = React.useState(false)

  // ========================================
  const [data, setData] = React.useState(null)
  const api = new API();

  const [name, setName] = React.useState('');
  const [mfo, setMfo] =  React.useState('');
  const [checkingAccount, setCheckingAccount] = React.useState('');

  const navigate = useNavigate()
  React.useEffect(() => {
    if (isRedirect) {
      navigate('/banks_details')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  React.useEffect(() => {
    if (data) {
      const { name, mfo, checkingAccount } = data;
      setName(name)
      setMfo(mfo)
      setCheckingAccount(checkingAccount)
    }
    // eslint-disable-next-line
  }, [data])

  const handleAdd = () => {
    const body = {
      bank_name: name,
      MFO: mfo,
      checking_account: checkingAccount
    };

    api.add(body, 'banksDetails').then(data => {
      if (data.status === "error") return alert(data.message)
      setIsSuccess(null)
      setIsRedirect(true)
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
            <Button onClick={handleAdd} className={styles.button} variant="contained">Сохранить</Button>
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
          <div>
            <Button onClick={handleReturn} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Отмена</Button>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default BankDetailCreate;