document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  cargarCategoriasSelect();
  cargarProveedoresSelect();

  document.getElementById('form-producto').addEventListener('submit', e => {
    e.preventDefault();
    guardarProducto();
  });
});

function cargarProductos() {
  fetch('/api/productos')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('tabla-productos');
      tbody.innerHTML = '';
      data.forEach(prod => {
        const fila = `
          <tr 
            data-id="${prod.id}"
            data-nombre="${prod.nombre}"
            data-descripcion="${prod.descripcion}"
            data-etiquetas="${prod.etiquetas || ''}"
            data-existencias="${prod.existencias}"
            data-precio="${prod.precio}"
            data-categoria="${prod.categoria?.id || ''}"
            data-proveedor="${prod.proveedor?.id || ''}"
          >
            <td>${prod.nombre}</td>
            <td>${prod.categoria?.nombre || ''}</td>
            <td>${prod.proveedor?.nombre || ''}</td>
            <td>${prod.existencias}</td>
            <td>S/ ${prod.precio.toFixed(2)}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary me-1" onclick="cargarProductoEditar(this)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${prod.id})">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>`;
        tbody.innerHTML += fila;
      });
    })
    .catch(err => console.error('Error al cargar productos:', err));
}

function cargarCategoriasSelect() {
  fetch('/api/categorias')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('categoria');
      select.innerHTML = '<option value="">Seleccione una categoría</option>';
      data.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.nombre;
        select.appendChild(option);
      });
    });
}

function cargarProveedoresSelect() {
  fetch('/api/proveedores')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('proveedor');
      select.innerHTML = '<option value="">Seleccione un proveedor</option>';
      data.forEach(prov => {
        const option = document.createElement('option');
        option.value = prov.id;
        option.textContent = prov.nombre;
        select.appendChild(option);
      });
    });
}

function guardarProducto() {
  const id = document.getElementById('producto-id').value;
  const producto = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    etiquetas: document.getElementById('etiquetas').value,
    existencias: parseInt(document.getElementById('existencias').value),
    precio: parseFloat(document.getElementById('precio').value),
    categoria: { id: parseInt(document.getElementById('categoria').value) },
    proveedor: { id: parseInt(document.getElementById('proveedor').value) }
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/productos/${id}` : '/api/productos';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  })
    .then(res => {
      if (!res.ok) throw new Error('No se pudo guardar/editar');
      return res.json();
    })
    .then(() => {
      document.getElementById('form-producto').reset();
      document.getElementById('producto-id').value = '';
      bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide();
      cargarProductos();
    })
    .catch(err => {
      console.error('Error al guardar producto:', err);
    });
}

function eliminarProducto(id) {
  if (!confirm('¿Deseas eliminar este producto?')) return;

  fetch(`/api/productos/${id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al eliminar producto');
      cargarProductos();
    })
    .catch(err => {
      console.error('Error al eliminar producto:', err);
    });
}

function cargarProductoEditar(btn) {
  const tr = btn.closest('tr');

  document.getElementById('producto-id').value = tr.dataset.id;
  document.getElementById('nombre').value = tr.dataset.nombre;
  document.getElementById('descripcion').value = tr.dataset.descripcion;
  document.getElementById('etiquetas').value = tr.dataset.etiquetas;
  document.getElementById('existencias').value = tr.dataset.existencias;
  document.getElementById('precio').value = tr.dataset.precio;
  document.getElementById('categoria').value = tr.dataset.categoria;
  document.getElementById('proveedor').value = tr.dataset.proveedor;

  new bootstrap.Modal(document.getElementById('modalProducto')).show();
}