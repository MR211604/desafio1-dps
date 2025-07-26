
export const Invoice = ({ products, total, user }) => {
  const date = new Date().toLocaleString();


  return (
    <div className="container">
      <h3 className="mb-4 text-center">Factura</h3>
      <p><strong>Cliente:</strong> {user?.username}</p>
      <p><strong>Fecha:</strong> {date}</p>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.quantity}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>${(p.price * p.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">Total</td>
            <td className="fw-bold">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
