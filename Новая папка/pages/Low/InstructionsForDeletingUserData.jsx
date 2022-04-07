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

function InstructionsForDeletingUserData(props) {
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
               <h1>Как удалить аккаунт B-Fin</h1>
               <div class="inline-feedback__container">
                  <div class="article-content-container">
                     <div class="cc">
                        <p><span id="578394S"></span>Удалить<span id="349159E"></span><span id="578394E"></span><span>&nbsp;</span>аккаунт B-Fin&nbsp;можно в любой момент. Учтите, что мы не можем гарантировать возможность восстановить его, если вы передумаете.</p>
                        <div class="no-margin"></div>
                        <h2>Шаг 1. Изучите последствия удаления аккаунта</h2>
                        <div>
                           <ul>
                              <li>Будут потеряны все данные и контент, связанные с аккаунтом.</li>
                              <li>Вы не сможете пользоваться сервисами&nbsp;B-Fin.</li>
                           </ul>
                        </div>
                        <div class="zippy-section-container">
                           <h2>Шаг 2. Проверьте и скачайте данные</h2>
                           <div>
                              <p>Перед тем как удалить аккаунт:</p>
                              <ul>
                                 <li>Напишите в тех поддержку, что бы Вам скинули все данные.</li>
                              </ul>
                           </div>
                           <h2>Шаг 3. Удалите аккаунт</h2>
                           <p><strong>Примечание.</strong><span>&nbsp;</span>Если у вас есть несколько аккаунтов B-Fin, удаление одного из них не затронет остальные.</p>
                           <div>
                              <ol>
                                 <li>Откройте раздел<span>&nbsp;настройки&nbsp;</span>в аккаунте B-Fin.</li>
                                 <li>Найдите пункт "Управление данными и конфиденциальностью".</li>
                                 <li>Выберите<span>&nbsp;</span><strong>Другие варианты</strong><span>&nbsp;</span><img src="https://lh3.googleusercontent.com/3_l97rr0GvhSP2XV5OoCkV2ZDTIisAOczrSdzNCBxhIKWrjXjHucxNwocghoUa39gw=w36-h36" width="18" height="18" alt="затем" title="затем" data-mime-type="image/png" data-alt-src="//lh3.googleusercontent.com/3_l97rr0GvhSP2XV5OoCkV2ZDTIisAOczrSdzNCBxhIKWrjXjHucxNwocghoUa39gw" /><span>&nbsp;</span><strong>Удалить аккаунт B-Fin</strong>.</li>
                                 <li>Следуйте инструкциям по удалению аккаунта.</li>
                              </ol>
                           </div>
                           <h2>Восстановить аккаунт</h2>
                           <p>Восстановить аккаунт невозможно.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </>
      </DocumentTitle>
   )
}

export default InstructionsForDeletingUserData;




