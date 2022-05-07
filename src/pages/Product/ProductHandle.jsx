import React from 'react';
import {useNavigate, useParams} from 'react-router-dom'

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

  const [item, setItem] = React.useState({type: 'product', childs: []});
  const [auxiliaryList, setAuxiliaryList] = React.useState({
    storehouses: [],
    type_prices: [],
    measures: [],
    suppliers: [],
    groups: [],
    types: [],
    currencies: [],
    colors: [],
    sizes: [],
    products: []
  });
  const [typePriceList, setTypePriceList] = React.useState([]);
  const [storehouseList, setStorehouseList] = React.useState([]);

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
      if (data.status === "error") alert(data.message)
      else setAuxiliaryList(data.message)
      if(!id && data.message?.measures.length > 0) {
        setItem(prevItem => ({
          ...prevItem,
          measure_id: data.message.measures[0].id
        }));
      }
    })

    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if(id) {
      api.find(id, 'product').then(data => {
        const res = data.message
        setItem(res)
        if(res.leftovers) {
          setStorehouseList(res.leftovers);
        }
        if(res.prices) {
          setTypePriceList(res.prices);
        }
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


  const handleAdd = () =>  {
    let priceData = [], storehouseData = [], data = item;

    if(typePriceList?.length > 0) {
      typePriceList.forEach(function (typePrice) {
        if(typePrice.name && typePrice.currency_id && typePrice.price) {
          priceData.push({ name: typePrice.name, currency_id: Number(typePrice.currency_id), price: Number(typePrice.price), type_price_id: typePrice.type_price_id ? Number(typePrice.type_price_id) : Number(typePrice.id)});
        }
      });
      data.prices = priceData
    }

    if(storehouseList?.length > 0) {
      storehouseList.forEach(function (storehouse) {
        if(storehouse.id && storehouse.currency_id && storehouse.qnt && storehouse.price) {
          storehouseData.push({ storehouse_id: Number(storehouse.id), qnt: Number(storehouse.qnt), currency_id: Number(storehouse.currency_id), price: Number(storehouse.price) });
        }
      });
      data.leftovers = storehouseData
    }

    if(item.childs?.length > 0) {
      delete item.prices;
      delete item.leftovers;
    }

    if(!id) {
      api.add(data, 'product').then(data => {
        if (data.status === "error") return console.log(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    } else {
      api.edit(id, data, 'product').then(data => {
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
            typePriceList={typePriceList}
            setTypePriceList={setTypePriceList}
            storehouseList={storehouseList}
            setStorehouseList={setStorehouseList}
            id={id}
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