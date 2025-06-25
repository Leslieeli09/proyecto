const API_BASE = "http://localhost:8081/api"; // PUERTO EN USO

export async function obtenerProductos() {
    const res = await fetch(`${API_BASE}/productos`);
    if (!res.ok) throw new Error("No se pudo cargar productos");
    return await res.json();
}

export async function guardarProducto(producto) {
    const res = await fetch(`${API_BASE}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });
    if (!res.ok) throw new Error("Error al guardar producto");
    return await res.json();
}

export async function eliminarProducto(id) {
    const res = await fetch(`${API_BASE}/productos/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar producto");
}
