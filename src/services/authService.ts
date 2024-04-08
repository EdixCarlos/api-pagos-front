import { config } from '@/lib/config.ts'
import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = config.apiUrl;

const login = async (data: LoginDto) => {
  const response = await fetch(`${API_BASE_URL}/users/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  const { token } = responseData;
  // Guarda el token en el almacenamiento local
  localStorage.setItem('authToken', token);
  return responseData;
};

// authService.ts
const isTokenExpired = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return true;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000;

    if (Date.now() >= expirationDate) {
      return true;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }

  return false;
};

export default {
  login,
  isTokenExpired,
};
