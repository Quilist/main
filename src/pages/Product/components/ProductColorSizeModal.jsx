import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/Measure.module.css';
import stylesForm from '@/styles/modules/ProductForm.module.css'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import SelectComponent from "@/components/Select/SelectComponent";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: 'absolute',
  top: '50% !important',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90% !important',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: 'auto',
  height: '90%'
};

export default function ProductColorSizeModal({ open, setOpen, subItem, setSubItem, item, setItem, auxiliaryList, typePriceList, setTypePriceList, storehouseList, setStorehouseList }) {
  const handleClose = () => setOpen(false);
  const [itemEditIndex, setItemEditIndex] = React.useState(null);

  React.useEffect(() => {
    if(subItem.name){
      const childIndex = item.childs.findIndex((childItem) => childItem.name === subItem.name)
      if (childIndex !== -1) {
        setItemEditIndex(childIndex)
      }
    }
    // eslint-disable-next-line
  }, [subItem] )


  const addPrice = (e) => {
    setTypePriceList([...typePriceList, { name: null, currency_id: null, price: null}]);
  }


  const removePrice = (index) => {
    setTypePriceList(typePriceList.filter((o, i) => index !== i));
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
    setSubItem(prevItem => ({
      ...prevItem,
      [name]: v
    }));
  };

  const updateTypePrice = (e, index) => {
    const { name, value } = e.target;
    let v = formatField(value);
    typePriceList[index][name] = v
  };

  const updateStorehouse = (e, index) => {
    const { name, value } = e.target;
    let v = formatField(value);
    storehouseList[index][name] = v
  };

  //colors
  const [openColor, toggleOpenColor] = React.useState(false);
  const [dialogValueColor, setDialogValueColor] = React.useState({
    name: ''
  });

  const handleCloseColor = () => {
    setDialogValueColor({
      name: ''
    });

    toggleOpenColor(false);
  };


  const handleSubmitColor = (event) => {
    event.preventDefault();
    setSubItem(prevItem => ({
      ...prevItem,
      color_id: dialogValueColor.name
    }));

    handleCloseColor();
  };

  //sizes
  const [openSize, toggleOpenSize] = React.useState(false);
  const [dialogValueSize, setDialogValueSize] = React.useState({
    name: ''
  });

  const handleCloseSize = () => {
    setDialogValueSize({
      name: ''
    });

    toggleOpenSize(false);
  };


  const handleSubmitSize = (event) => {
    event.preventDefault();
    setSubItem(prevItem => ({
      ...prevItem,
      size_id: dialogValueSize.name
    }));

    handleCloseSize();
  };

  //add
  const handleAdd = () => {
    console.log('itemEditIndex', itemEditIndex)
    let priceData = [], storehouseData = [], data = subItem;
    if(typePriceList.length > 0) {
      typePriceList.forEach(function (typePrice) {
        if(typePrice.name && typePrice.currency_id && typePrice.price) {
          priceData.push({ name: typePrice.name, currency_id: Number(typePrice.currency_id), price: Number(typePrice.price) });
        }
      });
      data.prices = priceData
    }

    if(storehouseList.length > 0) {
      storehouseList.forEach(function (storehouse) {
        if(storehouse.id && storehouse.currency_id && storehouse.number && storehouse.price) {
          storehouseData.push({ storehouse_id: Number(storehouse.id), number: Number(storehouse.number), currency_id: Number(storehouse.currency_id), price: Number(storehouse.price) });
        }
      });
      data.leftovers = storehouseData
    }

    console.log('data', data)

    if (itemEditIndex !== null) {
      item.childs[itemEditIndex] = data
    } else {
      const array =  [...item.childs, data]
      setItem(prevItem => ({
        ...prevItem,
        childs: array
      }));
    }

    setSubItem({});
    setItemEditIndex(null)
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal} sx={style}>
          <img className={styles.modal_img} onClick={handleClose} src={crossImg} alt="cross" />
          <div className={styles.modal_title}>Добавление цвета и размера</div>

          <div className={stylesForm.boxesWrapper__user}>
            <div className={stylesForm.boxesWrapper__user}>

              <div>
                <FormControl fullWidth>
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Наименовение:"
                    type="text"
                    variant="standard"
                    value={subItem.name}
                    name="name"
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <SelectComponent
                    list={auxiliaryList.colors}
                    value={item.color_id}
                    label="Цвет"
                    field="color_id"
                    setItem={setSubItem}
                    apiEntity="productColor"
                  />
                </FormControl>

                <FormControl fullWidth style={{ marginTop: '15px' }}>
                  <SelectComponent
                    list={auxiliaryList.sizes}
                    value={item.size_id}
                    label="Размер"
                    field="size_id"
                    setItem={setSubItem}
                    apiEntity="productSize"
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Штрихкод:"
                    type="text"
                    variant="standard"
                    value={subItem.barcode}
                    name="barcode"
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    sx={{marginBottom: '15px'}}
                    label="Мин запас:"
                    type="text"
                    variant="standard"
                    value={subItem.min_stock}
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
                    value={subItem.note}
                    name="note"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>

            </div>
            <div className={stylesForm.boxesWrapper__information} >


              <div>
                <h4>Цены</h4>
                {typePriceList.map((priceItem, i) => {
                  return (<div key={i}>
                    <TextField
                      sx={{marginBottom: '15px'}}
                      label="Наименование:"
                      type="text"
                      variant="standard"
                      value={priceItem.name}
                      name="name"
                      onChange={(e) => updateTypePrice(e, i)}
                    />
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
                <Button onClick={addPrice}  className={styles.button}  variant="outlined">+ Добавить цену</Button>

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

                    <button  style={{marginTop: '15px'}} className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removePrice(i)}>X</button>
                  </div>)
                })}
              </div>


            </div>
          </div>

          <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
        </Box>
      </Modal>
    </div>
  );
}