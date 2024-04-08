import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;
export const getUsuarios = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/users/find/all`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

}

export const deleteUsuario = async (id:number) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

}

export const updateUsuario = async (usuario) => {
  const token = localStorage.getItem('authToken');
  const roles = usuario.roles.map(role => role.name); // Mapea los roles a un array de strings
  const updatedUsuario = { ...usuario, roles }; // Crea un nuevo objeto con los roles actualizados
  const response = await fetch(`${API_BASE_URL}/users/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUsuario), // Usa el nuevo objeto al enviar la solicitud
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const createUsuario = async (usuario) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
// localhost:8080/users/find/by/username?username=ejemplo@correo.com
export const findUsuarioByUsername = async (username) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/users/find/by/username?username=${username}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

