document.addEventListener("DOMContentLoaded", () => {

    const ahora = new Date();
    const fechaHoraFormateada = ahora.toLocaleString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('fecha-reporte').textContent = fechaHoraFormateada;

    fetch("/api/productos")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tabla-reporte-productos");
            tbody.innerHTML = "";

            data.forEach(prod => {
                const estado = prod.existencias === 0
                    ? '<span class="badge bg-danger">Sin stock</span>'
                    : prod.existencias < 5
                        ? '<span class="badge bg-warning text-dark">Bajo stock</span>'
                        : '<span class="badge bg-success">Disponible</span>';
                const fila = `
                    <tr>
                        <td>${prod.nombre}</td>
                        <td>${prod.categoria?.nombre || ''}</td>
                        <td>${prod.proveedor?.nombre || ''}</td>
                        <td>${prod.existencias}</td>
                        <td>S/ ${prod.precio.toFixed(2)}</td>
                        <td>${estado}</td>
                    </tr>`;
                tbody.innerHTML += fila;
            });
        })
        .catch(err => {
            console.error("Error al cargar reporte de productos:", err);
        });
});