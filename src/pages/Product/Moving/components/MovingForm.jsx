import React from 'react';

import Tab from './Tabs';

import './BuyForm.css'
import '../sell.css'
import SelectComponent from "@/components/Select/SelectComponent";

const data = [
  {
    id: '1',
    tabTitle: "Товары",
  },
  {
    id: '2',
    tabTitle: "",
  }
]

function MovingForm({ item, setItem, auxiliaryList, id }) {

  /*const handleDate = (value) => {
      setItem(prevItem => ({
          ...prevItem,
          date: value
      }));
  }*/

  React.useEffect(() => {
    if(!id) {
      if(auxiliaryList.storehouses?.length > 0) {
        setItem(prevItem => ({
          ...prevItem,
          storehouse_sender_id: auxiliaryList.storehouses[0].id
        }));
      }
      if(auxiliaryList.type_prices?.length > 0) {
        setItem(prevItem => ({
          ...prevItem,
          type_price_id: auxiliaryList.type_prices[0].id
        }));
      }
      if(auxiliaryList.currencies?.length > 0) {
        setItem(prevItem => ({
          ...prevItem,
          currency_id: auxiliaryList.currencies[0].id
        }));
      }
    }

    // eslint-disable-next-line
  }, [auxiliaryList])

  const handleDate = (value) => {
    const date = new Date(value);
    const milliseconds = date.getTime();
    setItem(prevItem => ({
      ...prevItem,
      date: milliseconds
    }));
  }

  const [name, setName] = React.useState({
    'purchase': true,
    'client': "",
    'storage': "",
    'org': "",
    'date': "",
    'typePrice': "",
    'salesman': "",
    'currency': "",
  });

  const formatField = (value) => {
    let n;
    let h = parseInt(value);
    if(!isNaN(h)) {
      n = h;
    } else {
      n = value;
    }
    return n;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    let v = formatField(value);
    if(name === 'note') {
      v = String(v);
    }

    setItem(prevItem => ({
      ...prevItem,
      [name]: v
    }));
  };

  return (
    <>
      <div className="form_edit_wrap">
        <div className="form_edit mobile-block">
          <form action="#" className="form__people info">
            {/* ------------------------------ Склад Отправитель ------------------------------ */}
            <div
              className={"form__input mobile-hidden " + (name.storage ? 'active-cheked' : 'active-disable')}>
              <SelectComponent
                list={auxiliaryList?.storehouses}
                value={item.storehouse_sender_id}
                label="Отправитель"
                field="storehouse_sender_id"
                setItem={setItem}
              />
            </div>

          </form>
          <form action="#" className="form__details debtSell desctop-hidden">
            {/* ------------------------------ Склад Получатель ------------------------------ */}
            <div
              className={"form__input mobile-hidden " + (name.storage ? 'active-cheked' : 'active-disable')}>
              <SelectComponent
                list={auxiliaryList?.storehouses}
                value={item.storehouse_consignee_id}
                label="Получатель"
                field="storehouse_consignee_id"
                setItem={setItem}
              />
            </div>
          </form>
        </div>
      </div>

      <Tab data={data}
           item={item}
           setItem={setItem}
           auxiliaryList={auxiliaryList}
      />
      <div className="form_footer">
        <div className="form_footer-l">

        </div>
        <div className="form_footer-r">
          <p className="form_footer-sum">Итого: <span>{item.sum || 0}</span></p>
        </div>
      </div>
    </>
  )
}

export default MovingForm;
