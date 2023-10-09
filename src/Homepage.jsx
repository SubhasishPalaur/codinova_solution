import React from "react";
import { styled } from "styled-components";
import ProductList from "./ProductList";
import ProductPurchaseDetails from "./components/ProductPurchaseDetails";

const HomePage = ()=> {
    return (
        <Container>
            <LeftSection>
                <ProductPurchaseDetails/>
            </LeftSection>
                <Divider />
            <RightSection>
                <ProductList/>
            </RightSection>
        </Container>
    )
}

export default HomePage


const Container = styled.div`
  display: flex;
  /* height: 100vh; */
  background-color: #f0f0f0; /* Background color for the entire container */
`;

const LeftSection = styled.div`
  flex: 4; /* Takes up 30% of the available space */
  padding: 20px;
`;

const Divider = styled.div`
  flex: 0.1; /* Divider takes up 10% of the available space */
  background-color: #ddd; /* Background color for the divider */
`;

const RightSection = styled.div`
  flex: 6; /* Takes up 70% of the available space */
  padding: 20px;
`;

