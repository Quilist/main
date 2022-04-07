import React from 'react';

import './Tabs.css'


const tableHeader = [
   {
      name: "№"
   },
   {
      name: "Название товара"
   },
   {
      name: "Количество"
   },
   {
      name: "Ед. изм."
   },
   {
      name: "Цена"
   },
   {
      name: "Сумма"
   }
];



function Tab(props) {

   const [visibleTab, setVisibleTab] = React.useState(props.data[0].id)

   const listTitles = props.data.map((item) =>
      <li onClick={() => setVisibleTab(item.id)} className={visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"}>{item.tabTitle}</li>
   )

   // const listContent = props.data.map((item) =>
   //    <p style={visibleTab === item.id ? {} : { display: 'none' }}>{item.tabContent}</p>
   // )

   return (
      <div className="tabs">
         <ul className="tabs-titles">
            {listTitles}
         </ul>
         <div className="form__buy__tabs">
            <div className="tab-content">
               <div class="form__setting">
                  <a href="/#">
                     <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z" fill="#7096FF" />
                     </svg>
                  </a> &nbsp; Добавить строку
                  &nbsp;&nbsp;
                  <a href="/#">
                     <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z" fill="#7096FF" />
                     </svg>
                  </a> &nbsp; Заполнить из справочника
               </div>
            </div>
            <div className="table">
               <div className="table__head">
                  {tableHeader.map((th) => {
                     return (
                        <p>{th.name}</p>
                     );
                  })}
               </div>

               {tableHeader.map((item, index) => {
                  return (
                     <div className="table__item">
                        <div className="table__mob">
                           <p>
                              {/* {getAccount(item)} */}
                              паппа
                           </p>
                           <p>
                              <a href="#!">
                                 Установить
                              </a>
                           </p>
                        </div>
                        <div className="table__data">
                           <p>
                              1
                              {/* {formattedDate(item.date_create)} */}
                           </p>
                           <p>

                           </p>
                        </div>
                        <div className="table__paysend">
                           <p>
                              Дрова дубовые 33 см
                              {/* {getType(item)} */}
                           </p>
                        </div>
                        <div className="table__account">
                           <p>
                              15200 грн
                              {/* {getAccount(item)} */}
                           </p>
                        </div>
                        <div className="table__counterparty">
                           <p>
                              <a href="#!">
                                 Установить
                              </a>
                           </p>
                        </div>
                        <div className="table__summury">
                           <p>
                              15200 грн
                              {/* {getAmount(item)} */}
                           </p>
                        </div>
                        <div className="table__comment">
                           {item.note}
                        </div>
                     </div>
                  );
               })}

            </div>
         </div>
      </div>
   )
}

export default Tab
