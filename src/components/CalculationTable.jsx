import React, { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { useProductList } from "../context";

const CalculationTable = () => {
    const { productList } = useProductList()
    const [vat, setVat] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [paymentData, setPaymentData] = useState({
        subTotal: 0,
        totalItem: 0,
        totalTax: 0,
        totalDiscount: 0,
        payableAmount: 0
    });
    const { totalQuantityDisplay, totalCostDisplay } = useMemo(() => {
        const initialTotals = productList.reduce(
          (accumulator, product) => {
            accumulator.totalQuantity += product.quantity;
            accumulator.totalCost += parseFloat(product.total);
            return accumulator;
          },
          { totalQuantity: 0, totalCost: 0 }
        );
      setPaymentData((initial)=>({...initial, subTotal: initialTotals.totalCost, totalItem: initialTotals.totalQuantity}))
        return {
          totalQuantityDisplay: initialTotals.totalQuantity,
          totalCostDisplay: initialTotals.totalCost 
        };
      }, [productList, paymentData.subTotal]);
    const total_ = useMemo(()=> {
        const total = paymentData.subTotal + (paymentData.subTotal * (vat)/100) - (paymentData.subTotal * (discountValue)/100)
        console.log({total},  paymentData.subTotal,vat, discountValue)
        setPaymentData((initial)=>({...initial, payableAmount: parseFloat(total), totalTax: (paymentData.subTotal * (vat|| 0)/100), totalDiscount: (paymentData.subTotal * (discountValue || 0)/100)}))
    },[paymentData.subTotal, vat, discountValue])
   
    const renderTableRow = (label, isInput, value, index, total) => {
        const handleInputChange = (event) => {
        const newValue = event.target.value;
        if(index === 1) {
            setVat(newValue);
        } else if (index === 2) {
            setDiscountValue(newValue);
        } 
        };
    
        return (
        <TableRow key={label}>
            <StyledTableCell>{label}</StyledTableCell>
            <TableCell align="right">
            {isInput ? (
                <Input
                type="number"
                onChange={handleInputChange}
                value={value}
                />
            ) : (
                value
            )}
            </TableCell>
            <TableCell>
                {total}
            </TableCell>
        </TableRow>
        );
    };
    
    return (
        <Container component={Paper}>
        <Table>
            <TableBody sx={{ minWidth: 600 }}>
            {renderTableRow('Subtotal', false, paymentData.subTotal, 0, paymentData.totalItem)}
            {renderTableRow('VAT', true, vat, 1, paymentData.totalTax)}
            {renderTableRow('Discount', true, discountValue, 2, paymentData.totalDiscount)}
            {renderTableRow('Total', false, paymentData.payableAmount, 4)} {/* Total row */}
            </TableBody>
        </Table>
        </Container>
    );
    };

export default CalculationTable;
  
  // StyledTableCell for custom styling
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // Add your custom styling here if needed
  }));
  
  const Container = styled(TableContainer)`
      position: fixed;
      margin-bottom: 20px;
      bottom: 0;
      /* left: 0; */
      background-color: white;
      box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
      z-index: 999;
      width: inherit;
  `;
  const StyledTable = styled(Table)`
    border-collapse: collapse;
  `;
