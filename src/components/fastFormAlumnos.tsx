import { Button } from '@/components/custom/button';
import { Link } from 'react-router-dom';

export function FastFormAlumnos() {
  return (
      <Link to="/alumnos/matriculas">
        <Button
          variant='outline' className='h-8 px-2 lg:px-3'
        >
          Registro rápido de alumnos
        </Button>
      </Link>
  );
}
