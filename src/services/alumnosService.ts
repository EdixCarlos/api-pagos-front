import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;


export const getAlumno = async (codigo) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/alumnos/${codigo}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getAlumnos = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/alumnos/?page=0&size=100000`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const createAlumno = async (alumno) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/alumnos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(alumno),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateAlumno = async (alumno) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/alumnos`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(alumno),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

}

export const deleteAlumno = async (id) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/alumnos/${id}`, {
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
