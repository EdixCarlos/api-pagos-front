import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService.ts';

export function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const isExpired = await authService.isTokenExpired();
      if (isExpired) {
        navigate('/sign-in');
      }
    };

    checkToken();
  }, [navigate]);
}
