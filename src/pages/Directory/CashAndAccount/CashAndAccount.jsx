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
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import API from '@/api/api';

import styles from '@/styles/modules/CashAndAccounts.module.css';

export default function CashAndAccount() {
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [auxiliaryList, setAuxiliaryList] = React.useState({ currencies: [], types: [] });

   useDocumentTitle("Кассы и счета");

   const [rows, setRows] = React.useState([])

   const api = new API();

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

   React.useEffect(() => {
      api.auxiliary('cashAndAccount').then(data => {
         if (data.status === "error") alert(data.message)
         else setAuxiliaryList(data.message)
      })
      // eslint-disable-next-line
   }, [open]);

   React.useEffect(() => {
      if (open === false && openEditModal === false) {
         api.all('cashAndAccount').then(data => {
            if (data.status === "error") alert(data.message)
            else setRows(data.message.items)
         });
      }
      // eslint-disable-next-line
   }, [openEditModal, open]);

   return (
      <>
         <section className="home-section">
            <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
               <CashAndAccountsModal
                  open={open}
                  setOpen={setOpen}
                  auxiliaryList={auxiliaryList}
               />
               {
                  openEditModal &&
                  <EditModal
                     open={openEditModal}
                     setOpenEditModal={setOpenEditModal}
                     cashId={cashId}
                     cash_and_accounts={rows}
                     auxiliaryList={auxiliaryList}
                  />
               }
               <Paper sx={{ width: "100%", mb: 2, mt: 2 }}>
                  <div style={{ marginTop: "15px", marginBottom: "15px", paddingLeft: "16px", paddingRight: "8px" }}>
                     <Button onClick={handleOpen} variant="contained">Додати</Button>
                  </div>

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
                           {rows && rows
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, idx) => {
                                 const arr = row.cash_accounts_balance.slice(0, 4);
                                 const balance = arr.map(elem => {
                                    const index = auxiliaryList.currencies.findIndex(data => data.id === elem.currency_id);

                                    return `${Number(elem.balance).toFixed(2)} ${auxiliaryList.currencies[index].name}`
                                 });

                                 return (
                                    <TableRow onClick={() => handleOpenEditModal(row.id)} hover role="checkbox" tabIndex={-1} key={idx} className={styles.table_row}>
                                       <TableCell style={{ display: 'flex', alignItems: 'center', minHeight: '57px' }} className={styles.table__body} align={'left'}>
                                          {row.name}
                                       </TableCell>
                                       <TableCell className={styles.table__body__wide} align={'center'}>
                                          {row.type_order === "cash" ? 'Касса' : 'Счёт'}
                                       </TableCell>
                                       <TableCell className={styles.table__body} align={'right'}>
                                          {row.cash_accounts_balance.length < 5 ? balance.join(", ") : `${balance.join(", ")}...`}
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
                     count={rows.length}
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