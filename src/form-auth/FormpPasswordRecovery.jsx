// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import { useState } from 'react';
import API from '../api/api';
import './forma-auth.css';

function FormpPasswordRecovery() {
   const api = new API();

   const [password, setPassword] = useState("");
   const [repeat, repeatPassword] = useState("");

   const code = window.location.search.split("code=")[1]

   const passwordInput = (e) => setPassword(e.target.value);
   const repPasswordInput = (e) => repeatPassword(e.target.value);

   const changePassword = (e) => {
      e.preventDefault();

      if (password !== repeat || !password) {
         return alert("пароль не совпадает или его вовсе нет")
      }

      api.changePassword(code, password).then(data => {
         if (data.status === "error") {
            return alert(data.message)
         }
         window.location.href = `/registration`
      });
   }
   return (
      <div>
         <h2>Форма восстановления пароля B-Fin</h2>
         <div className="container" id="container">
            <div className="form-container sign-in-container1">
               <form action="#">
                  <h1>Восстановление пароля</h1>
                  <input type="password" name="pass" placeholder="Новый пароль" onChange={passwordInput} />
                  <input type="password" name="pass" placeholder="Повторите пароль еще раз" onChange={repPasswordInput}/>
                  <button onClick={changePassword}>Войти с новым паролем</button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default FormpPasswordRecovery;
