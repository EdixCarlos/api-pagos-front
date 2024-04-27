import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;
export const createTipoEgreso = async (tipoEgreso) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/tipo-egreso/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tipoEgreso),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getTiposEgreso = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/tipo-egreso/`, {
    method: 'GET',
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

export const updateTipoEgreso = async (tipoEgreso) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/tipo-egreso/${tipoEgreso.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tipoEgreso),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const deleteTipoEgreso = async (tipoEgresoId) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/tipo-egreso/${tipoEgresoId}`, {
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
};
