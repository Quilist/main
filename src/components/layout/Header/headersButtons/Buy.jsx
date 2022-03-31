import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
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
import API from '@/api/api';

import styles from "./Buy.module.css";

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
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Номер",
  },
  {
    id: "created_at",
    numeric: false,
    disablePadding: true,
    label: "Дата",
  },

  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Вид документа",
  },
  {
    id: "supplier",
    numeric: true,
    disablePadding: true,
    label: "Аналитика",
  },
  {
    id: "storehouse",
    numeric: false,
    disablePadding: false,
    label: "Склад",
  },
  {
    id: "total_amount",
    numeric: false,
    disablePadding: false,
    label: "Сумма",
  },
  {
    id: "note",
    numeric: true,
    disablePadding: false,
    label: "Заметки",
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
          {/* <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                     'aria-label': 'select all desserts',
                  }}
               /> */}
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
  const [isRedirect, setIsRedirect] = React.useState(false);
  const [isCreateRedirect, setIsCreateRedirect] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCreateRedirect = () => {
    setIsCreateRedirect(true);
  };
  React.useEffect(() => {
    if (isCreateRedirect) {
      navigate("/buy/create");
    }
    // eslint-disable-next-line
  }, [isCreateRedirect]);

  const { numSelected } = props;

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

          <div style={{ marginTop: "25px", marginBottom: "15px" }}>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button  onClick={() => handleCreateRedirect(true)}>Создать</Button>
            </ButtonGroup>
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
  const [isRedirect, setIsRedirect] = React.useState(false);

  // ==========Запрос на сервер=================
  const [rows, setRows] = React.useState([])
  const api = new API()
  React.useEffect(() => {
    setRows([
      {
        "id": 1,
        "user_id": 1,
        "type": "buy",
        "created_at": "22.03.2022 17:16:45",
        "user":  { "id": 1, "name": "Николай" },
        "supplier_id": 1,
        "supplier": { "id": 1, "name": "Андрей аванс" },
        "storehouse_id": 1,
        "storehouse": { "id": 1, "name": "Склад промышлен." },
        "total_amount": 10000,
        "currency_id": 1,
        "currency": { "id": 1, "name": "UAH" },
        "note": "Какие-то заметки",
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

  const handleRedirect = () => {
    setIsRedirect(true);
  };
  React.useEffect(() => {
    if (isRedirect) {
      navigate("/buy/1");
    }
    // eslint-disable-next-line
  }, [isRedirect]);


  // ACTIONS 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  // USER
  const [isOpen, setIsOpen] = React.useState();
  const openUser = (id) => {
    if (isOpen === id) {
      closeUser();
    } else {
      setIsOpen(id);
    }
  };
  const closeUser = () => {
    setIsOpen(null);
  }

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
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            className={styles.table_row}
                          >
                            <TableCell className={styles.table_wide} style={{ fontSize: '17px' }}>{row.id}</TableCell>
                            <TableCell className={styles.table_wide} align="center" style={{ fontSize: '17px' }}>{row.created_at}</TableCell>
                            <TableCell className={styles.table_wide} align="right" style={{ fontSize: '17px' }}>
                              {row.type == 'buy' ? (
                                <div>Закупки</div>
                              ) : (
                                <div>Продажи</div>
                              )}
                            </TableCell>
                            <TableCell className={styles.table_wide} align="right" style={{ fontSize: '17px' }}>{row.supplier.name}</TableCell>
                            <TableCell className={styles.table_wide} align="right" style={{ fontSize: '17px' }}>{row.storehouse.name}</TableCell>
                            <TableCell className={styles.table_wide} align="right" style={{ fontSize: '17px' }}>{row.total_amount} {row.currency.name}</TableCell>
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