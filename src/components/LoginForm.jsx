import React, { useState } from "react";

export const LoginForm = ({ users, setUser }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    const userFound = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (userFound) {
      setUser(userFound);
      alert("¡Bienvenido, " + credentials.username + "!");
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="container mt-5 p-4 border rounded shadow bg-light" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Inicio de sesión</h3>

      <div className="mb-3">
        <label htmlFor="loginUser" className="form-label">Usuario</label>
        <input
          type="text"
          className="form-control"
          id="loginUser"
          placeholder="Usuario"
          value={credentials.username}
          onChange={e => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="loginPass" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="loginPass"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">Ingresar</button>
    </form>
  );
};
