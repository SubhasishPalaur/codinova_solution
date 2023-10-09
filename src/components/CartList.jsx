import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import cross from '../assets/remove.svg';
import { useProductList } from '../context';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      align:'center'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  const CartTable = ()=> {
    const { productList, deleteProduct, addProduct } = useProductList();
    const remove = (value) => {
        deleteProduct(value, false)
    }
    const svgStyle = {
        width: '1rem',
        height: '1rem',
        cursor: 'pointer'
      };
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">Product</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Quanity</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.length === 0 ? (
                <TableRow>
                <TableCell colSpan={4} align="center">
                    No products available.
                </TableCell>
                </TableRow>
            ) : (
                productList.map((row, index) => (
                <StyledTableRow key={row.name}>
                    <StyledTableCell align="center"><img key={index} src={cross} style={svgStyle} onClick={() => remove(row)}/></StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                    {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                    <StyledTableCell align="center" >
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                      <div class="input-group-prepend" style={{display: 'flex', flexDirection: 'row'}}>
                      <button class="btn btn-outline-primary" type="button" onClick={()=> deleteProduct(row, true)}>-</button>
                      </div>
                      {row.quantity}
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-primary" type="button" onClick={()=>addProduct(row)}>+</button>
                      </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.total}</StyledTableCell>
                </StyledTableRow>
                ))
            )}
            </TableBody>
        </Table>
      </TableContainer>
    );
  }

export default CartTable