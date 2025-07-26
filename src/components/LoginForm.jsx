import React, { useState } from "react";

export const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await onLogin(credentials.username, credentials.password);
    
    if (result.success) {
      alert(result.message);
      setCredentials({ username: "", password: "" });
    } else {
      alert(result.message);
    }
    
    setLoading(false);
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

      <button type="submit" className="btn btn-dark w-100" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Ingresar'}
      </button>
    </form>
  );
};
