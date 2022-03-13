
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import CashAndAccountsModal from './CashAndAccountsModal';
import EditModal from './EditModal';
// import API from '../../../api/api';

import styles from './CashAndAccounts.module.css';

// ===========Закоментировать/Удалить===========
export const cash_and_accounts = [
   {
      id:1,
      id_user: 2,
      type_accounts: false,
      Name: 'Касса в офисе',
      Represent: 'USD', 
      bank_name: null,
      checking_account: null,
      balance: 10
   },
   {
      id: 2,
      id_user: 2,
      type_accounts: true,
      Name: 'Счет в банке',
      Represent: 'UAH', 
      bank_name: 'ооо банк',
      checking_account: 'ua26001230986763718',
      balance: 600
   }
]
// =====================================

export default function CashAndAccounts() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  // Edit Modal
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [cashId, setCashId] = React.useState(0);
  const handleOpenEditModal = (id) => {
    setCashId(id);
    setOpenEditModal(true);
  };
  
  return(
   <>
   <section className="home-section">
      <div className="home-content" style={{display: 'flex', flexDirection: 'column'}}>
      <CashAndAccountsModal 
        open={open}
        setOpen={setOpen}
      />
      {
        openEditModal &&  
        <EditModal 
          open={openEditModal}
          setOpenEditModal={setOpenEditModal} 
          cashId={cashId}
          cash_and_accounts={cash_and_accounts}
      />
      }
      <TextField
               fullWidth
               id="outlined-basic"
               label="Поиск"
               variant="outlined"
               size="small" 
               style={{marginBottom: '40px'}} 
            />
            <div style={{marginBottom: '30px', width: '97%'}}>
               <Button onClick={handleOpen} variant="contained">Создать</Button>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden'}}>
               <TableContainer>
               <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                     <TableRow>
                        <TableCell className={styles.table__head} align={'left'} style={{ minWidth: '100px' }}>
                           Название
                        </TableCell>
                        <TableCell className={styles.table__head__width} align={'center'} style={{ minWidth: '100px' }}>
                           Тип 
                        </TableCell>
                        <TableCell className={styles.table__head} align={'right'} style={{ minWidth: '100px' }}>
                           Баланс
                        </TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {cash_and_accounts && cash_and_accounts
                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                     .map((row, idx) => {
                        return (
                           <TableRow onClick={() => handleOpenEditModal(row.id)} hover role="checkbox" tabIndex={-1} key={idx} className={styles.table_row}>
                              <TableCell style={{display: 'flex', alignItems: 'center', minHeight: '57px'}} className={styles.table__body} align={'left'}>
                                 {row.Name}
                              </TableCell>
                              <TableCell className={styles.table__body__wide} align={'center'}>
                                 {row.type_accounts ? 'Касса' : 'Счёт'}
                              </TableCell> 
                              <TableCell className={styles.table__body} align={'right'}>
                                 {row.balance || 0} {row.Represent}
                              </TableCell>    
                           </TableRow>
                        );
                     })}
                  </TableBody>
               </Table>
               </TableContainer>
               <TablePagination
               rowsPerPageOptions={[5, 10, 20]}
               component="div"
               count={cash_and_accounts.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
               /> 
            </Paper>
      </div>
   </section>
   </>
   );
}