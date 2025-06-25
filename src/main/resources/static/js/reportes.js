document.addEventListener('DOMContentLoaded', () => {
  cargarModuloReportes();
});

function cargarModuloReportes() {
  fetch('/api/modulos/reportes')
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('secciones-reportes');
      contenedor.innerHTML = '';

      data.secciones.forEach(sec => {
        const card = `
        <div class="col-md-6">
          <a href="${sec.ruta}" class="text-decoration-none text-dark">
            <div class="card shadow-sm border-start-${sec.estado === 'activo' ? 'success' : 'secondary'} border-4 h-100">
              <div class="card-body">
                <h5 class="card-title">${sec.titulo}</h5>
                <p class="card-text">${sec.descripcion}</p>
                <p><strong>Ruta:</strong> <code>${sec.ruta}</code></p>
                <p><strong>Estado:</strong> ${sec.estado}</p>
                <p class="text-muted"><small>Última actualización: ${new Date(sec.ultimaActualizacion).toLocaleString()}</small></p>
              </div>
            </div>
          </a>
        </div>`;
        contenedor.innerHTML += card;
      });
    })
    .catch(err => {
      console.error('Error al cargar el módulo de reportes:', err);
    });
}