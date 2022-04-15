import React from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar/Sidebar';

import ProductForm from './components/ProductForm';

import Button from '@mui/material/Button';

import styles from '@/styles/modules/ProductForm.module.css'
import {useDocumentTitle} from "@/hooks/useDocumentTitle";
import API from '@/api/api'

function ProductHandle() {
  const [isSuccess, setIsSuccess] = React.useState(null)

  const [isRedirect, setIsRedirect] = React.useState(false)

  // ========================================
  const [data] = React.useState(null)
  const api = new API();
  const { id } = useParams()

  const [item, setItem] = React.useState({price: 100, supplier_id: 1, group_id: 1, unit_id: 1});
  const [auxiliaryList, setAuxiliaryList] = React.useState({
    storehouses: [],
    type_prices: [],
    units: [],
    suppliers: [],
    groups: [],
    types: [],
    currencies: []
  });

  const navigate = useNavigate()
  React.useEffect(() => {
    if (isRedirect) {
      navigate('#')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  useDocumentTitle("Изменить товары и услуги");
  React.useEffect(() => {
    api.auxiliary('product').then(data => {
      console.log('data', data.message)
      if (data.status === "error") alert(data.message)
      else setAuxiliaryList(data.message)
    })
    console.log('auxiliaryList', auxiliaryList)

    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if(id) {
      api.find(id, 'product').then(data => {
        const res = data.message
        setItem(res)
      })
    }

    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (isRedirect) {
      navigate('/products')
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

    if(!id) {
      api.add(item, 'product').then(data => {
        if (data.status === "error") return console.log(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    } else {
      api.edit(id, item, 'product').then(data => {
        if (data.status === "error") return console.log(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }
  }

  const handleRemove = () => {
    setTimeout(() => {
      api.remove(id, 'product').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 100)
  }

  const handleReturn = () => {
    setIsRedirect(true)
  }

  return <>
    <section className="home-section">
      <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            <Button onClick={handleAdd} className={styles.button} variant="contained">Сохранить</Button>
          </div>
        </div>
        {isSuccess &&
          <div className={styles.success}>
            Вы успешно {isSuccess}!
          </div>
        }

        <div className={styles.boxesWrapper}>
          <ProductForm
            item={item}
            setItem={setItem}
            auxiliaryList={auxiliaryList}
          />
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

export default ProductHandle;