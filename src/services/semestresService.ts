import { config } from '@/lib/config.ts'

const API_BASE_URL = config.apiUrl;
export const getSemestres = async (estado = 'ACTIVO') => {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`${API_BASE_URL}/semestres/?estado=${estado}&page=0&size=100000`, {
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

export const createSemestre = async (semestre) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/semestres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(semestre),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }

}

export const createSemestreInCarrera = async (semestre) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/semestres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(semestre),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }

}

export const deleteSemestre = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/semestres/${id}`, {
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
  } catch (error) {
    console.error(error);
  }

}
export const updateSemestre = async (semestre) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/semestres`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(semestre),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
