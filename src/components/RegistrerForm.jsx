'use client';
import { useState } from "react";

export const RegisterForm = ({ onRegister }) => {
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await onRegister(newUser.username, newUser.password);
    
    if (result.success) {
      alert(result.message);
      setNewUser({ username: "", password: "" });
    } else {
      alert(result.message);
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="container mt-5 p-4 border rounded shadow bg-light" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Registro</h3>

      <div className="mb-3">
        <label htmlFor="username" className="form-label">Nombre de usuario</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Nombre de usuario"
          value={newUser.username}
          onChange={e => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="btn btn-dark w-100" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
};
