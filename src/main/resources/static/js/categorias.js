document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();

  const formCategoria = document.getElementById('form-categoria');
  formCategoria.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formCategoria.dataset.editando === "true") {
      actualizarCategoria();
    } else {
      guardarCategoria();
    }
  });
});

function cargarCategorias() {
  fetch('/api/categorias')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('tabla-categorias');
      tbody.innerHTML = '';
      data.forEach(cat => {
        const fila = `
          <tr>
            <td>${cat.nombre}</td>
            <td>${cat.descripcion}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary me-1" onclick="editarCategoria(${cat.id}, '${cat.nombre}', '${cat.descripcion}')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="eliminarCategoria(${cat.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>`;
        tbody.innerHTML += fila;
      });
    })
    .catch(err => {
      console.error('Error al cargar categorías:', err);
    });
}

function guardarCategoria() {
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();

  fetch('/api/categorias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, descripcion })
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al guardar categoría');
      return res.json();
    })
    .then(() => {
      cerrarModal();
      cargarCategorias();
    })
    .catch(err => {
      console.error('Error al guardar categoría:', err);
    });
}

function eliminarCategoria(id) {
  if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

  fetch(`/api/categorias/${id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al eliminar');
      cargarCategorias();
    })
    .catch(err => {
      console.error('Error al eliminar categoría:', err);
    });
}

function editarCategoria(id, nombre, descripcion) {
  document.getElementById('nombre').value = nombre;
  document.getElementById('descripcion').value = descripcion;
  document.getElementById('form-categoria').dataset.editando = "true";
  document.getElementById('form-categoria').dataset.id = id;

  const modal = new bootstrap.Modal(document.getElementById('modalCategoria'));
  modal.show();
}

function actualizarCategoria() {
  const id = document.getElementById('form-categoria').dataset.id;
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();

  fetch(`/api/categorias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, nombre, descripcion })
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al actualizar categoría');
      return res.json();
    })
    .then(() => {
      cerrarModal();
      cargarCategorias();
    })
    .catch(err => {
      console.error('Error al actualizar categoría:', err);
    });
}

function cerrarModal() {
  document.getElementById('form-categoria').reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalCategoria'));
  modal.hide();
  delete document.getElementById('form-categoria').dataset.editando;
  delete document.getElementById('form-categoria').dataset.id;
}
