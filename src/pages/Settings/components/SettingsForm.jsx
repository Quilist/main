import React from 'react';

import './BuyForm.css'
import '../sell.css'
import SelectComponent from "@/components/Select/SelectComponent";

function SettingsForm({ item, setItem, auxiliaryList }) {

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
    console.log('v', v)
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
            {/* ------------------------------ Статья доходов ------------------------------ */}
            <div
              className={"form__input mobile-hidden " + (item.currency_id ? 'active-cheked' : 'active-disable')}>
              <SelectComponent
                list={auxiliaryList?.currencies}
                value={item.currency_id}
                label="Валюта"
                field="currency_id"
                setItem={setItem}
              />
            </div>

            <div
              className={"form__input mobile-hidden " + (item.storehouse_id ? 'active-cheked' : 'active-disable')}>
              <SelectComponent
                list={auxiliaryList?.storehouses}
                value={item.storehouse_id}
                label="Склад"
                field="storehouse_id"
                setItem={setItem}
              />
            </div>

            <div
              className={"form__input mobile-hidden " + (item.legal_entity_id ? 'active-cheked' : 'active-disable')}>
              <SelectComponent
                list={auxiliaryList?.legal_entites}
                value={item.legal_entity_id}
                label="Организация"
                field="legal_entity_id"
                setItem={setItem}
              />
            </div>

          </form>

        </div>
      </div>

      <div className="form_edit_wrap">
        <div className="form_edit mobile-block">
          <form action="#" className="form__people info">
            <div
              className={"form__input mobile-hidden " + (item.password ? 'active-cheked' : 'active-disable')}>
              <input type="text" placeholder="Новый пароль:"
                     className="short-input"
                     name="password"
                     onChange={handleChange}
              />
            </div>

          </form>
          <form action="#" className="form__details debtSell desctop-hidden">
            {/* ------------------------------ Склад ------------------------------ */}

            <div
              className={"form__input mobile-hidden " + (item.password_confirmation ? 'active-cheked' : 'active-disable')}>
              <input type="text" placeholder="Новый пароль подтверждение:"
                     className="short-input"
                     name="password_confirmation"
                     onChange={handleChange}
              />
            </div>

          </form>
        </div>
      </div>

    </>
  )
}

export default SettingsForm;
