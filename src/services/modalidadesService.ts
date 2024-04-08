import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;

export const createModalidad = async (modalidad) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/modalidades/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modalidad),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateModalidad = async (modalidad) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/modalidades`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modalidad),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

}

export const getModalidades = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/modalidades/`, {
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

export const deleteModalidad = async (id) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/modalidades/${id}`, {
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
