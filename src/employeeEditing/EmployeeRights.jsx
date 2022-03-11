import React from 'react';
import EmployeeCheckboxes from './EmployeeCheckboxes';

import styles from './employeeEditing.module.css';

function EmployeeRights ({add_order_supplier, setAdd_order_supplier}) {  
  const order_supplier_parent = [
    ['заказ поствщику', 0],
    ['закупка', 0],
    ['возврат поствщику', 0],
    ['продажа', 0],
    ['возврат клиента', 0], 
    ['заказ', 0], 
    ['статьи расходов', 0],
    ['оплата поставщику', 0], 
    ['оплата на расходы', 0]
  ]

  return (
    <>
      <div style={{fontSize: '19px'}}>Настроить права доступа</div>
      <div className={styles.checkboxes} style={{display: 'flex', flexDirection: 'column'}}>
        {order_supplier_parent.map((elem, idx) => {
          const category_numbers = (idx+1) * 3;
          const parentLabel = elem[0];
          return (
            <EmployeeCheckboxes 
              key={idx}
              category_numbers={category_numbers}
              parentLabel={parentLabel}
              add_order_supplier={add_order_supplier}
              setAdd_order_supplier={setAdd_order_supplier}
              style={{width: '30px'}}
            /> 
          )
        })}
      </div>
    </>
  )
}
export default EmployeeRights;