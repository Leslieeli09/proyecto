document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/dashboard')
    .then(res => res.json())
    .then(data => {
      document.getElementById('total-productos').textContent = data.totalProductos;
      document.getElementById('total-stock').textContent = data.totalStock;
      document.getElementById('valor-inventario').textContent = `S/ ${data.valorTotalInventario.toFixed(2)}`;
    })
    .catch(err => {
      console.error('Error al cargar dashboard:', err);
    });
});