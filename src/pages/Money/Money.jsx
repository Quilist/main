
import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import styles from "@/styles/modules/Money.module.css";
import CurrencyExchangeModal from "./CurrencyExchangeModal";
import MovingMoneyModal from "./MovingMoneyModal";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Дата",
  },
  {
    id: "pay_type",
    numeric: false,
    disablePadding: true,
    label: "Тип оплаты",
  },
  {
    id: "cash_account",
    numeric: false,
    disablePadding: true,
    label: "Касса/Счет",
  },
  {
    id: "user",
    numeric: true,
    disablePadding: true,
    label: "Контрагент",
  },
  {
    id: "totals",
    numeric: false,
    disablePadding: false,
    label: "Сумма",
  },
  {
    id: "note",
    numeric: true,
    disablePadding: false,
    label: "Комментарий",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => {
          const isWrongForNarrow = headCell.id === 'duty' || headCell.id === 'mobile'
          return (
            <TableCell
              className={!isWrongForNarrow ? styles.correct_row : styles.wrong_row}
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                style={{ zIndex: "1", fontSize: '16px' }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openCurrencyExchangeModal, setOpenCurrencyExchangeModal] = React.useState(false);
  const [openMovingMoney, setOpenMovingMoney] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const { numSelected } = props;
  const handleOpenCurrencyExchangeModal = () => setOpenCurrencyExchangeModal(true);
  const handleOpenMovingMoney = () => setOpenMovingMoney(true);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >

          <CurrencyExchangeModal
            open={openCurrencyExchangeModal}
            setOpen={setOpenCurrencyExchangeModal}
          />

          <MovingMoneyModal
            open={openMovingMoney}
            setOpen={setOpenMovingMoney}
          />

          <div style={{ marginTop: "25px", marginBottom: "15px" }}>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button >Создать</Button>
              <Button
                size="small"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              style={{ zIndex: "10" }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === "center bottom",
                    marginLeft: "76px",
                  }}
                >
                  <Paper style={{ background: "#6b8b9c" }}>
                    <MenuList id="split-button-menu">
                      <Link to="#" onClick={handleOpenCurrencyExchangeModal}>
                        <MenuItem style={{ height: "30px", color: "#fff" }}>
                          Обмен валют
                        </MenuItem>
                      </Link>
                    </MenuList>
                    <MenuList id="split-button-menu">
                      <Link to="#" onClick={handleOpenMovingMoney}>
                        <MenuItem style={{ height: "30px", color: "#fff" }}>
                          Перемещение денег
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("mobile");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isRedirect] = React.useState(false);

  React.useEffect(() => {
    document.title = "B-Fin: Деньги"
    // eslint-disable-next-line
  }, [])


  // ==========Запрос на сервер=================
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    setRows([
      {
        "id": 2,
        "id_user": 1,
        "date": "22.03.2022 17:16:45",
        "user":  { "id": 1, "name": "Николай" },
        "type": "pay_supplier",
        "type_order": "cash",
        "id_type": 1,
        "pay_type":  { "id": 1, "name": "От клиента" }, //pay_type - какое там наименование релейшна с бэка?
        "id_cash_accounts": 2,
        "cash_account": { "id": 1, "name": "ФОП Руднев" },
        "note": "Какие-то заметки",
        "id_legal_entites": 1,
        "payments": [
          {
            "currency_id": 1,
            "currency": { "id": 1, "name": "UAH" },
            "amount": 100,
            "type_pay": "payment",
            "type_amount": "debit"
          },
          {
            "currency_id": 2,
            "currency": { "id": 1, "name": "USD" },
            "amount": 50,
            "type_pay": "payment",
            "type_amount": "debit"
          }
        ],
        "changes": [
          {
            "currency_id": 1,
            "currency": { "id": 1, "name": "UAH" },
            "amount": 20,
            "type_pay": "change",
            "type_amount": "debit"
          },
          {
            "currency_id": 2,
            "currency": { "id": 1, "name": "USD" },
            "amount": 10,
            "type_pay": "change",
            "type_amount": "debit"
          }
        ],
        "totals": [
          {
            "currency_id": 1,
            "currency": { "id": 1, "name": "UAH" },
            "amount": 80,
            "type_pay": "total",
            "type_amount": "debit"
          },
          {
            "currency_id": 2,
            "currency": { "id": 1, "name": "USD" },
            "amount": 40,
            "type_pay": "total",
            "type_amount": "debit"
          }
        ]
      }
    ])
    // api.all('client').then(data => {
    //   if (data.status === "error") alert(data.message)
    //   else setRows(data.message)
    // })
    // eslint-disable-next-line 
  }, [])
  // ============================================

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  React.useEffect(() => {
    if (isRedirect) {
      navigate("/money/1");
    }
    // eslint-disable-next-line
  }, [isRedirect]);


  return (
    <>
      <section className="home-section">
        <div className="home-content">
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Поиск"
              variant="outlined"
              size="small"
            />
            <Paper sx={{ width: "100%", mb: 2, mt: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 320 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            className={styles.table_row}
                          >
                            <TableCell className={styles.table_wide} style={{ fontSize: '17px', marginLeft: "15px" }}>{row.date}</TableCell>
                            <TableCell className={styles.table_wide} align="center" style={{ fontSize: '17px' }}>{row.pay_type.name}</TableCell>
                            <TableCell className={styles.table_wide} align="right" style={{ fontSize: '17px' }}>{row.cash_account.name}</TableCell>
                            <TableCell className={styles.table_wide} align="right" style={{ fontSize: '17px' }}>{row.user.name}</TableCell>
                            <TableCell className={styles.table_wide} align="right" style={{ fontSize: '17px' }}>
                              { row.totals.map((total, totalIndex) => (
                                  <p key={totalIndex}>{total.currency.name}: {total.amount}</p>
                              ))
                              }
                            </TableCell>
                            <TableCell className={styles.table_wide} align="right" style={{ fontSize: '17px' }}>{row.note}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
        </div>
      </section>
    </>
  );
}

