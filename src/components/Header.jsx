"use client";

import { useState } from 'react';
import { Invoice } from './Invoice';

export const Headers = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
    user,
    onLogout,
}) => {

    const [active, setActive] = useState(false);

    const [isInvoiceActive, setIsInvoiceActive] = useState(false)


    const onDeleteProduct = (product) => {
        const confirmDialog = confirm('¿Está seguro de querer eliminar este producto?');

        if (confirmDialog) {
            const results = allProducts.filter(item => item.id !== product.id);
            setTotal(total - product.price * product.quantity);
            setCountProducts(countProducts - product.quantity);
            setAllProducts(results);
        }
    };

    const substractCount = (product) => {

            const results = allProducts.map(item => {
                if (item.id === product.id) {
                    item.quantity -= 1;
                }
                return item;
            }).filter(item => item.quantity > 0);

            setTotal(total - product.price);
            setCountProducts(countProducts - 1);
            setAllProducts(results);
    };

    const addCount = (product) => {
         const results = allProducts.map(item => {
                if (item.id === product.id) {
                    item.quantity += 1;
                }
                return item;
            }).filter(item => item.quantity > 0);

            setTotal(total + product.price);
            setCountProducts(countProducts + 1);
            setAllProducts(results);
    }

    const onCleanCart = () => {
        const confirmDialog = confirm('¿Está seguro de querer vaciar este carrito?');
        if (confirmDialog) {
            setAllProducts([]);
            setTotal(0);
            setCountProducts(0);
        }
    };
    return (
        <header>
            <h1>ZonaDigiPobre</h1>
            
            <div className="d-flex align-items-center ms-auto me-2">
                <span className="me-3 text-dark">Bienvenido, {user?.username}</span>
                
                <button 
                    className='btn btn-outline-danger'
                    onClick={onLogout}
                >
                    Cerrar sesión
                </button>

                <button 
                    className='btn bg-black text-white mx-3'
                    data-bs-toggle="modal" 
                    data-bs-target="#invoiceModal"
                    onClick={() => setIsInvoiceActive(true)}
                >
                    Generar factura
                </button>
                
                
            </div>

            <div className="container-icon">
                <div
                    className="container-cart-icon"
                    onClick={() => setActive(!active)}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
                        alt="carrito"
                        className="icon-cart"
                    />

                    <div className="count-products">
                        <span id="contador-productos">{countProducts}</span>
                    </div>
                </div>

                <div
                    className={`container-cart-products ${active ? '' : 'hidden-cart'
                        }`}
                >
                    {Array.isArray(allProducts) && allProducts.length ? (
                        <>
                            <div className="row-product">
                                {allProducts.map(product => (
                                    <div className="cart-product d-flex justify-content-between align-items-center p-3 mb-3 border rounded" key={product.id}>
                                        <div className="info-cart-product d-flex align-items-center">
                                            <span className="cantidad-producto-carrito me-3 bg-black p-2 text-center text-white rounded">
                                                {product.quantity}
                                            </span>
                                            <div className="product-details">
                                                <p className="titulo-producto-carrito mb-0 fw-bold">
                                                    {product.title}
                                                </p>
                                                <span className="precio-producto-carrito text-success fw-semibold">
                                                    ${product.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='m-4'>
                                        <button className='btn btn-dark me-2' onClick={() => substractCount(product)}> - </button>
                                        <button className='btn btn-dark' onClick={() => addCount(product)}> + </button>
                                        </div>
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/786/786195.png"
                                            alt="cerrar"
                                            className="icon-close"
                                            onClick={() => onDeleteProduct(product)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="cart-total d-flex justify-content-between align-items-center p-3 mt-3 bg-light border-top">
                                <h3 className="mb-0 fw-bold">Total:</h3>
                                <span className="total-pagar fs-4 fw-bold text-black">${total}</span>
                            </div>

                            <button className="btn btn-dark w-100 mt-3 py-2 mb-3" onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className="cart-empty">El carrito está vacío</p>
                    )}
                </div>
            </div>

            {/* Modal de Bootstrap para mostrar la factura */}
            <div 
                className="modal fade" 
                id="invoiceModal" 
                tabIndex="-1" 
                aria-labelledby="invoiceModalLabel" 
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="invoiceModalLabel">Factura Generada</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                                onClick={() => setIsInvoiceActive(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {isInvoiceActive && (
                                <Invoice 
                                    products={allProducts}
                                    total={total}
                                    user={user}
                                />
                            )}
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                                onClick={() => setIsInvoiceActive(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};