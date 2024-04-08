import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;


export const getFormasPago = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/formas-pago/`, {
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

export const createFormaPago = async (formaPago) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/formas-pago/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formaPago),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const deleteFormaPago = async (id) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/formas-pago/${id}`, {
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

export const updateFormaPago = async (formaPago) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/formas-pago/${formaPago.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formaPago),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
