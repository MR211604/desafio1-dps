'use client';
import { data } from "@/data";
import React from "react";


export const ProductList = ({
  allProducts = [], // valor por defecto para evitar undefined
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const onAddProduct = (product) => {
    //validamos que allProducts sea un array antes de usar .find
    if (Array.isArray(allProducts) && allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  return (
    <div className="container-items">
      {data.map(product => (
        <div className="item" key={product.id}>
          <figure>
            <img src={product.urlImage} alt={product.title} />
          </figure>
          <div className="info-product">
            <h2>{product.nameProduct}</h2>
            <p className="price">${product.price}</p>
            <button onClick={() => onAddProduct(product)}>
              Añadir al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
