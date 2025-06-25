let proveedorEditandoId = null; // Para saber si estamos editando

document.addEventListener('DOMContentLoaded', () => {
    cargarProveedores();

    const form = document.getElementById('form-proveedor');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        guardarProveedor();
    });
});

function cargarProveedores() {
    fetch('/api/proveedores')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-proveedores');
            tbody.innerHTML = '';
            data.forEach(p => {
                const fila = `
          <tr>
            <td>${p.nombre}</td>
            <td>${p.contacto}</td>
            <td>${p.telefono}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary" onclick="editarProveedor(${p.id}, '${p.nombre}', '${p.contacto}', '${p.telefono}')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="eliminarProveedor(${p.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>`;
                tbody.innerHTML += fila;
            });
        })
        .catch(err => {
            console.error('Error al cargar proveedores:', err);
        });
}

function guardarProveedor() {
    const nombre = document.getElementById('nombre').value.trim();
    const contacto = document.getElementById('contacto').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    const datos = { nombre, contacto, telefono };
    let url = '/api/proveedores';
    let metodo = 'POST';

    if (proveedorEditandoId) {
        url += `/${proveedorEditandoId}`;
        metodo = 'PUT';
    }

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(res => {
            if (!res.ok) throw new Error('Error al guardar proveedor');
            return res.json();
        })
        .then(() => {
            document.getElementById('form-proveedor').reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalProveedor'));
            modal.hide();
            proveedorEditandoId = null; // Reset ID
            cargarProveedores();
        })
        .catch(err => {
            console.error('Error al guardar proveedor:', err);
        });
}

function eliminarProveedor(id) {
    if (!confirm('¿Deseas eliminar este proveedor?')) return;

    fetch(`/api/proveedores/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) throw new Error('Error al eliminar proveedor');
            cargarProveedores();
        })
        .catch(err => {
            console.error('Error al eliminar proveedor:', err);
        });
}

function editarProveedor(id, nombre, contacto, telefono) {
    proveedorEditandoId = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('contacto').value = contacto;
    document.getElementById('telefono').value = telefono;

    const modal = new bootstrap.Modal(document.getElementById('modalProveedor'));
    modal.show();
}