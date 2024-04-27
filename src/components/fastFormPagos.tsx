import { Button } from '@/components/custom/button';
import { Link } from 'react-router-dom';

export function FastFormPagos() {
  return (
      <Link to="/pagos/rapido">
        <Button
          variant='outline' className='h-8 px-2 lg:px-3'
        >
          Registro rápido de Pagos
        </Button>
      </Link>
  );
}
