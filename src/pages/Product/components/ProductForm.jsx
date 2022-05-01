import React from 'react';

import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select';
import SelectComponent from "@/components/Select/SelectComponent";
import MenuItem from '@mui/material/MenuItem';

import Button from "@mui/material/Button";
import ProductColorSizeModal from './ProductColorSizeModal';

import styles from '@/styles/modules/ProductForm.module.css'

import ProductColorSizeTable from "./ProductColorSizeTable";
import ProductSetModal from "./ProductSetModal";
import ProductSetTable from "./ProductSetTable";

function ProductForm({ item, setItem, auxiliaryList, typePriceList, setTypePriceList, storehouseList, setStorehouseList, id }) {

  // Modal
  const [openColorSizeModal, setColorSizeModal] = React.useState(false);
  const [openSetModal, setSetModal] = React.useState(false);
  const [subItem, setSubItem] = React.useState({});

  const handleColorSizeModal = () => {
    setSubItem({})
    setColorSizeModal(true);
  };

  const handleSetModal = () => {
    setSubItem({})
    setSetModal(true);
  };

  React.useEffect(() => {
    if(!id){
      setTypePriceList(auxiliaryList.type_prices);
      setStorehouseList(auxiliaryList.storehouses);
    }
    // eslint-disable-next-line
  }, [auxiliaryList] )

  const currentPathName = new URL(window.location.href).pathname.split('/')[1];

  const addPrice = (e) => {
    setTypePriceList([...typePriceList, { name: null, currency_id: null, price: null}]);
  }

  const removePrice = (index) => {
    setTypePriceList(typePriceList.filter((o, i) => index !== i));
  };

  const removeStorehouse = (index) => {
    setStorehouseList(storehouseList.filter((o, i) => index !== i));
  };

  const findArrayDiff = (arr1, arr2, field) => {
    const filteredArray = arr1.filter(e=>arr2.findIndex(i=>i[field] == e[field]) === -1);

    return filteredArray;
  };

  const checkIfCanAddPrice = () => {
    let state = true;

    const filteredArray = findArrayDiff(auxiliaryList.type_prices, typePriceList, 'name');
    if(filteredArray.length === 0) {
      state = false
    }
    return state;
  };

  const filteredTypePriceList = () => {
    const filteredArray = findArrayDiff(auxiliaryList.type_prices, typePriceList, 'name')

    return filteredArray;
  };

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
    if(name === 'type') {
      setItem(prevItem => ({
        ...prevItem,
        childs: []
      }));
    }

    setItem(prevItem => ({
      ...prevItem,
      [name]: v
    }));
  };


  //единицы измерения
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: '',
      id: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    id: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      id: parseInt(dialogValue.id, 10),
    });

    handleClose();
  };

  const updateTypePrice = (e, index) => {
    const { name, value } = e.target;
    let v = formatField(value);

    //to immediately change data
    setTypePriceList(prevState => {
      const updatedPriceList = prevState.map((price, i) => {
        if (i === index){
          price[name] = v
        }
        return {
          ...price
        };
      });

      return updatedPriceList
    })

    if(name === 'name') {
      checkIfCanAddPrice();
      filteredTypePriceList();
    }
  };

  const updateStorehouse = (e, index) => {
    const { name, value } = e.target;
    let v = formatField(value);
    storehouseList[index][name] = v
  };

  return (
    <>
      <div className={styles.boxesWrapper__user}>
        {openColorSizeModal && <ProductColorSizeModal
          open={openColorSizeModal}
          setOpen={setColorSizeModal}
          auxiliaryList={auxiliaryList}
          typePriceListExt={typePriceList}
          setTypePriceList={setTypePriceList}
          storehouseListExt={storehouseList}
          setStorehouseList={setStorehouseList}
          item={item}
          setItem={setItem}
          subItem={subItem}
          setSubItem={setSubItem}
        />}

        {openSetModal && <ProductSetModal
          open={openSetModal}
          setOpen={setSetModal}
          auxiliaryList={auxiliaryList}
          item={item}
          setItem={setItem}
          id={id}
        />}

        {currentPathName !== 'receive_balance' && <div>
          <FormControl fullWidth>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Наименовение:"
              type="text"
              variant="standard"
              value={item.name}
              name="name"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Вид</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.type}
              label="Вид"
              sx={{ marginBottom: '15px' }}
              name="type"
              onChange={handleChange}
            >
              {auxiliaryList.types.map((type, typeIndex) => {
                return (<MenuItem key={type.value} value={type.value}>{type.name}</MenuItem>)
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <SelectComponent
              list={auxiliaryList.measures}
              value={item.measure_id}
              label="Единица измерения"
              field="measure_id"
              setItem={setItem}
              apiEntity="measure"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Артикул:"
              type="text"
              variant="standard"
              value={item.vendor_code}
              name="vendor_code"
              onChange={handleChange}
            />
            <TextField
              sx={{marginBottom: '15px'}}
              label="Штрихкод:"
              type="text"
              variant="standard"
              value={item.barcode}
              name="barcode"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <SelectComponent
              list={auxiliaryList.groups}
              value={item.group_id}
              label="Группа"
              field="group_id"
              setItem={setItem}
              apiEntity="productGroup"
            />
          </FormControl>

            {item.type !== 'set' &&
              <FormControl fullWidth style={{ marginTop: '15px' }}>
              <InputLabel id="demo-simple-select-label">Основной поставщик</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={item.supplier_id || null}
                label="Основной поставщик"
                sx={{ marginBottom: '15px' }}
                name="supplier_id"
                onChange={handleChange}
              >
                {auxiliaryList.suppliers.map((type, typeIndex) => {
                  return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                })}
              </Select>
              </FormControl>
            }
          <FormControl fullWidth>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Мин запас:"
              type="text"
              variant="standard"
              value={item.min_stock}
              name="min_stock"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Заметки:"
              type="text"
              variant="standard"
              value={item.note}
              name="note"
              onChange={handleChange}
            />
          </FormControl>

          {item.type === 'product' &&
            <div>
            <h3>Цвета и размеры</h3>
            <Button onClick={handleColorSizeModal} className={styles.button}  variant="outlined">+ Добавить</Button>
          </div>
          }

          {item.type === 'set' &&
            <div>
              <h3>Состав комплекта</h3>
              <Button onClick={handleSetModal} className={styles.button}  variant="outlined">+ Добавить</Button>
            </div>
          }

          {item.type === 'product' &&
            <ProductColorSizeTable
              item={item}
              setItem={setItem}
              subItem={subItem}
              setSubItem={setSubItem}
              openColorSizeModal={openColorSizeModal}
              setColorSizeModal={setColorSizeModal}
            />
          }

          {item.type === 'set' &&
            <ProductSetTable
              item={item}
              setItem={setItem}
              subItem={subItem}
              setSubItem={setSubItem}
              openColorSizeModal={openColorSizeModal}
              setColorSizeModal={setColorSizeModal}
            />
          }
        </div>}

      </div>

      <div className={styles.boxesWrapper__information} >

        {(( (item.type === 'product' && item.childs?.length === 0) ) ||
          ( ['set', 'service'].includes(item.type) ))
          &&
          <div>
            <h4>Цены</h4>
            {typePriceList.map((priceItem, i) => {
              return (<div key={i}>
                {!priceItem.name &&
                  <Select
                    autoWidth
                    label="Наименование:"
                    value={priceItem.name}
                    name="name"
                    onChange={(e) => updateTypePrice(e, i)}
                  >
                    {filteredTypePriceList().map((type, typeIndex) => {
                      return (<MenuItem key={type.name} value={type.name}>{type.name}</MenuItem>)
                    })}
                  </Select>
                }
                {priceItem.name &&
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Наименование:"
                    type="text"
                    variant="standard"
                    value={priceItem.name}
                    name="name"
                  />
                }
                <TextField
                  sx={{marginBottom: '15px', marginLeft: '5px'}}
                  label="Цена"
                  type="number"
                  variant="standard"
                  value={priceItem.price}
                  name="price"
                  onChange={(e) => updateTypePrice(e, i)}
                />
                <FormControl sx={{m: 1, minWidth: 120}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                  <Select
                    autoWidth
                    label="Тип цены:"
                    value={priceItem.currency_id}
                    name="currency_id"
                    onChange={(e) => updateTypePrice(e, i)}
                  >
                    {auxiliaryList.currencies.map((type, typeIndex) => {
                      return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>

                <button  style={{marginTop: '15px'}} className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removePrice(i)}>X</button>
              </div>)
            })}
            {checkIfCanAddPrice() && <Button onClick={addPrice}  className={styles.button}  variant="outlined">+ Добавить цену</Button> }

            {item.type === 'product' &&
              <>
                {!id &&
                  <div>
                    <h4 style={{marginTop: '15px'}}>Остатки</h4>
                    {storehouseList.map((storehouse, i) => {
                      return (<div key={i}>
                        <TextField
                          sx={{marginBottom: '15px'}}
                          label={storehouse.storehouse ? storehouse.storehouse.name : storehouse.name}
                          type="text"
                          variant="standard"
                          value={storehouse.number}
                          name="number"
                          onChange={(e) => updateStorehouse(e, i)}
                        />
                        <span style={{marginBottom: '15px', marginLeft: '5px', marginTop: '5px'}}>шт на</span>
                        <TextField
                          sx={{marginBottom: '15px', marginLeft: '5px'}}
                          label="Цена"
                          type="number"
                          variant="standard"
                          value={storehouse.price}
                          name="price"
                          onChange={(e) => updateStorehouse(e, i)}
                        />
                        <FormControl sx={{m: 1, minWidth: 120}}>
                          <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                          <Select
                            autoWidth
                            label="Тип цены:"
                            value={storehouse.currency_id}
                            name="currency_id"
                            onChange={(e) => updateStorehouse(e, i)}
                          >
                            {auxiliaryList.currencies.map((type, typeIndex) => {
                              return (<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                            })}
                          </Select>
                        </FormControl>

                        <button  style={{marginTop: '15px'}} className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removeStorehouse(i)}>X</button>
                      </div>)
                    })}
                  </div>
                }
                {id &&
                  <div>
                    <h4 style={{marginTop: '15px'}}>Остатки</h4>
                    {storehouseList.map((storehouse, i) => {
                      return (<div key={i}>
                        <span style={{
                          marginTop: "10px",
                          display: "block",
                          overflow: "hidden",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          padding: "12px 0px 12px 0px",
                          borderRadius: "10px"
                        }}>
                          <span style={{
                            fontSize: "1rem",
                            lineHeight: "1.5",
                            letterSpacing: "0px",
                            fontWeight: "400",
                            display: "block",
                            marginLeft: "12px"
                          }}>
                            <b> {storehouse.storehouse ? storehouse.storehouse.name : storehouse.name} </b> {storehouse.number}
                            <b> шт </b> на {storehouse.price} <b>{storehouse.currency.name}</b>
                          </span>
                        </span>

                      </div>)
                    })}
                  </div>
                }
              </>
            }

          </div>
        }

      </div>
    </>
  )
}
export default ProductForm;