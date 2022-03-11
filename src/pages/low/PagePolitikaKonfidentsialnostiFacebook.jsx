import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom';

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import './PagePolitika.css';

function ScrollTop(props) {
   const { children, window } = props;
   // Note that you normally won't need to set the window ref as useScrollTrigger
   // will default to window.
   // This is only being set here because the demo is in an iframe.
   const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
   });

   const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
         '#back-to-top-anchor',
      );

      if (anchor) {
         anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
         });
      }
   };

   return (
      <Zoom in={trigger}>
         <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
         >
            {children}
         </Box>
      </Zoom>
   );
}

ScrollTop.propTypes = {
   children: PropTypes.element.isRequired,
   /**
    * Injected by the documentation to work in an iframe.
    * You won't need it on your project.
    */
   window: PropTypes.func,
};

function PagePolitikaKonfidentsialnostiFacebook(props) {
   return (
      <DocumentTitle title='B-Fin: Политика конфиденциальности для facebook.com'>
         <>
            <React.Fragment>
               <CssBaseline />
               <AppBar>
                  <Toolbar>
                     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        B-Fin
                     </Typography>
                     <Button color="inherit" endIcon={<SendIcon />}><Link to="/registration" underline="none">Войти</Link></Button>

                  </Toolbar>
               </AppBar>
               <Toolbar id="back-to-top-anchor" />
               <ScrollTop {...props}>
                  <Fab color="secondary" size="small" aria-label="scroll back to top">
                     <KeyboardArrowUpIcon />
                  </Fab>
               </ScrollTop>
            </React.Fragment>
            <div className="text-content">
               <h1>Политика конфиденциальности для facebook.com</h1>
               <h2>Общие условия</h2>
               <ol>
                  <li>Настоящая Политика определяет порядок обработки и защиты ТОВ &laquo;Файрбокс&raquo; (далее &ndash; ТОВ) информации о физических лицах (далее &ndash; Пользователи), которая может быть получена ТОВ при заполнении Пользователем регистрационной формы на интернет- сайте<span>&nbsp;</span><a href="http://www.facebook.com/" target="_blank" rel="noopener noreferrer">www.facebook.com</a><span>&nbsp;</span>и странице сети<span>&nbsp;</span><a href="http://www.instagram.com/" target="_blank" rel="noopener noreferrer">instagram</a>, а так же порядок и согласие Пользователя на получение рекламной информации при заполнении Пользователем регистрационной формы на интернет- сайте<span>&nbsp;</span><a href="http://www.facebook.com/" target="_blank" rel="noopener noreferrer">www.facebook.com</a><span>&nbsp;</span>и странице сети<span>&nbsp;</span><a href="http://www.instagram.com/" target="_blank" rel="noopener noreferrer">instagram</a>.</li>
                  <li>Целью настоящей Политики является обеспечение надлежащей защиты информации о Пользователях, в том числе их персональных данных, от несанкционированного доступа и разглашения, соблюдение норм законодательства о рекламе в т.ч. при получении Пользователем рекламной информации.</li>
                  <li>Отношения, связанные со сбором, хранением, распространением и защитой информации предоставляемой Пользователем, регулируются настоящей Политикой, иными локальными документами ТОВ &laquo;Файрбокс&raquo; и действующим законодательством.</li>
                  <li>Персональные данные, разрешённые к обработке в рамках настоящей Политики конфиденциальности, предоставляются Пользователем путём заполнения регистрационной формы на интернет - сайте<span>&nbsp;</span><a href="http://www.facebook.com/" target="_blank" rel="noopener noreferrer">www.facebook.com</a>, странице сети<span>&nbsp;</span><a href="http://www.instagram.com/" target="_blank" rel="noopener noreferrer">instagram</a><span>&nbsp;</span>и включают в себя следующую информацию: - фамилию, имя, отчество Пользователя; - контактный телефон Пользователя; - адрес электронной почты (e-mail); Заполняя регистрационную форму, Пользователь выражает свое полное согласие с условиями настоящей Политики. Нажимая &laquo;Отправить&raquo;, Пользователь соглашается на обработку и передачу ТОВ своих персональных данных, оставленных при заполнении регистрационной формы на интернет - сайте www.facebook.com, странице сети instagram в целях получения рекламной информации. Так же Пользователь соглашается на получение от ТОВ рекламной информации по любым каналам связи, предоставленным Пользователем при заполнении регистрационной формы на интернет- сайте www.facebook.com и странице сети instagram</li>
               </ol>
               <h3 class="t-left">Цели сбора, обработки и хранения информации предоставляемой Пользователями</h3>
               <ol>
                  <li>Обработка персональных данных Пользователя осуществляется в соответствии с законодательством. ТОВ обрабатывает персональные данные Пользователя в целях:</li>
               </ol>
               <br />
               <ul>
                  <li>предоставления Пользователю информации об оказываемых ТОВ услугах, специальных предложений и иных сведений от имени ТОВ;</li>
                  <li>проведения маркетинговых и иных исследований.</li>
               </ul>
               <h3 class="t-left">Условия обработки персональной информации предоставленной Пользователем</h3>
               <ol>
                  <li>Обработка персональных данных Пользователя осуществляется в течение срока, необходимого для целей, указанных в настоящей Политике, любым законным способом, в том числе в информационных системах с использованием средств автоматизации или без использования таких средств.</li>
                  <li>ТОВ принимает необходимые организационные и технические меры для защиты персональной информации Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.</li>
                  <li>Персональные данные Пользователя могут быть переданы уполномоченным органам государственной власти только по основаниям и в порядке, установленным законодательством.</li>
                  <li>Пользователь при заполнении регистрационной формы подтверждает, что:</li>
               </ol>
               <br />
               <ul>
                  <li>указывает достоверную информацию о себе, вся иная информация предоставляется Пользователем по его собственному усмотрению.</li>
                  <li>ознакомлен с настоящей Политикой, выражает свое согласие с ней.<br />Ознакомление с условиями настоящей Политики и проставление галочки под ссылкой на данную Политику является письменным согласием Пользователя на сбор, хранение, обработку персональных данных, предоставляемых Пользователем.</li>
               </ul>
               <br />
               <ul>
                  <li>ТОВ не проверяет достоверность получаемой (собираемой) информации о Пользователях, за исключением случаев, когда такая проверка необходима в целях исполнения обязательств перед Пользователем.</li>
               </ul>
               <h3 class="t-left">Изменение Политики конфиденциальности. Применимое законодательство</h3>
               <ol>
                  <li>ТОВ &laquo;Файрбокс&raquo; имеет право вносить изменения в настоящую Политику конфиденциальности. При внесении изменений в актуальной редакции указывается дата последнего обновления. Новая редакция Политики вступает в силу с момента ее размещения, если иное не предусмотрено новой редакцией Политики.</li>
                  <li>К настоящей Политике и отношениям между Пользователем и ТОВ, возникающим в связи с применением Политики конфиденциальности, подлежит применению право.</li>
                  <li>До обращения в суд с иском по спорам, возникающим из отношений между Пользователем и ТОВ, обязательным является соблюдение претензионного порядка регулирования спора.</li>
               </ol>
            </div>
         </>
      </DocumentTitle>
   )
}

export default PagePolitikaKonfidentsialnostiFacebook;




