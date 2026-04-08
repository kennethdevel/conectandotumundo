import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Button from '../components/Button'; // Importá el mismo botón que ya creamos

export default function OtraPagina() {
  const router = useRouter();

  const handleVolver = () => {
    router.push('/');
  };

  return (
    <>
      <Navbar />
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">¡Llegaste a otra página!</h1>
        <p className="mt-2">Esta es una página de prueba para el botón.</p>
        <Button onClick={() => router.push('/')}>
          Volver al inicio
        </Button>
      </div>
    </>
  );
}
