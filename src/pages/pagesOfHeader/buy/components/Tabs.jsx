import React, {useState} from 'react';
import Select from 'react-select';
import './Tabs.css'
import DirectoryModal from "@/components/modal/DirectoryModal.jsx";
import FormControl from "@mui/material/FormControl";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

const customStyles = {
   option: (provided, state) => ({
      ...provided,
      color: state.isSelected || state.isFocused ? 'white' : 'black',
      background: state.isSelected || state.isFocused ? '#7196ff' : 'white',
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return {...provided, opacity, transition};
   }
};
const optionsTypePrice = [
   {value: '0', label: 'Тип цены ', isDisabled: true},
   {value: 'saab', label: 'Закупочный'},
   {value: 'opel', label: 'Розница'},
   {value: 'audi', label: 'Цена без НДС'},
];
const optionsCurrency = [
   {value: '0', label: 'Валюта', isDisabled: true},
   {value: '1', label: 'Валюта1'},
   {value: '2', label: 'Валюта2'},
   {value: '3', label: 'Валюта3'},
];
const optionsOrg = [
   {value: '0', label: 'Организация', isDisabled: true},
   {value: '1', label: 'Организация1'},
   {value: '2', label: 'Организация2'},
   {value: '3', label: 'Организация3'},
];
const CustomOrg = ({innerRef, innerProps, isDisabled, children}) =>
    !isDisabled ? (
        <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
           {children}
           <div className="customReactSelectFooter">
              <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
              <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
           </div>
        </div>
    ) : null;


function Tab(props) {

   const [visibleTab, setVisibleTab] = React.useState(props.data[0].id)
   const [openDirectoryModal, setOpenDirectoryModal] = useState(false);
   const [item, setItem] = React.useState({});

   const handleDate = (value) => {
      const date = new Date(value);
      const milliseconds = date.getTime();
      setItem(prevItem => ({
         ...prevItem,
         date: milliseconds
      }));
   }
   const listTitles = props.data.map((item) =>
       <li onClick={() => setVisibleTab(item.id)}
           className={visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"}>{item.tabTitle}</li>
   )

   // const listContent = props.data.map((item) =>
   //    <p style={visibleTab === item.id ? {} : { display: 'none' }}>{item.tabContent}</p>
   // )

   const customStyles = {
      option: (provided, state) => ({
         ...provided,
         color: state.isSelected || state.isFocused ? 'white' : 'black',
         background: state.isSelected || state.isFocused ? '#7196ff' : 'white',

      }),

      singleValue: (provided, state) => {
         const opacity = state.isDisabled ? 0.5 : 1;
         const transition = 'opacity 300ms';

         return {...provided, opacity, transition};
      },
   }

   const tableHead = [
      {
         name: "№"
      },
      {
         name: "Товар или услуга"
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
   const [tableItem, setTableItem] = React.useState([
      {
         number: 1,
         products: [
            {
               label: 'Дрова акация 33 см',
               value: 1,
            },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },
         ],
         qnt: '66,000',
         unit: "м<sup>3</sup>/нас",
         price: "980,00",
         sum: "64 680,00",
      },
      {
         number: 2,
         products: [
            {
               label: 'Дрова акация 33 см',
               value: 1,
            },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },
         ],
         qnt: '66,000',
         unit: "м<sup>3</sup>/нас",
         price: "980,00",
         sum: "64 680,00",
      },
      {
         number: 3,
         products: [
            {
               label: 'Дрова акация 33 см',
               value: 1,
            },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },
         ],
         qnt: '66,000',
         unit: "м<sup>3</sup>/нас",
         price: "980,00",
         sum: "64 680,00",
      },
      {
         number: 4,
         products: [
            {
               label: 'Дрова акация 33 см',
               value: 1,
            },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },
         ],
         qnt: '66,000',
         unit: "м<sup>3</sup>/нас",
         price: "980,00",
         sum: "64 680,00",
      },
   ]);
   const removeTableItem = (index) => {
      var ind = index -1;
      setTableItem(tableItem.filter((o, i) => ind !== i));
   };
   var addNumber = tableItem[tableItem.length - 1]?.number;
   const addItem = (e) => {
      setTableItem([...tableItem, {
         number: ++addNumber, products: [{
            label: 'Дрова акация 33 см',
            value: 1,
         },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },], qnt: null, unit: "м<sup>3</sup>/нас", price: null, sum: null
      }]);
   }


   const CustomTable = ({innerRef, innerProps, isDisabled, children}) =>
       !isDisabled ? (
           <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
              {children}
              <div className="customReactSelectFooter">
                 <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
                 <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
              </div>
           </div>
       ) : null;


   const tableHeadTwo = [
      {
         name: "№"
      },
      {
         name: "Услуга"
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
   const [tableItemTwo, setTableItemTwo] = React.useState([
      {
         number: 1,
         products: [
            {
               label: 'Дрова акация 33 см',
               value: 1,
            },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },
         ],
         qnt: '66,000',
         unit: "м<sup>3</sup>/нас",
         price: "980,00",
         sum: "64 680,00",
      },
      {
         number: 2,
         products: [
            {
               label: 'Дрова акация 33 см',
               value: 1,
            },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },
         ],
         qnt: '66,000',
         unit: "м<sup>3</sup>/нас",
         price: "980,00",
         sum: "64 680,00",
      },
      {
         number: 3,
         products: [
            {
               label: 'Дрова акация 33 см',
               value: 1,
            },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },
         ],
         qnt: '66,000',
         unit: "м<sup>3</sup>/нас",
         price: "980,00",
         sum: "64 680,00",
      },
      {
         number: 4,
         products: [
            {
               label: 'Дрова акация 33 см',
               value: 1,
            },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },
         ],
         qnt: '66,000',
         unit: "м<sup>3</sup>/нас",
         price: "980,00",
         sum: "64 680,00",
      },
   ]);


   const removeTableItemTwo = (index) => {
      var ind = index -1;
      setTableItemTwo(tableItemTwo.filter((o, i) => ind !== i));
   };

   var addNumberTwo = tableItemTwo[tableItemTwo.length - 1]?.number;
   const addItemTwo = (e) => {
      setTableItemTwo([...tableItemTwo, {
         number: ++addNumberTwo, products: [{
            label: 'Дрова акация 33 см',
            value: 1,
         },
            {
               label: 'Дрова акация 34 см',
               value: 2,
            },], qnt: null, unit: "м<sup>3</sup>/нас", price: null, sum: null
      }]);
   }
   const CustomTableTwo = ({innerRef, innerProps, isDisabled, children}) =>
       !isDisabled ? (
           <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
              {children}
              <div className="customReactSelectFooter">
                 <button className="btn-link" onClick={event => event.preventDefault()}>Показать еще</button>
                 <button className="btn-add-icon" onClick={event => event.preventDefault()}></button>
              </div>
           </div>
       ) : null;
   const handleOpenDirectory = () => setOpenDirectoryModal(true);

   /*window.onload = () => {
       var mobileBlock = document.querySelectorAll('.mobile-block')

       if (window.screen.width < 992) {
           let out = '';
           for (let i = 0; i < mobileBlock.length; i++) {
               out = out + mobileBlock[i].innerHTML;
           }

           document.querySelector('.tab-content-3').innerHTML = out;

           var mobileHidden = document.querySelectorAll('.tab-content-3 .mobile-hidden');
           var descHidden = document.querySelectorAll('.form_edit_wrap .desctop-hidden');

           for (let i = 0; i < mobileHidden.length; i++) {
               mobileHidden[i].remove();
           }
           for (let i = 0; i < descHidden.length; i++) {
               descHidden[i].remove();
           }
       }


   };*/

   const [name, setName] = React.useState({
      'idType': "",
      'storage': "",
      'org': "",
      'date': "",
      'typePrice': "",
      'currency': "",
   });

   const handleChangeValue = (id, e) => {
      const {name, value} = e;

      setName(prevItem => ({
         ...prevItem,
         [id]: value ? value : 'true',
      }));
   };

  /* const optionsСourier = [
      {value: '0', label: 'Выберете курьера', isDisabled: true},
      {value: '1', label: 'Курьер 1'},
      {value: '2', label: 'Курьер 2'},
      {value: '3', label: 'Курьер 3'},
   ];*/

   return (
       <>
          <DirectoryModal
              open={openDirectoryModal}
              setOpen={setOpenDirectoryModal}
          />
          <div className="tabs">
             <ul className="tabs-titles">
                {listTitles}
             </ul>
             <div className="tab-contents">
                <div className={+visibleTab === 1 ? "tab-content" : "tab-content hidden"}>
                   <div className="">
                      <div className="form__buy__tabs">
                         <div className="tab-content">
                            <div className="form__setting">
                               <button className="btn-ico-round" onClick={addItem}>
                                        <span className="icon">
                                 <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z"
                                          fill="#7096FF"/>
                                 </svg>
                              </span>
                                  <span className="text">Добавить строку</span>
                               </button>
                               {/*<button className="btn-ico-round" onClick={handleOpenDirectory}>
                              <span className="icon">
                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 2.5H6.21L5.055 0.910003C4.96191 0.782606 4.83999 0.679045 4.69921 0.607787C4.55843 0.536528 4.40279 0.499594 4.245 0.500003H1C0.734784 0.500003 0.48043 0.60536 0.292893 0.792897C0.105357 0.980433 0 1.23479 0 1.5V12.5C0 12.7652 0.105357 13.0196 0.292893 13.2071C0.48043 13.3946 0.734784 13.5 1 13.5H13C13.2652 13.5 13.5196 13.3946 13.7071 13.2071C13.8946 13.0196 14 12.7652 14 12.5V3.5C14 3.23479 13.8946 2.98043 13.7071 2.7929C13.5196 2.60536 13.2652 2.5 13 2.5ZM13 12.5H1V4.5H4.655C4.92022 4.5 5.17457 4.39465 5.36211 4.20711C5.54964 4.01957 5.655 3.76522 5.655 3.5H1V1.5H4.245L5.55 3.295C5.59655 3.3587 5.65751 3.41048 5.7279 3.44611C5.79829 3.48174 5.87611 3.50021 5.955 3.5H13V12.5Z"
                                        fill="#7096FF"/>
                                 </svg>
                              </span>
                                            <span className="text">Заполнить из справочника</span>
                                        </button>*/}
                            </div>
                         </div>

                         <div className="table-block-wrap">
                            <table className="table-block">
                               <tr>
                                  {tableHead.map((th) => {
                                     return (
                                         <th>{th.name}</th>
                                     );
                                  })}
                               </tr>
                               {tableItem.map((item, index) => {
                                  return (
                                      <tr key={index}>
                                         <td>
                                            {index+1}
                                         </td>
                                         <td>
                                            <p className="table-block-label">{tableHead[1].name}:</p>
                                            <div className="table-block-body">
                                               <div className="select two">
                                                  <Select
                                                      name={'id_product' + ++index}
                                                      width='200px'
                                                      styles={customStyles}
                                                      options={item.products}
                                                      defaultValue={item.products[0]}
                                                      noOptionsMessage={() => "Ничего не найдено :("}
                                                      components={{Menu: CustomTable}}
                                                      theme={(theme) => ({
                                                         ...theme,
                                                         borderRadius: 12,
                                                         colors: {
                                                            ...theme.colors,
                                                            primary25: '#4369cf',
                                                            primary: '#7196ff',
                                                         },
                                                      })}
                                                  >
                                                  </Select>
                                               </div>
                                            </div>
                                         </td>
                                         <td>
                                            <p className="table-block-label">{tableHead[2].name}:</p>
                                            <div className="table-block-body"><input className="table-input"
                                                                                     onKeyPress={(event) => {
                                                                                        if (!/[0-9]/.test(event.key)) {
                                                                                           event.preventDefault();
                                                                                        }
                                                                                     }} type="text"
                                                                                     defaultValue={item.qnt}/>
                                            </div>
                                         </td>
                                         <td>
                                            <p className="table-block-label">{tableHead[3].name}:</p>
                                            <div className="table-block-body">
                                               <div dangerouslySetInnerHTML={{__html: item.unit}}></div>
                                            </div>
                                         </td>

                                         <td>
                                            <p className="table-block-label">{tableHead[4].name}:</p>
                                            <div className="table-block-body"><input className="table-input"
                                                                                     onKeyPress={(event) => {
                                                                                        if (!/[0-9]/.test(event.key)) {
                                                                                           event.preventDefault();
                                                                                        }
                                                                                     }} type="text"
                                                                                     defaultValue={item.price}/>
                                            </div>
                                         </td>
                                         <td>
                                            <p className="table-block-label">{tableHead[5].name}:</p>
                                            <div className="table-block-body">{item.sum}</div>

                                         </td>
                                         <td className="table-delete-wrap">
                                            <button className="table-delete" onClick={() => removeTableItem((index))}></button>
                                         </td>
                                      </tr>
                                  );
                               })}
                            </table>
                         </div>
                      </div>

                   </div>
                </div>
                <div className={+visibleTab === 2 ? "tab-content" : "tab-content hidden"}>

                   <div className="form__setting">
                      <button className="btn-ico-round" onClick={addItemTwo}>
                                        <span className="icon">
                                 <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z"
                                          fill="#7096FF"/>
                                 </svg>
                              </span>
                         <span className="text">Добавить строку</span>
                      </button>
                      {/*<button className="btn-ico-round" onClick={handleOpenDirectory}>
                              <span className="icon">
                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 2.5H6.21L5.055 0.910003C4.96191 0.782606 4.83999 0.679045 4.69921 0.607787C4.55843 0.536528 4.40279 0.499594 4.245 0.500003H1C0.734784 0.500003 0.48043 0.60536 0.292893 0.792897C0.105357 0.980433 0 1.23479 0 1.5V12.5C0 12.7652 0.105357 13.0196 0.292893 13.2071C0.48043 13.3946 0.734784 13.5 1 13.5H13C13.2652 13.5 13.5196 13.3946 13.7071 13.2071C13.8946 13.0196 14 12.7652 14 12.5V3.5C14 3.23479 13.8946 2.98043 13.7071 2.7929C13.5196 2.60536 13.2652 2.5 13 2.5ZM13 12.5H1V4.5H4.655C4.92022 4.5 5.17457 4.39465 5.36211 4.20711C5.54964 4.01957 5.655 3.76522 5.655 3.5H1V1.5H4.245L5.55 3.295C5.59655 3.3587 5.65751 3.41048 5.7279 3.44611C5.79829 3.48174 5.87611 3.50021 5.955 3.5H13V12.5Z"
                                        fill="#7096FF"/>
                                 </svg>
                              </span>
                                <span className="text">Заполнить из справочника</span>
                            </button>*/}
                   </div>

                   <div className="table-block-wrap">
                      <table className="table-block">
                         <tr>
                            {tableHeadTwo.map((th) => {
                               return (
                                   <th>{th.name}</th>
                               );
                            })}
                         </tr>
                         {tableItemTwo.map((item, index) => {
                            return (
                                <tr key={index}>
                                   <td>
                                      {index+1}
                                   </td>
                                   <td>
                                      <p className="table-block-label">{tableHeadTwo[1].name}:</p>
                                      <div className="table-block-body">
                                         <div className="select two">
                                            <Select
                                                name={'id_product' + ++index}
                                                width='200px'
                                                styles={customStyles}
                                                options={item.products}
                                                defaultValue={item.products[0]}
                                                noOptionsMessage={() => "Ничего не найдено :("}
                                                components={{Menu: CustomTableTwo}}
                                                theme={(theme) => ({
                                                   ...theme,
                                                   borderRadius: 12,
                                                   colors: {
                                                      ...theme.colors,
                                                      primary25: '#4369cf',
                                                      primary: '#7196ff',
                                                   },
                                                })}
                                            >
                                            </Select>
                                         </div>
                                      </div>
                                   </td>
                                   <td>
                                      <p className="table-block-label">{tableHeadTwo[2].name}:</p>
                                      <div className="table-block-body"><input className="table-input"
                                                                               onKeyPress={(event) => {
                                                                                  if (!/[0-9]/.test(event.key)) {
                                                                                     event.preventDefault();
                                                                                  }
                                                                               }} type="text"
                                                                               defaultValue={item.qnt}/></div>
                                   </td>
                                   <td>
                                      <p className="table-block-label">{tableHeadTwo[3].name}:</p>
                                      <div className="table-block-body">
                                         <div dangerouslySetInnerHTML={{__html: item.unit}}></div>
                                      </div>
                                   </td>

                                   <td>
                                      <p className="table-block-label">{tableHeadTwo[4].name}:</p>
                                      <div className="table-block-body"><input className="table-input"
                                                                               onKeyPress={(event) => {
                                                                                  if (!/[0-9]/.test(event.key)) {
                                                                                     event.preventDefault();
                                                                                  }
                                                                               }} type="text"
                                                                               defaultValue={item.price}/>
                                      </div>
                                   </td>
                                   <td>
                                      <p className="table-block-label">{tableHeadTwo[5].name}:</p>
                                      <div className="table-block-body">{item.sum}</div>
                                   </td>
                                   <td className="table-delete-wrap">
                                      <button className="table-delete" onClick={() => removeTableItemTwo((index))}></button>
                                   </td>
                                </tr>
                            );
                         })}
                      </table>
                   </div>
                </div>
                <div
                    className={+visibleTab === 3 ? "tab-content tab-content-3" : "tab-content tab-content-3 hidden"}>
                   <form action="#" className="form__details">
                      <div className="form__output">
                         <h3>Задолженность</h3>
                         <h2>5000 uah</h2>
                      </div>
                      {/*  Организация */}
                      <div className={"form__input " + (name.org ? 'active-cheked' : 'active-disable')}>
                         {/* <!-- active-cheked - нужно добавлять этот класс к form__input - если зеленым -->
                        <!-- active-disable - нужно добавлять этот класс к form__input - если красным --> */}

                         <div className="select">
                            <Select
                                name="id_org"
                                styles={customStyles}
                                options={optionsOrg}
                                defaultValue={optionsOrg[0]}
                                components={{Menu: CustomOrg}}
                                onChange={handleChangeValue.bind(this, 'org')}
                                theme={(theme) => ({
                                   ...theme,
                                   borderRadius: 12,
                                   colors: {
                                      ...theme.colors,
                                      primary25: '#4369cf',
                                      primary: '#7196ff',
                                   },
                                })}
                            >
                            </Select>
                         </div>
                      </div>
                      {/*  Цена */}
                      <div
                          className={"form__input " + (name.typePrice && name.currency ? 'active-cheked' : 'active-disable')}>
                         <div className="select">
                            <Select
                                name="id_type_price"
                                styles={customStyles}
                                options={optionsTypePrice}
                                defaultValue={optionsTypePrice[0]}
                                onChange={handleChangeValue.bind(this, 'typePrice')}
                                theme={(theme) => ({
                                   ...theme,
                                   borderRadius: 12,
                                   colors: {
                                      ...theme.colors,
                                      primary25: '#4369cf',
                                      primary: '#7196ff',
                                   },
                                })}
                            >
                            </Select>
                         </div>
                         &nbsp;
                         <div className="select select_short">
                            <Select
                                name="id_currency"
                                styles={customStyles}
                                options={optionsCurrency}
                                defaultValue={optionsCurrency[0]}
                                onChange={handleChangeValue.bind(this, 'currency')}
                                theme={(theme) => ({
                                   ...theme,
                                   borderRadius: 12,
                                   colors: {
                                      ...theme.colors,
                                      primary25: '#4369cf',
                                      primary: '#7196ff',
                                   },
                                })}
                            >
                            </Select>
                         </div>
                      </div>
                      {/*  Дата */}
                      <div className={"form__input " + (item.date ? 'active-cheked' : 'active-disable')}>
                         <div className="data">
                            <FormControl fullWidth className="date-picker">
                               <LocalizationProvider dateAdapter={DateAdapter}>
                                  <DatePicker
                                      label="Дата"
                                      value={item.date}

                                      onChange={(newValue) => {
                                         handleDate(newValue);
                                      }}
                                      renderInput={(params) => <TextField {...params} />}
                                  />
                               </LocalizationProvider>
                            </FormControl>
                         </div>
                      </div>
                      {/*  Курьер */}
                      {/*<div className={"form__input " + (name.courier ? 'active-cheked' : 'active-disable')}>
                         <div className="select">
                            <Select
                                name="courier"
                                styles={customStyles}
                                options={optionsСourier}
                                defaultValue={optionsСourier[0]}
                                onChange={handleChangeValue.bind(this, 'courier')}
                                theme={(theme) => ({
                                   ...theme,
                                   borderRadius: 12,
                                   colors: {
                                      ...theme.colors,
                                      primary25: '#4369cf',
                                      primary: '#7196ff',
                                   },
                                })}
                            >
                            </Select>
                         </div>
                      </div>*/}
                   </form>
                </div>
             </div>
          </div>
       </>
   )
}

export default Tab
