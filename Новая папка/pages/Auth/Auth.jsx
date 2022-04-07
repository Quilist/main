import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import API from '@/api/api';

import './forma-auth.css';

// ===========================================================================
// 1) Раскоментировать import на 12-й строке, удалить import на 4-й строке.
// 2) Всё что закоментированно в функции до return - раскоментировать и ничего не удалять.
// 3) Заменить всё, что подписано в return. Закоментированный блок в {/* */} раскоментируется и меняется на тот что находится ниже, в таких же скобках. 
// ===========================================================================

function Auth() {
   const api = new API()

   const [isActive, setActive] = useState(false);
   const [open, setOpen] = useState(false);

   const [regUsername, setRegUsername] = useState("");
   const [regEmail, setRegEmail] = useState("");
   const [regPassword, setRegPassword] = useState("");

   const [logEmail, setLogEmail] = useState("");
   const [logPassword, setLogPassword] = useState("");

   const [restoreEmail, setRestoreEmail] = useState("");

   if (document.cookie.length) {
      return window.location.href = "/dashboard"
   }

   // Регистрация
   const loginInput = (e) => setRegUsername(e.target.value);
   const emailInput = (e) => setRegEmail(e.target.value);
   const passwordInput = (e) => setRegPassword(e.target.value);

   const registration = (e) => {
      e.preventDefault();
      api.registration(regUsername, regEmail, regPassword).then(data => {
         if (data.status === "error") {
            return alert(data.message)
         }
         alert("Сообщение отправлено на вашу почту")
         window.location.href = "/registration"
      })
   }
   // Логин
   const logEmailInput = (e) => setLogEmail(e.target.value);
   const logPasswordInput = (e) => setLogPassword(e.target.value);

   const login = (e) => {
      e.preventDefault();
      api.login(logEmail, logPassword).then(data => {
         if (data.status === "error") {
            return alert(data.message)
         }
         window.location.href = "/dashboard"
      });
   }

   // Восстановление пароля
   const restoreInput = (e) => setRestoreEmail(e.target.value);

   const restoration = (e) => {
      e.preventDefault();
      api.restoration(restoreEmail).then(data => {
         if (data.status === "error") {
            return alert(data.message)
         }
         alert("Сообщение отправлено на вашу почту")
         handleClose();
      })
   }

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const signUp = (e) => {
      e.preventDefault();
      setActive(!isActive);
   }
   return (
      <div style={{ marginRight: '15px', marginLeft: '15px' }}>
         <h2 className='form-reg_logo text-black margin-head' >Форма регистрации B-Fin</h2>
         <div className={isActive ? "container right-panel-active" : "container"} id="container">
            <div className='main-form-wrapper'>
               <div className="form-container sign-up-container">
                  <form action="#" className='form-blank-bg'>
                     <h1 className='text-black'>Создать аккаунт</h1>
                     <div className="social-container">

                        <a href={`${api.api}/auth/facebook`} className="social">
                           <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href={`${api.api}/auth/google`} className="social">
                           <FontAwesomeIcon icon={faGooglePlusG} />
                        </a>

                     </div>
                     <span className='text-black'>или используйте почту для входа</span>

                     <input type="text" name="login" placeholder="Логин" onChange={loginInput} />
                     <input type="email" name="email" placeholder="Почта" onChange={emailInput} />
                     <input type="password" name="pass" placeholder="Пароль" onChange={passwordInput} />
                     <button onClick={registration} className='button__auth'>Зарегистрироваться</button>

                  </form>
               </div>
               <div className="form-container sign-in-container">
                  <form action="#" className='form-blank-bg'>
                     <h1 className='text-black'>Войти</h1>
                     <div className="social-container">

                        <a href={`${api.api}/auth/facebook`} className="social">
                           <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href={`${api.api}/auth/google`} className="social">
                           <FontAwesomeIcon icon={faGooglePlusG} />
                        </a>

                     </div>
                     <span className='text-black'>или используйте свою почту</span>

                     <input type="email" name="email" placeholder="Почта" onChange={logEmailInput} />
                     <input type="password" name="pass" placeholder="Пароль" onChange={logPasswordInput} />
                     <Button variant="text" onClick={handleClickOpen}>Забыли пароль?</Button>
                     <Dialog open={open} onClose={handleClose}>

                        <DialogTitle>Восстановление пароля</DialogTitle>
                        <DialogContent>
                           <DialogContentText>
                              Для восстановления пароля оставьте свою почту
                           </DialogContentText>
                           <TextField
                              onChange={restoreInput}
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Email Address"
                              type="email"
                              fullWidth
                              variant="standard"
                           />
                        </DialogContent>
                        <DialogActions>
                           <Button onClick={handleClose}>Отмена</Button>
                           <Button onClick={restoration}>Восстановить</Button>
                        </DialogActions>
                     </Dialog>
                     <button className='button__auth' onClick={login}>Войти</button>
                     <span className='polit'>Этот сайт защищен reCAPTCHA, а так же <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Политикой конфиденциальности</a> и <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Условиями использования</a> Google</span>
                  </form>
               </div>


               {/*     <div>
         <h2>Форма регистрации B-Fin</h2>
         <div className={isActive ? "container right-panel-active" : "container"} id="container">
            <div className="form-container sign-up-container">
               <form action="#">
                  <h1>Создать аккаунт</h1>
                  <div className="social-container">
                     <a href="/#" className="social">
                        <FontAwesomeIcon icon={faFacebookF} />
                     </a>
                     <a href="/#" className="social">
                        <FontAwesomeIcon icon={faGooglePlusG} />
                     </a>
                  </div>
                  <span>или используйте почту для входа</span>
                  <input type="text" name="login" placeholder="Логин" />
                  <input type="email" name="email" placeholder="Почта" />
                  <input type="password" name="pass" placeholder="Пароль" />
                  <button>Зарегистрироваться</button>
               </form>
            </div>
            <div className="form-container sign-in-container">
               <form action="#">
                  <h1>Войти</h1>
                  <div className="social-container">
                     <a href="/#" className="social">
                        <FontAwesomeIcon icon={faFacebookF} />
                     </a>
                     <a href="/#" className="social">
                        <FontAwesomeIcon icon={faGooglePlusG} />
                     </a>
                  </div>
                  <span>или используйте свою почту</span>
                  <input type="email" name="email" placeholder="Почта" />
                  <input type="password" name="pass" placeholder="Пароль" />
                  <Button variant="text" onClick={handleClickOpen}>Забыли пароль?</Button>
                  <Dialog open={open} onClose={handleClose}>
                     <DialogTitle>Восстановлдение пароля</DialogTitle>
                     <DialogContent>
                        <DialogContentText>
                           Для восстановления пароля оставьте свою почту
                        </DialogContentText>
                        <TextField
                           autoFocus
                           margin="dense"
                           id="name"
                           label="Email Address"
                           type="email"
                           fullWidth
                           variant="standard"
                        />
                     </DialogContent>
                     <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button onClick={handleClose}><Link to="/password-recovery">Восстановить</Link></Button>
                     </DialogActions>
                  </Dialog>
                  <Link to="/dashboard"><button>Войти</button></Link>
               </form>*/}

            </div>
            <div className="overlay-container">
               <div className="overlay">
                  <div className="overlay-panel overlay-left">
                     <h1>Привет!</h1>
                     <p className='margin-space'>Если у Вас уже есть аккаунт, пожалуйста, войдите под своей личной информацией</p>
                     <button className="button__auth ghost" id="signIn" onClick={signUp}>Войти</button>
                  </div>
                  <div className="overlay-panel overlay-right">
                     <h1>Привет, Друг!</h1>
                     <p className='margin-space'>Введите свои личные данные и начните путешествие с нами</p>
                     <button className="button__auth ghost" id="signUp" onClick={signUp}>Зарегистрироваться</button>
                  </div>
               </div>
            </div>
         </div>
      </div>

   );
}

export default Auth;
