import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;



export const getDeudas = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/deudas/?page=0&size=100000`, {
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

export const createDeuda = async (carrera) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/deudas/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carrera),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateDeuda = async  (carrera) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/deudas`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carrera),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

}
export const deleteDeuda = async (id: number) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/deudas/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // No intentes analizar la respuesta como JSON si la respuesta está vacía
  if (response.status !== 204 && response.statusText !== 'No Content') {
    const responseBody = await response.text();
    if (responseBody) {
      return JSON.parse(responseBody);
    }
  }
};
