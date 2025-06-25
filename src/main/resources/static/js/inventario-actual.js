document.addEventListener("DOMContentLoaded", () => {
    // FECHA HORA
    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    document.getElementById("fecha-reporte").textContent = fechaFormateada;

    fetch("/api/productos")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tabla-inventario");
            tbody.innerHTML = "";

            data.forEach(prod => {
                const total = prod.existencias * prod.precio;
                const fila = `
          <tr>
            <td>${prod.nombre}</td>
            <td>${prod.categoria?.nombre || ''}</td>
            <td>${prod.proveedor?.nombre || ''}</td>
            <td>${prod.existencias}</td>
            <td>S/ ${prod.precio.toFixed(2)}</td>
            <td>S/ ${total.toFixed(2)}</td>
          </tr>
        `;
                tbody.innerHTML += fila;
            });
        })
        .catch(err => {
            console.error("Error al cargar el inventario:", err);
        });
});

function descargarPDF() {
    import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js").then(jsPDF => {
        const { jsPDF: PDF } = jsPDF;
        const doc = new PDF();

        const ahora = new Date();
        const fechaHora = ahora.toLocaleString("es-PE", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

        doc.setFontSize(14);
        doc.text("Inventario Actual", 10, 10);
        doc.setFontSize(10);
        doc.text(`Fecha de generación: ${fechaHora}`, 10, 17);

        const rows = [];
        document.querySelectorAll("#tabla-inventario tr").forEach(row => {
            const cols = Array.from(row.querySelectorAll("td")).map(td => td.textContent);
            if (cols.length) rows.push(cols);
        });

        doc.autoTable({
            head: [["Producto", "Categoría", "Proveedor", "Existencias", "Precio", "Total"]],
            body: rows,
            startY: 25,
            styles: { fontSize: 10 }
        });

        doc.save("inventario_actual.pdf");
    });
}