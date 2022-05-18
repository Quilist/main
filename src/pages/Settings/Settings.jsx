import * as React from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import SettingsForm from './components/SettingsForm'

import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';

import Share from './img/share1.svg'
import API from '@/api/api';


const receiveOptions = [
  { name: 'Печатать', link: '/sell' },
  { name: 'Отправить', link: '/sell' },
];
function Posting() {
  const [isSuccess, setIsSuccess] = React.useState(null)
  const [isRedirect, setIsRedirect] = React.useState(false)
  const [openReceive, setOpenReceive] = React.useState(false);
  const anchorReceiveRef = React.useRef(null);
  const [selectedReceiveIndex, setSelectedReceiveIndex] = React.useState(1);
  const [item, setItem] = React.useState({});
  const [auxiliaryList, setAuxiliaryList] = React.useState({});
  const api = new API();

  React.useEffect(() => {
    api.auxiliary('userSettings').then(data => {
      if (data.status === "error") alert(data.message)
      else setAuxiliaryList(data.message)
    })

    api.find(0, 'userSettings').then(data => {
      if(data.status == 'OK') {
        setItem(data.message)
      }
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    document.title = "Настройки"
  }, [])

  const navigate = useNavigate()
  React.useEffect(() => {
    if (isRedirect) {
      //navigate('/')
    }
    // eslint-disable-next-line
  }, [isRedirect])

  const handleCloseReceive = (event) => {
    if (anchorReceiveRef.current && anchorReceiveRef.current.contains(event.target)) {
      return;
    }
    setOpenReceive(false);
  };

  const handleMenuItemClickReceive = (event, index) => {
    setSelectedReceiveIndex(index);
    setOpenReceive(false);
  };

  const handleToggleReceive = () => {
    setOpenReceive((prevOpen) => !prevOpen);
  };

  const handleAdd = () =>  {
    let data = item;
    const id = item.id || 0
    api.edit(id, data, 'userSettings').then(data => {
      if (data.status === "error") return console.log(data.message)
      setIsSuccess('изменили настройки')
      setIsRedirect(true)
    })
  }

  return <>
    <section className='home-section'>

      <div class="wrapper__setting">

        <button type="button" class="btn btn-green" onClick={handleAdd}>
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.51804 8.31521L11.875 0.958252L12.9944 2.07767L4.51804 10.554L0 6.036L1.11942 4.91659L4.51804 8.31521Z" fill="white" />
          </svg> Сохранить
        </button>
        {isSuccess &&
          <div class="UserEditing_success__SUtpN">
            Вы успешно {isSuccess}!
          </div>
        }
        <div class="wrapper__setting_btns">
          <img onClick={handleToggleReceive} src={Share} alt="Logo" />
          <ButtonGroup variant="contained" ref={anchorReceiveRef} aria-label="split button">
          </ButtonGroup>
          <Popper
            open={openReceive}
            anchorEl={anchorReceiveRef.current}
            role={undefined}
            transition
            style={{ paddingRight: 10 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseReceive}>
                    <MenuList id="split-button-menu">
                      {receiveOptions.map((option, index) => (
                        <MenuItem
                          key={option.name}
                          selected={index === selectedReceiveIndex}
                          onClick={(event) => handleMenuItemClickReceive(event, index)}
                        >
                          <Link to={option.link} style={{ color: 'black' }}>{option.name}</Link>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      <SettingsForm
        item={item}
        setItem={setItem}
        auxiliaryList={auxiliaryList}
      />
      <div class="form__btns">
        <a href="/#" class="btn btn-green">
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.51804 8.31521L11.875 0.958252L12.9944 2.07767L4.51804 10.554L0 6.036L1.11942 4.91659L4.51804 8.31521Z" fill="white" />
          </svg> Сохранить
        </a>
        <Link to={-1} class="btn btn-red-border">
          Отмена
        </Link>
      </div>
    </section>
  </>


}
export default Posting;
