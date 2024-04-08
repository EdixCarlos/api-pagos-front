import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;

export const createMatricula = async (matricula) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/matriculas/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(matricula),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateMatricula = async (matricula) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/matriculas`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(matricula),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

}

export const deleteMatricula = async (matriculaId) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/matriculas/${matriculaId}`, {
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

export const getMatriculas = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/matriculas/`, {
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
