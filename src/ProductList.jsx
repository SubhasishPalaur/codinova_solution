import React, { useEffect } from "react";
import {product_json} from './constants'
import { useProductList } from "./context";

const ProductList = () => {
    const { addProduct } = useProductList()
   
    const svgStyle = {
        width: '50px',
        height: '50px',
        cursor: 'pointer'
      };
    const addTolist = (value) => {
        addProduct(value)
    }
    return (
        <>
          {product_json.map((value, index)=>
          (
            <img key={index} src={value.image} style={svgStyle} onClick={() => addTolist(value)}/>
          ))}
        </>
    )
}

export default ProductList