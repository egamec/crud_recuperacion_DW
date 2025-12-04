const API_URL = 'http://localhost:3000/api/usuarios';

// Elementos del DOM
const form = document.getElementById('usuario-form');
const formTitle = document.getElementById('form-title');
const usuarioId = document.getElementById('usuario-id');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const edadInput = document.getElementById('edad');
const ciudadInput = document.getElementById('ciudad');
const cancelarBtn = document.getElementById('cancelar-btn');
const tbody = document.getElementById('usuarios-tbody');

// Cargar usuarios al iniciar
document.addEventListener('DOMContentLoaded', cargarUsuarios);

// Enviar formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    nombre: nombreInput.value,
    email: emailInput.value,
    edad: parseInt(edadInput.value),
    ciudad: ciudadInput.value
  };

  try {
    if (usuarioId.value) {
      // Actualizar
      await fetch(`${API_URL}/${usuarioId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
      alert('Usuario actualizado exitosamente');
    } else {
      // Crear
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
      alert('Usuario creado exitosamente');
    }

    limpiarFormulario();
    cargarUsuarios();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

// Cancelar edición
cancelarBtn.addEventListener('click', limpiarFormulario);

// Cargar usuarios
async function cargarUsuarios() {
  try {
    const response = await fetch(API_URL);
    const usuarios = await response.json();

    tbody.innerHTML = '';

    usuarios.forEach(usuario => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.edad}</td>
        <td>${usuario.ciudad}</td>
        <td class="acciones">
          <button class="btn btn-edit" onclick="editarUsuario('${usuario._id}')">Editar</button>
          <button class="btn btn-delete" onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
}

// Editar usuario
async function editarUsuario(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const usuario = await response.json();

    usuarioId.value = usuario._id;
    nombreInput.value = usuario.nombre;
    emailInput.value = usuario.email;
    edadInput.value = usuario.edad;
    ciudadInput.value = usuario.ciudad;

    formTitle.textContent = 'Editar Usuario';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    alert('Error al cargar usuario: ' + error.message);
  }
}

// Eliminar usuario
async function eliminarUsuario(id) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      alert('Usuario eliminado exitosamente');
      cargarUsuarios();
    } catch (error) {
      alert('Error al eliminar usuario: ' + error.message);
    }
  }
}

// Limpiar formulario
function limpiarFormulario() {
  form.reset();
  usuarioId.value = '';
  formTitle.textContent = 'Agregar Usuario';
}
