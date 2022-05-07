import React, {useState} from 'react';
import SelectComponent from "@/components/Select/SelectComponent";
import './Tabs.css'
import DirectoryModal from "@/components/modal/DirectoryModal.jsx";


function Tab({data, item, setItem, auxiliaryList}) {
   const [visibleTab, setVisibleTab] = React.useState(data[0].id)
   const [openDirectoryModal, setOpenDirectoryModal] = useState(false);

   React.useEffect(() => {
      setItem(prevItem => ({
         ...prevItem,
         products: [
            {
               product_id: null,
               qnt: null,
               unit: null,
               price: null,
               sum: null,
            }
         ]
      }));
      // eslint-disable-next-line
   }, [])

   const listTitles = data.map((item) =>
       <li onClick={() => setVisibleTab(item.id)}
           className={visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"}>{item.tabTitle}</li>
   )

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
         name: "Скидка"
      },
      {
         name: "Сумма"
      }
   ];

   const removeTableItem = (index) => {
      const f = item.products.filter((o, i) => index !== i)
      setItem(prevItem => ({
         ...prevItem,
         products: f
      }));

      countItemSum(f);
   };

   const addItem = (e) => {
      // setItem([...item.products, {
      //    product_id: null,
      //    qnt: null,
      //    unit: null,
      //    price: null,
      //    sum: null,
      // }]);
      setItem(prevItem => ({
         ...prevItem,
         products: [...item.products, {
            product_id: null,
            qnt: null,
            unit: null,
            price: null,
            sum: null,
         }]
      }));
   }

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

   const updateProduct = (e, index) => {
      const updatedItemProduct = item.products.map((p, i) => {
         if (i === index){
            let leftover = null, price = null;
            const storehouseIndex = e.leftovers?.findIndex((leftover) => leftover.storehouse_id === item.storehouse_id)
            if (storehouseIndex !== -1) {
               leftover = e.leftovers[storehouseIndex]
            }
            const priceIndex = e.prices?.findIndex((pr) => pr.type_price_id === item.type_price_id)
            if (priceIndex !== -1) {
               price = e.prices[priceIndex]
            }
            p = {}

            p.qnt = 0
            p.product_id = e.id
            p.product = e
            p.measure_id = e.measure_id
            p.type = e.type
            if(e.measure_id) {
               p.measure_id = e.measure_id
               p.measure = e.measure
            }
            if(leftover) {
               p.leftover = leftover
            } else {
               delete p.leftover
            }
            if(price) {
               p.price = Number(price.price)
            } else {
               p.price = 0
            }
         }
         return {
            ...p
         };
      });

      setItem(prevItem => ({
         ...prevItem,
         products: updatedItemProduct,
      }));
   };

   const countSum = (qnt, price, discount) => {
      let sum = 0;
      sum = qnt * price;
      if(discount) {
         sum = (sum - (sum * (discount/100))).toFixed(2)
      }
      return sum;
   }

   const countItemSum = (f) => {
      let sum = 0;
      const p = f || item.products;
      p.map((p, i) => {
         sum = sum + parseFloat(p.sum)
      });
      setItem(prevItem => ({
         ...prevItem,
         sum: sum
      }));
   }

   const updateItemProduct = (e, index) => {
      const { name, value } = e.target;
      let v = formatField(value);

      console.log('value', v)

      const updatedItemProduct = item.products.map((p, i) => {
         if (i === index){
            p[name] = v
            p.sum = countSum(p.qnt, p.price, p.discount);
         }
         return {
            ...p
         };
      });

      setItem(prevItem => ({
         ...prevItem,
         products: updatedItemProduct
      }));

      countItemSum();

      console.log('item', item)
   };



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

   const findArrayDiff = (arr1, arr2, field1, field2) => {
      const filteredArray = arr1.filter(e=>arr2.findIndex(i=>i[field1] == e[field2]) === -1);

      return filteredArray;
   };

   const filteredProductList = () => {
      let filteredArray = [];
      if(auxiliaryList?.products && item?.products) {
         filteredArray = findArrayDiff(auxiliaryList.products, item.products, 'product_id', 'id')
      } else {
         filteredArray = auxiliaryList.products
      }

      return filteredArray;
   };

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
                               {item.products?.map((itemProduct, index) => {
                                  return (
                                      <tr key={index}>
                                         <td>
                                            {index+1}
                                         </td>
                                         <td>
                                            <p className="table-block-label">{tableHead[1].name}:</p>
                                            <div className="table-block-body">
                                               <div className="select two">
                                                  <SelectComponent
                                                    list={filteredProductList()}
                                                    value={itemProduct.product_id}
                                                    label={itemProduct.product?.name || "Товар/Услуга"}
                                                    field="product_id"
                                                    setItem={setItem}
                                                    isOnChange={true}
                                                    onChange={(e) => updateProduct(e, index)}
                                                  />
                                                  {/*<Select*/}
                                                  {/*    name={'id_product' + ++index}*/}
                                                  {/*    width='200px'*/}
                                                  {/*    styles={customStyles}*/}
                                                  {/*    options={item.products}*/}
                                                  {/*    defaultValue={item.products[0]}*/}
                                                  {/*    noOptionsMessage={() => "Ничего не найдено :("}*/}
                                                  {/*    components={{Menu: CustomTable}}*/}
                                                  {/*    theme={(theme) => ({*/}
                                                  {/*       ...theme,*/}
                                                  {/*       borderRadius: 12,*/}
                                                  {/*       colors: {*/}
                                                  {/*          ...theme.colors,*/}
                                                  {/*          primary25: '#4369cf',*/}
                                                  {/*          primary: '#7196ff',*/}
                                                  {/*       },*/}
                                                  {/*    })}*/}
                                                  {/*>*/}
                                                  {/*</Select>*/}
                                               </div>
                                            </div>
                                         </td>
                                         <td>
                                            <p className="table-block-label">{tableHead[2].name}:</p>
                                            <div className="table-block-body">
                                               <input className="table-input"
                                                      type="text"
                                                      value={itemProduct.qnt}
                                                      name="qnt"
                                                      onChange={(e) => updateItemProduct(e, index)}
                                               />
                                               {itemProduct.leftover &&
                                                 <div>
                                                    <hr/>
                                                    <p>Остаток: Всего: {itemProduct.leftover.number}, Свободно: {itemProduct.leftover.number}</p>
                                               </div>
                                               }
                                            </div>
                                         </td>
                                         <td>
                                            <p className="table-block-label">{tableHead[3].name}:</p>
                                            <div className="table-block-body">
                                               {itemProduct.measure ? itemProduct.measure.name : itemProduct.measure_id}
                                               {/*<div dangerouslySetInnerHTML={{__html: itemProduct.unit}}></div>*/}
                                            </div>
                                         </td>

                                         <td>
                                            <p className="table-block-label">{tableHead[4].name}:</p>
                                            <div className="table-block-body">
                                               <input className="table-input"
                                                      // onKeyPress={(event) => {
                                                      //    if (!/[0-9]/.test(event.key)) {
                                                      //       event.preventDefault();
                                                      //    }
                                                      // }}
                                                      type="text"
                                                      value={itemProduct.price}
                                                      name="price"
                                                      onChange={(e) => updateItemProduct(e, index)}
                                               />
                                            </div>
                                         </td>

                                         <td>
                                            <p className="table-block-label">{tableHead[5].name}:</p>
                                            <div className="table-block-body">
                                               <input className="table-input"
                                                      type="text"
                                                      value={itemProduct.discount}
                                                      name="discount"
                                                      onChange={(e) => updateItemProduct(e, index)}
                                               />
                                            </div>
                                         </td>

                                         <td>
                                            <p className="table-block-label">{tableHead[6].name}:</p>
                                            <div className="table-block-body">{itemProduct.sum}</div>

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

                <div
                    className={+visibleTab === 2 ? "tab-content tab-content-3" : "tab-content tab-content-3 hidden"}>

                </div>
             </div>
          </div>
       </>
   )
}

export default Tab
