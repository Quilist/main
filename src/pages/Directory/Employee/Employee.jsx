import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import useEmployeeId from '@/hooks/useEmployeeId';
import {useDocumentTitle} from "@/hooks/useDocumentTitle";
import API from '@/api/api';

import pencilImg from '@/static/img/pencil.png';

import styles from '@/styles/modules/Employees.module.css';

export default function Employee() {
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   // ================================================
   const [rows, setRows] = React.useState([]);
   const api = new API()

   useDocumentTitle("Сотрудники");

   React.useEffect(() => {
      api.all('employee').then(data => {
         if (data.status === "error") alert(data.message)
         else setRows(data.message.items)
      })
      // eslint-disable-next-line 
   }, [])

   const [isRedirect, setIsRedirect] = React.useState(false);
   const { setEmployeeId } = useEmployeeId();
   const navigate = useNavigate();

   // React.useEffect(() => {
   //    if (isRedirect) {
   //       navigate('/employees/create')
   //    }
   //    // eslint-disable-next-line
   // }, [isRedirect])
   const handleNavigate = (id) => {
      setEmployeeId(id);
      setIsRedirect(true);
      navigate('/employees/'+id)
   }
   const handleAdd = () => {
      setEmployeeId('Add');
      setIsRedirect(true);
      navigate('/employees/create')
   }

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   return (
      <>
         <section className="home-section">
            <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
               <div style={{ marginBottom: '30px', width: '97%' }}>
                  <Button onClick={handleAdd} variant="contained">Добавить</Button>
               </div>
               <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer>
                     <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                           <TableRow>
                              <TableCell className={styles.table__head} align={'left'} style={{ minWidth: '100px' }}>
                                 Имя
                              </TableCell>
                              <TableCell className={styles.table__head__width} align={'center'} style={{ minWidth: '100px' }}>
                                 Роль
                              </TableCell>
                              <TableCell className={styles.table__head__width} align={'center'} style={{ minWidth: '100px' }}>
                                 Телефон
                              </TableCell>
                              <TableCell className={styles.table__head} align={'right'} style={{ minWidth: '100px' }}>
                                 Долг
                              </TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {rows && rows
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, idx) => {
                                 return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                       <TableCell style={{ display: 'flex', alignItems: 'center' }} className={styles.table__body} align={'left'}>
                                          <img onClick={() => handleNavigate(row.id)} src={pencilImg} alt="edit" className={styles.pen__img} />
                                          {row.f_name}
                                       </TableCell>
                                       <TableCell className={styles.table__body__wide} align={'center'}>
                                          {row.id_role}
                                       </TableCell>
                                       <TableCell className={styles.table__body__wide} align={'center'}>
                                          {row.mobile}
                                       </TableCell>
                                       <TableCell className={styles.table__body} align={'right'}>
                                          {row.id_cash_acc || 0} UAH
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
