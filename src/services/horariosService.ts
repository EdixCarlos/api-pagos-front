import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;


export const getHorarios = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/horarios/`, {
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

export const createHorario = async (horario) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/horarios/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(horario),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateHorario = async (horario) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/horarios`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(horario),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();

}

export const deleteHorario = async (id) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/horarios/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
