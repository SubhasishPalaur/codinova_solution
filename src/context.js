import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export function ContextProvider({ children }) {
  const [productList, setProductList] = useState([]);

  const addProduct = (product) => {
   // Check if the product already exists in the list
   const existingProductIndex = productList.findIndex((p) => p.name === product.name);

   if (existingProductIndex !== -1) {
     // If the product exists, update its quantity and total
     const updatedList = [...productList];
     updatedList[existingProductIndex].quantity += 1;
     updatedList[existingProductIndex].total = (updatedList[existingProductIndex].quantity * updatedList[existingProductIndex].price).toString();
     setProductList(updatedList);
   } else {
     // If the product doesn't exist, add it to the list
     setProductList([...productList, { ...product, quantity: 1, total: product.price }]);
   }
  };

  const deleteProduct = (product, decreaseOnly) => {
     // Find the product index in the list
  const productIndex = productList.findIndex((p) => p.name === product.name);

  if (productIndex !== -1) {
    const updatedList = [...productList];

    if (decreaseOnly) {
      // Decrease the quantity and total if decreaseOnly is true
      if (updatedList[productIndex].quantity > 1) {
        updatedList[productIndex].quantity -= 1;
        updatedList[productIndex].total = (updatedList[productIndex].quantity * updatedList[productIndex].price).toString();
      } else {
        // If quantity is 1 or less, remove the product if decreaseOnly is true
        updatedList.splice(productIndex, 1);
      }
    } else {
      // Remove the product from the list if decreaseOnly is false
      updatedList.splice(productIndex, 1);
    }

    setProductList(updatedList);
  };
  };

  return (
    <ProductContext.Provider value={{ productList, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductList() {
  return useContext(ProductContext);
}
