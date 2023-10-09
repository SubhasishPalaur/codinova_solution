import React from "react";
import CartList from "./CartList";
import { styled } from "styled-components";
import { Button } from "@mui/material";
import CalculationTable from "./CalculationTable";

const ProductPurchaseDetails = () => {
    return (
        <PageContainer>
         <CartList/>
         <CalculationTable/>
        </PageContainer>
    )
}

export default ProductPurchaseDetails

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20px; /* Adjust this as needed */
`;