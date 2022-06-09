import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/Modal.module.css';
import API from '@/api/api';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function CurrencyExchangeModal({ open, setOpen, id, setId }) {
    const [items, setItems] = React.useState({});
    const [counterparty, setCounterparty] = React.useState([]);

    const [typeId, setTypeId] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
        setCounterparty([]);
        setItems({});
        setTypeId(0);
    };

    const types = {
        "Принять от клиента": { type: "receive_customer", endpoint: "client" },
        "Принять от поставщика": { type: "receive_supplier", endpoint: "supplier" },
        "Принять прочее поступление": { type: "receive_income", endpoint: "incomeItem" },
        "Принять взнос от собственника": { type: "receive_owner", endpoint: "user" },

        "Оплатить поставщику": { type: "pay_supplier", endpoint: "supplier" },
        "Оплатить клиенту(возврат)": { type: "pay_customer", endpoint: "client" },
        "Оплатить прочий расход": { type: "pay_expend", endpoint: "expenditure" },
        "Оплатить зарплату": { type: "pay_salary", endpoint: "employees" },
        "Оплатить собственнику": { type: "pay_owner", endpoint: "user" },
    }

    const keys = Object.keys(types);

    const handleChangeItems = e => {
        const { name, value } = e.target;

        setItems(elem => ({ ...elem, [name]: value }));
    };

    const api = new API();

    const handleChangePayType = (e) => {
        const { value } = e.target;

        handleChangeItems(e);
        api.all(types[value].endpoint)
            .then(res => {
                if (res.status === "error") return alert(res.message);
                setCounterparty(res.message.items);
            });
    }

    const handleEdit = () => {
        const object = { type: types[items.pay_type].type, type_id: typeId }

        api.edit(id, object, "pay")
            .then(res => {
                if (res.status === "error") return alert(res.message);
                handleClose();
            });
    }

    const handleDelete = () => {
        api.remove(id, "pay")
            .then(res => {
                if (res.status === "error") return alert(res.message);
                handleClose();
            })
    }

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
                    <div className={styles.modal_title}>Настройка транзакций</div>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Тип оплаты</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Тип оплаты"
                            sx={{ marginBottom: '15px' }}
                            name="pay_type"
                            value={items.pay_type || ''}
                            onChange={handleChangePayType}
                        >
                            {keys.map((item) => (<MenuItem value={item}>{item}</MenuItem>))}
                        </Select>
                    </FormControl>

                    {items.pay_type && <div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Контрагент</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Контрагент"
                                sx={{ marginBottom: '15px' }}
                                name="counterparty"
                                value={items.counterparty || ''}
                                onChange={handleChangeItems}
                            >
                                {counterparty.map((item) => (
                                    <MenuItem value={item.name} onClick={() => setTypeId(item.id)}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>}

                    <Button variant="contained" onClick={handleEdit} className={styles.modal_bankbtn}>Ок</Button>
                    <Button variant="contained" onClick={handleDelete} color="error" className={styles.modal_bankbtn}>Удалить</Button>
                </Box>
            </Modal>
        </div>
    );
}