import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function EmployeeCheckboxes ({parentLabel, category_numbers, add_order_supplier, setAdd_order_supplier}){
  const [isParentChecked, setIsParentChecked] = React.useState(false);
  const [currentCategories, setCurrentCategories] = React.useState(add_order_supplier.slice(category_numbers-3, category_numbers));
  // Варианты
  const [checkboxCondition, setCheckboxCondition] = React.useState(0);
  // 0 - не один чекбокс не отмечен
  // 1 - один или два чекбокса отмечены 
  // 2 - отмечены все чекбоксы
  // 
  React.useEffect(() => {
    const states = [];
    for(const elem of currentCategories){
      states.push(elem[1])
    }
    states.sort((a,b) => b - a);
    if(states.every(elem => elem === 0)){
      setCheckboxCondition(0);
      setIsParentChecked(false);
    }else if(states.every(elem => elem === 1)){
      setCheckboxCondition(2);
      setIsParentChecked(true); 
    }else{
      setCheckboxCondition(1);
    }

    const new_add_order_supplier = add_order_supplier;
    new_add_order_supplier.splice(category_numbers-3, 3, currentCategories[0], currentCategories[1], currentCategories[2]);
    setAdd_order_supplier(new_add_order_supplier);
    // eslint-disable-next-line
  }, [currentCategories])

  const handleParentChange = () => {
    setIsParentChecked(!isParentChecked);
    const newCategory = currentCategories.map((elem) => {
      return [elem[0], isParentChecked === true ? 0 : 1] 
    })
    setCurrentCategories(newCategory);
  }

  const handleChildChange = (id, currentCategory) => {
    const newCategory = currentCategories.map((elem, idx) => {
      if(idx === id){
        return [elem[0], currentCategory === 0 ? 1 : 0]  
      }
      return [elem[0], elem[1]] 
    }) 
    setCurrentCategories(newCategory);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', borderBottom: '1px solid gray'}}>
        <div style={{textAlign: 'start', marginLeft: '10px'}}>
          <FormControlLabel
            label={parentLabel}
            control={
              <Checkbox
                checked={isParentChecked}
                indeterminate={checkboxCondition === 1}
                onChange={handleParentChange}
              />
            }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20%'}}>
          <FormControlLabel
            style={{textAlign: 'start'}}
            label={currentCategories[0][0]}
            control={<Checkbox checked={currentCategories[0][1] === 1} onChange={() => handleChildChange(0, currentCategories[0][1])} />}
          />
          <FormControlLabel
            style={{textAlign: 'start'}}
            label={currentCategories[1][0]}
            control={<Checkbox checked={currentCategories[1][1] === 1} onChange={() => handleChildChange(1, currentCategories[1][1])} />}
          />
          <FormControlLabel
            style={{textAlign: 'start'}}
            label={currentCategories[2][0]}
            control={<Checkbox checked={currentCategories[2][1] === 1} onChange={() => handleChildChange(2, currentCategories[2][1])} />}
          />
        </div> 
    </div>
  )
}