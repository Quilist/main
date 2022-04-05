import React from 'react';

import Tab from './Tabs';

import './BuyForm.css'

const data = [
  {
    id: '1',
    tabTitle: "Товары и услуги",
  },
  {
    id: '2',
    tabTitle: "Доп. расходы",
  },
  {
    id: '3',
    tabTitle: "Детали",
  }
]

function BuyForm(props) {



  return (
    <>
      <div class="form_edit">
        <form action="#" class="form__people">
          {/* ------------------------------ Поставщик ------------------------------ */}
          <div class="form__input active-disable">
            <div class="select">
              <select>
                <option selected disabled>Поставщик</option>
                <option value="saab">Поставщик1</option>
                <option value="opel">Поставщик2</option>
                <option value="audi">Поставщик3</option>
              </select>
            </div>
          </div>
          {/* ------------------------------ Склад ------------------------------ */}

          <div class="form__input active-disable">
            <div class="select">
              <select>
                <option selected disabled>Склад</option>
                <option value="saab">Склад1</option>
                <option value="opel">Склад2</option>
                <option value="audi">Склад3</option>
              </select>
            </div>
          </div>
          {/*  Цена */}
          <div class="form__input active-disable">
            <div class="select ">
              <select>
                <option selected disabled>Тип цены </option>
                <option value="saab">Закупочный</option>
                <option value="opel">Розница</option>
                <option value="audi">Цена без НДС</option>
              </select>
            </div>
            &nbsp;
            <div class="select select_short">
              <select>
                <option selected disabled>Валюта</option>
                <option value="currency1">Валюта1</option>
                <option value="currency2">Валюта2</option>
                <option value="currency3">Валюта3</option>
              </select>
            </div>
          </div>
          <div class="form__input active-disable">
            <div class="data">
              <input type="date" placeholder="Дата" />
            </div>
          </div>
        </form>
        <form action="#" class="form__details">
          <div class="form__output">
            <h3>Задолженность</h3>
            <h2>5000 uah</h2>
          </div>

          <div class="form__input active-cheked">
            {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

            <div class="select">
              <select>
                <option selected disabled>Организация</option>
                <option value="organization1">Организация1</option>
                <option value="organization2">Организация2</option>
                <option value="organization3">Организация3</option>
              </select>
            </div>
          </div>
          <div class="form__input active-cheked">
            <textarea name="" placeholder="Комментарий:"></textarea>
          </div>
        </form>
      </div>
      <Tab data={data} />
    </>
  )
}
export default BuyForm;