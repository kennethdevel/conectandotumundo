import Link from 'next/link'; // Asegúrate de importar Link
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/router';

export default function BotonCotizacion() {
  const [cantidad, setCantidad] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cotizacion = JSON.parse(localStorage.getItem('cotizacion')) || [];
    setCantidad(cotizacion.length);
  }, [router.asPath]); // se actualiza cada vez que cambia la ruta

  return (
    <Link
      href="/cotizacion"
      className="fixed bottom-6 right-6 z-50 bg-teal-600 hover:bg-teal-700 text-white rounded-full flex items-center px-4 py-3 shadow-lg transition duration-300"
    >
      <ShoppingCart className="w-6 h-6 mr-2" />
      <span className="hidden sm:inline">Ver cotización</span>
      {cantidad > 0 && (
        <span className="ml-2 bg-white text-teal-700 font-bold text-xs px-2 py-0.5 rounded-full">
          {cantidad}
        </span>
      )}
    </Link>
  );
}

