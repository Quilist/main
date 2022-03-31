import React from 'react';
import { useNavigate } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar/Sidebar';

import PayForm from './components/PayForm';

import Button from '@mui/material/Button';

import styles from './css/PayForm.module.css'
import API from '@/api/api'

function Pay() {
  const [isSuccess, setIsSuccess] = React.useState(null)
  const [isRedirect, setIsRedirect] = React.useState(false)

  React.useEffect(() => {
    document.title = "B-Fin: Оплата"
    // eslint-disable-next-line
  }, [])


  // ========================================
  const [data, setData] = React.useState(null)
  const api = new API();

  const [item, setItem] = React.useState({});

  const navigate = useNavigate()
  React.useEffect(() => {
    if (isRedirect) {
      navigate('#')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  React.useEffect(() => {
    if (data) {
      const { item } = data;
      setItem(item)
    }
    // eslint-disable-next-line
  }, [data])

  const handleAdd = () => {
    console.log('item', item)

    api.add(item, 'payment').then(data => {
      if (data.status === "error") return alert(data.message)
      setIsSuccess(null)
      setIsRedirect(true)
    })
  }

  const handleReturn = () => {
    navigate(-1)
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
            <Button className={styles.button} variant="outlined">Печать</Button>
            <Button className={styles.button} variant="outlined">Отправить</Button>
          </div>
        </div>
        {isSuccess &&
          <div className={styles.success}>
            Вы успешно {isSuccess}!
          </div>
        }

        <div className={styles.boxesWrapper}>
          <PayForm
            item={item}
            setItem={setItem}
          />
        </div>

        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            <Button className={styles.button} variant="contained">Удалить</Button>
          </div>
          <div>
            <Button onClick={handleReturn} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Отмена</Button>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default Pay;