// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
// import { useState } from 'react';
import { Link } from 'react-router-dom';

import './forma-auth.css';

function ErrorAuth() {

   return (
      <div>
         <h2>Истекло время попытки входа в B-Fin</h2>
         <div className="container" id="container">
            <div className="form-container sign-in-container1">
               <form action="#">
                  {/* <h1>Восстановление пароля</h1> */}

                  <Link to="/registration"><button>Повторить</button></Link>
               </form>
            </div>
         </div>
      </div>

   );
}

export default ErrorAuth;
