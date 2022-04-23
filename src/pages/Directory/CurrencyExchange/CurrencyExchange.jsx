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
import CurrencyExchangeModal from './CurrencyExchangeModal';
import CurrencyExchangeEditModal from './CurrencyExchangeEditModal';
import {useDocumentTitle} from "@/hooks/useDocumentTitle";
import API from '@/api/api';

import styles from '@/styles/modules/Currency.module.css';

export const currencies = [];

export default function CurrencyExchangeExchange() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);
  const [currenciesList, setCurrenciesList] = React.useState([]);
  const api = new API()
  
  useDocumentTitle("Валютные пары");

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  // Edit Modal
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [currencyId, setCurrencyId] = React.useState(0);
  const handleOpenEditModal = (id) => {
    setCurrencyId(id);
    setOpenEditModal(true);
  };

  React.useEffect(() => {
    if (!openEditModal && !open) {
      api.all('currencyExchange').then(data => {
        if (data.status === "error") alert(data.message)
        else setRows(data.message.items)
      })
      
      api.auxiliary('currencyExchange').then(data => {
        if (data.status === "error") alert(data.message)
        else setCurrenciesList(data.message)
      })
    }
    // eslint-disable-next-line
  }, [openEditModal, open])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const findCurrencyName = (event) => {
    const index = currenciesList.findIndex((item) => item.id === event)

    return index !== -1 ? currenciesList[index].name : ''
  }

  return (
    <>
      <section className="home-section">
        <div className="home-content" style={{ display: 'flex', flexDirection: 'column' }}>
          <CurrencyExchangeModal
            open={open}
            setOpen={setOpen}
            auxiliaryList={currenciesList}
          />
          {
            openEditModal &&
            <CurrencyExchangeEditModal
              open={openEditModal}
              setOpenEditModal={setOpenEditModal}
              currencyId={currencyId}
              currencies={rows}
              currenciesList={currenciesList}
            />
          }
          <div style={{ marginBottom: '30px', width: '97%' }}>
            <Button onClick={handleOpen} variant="contained">Создать</Button>
          </div>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.table__head} align={'left'}
                      style={{ minWidth: '100px' }}>
                      Валюта из
                    </TableCell>
                    <TableCell className={styles.table__head} align={'center'}
                      style={{ minWidth: '100px' }}>
                      Валюта в
                    </TableCell>
                    <TableCell className={styles.table__head} align={'right'}
                      style={{ minWidth: '100px' }}>
                      Обменный курс
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows && rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, idx) => {
                      return (
                        <TableRow onClick={() => handleOpenEditModal(row.id)} hover
                          role="checkbox" tabIndex={-1} key={idx}
                          className={styles.table_row}>
                          <TableCell style={{
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: '57px'
                          }} className={styles.table__body} align={'left'}>
                            {findCurrencyName(row.from_currency_id)}
                          </TableCell>
                          <TableCell className={styles.table__body__wide} align={'center'}>
                            {findCurrencyName(row.to_currency_id)}
                          </TableCell>
                          <TableCell className={styles.table__body} align={'right'}>
                            {row.exchange_rate}
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
