import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;
export const createTipoPago = async (tipoPago) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/tipo-pagos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tipoPago),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateTipoPago = async (tipoPago) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/tipo-pagos/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tipoPago),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

}

export const deleteTipoPago = async (id) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/tipo-pagos/${id}`, {
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

export const getTipoPagos = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/tipo-pagos/`, {
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
