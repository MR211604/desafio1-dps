"use client";
import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.css'; // Import bootstrap CSS
import { Headers } from "../components/Header";
import { LoginForm } from "../components/LoginForm"; // nuevo componente
import { ProductList } from "../components/ProductList";
import { RegisterForm } from "../components/RegistrerForm"; // nuevo componente
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  
  const { user, loading, login, register, logout } = useAuth();

  useEffect(() => {
    // Dynamically import Bootstrap's JavaScript bundle
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []); // Empty dependency array ensures it runs once on mount
  
  if (loading) {
    return (
      <div className="container h-screen d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container h-screen flex flex-column justify-content-center align-items-center">
      {!user ? (
        <>
          <RegisterForm onRegister={register} />
          <LoginForm onLogin={login} />
        </>
      ) : (
        <>
          <Headers
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
            user={user}
            onLogout={logout}
          />

          <ProductList
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />

        </>
      )}
    </div>
  );
}
