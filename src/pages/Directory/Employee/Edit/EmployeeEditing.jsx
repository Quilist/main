import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import EmployeeRights from './EmployeeRights';
import InformationEmployee from './InformationEmployee';
import {useDocumentTitle} from "@/hooks/useDocumentTitle";
import API from '@/api/api'

import styles from '@/styles/modules/employeeEditing.module.css';

const EmployeesEditing = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = React.useState(null)
  const [isRedirect, setIsRedirect] = React.useState(false)
  // =====================================
  const api = new API();
  const { id } = useParams()

  useDocumentTitle("Изменить сотрудника");

  // ========================================
  const [employee, setEmployee] = React.useState({});

  const [f_name, setF_Name] = React.useState();
  const [s_name, setS_Name] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');
  const defaultOrderSupplier = [
    ['добавить заказ поставщику', 0],
    ['изменить заказ поставщику', 0],
    ['удалить заказ поставщику', 0],
    ['добавить закупку', 0],
    ['изменить закупку', 0],
    ['удалить закупку', 0],
    ['добавить возврат поставщику', 0],
    ['изменить возврат поставщику', 0],
    ['удалить возврат поставщику', 0],
    ['добавить продажу', 0],
    ['изенить продажу', 0],
    ['удалить продажу', 0],
    ['добавить возврат клиента', 0],
    ['изенить возврат клиента', 0],
    ['удалить возврат клиента', 0],
    ['добавить заказ', 0],
    ['изменить заказ', 0],
    ['удалить заказ', 0],
    ['добавить статьи расходов', 0],
    ['изменить статьи расходов', 0],
    ['удалить статьи расходов', 0],
    ['добавить оплату поставщику', 0],
    ['изменить оплату поставщику', 0],
    ['удалить оплату поставщику', 0],
    ['добавить оплату на расходы', 0],
    ['изменить оплату на расходы', 0],
    ['удалить оплату на расходы', 0]
  ];
  const [add_order_supplier, setAdd_order_supplier] = React.useState(id === 0 || !id ? defaultOrderSupplier : null);

  React.useEffect(() => {
    if (id) {
      //=====================================================
      api.find(id, 'employee').then(data => {
        const { f_name, s_name, mobile, mail, password, id_role, order_supplier } = data.message;
        setF_Name(f_name)
        setS_Name(s_name)
        setPhone(mobile)
        setMail(mail)
        setPassword(password)
        setRole(id_role)
        setAdd_order_supplier(order_supplier ? order_supplier : defaultOrderSupplier);
      })
      //=======================================================
    }
    // eslint-disable-next-line
  }, [employee])
  // =========================================
  React.useEffect(() => {
    if (isRedirect) {
      navigate('/employees')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  // ======================================================================
  const handleAdd = () => {
    id !== 0 ? setIsSuccess('добавили пользователя') : setIsSuccess('')

    setTimeout(() => {
      const body = Object.assign({}, employee);
      body.f_name = f_name;
      body.s_name = s_name;
      body.e_mail = mail;
      body.mobile = phone;
      body.pass = password;
      body.id_role = role;
      body.add_order_supplier = add_order_supplier;

      // =======================================
      api.add(body, 'employee').then(data => {
        if (data.status === "error") return console.log(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
      // ========================================
    }, 1000)
  }

  const handleRemove = () => {
    id !== 0 ? setIsSuccess('удалили пользователя') : setIsSuccess('')
    setTimeout(() => {
      // =================================
      api.remove(id, 'employee').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })

    }, 1000)
  }

  const handleChoose = () => {
    id !== 0 ? setIsSuccess('изменили пользователя') : setIsSuccess('')
    setTimeout(() => {
      const body = Object.assign({}, employee);
      body.f_name = f_name;
      body.s_name = s_name;
      body.mail = mail;
      body.mobile = phone;
      body.password = password;
      body.id_role = role;
      body.add_order_supplier = add_order_supplier;

      // ====================================
      api.edit(id, body, 'employee').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
      // ======================================
    }, 1000)
  }
  // ======================================================================

  const handleReturn = () => {
    setIsRedirect(true)
  }

  return (
    <section className="home-section">
      <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            <Button onClick={!id ? handleAdd : handleChoose} className={styles.button} variant="contained">Сохранить</Button>
          </div>
        </div>
        {isSuccess &&
          <div className={styles.success}>
            Вы успешно {isSuccess}!
          </div>
        }

        <div className={styles.boxesWrapper}>
          <div className={styles.boxesWrapper__user}>
            <InformationEmployee
              f_name={f_name}
              setF_name={setF_Name}
              s_name={s_name}
              setS_Name={setS_Name}
              phone={phone}
              setPhone={setPhone}
              mail={mail}
              setMail={setMail}
              password={password}
              setPassword={setPassword}
              role={role}
              setRole={setRole}
            />
          </div>
          <div className={styles.boxesWrapper__information}>
            {add_order_supplier &&
              <EmployeeRights
                add_order_supplier={add_order_supplier}
                setAdd_order_supplier={setAdd_order_supplier}
              />
            }
          </div>
        </div>
        <div className={styles.buttonsWrapper} style={{ marginTop: '20px' }}>
          <div className={styles.main_btns}>
            {id && <Button onClick={handleRemove} className={styles.button} variant="contained">Удалить</Button>}
          </div>
          <div>
            <Button onClick={handleReturn} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Отмена</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmployeesEditing;  
