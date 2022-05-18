import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import LegalEntitesForm from './LegalEntitesForm';
import InformationForm from './InformationForm';

import Button from '@mui/material/Button';

import styles from '@/styles/modules/UserEditing.module.css'
import API from '@/api/api'
import Select from "react-select";


function LegalEntitesEditing() {
  const [isSuccess, setIsSuccess] = React.useState(null)
  const { id } = useParams()

  const [isRedirect, setIsRedirect] = React.useState(false)

  // ========================================
  const [currentLegalEntite, setCurrentLegalEntite] = React.useState({ cash_accounts: [] })
  const [auxiliaryList, setAuxiliaryList] = React.useState({});
  const [cashAccountList, setCashAccountList] = React.useState([{ value: 0, label: 'Выберите счёт', isDisabled: true }]);
  const api = new API();

  React.useEffect(() => {
    document.title = "B-Fin: Изменить мое юрлицо"
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    api.auxiliary('legalEntity').then(data => {
      if (data.status === "error") alert(data.message)
      else setAuxiliaryList(data.message)

      if(data.message.cash_accounts) {
        const cArr = data.message.cash_accounts.map((item, index) => {
          return { value: item.id, label: item.name }
        });
        cArr.unshift({ value: 0, label: 'Выберите счёт', isDisabled: true });
        setCashAccountList(cArr)
      }

    })
    if (id) {
      api.find(id, 'legalEntity').then(data => {
        setCurrentLegalEntite(data.message)
      })
    }
    // eslint-disable-next-line
  }, [])
  // =========================================

  // Legal Entites data 
  const [name, setName] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [mobile, setPhone] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [address, setAddress] = React.useState('')
  const [site, setSite] = React.useState('');
  const [edrpou, setEdrpou] = React.useState('');

  // ============================================

  // Information data
  const [legal_name, setLegal_name] = React.useState('')
  const [inn, setInn] = React.useState('')
  const [low_system, setLow_system] = React.useState('')
  const [nds, setNds] = React.useState(false)
  const [director, setDirector] = React.useState('')
  // ============================================

  const navigate = useNavigate()
  React.useEffect(() => {
    if (isRedirect) {
      navigate('/legal_entities')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  React.useEffect(() => {
    if (id && currentLegalEntite) {
      // ==============================================================
      const { address, account, site, mail, mobile, name, edrpou, legal_name, inn, low_system, nds, director } = currentLegalEntite;
      setName(name)
      setPhone(mobile)
      setMail(mail)
      setAddress(address)
      setAccount(account)
      setSite(site)
      setEdrpou(edrpou)
      setLegal_name(legal_name)
      setInn(inn)
      setLow_system(low_system)
      setNds(nds)
      setDirector(director)

      // =============================================================== 

    }
    // eslint-disable-next-line
  }, [currentLegalEntite])

  // ======================================================================
  const handleAdd = () => {
    id !== 0 ? setIsSuccess('добавили пользователя') : setIsSuccess('')

    setTimeout(() => {
      let body = {
        name,
        mobile,
        mail,
        address,
        account,
        site,
        edrpou,
        legal_name,
        inn,
        low_system,
        nds,
        director
      }
      body.cash_accounts = currentLegalEntite.cash_accounts;

      api.add(body, 'legalEntity').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }

  const handleRemove = () => {
    id !== 0 ? setIsSuccess('удалили пользователя') : setIsSuccess('')
    setTimeout(() => {
      api.remove(id, 'legalEntity').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }

  const handleChoose = () => {
    id !== 0 ? setIsSuccess('изменили пользователя') : setIsSuccess('')

    setTimeout(() => {
      let body = {
        name,
        mobile,
        mail,
        address,
        account,
        site,
        edrpou,
        legal_name,
        inn,
        low_system,
        nds,
        director
      }

      api.edit(id, body, 'legalEntity').then(data => {
        if (data.status === "error") return alert(data.message)
        setIsSuccess(null)
        setIsRedirect(true)
      })
    }, 1000)
  }
  // ======================================================================

  const handleReturn = () => {
    setIsRedirect(true)
  }

  const handleSearch = () => {
    api.edrpouInfo(edrpou).then(data => {
      if (data.status === "error") return alert(data.message)

      setNds(data.message.code_nds)
      setDirector(data.message.director)
      setLegal_name(data.message.name)
    })
  }

  const addCashAccount = (e) => {
    setCurrentLegalEntite(prevItem => ({
      ...prevItem,
      cash_accounts: [...prevItem.cash_accounts, { cash_account_id: null}]
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

  const updateCashAccount = (event) => {
    let { name, value, index } = event;
    let v = formatField(value);

    setCurrentLegalEntite(prevItem => ({
      ...prevItem,
      cash_accounts: prevItem.cash_accounts.map((p, i) => {
        if (i === index){
          p[name] = v
        }
        return {
          ...p
        };
      })
    }));
  };

  const removeCashAccount = (index) => {
    setCurrentLegalEntite(prevItem => ({
      ...prevItem,
      cash_accounts: currentLegalEntite.cash_accounts.filter((o, i) => index !== i)
    }));
  };

  const selectedValue = (id) => {
    const index = cashAccountList.findIndex((t) => t.value === id)
    let res = null;
    if (index !== -1) {
      const obj = cashAccountList[index]
      res = { id: obj.id, label: obj.label }
    } else {
      res = { value: 0, label: 'Выберите счёт', isDisabled: true }
    }

    return res;
  };

  return <>
    <section className="home-section">
      <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            <Button onClick={!id ? handleAdd : handleChoose} className={styles.button} variant="contained">Сохранить</Button>
          </div>
          <div>
          </div>
        </div>
        {isSuccess &&
          <div className={styles.success}>
            Вы успешно {isSuccess}!
          </div>
        }

        <div className={styles.boxesWrapper}>
          <div className={styles.boxesWrapper__user}>
            <LegalEntitesForm
              name={name}
              setName={setName}
              mobile={mobile}
              setPhone={setPhone}
              account={account}
              setAccount={setAccount}
              mail={mail}
              setMail={setMail}
              address={address}
              setAddress={setAddress}
              site={site}
              setSite={setSite}
              edrpou={edrpou}
              setEdrpou={setEdrpou}
              handleSearch={handleSearch}
              auxiliaryList={auxiliaryList}
              id={id}
            />
          </div>

          <div className={styles.boxesWrapper__information}>
            <InformationForm
              legal_name={legal_name}
              setLegal_name={setLegal_name}
              low_system={low_system}
              setLow_system={setLow_system}
              nds={nds}
              setNds={setNds}
              director={director}
              setDirector={setDirector}
              auxiliaryList={auxiliaryList}
              id={id}
            />
          </div>

          <form action="#" className="form__details">
            <h4>
              Счета:
            </h4>
            <div>
              {currentLegalEntite?.cash_accounts.map((c, i) => {
                return (
                  <div className={"form__input " + ( currentLegalEntite.cash_accounts && currentLegalEntite.cash_accounts[i] ? 'active-cheked' : 'active-disable')} key={i}>
                    <div className="select ">
                      <Select
                        name="cash_account_id"
                        value={selectedValue(c.cash_account_id)}
                        options={cashAccountList}
                        onChange={event => updateCashAccount(Object.assign(event, { name: 'cash_account_id', index: i}))}
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
                    <div className="form__setting">
                      <a href="#!" onClick={() => removeCashAccount(i)}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.7298 3.67792L1.05188 0L0 1.05188L3.67792 4.7298L0.0518825 8.35583L1.10377 9.40772L4.7298 5.78168L8.35582 9.4077L9.4077 8.35582L5.78168 4.7298L9.45958 1.0519L8.4077 1.80587e-05L4.7298 3.67792Z"
                                fill="#F6222E"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                )
              })}

              <div className="form__input" >
                <div className="form__setting">
                  <a href="#!" onClick={addCashAccount}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.45522 5.97836L7.45522 0.776996H5.96763L5.96763 5.97836L0.839645 5.97836L0.839645 7.46594L5.96763 7.46594V12.5939H7.45522L7.45522 7.46594L12.6566 7.46594L12.6566 5.97836L7.45522 5.97836Z"
                            fill="#7096FF"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </form>

        </div>
        <div className={styles.buttonsWrapper}>
          <div className={styles.main_btns}>
            {id && <Button onClick={handleRemove} className={styles.button} variant="contained">Удалить</Button>}
          </div>
          <div>
            <Button onClick={handleReturn} className={styles.button} style={{ color: '#9C27B0', borderColor: '#9C27B0' }} variant="outlined">Отмена</Button>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default LegalEntitesEditing;
