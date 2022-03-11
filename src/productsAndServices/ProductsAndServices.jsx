import * as React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom'
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Grow from "@mui/material/Grow";
import useUserId from "../hooks/useUserId";







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
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

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
     id: 'name',
     numeric: false,
     disablePadding: true,
     label: 'Наименование',
  },
  {
     id: 'remainder',
     numeric: true,
     disablePadding: false,
     label: 'Остаток',
  },
  {
     id: 'price',
     numeric: true,
     disablePadding: false,
     label: 'Цена',
  },
  {
    id: 'measurement',
    numeric: true,
    disablePadding: false,
    label: 'Ед.изм.',
 },
 {
  id: 'vendorCode',
  numeric: true,
  disablePadding: false,
  label: 'Артикул',
},
];

const produtsForExample = [
   {
      id:"cat",
      name:"Кот",
      remainder:1,
      price:300,
      measurement:"кт",
      vendorCode:888

   },
   {
      id:"yohurt",
      name:"Йогурт",
      remainder:9,
      price:12,
      measurement:"литр",
      vendorCode:834

   },
   {
      id:"pen",
      name:"Ручка",
      remainder:1000,
      price:1,
      measurement:"шт",
      vendorCode:8888

   },
   {
      id:"dog",
      name:"Dog",
      remainder:3,
      price:600,
      measurement:"asde",
      vendorCode:112

   },
   {
      id:"daf",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   },
   {
      id:"gdf",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   },
   {
      id:"afds",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   },
   {
      id:"gas",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   },
   {
      id:"hgdad",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   },
   {
      id:"hgda",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   },
   {
      id:"gasdf",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   },
   {
      id:"gdxxc",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   },
   {
      id:"gasd",
      name:"Горілка",
      remainder:10,
      price:30,
      measurement:"літр",
      vendorCode:1

   }, 

]


function ProductsTableHead(props){
   const { order, orderBy, onRequestSort } = props;
   const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
   };
return(
    <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        
      </TableCell>
      {headCells.map((headCell) => {
        return(
          <TableCell
          key={headCell.id}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={createSortHandler(headCell.id)}
            style={{ zIndex: "1", fontSize: '16px'}}
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

 ProductsTableHead.propTypes = {
   numSelected: PropTypes.number.isRequired,
   onRequestSort: PropTypes.func.isRequired,
   onSelectAllClick: PropTypes.func.isRequired,
   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
   orderBy: PropTypes.string.isRequired,
   rowCount: PropTypes.number.isRequired,
};

const ProductsTableToolbar = (props) => {
  const [isRedirect, setIsRedirect] = React.useState(false);
  const [selectedProductsId, setSelectedProductsId] = React.useState(null)
  const [open, setOpen] = React.useState(false);
  const handleAdd = () => {
     setSelectedProductsId('Add')
     setIsRedirect(true)   
  }
  const handleToggle = () => {
   setOpen((prevOpen) => !prevOpen);
 };
  const anchorRef = React.useRef(null);


  const navigate = useNavigate()
  React.useEffect(() => {
     if(isRedirect){
        navigate('/add_product', {state: {id: selectedProductsId}}) 
     }
     // eslint-disable-next-line
  }, [isRedirect])
  
  const { numSelected } = props;

  return (
     <Toolbar
        sx={{
           pl: { sm: 2 },
           pr: { xs: 1, sm: 1 },
           ...(numSelected > 0 && {
              bgcolor: (theme) =>
                 alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
           }),
        }}
     >
        {numSelected > 0 ? (
           <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
           >
              {numSelected} selected
           </Typography>
        ) : (
           <Typography
              sx={{ flex: '1 1 100%' }}
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
              <Button onClick={handleAdd}>Создать</Button>
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
                        <Link to="/revaluation">
                           <MenuItem style={{ height: "30px", color: "#fff" }}>
                              Переоценка
                           </MenuItem>
                        </Link> 
                        <Link to="/import_products"> 
                           <MenuItem style={{ height: "30px", color: "#fff" }}>
                              Импорт товаров
                           </MenuItem>
                        </Link> 
                        <Link to="/save_price_list"> 
                           <MenuItem style={{ height: "30px", color: "#fff" }}>
                              Скачать прайс-лист
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


function ProductsAndServices() {
   const [order, setOrder] = React.useState('asc');
   const [orderBy, setOrderBy] = React.useState('mobile');
   const [selected, setSelected] = React.useState([]);
   const [page, setPage] = React.useState(0);
   const [dense, setDense] = React.useState(true); 

   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [isRedirect, setIsRedirect] = React.useState(false);

   

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
   };

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = produtsForExample.map((n) => n.name);
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
  
    
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - produtsForExample.length) : 0;
  
     const { setUserId } = useUserId();
   
     const handleRedirect = (id) => {
      setUserId(id)
      setIsRedirect(true);
    }; 
    
    const navigate = useNavigate();
    React.useEffect(() => {
      if (isRedirect) {
        navigate("/add_product");
      }
      // eslint-disable-next-line
    }, [isRedirect]);
  
   
   
  return(
  <>
<section className="home-section">
      <div className="home-content">
      <Box sx={{ width: '100%' }}>
      <TextField fullWidth label="Поиск" variant="outlined" />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ProductsTableToolbar  />
        <TableContainer>
          <Table 
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          >
            <ProductsTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={produtsForExample.length} />
            <TableBody>
               {stableSort(produtsForExample, getComparator(order, orderBy))
                  .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ).map((row )=>{     
               return (
               <TableRow
               hover
               role="checkbox"
               key={row.id}
               >
                  <TableCell className="user-editing-icon" padding="checkbox">
                     <i
                        className="fas fa-pen"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRedirect(row.id)}
                     ></i>
                  </TableCell>
                  <TableCell
                     component="th"
                     scope="row"
                     padding="none"
                  >
                     {row.name}
                  </TableCell>
                  <TableCell> {row.remainder}</TableCell>
                  <TableCell> {row.price}</TableCell>
                  <TableCell> {row.measurement}</TableCell>
                  <TableCell> {row.vendorCode}</TableCell>
               </TableRow>
                      )})}
                      
                  {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                      </TableRow>
                    )}
            
            </TableBody>
          </Table>
        </TableContainer>
            <TablePagination
               rowsPerPageOptions={[5, 10, 25]}
               component="div"
               count={produtsForExample.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage} 
            />
        </Paper>
        <FormControlLabel
            control={<Switch  checked={ dense } onChange={ handleChangeDense }  />}
            label="Dense padding"
         />
      </Box> 
      </div>
    </section>


  
  </>
)
}

export default ProductsAndServices;

