// URL base del endpoint
const API_URL = "http://localhost/CRUD-main/backend/api_productos.php";

// Obtener todos los productos y mostrarlos al cargar la página
document.addEventListener('DOMContentLoaded', listarProductos);

// Obtener todos los productos (GET)
function listarProductos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => mostrarTablaProductos(data));
}

// Mostrar la tabla de productos con botón eliminar
function mostrarTablaProductos(productos) {
  const container = document.getElementById('productosContainer');
  if (!Array.isArray(productos) || productos.length === 0) {
    container.innerHTML = '<p>No hay productos para mostrar.</p>';
    return;
  }
  let html = `
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="color:#b0b3b8;">ID</th>
          <th style="color:#b0b3b8;">Nombre</th>
          <th style="color:#b0b3b8;">Descripción</th>
          <th style="color:#b0b3b8;">Precio</th>
          <th style="color:#b0b3b8;">Acción</th>
        </tr>
      </thead>
      <tbody>
  `;
 productos.forEach(p => {
  const rutaImagen = `../controlador/img/${p.id}.jpg`;
  html += `
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.descripcion}</td>
      <td>${p.precio}</td>
      <td>
        <img src="${rutaImagen}" alt="Imagen" style="width:40px;height:40px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="mostrarModalImagen('${rutaImagen}')">
        <br>
        <button onclick="eliminarProducto(${p.id})" style="background:#181a1b;color:#fff;border:none;padding:5px 12px;border-radius:4px;cursor:pointer;margin-top:6px;">Eliminar</button>
        <button onclick="cargarProductoEnFormulario('${p.nombre.replace(/'/g, "\\'")}', '${p.descripcion.replace(/'/g, "\\'")}', ${p.precio}, ${p.id})" style="background:#23272b;color:#50c8ff;border:none;padding:5px 12px;border-radius:4px;cursor:pointer;margin-left:6px;margin-top:6px;">Cargar</button>
      </td>
    </tr>
  `;
});
  html += '</tbody></table>';
  container.innerHTML = html;
}

console.log("JS cargado");
// Nueva función para cargar datos en el formulario
let productoEditandoId = null;

// Modifica cargarProductoEnFormulario para activar modo edición
function cargarProductoEnFormulario(nombre, descripcion, precio, id) {
  document.getElementById('nombreProducto').value = nombre;
  document.getElementById('descripcionProducto').value = descripcion;
  document.getElementById('precioProducto').value = precio;
  productoEditandoId = id;

  // Cambia el botón a "Editar"
  const btn = document.querySelector('#formAgregarProducto button');
  btn.textContent = "Editar";
  btn.onclick = editarProductoDesdeFormulario;
}

// Eliminar un producto (DELETE)
function eliminarProducto(id) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
      fetch(`${API_URL}?id=${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      
        listarProductos();
       
    })
    .catch(err => {
      document.getElementById('output').textContent = "Error al eliminar producto.";
      console.error("Error al eliminar producto:", err);
    });
  }
  

}

// Función para manejar el formulario
function agregarProductoDesdeFormulario() {
  let nombre = document.getElementById('nombreProducto').value;
  let descripcion = document.getElementById('descripcionProducto').value;
  let precio = parseFloat(document.getElementById('precioProducto').value);
  let imagen = document.getElementById('imagenProducto').files[0];

  let formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('precio', precio);
  if (imagen) {
    formData.append('imagen', imagen);
  }

  fetch(API_URL, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      listarProductos();
    })
    .catch(err => {
      document.getElementById('output').textContent = "Error al agregar producto.";
      console.error("Error al agregar producto:", err);
    });

  document.getElementById('formAgregarProducto').reset();
  // Asegura que el botón vuelva a modo agregar
  const btn = document.querySelector('#formAgregarProducto button');
  btn.textContent = "Agregar";
  btn.onclick = agregarProductoDesdeFormulario;
  productoEditandoId = null;
}

// Nueva función para editar producto
function editarProductoDesdeFormulario() {
  let nombre = document.getElementById('nombreProducto').value;
  let descripcion = document.getElementById('descripcionProducto').value;
  let precio = parseFloat(document.getElementById('precioProducto').value);

  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: productoEditandoId, nombre, descripcion, precio })
  })
    .then(res => res.json())
    .then(data => {
      listarProductos();
      document.getElementById('formAgregarProducto').reset();
      // Vuelve a modo agregar
      const btn = document.querySelector('#formAgregarProducto button');
      btn.textContent = "Agregar";
      btn.onclick = agregarProductoDesdeFormulario;
      productoEditandoId = null;
    })
    .catch(err => {
      document.getElementById('output').textContent = "Error al editar producto.";
      console.error("Error al editar producto:", err);
    });
}

// Agregar un producto nuevo (POST)
function agregarProducto(nombre, descripcion, precio) {
   fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, precio })
  })
    .then(res => res.json())
    .then(data => {
      listarProductos();
    })
    .catch(err => {
      document.getElementById('output').textContent = "Error al agregar producto.";
      console.error("Error al agregar producto:", err);
    });
}

function mostrarModalImagen(src) {
  const modal = document.getElementById('modalImagen');
  const img = document.getElementById('imgModal');
  img.src = src;
  modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modalImagen');
  const cerrar = document.getElementById('cerrarModal');
  if (cerrar) {
    cerrar.onclick = function() {
      modal.style.display = 'none';
      document.getElementById('imgModal').src = '';
    };
  }
  if (modal) {
    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.getElementById('imgModal').src = '';
      }
    };
  }
});
