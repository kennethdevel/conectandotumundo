import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/router';

export default function BotonCotizacion() {
  const [cantidad, setCantidad] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      const cotizacion = JSON.parse(localStorage.getItem('cotizacion')) || [];
      setCantidad(cotizacion.length);
    } catch {
      setCantidad(0);
    }
  }, [router.asPath]);

  // No mostrar en la página de cotización ni en admin
  if (router.pathname === '/cotizacion' || router.pathname === '/admin') return null;

  return (
    <Link
      href="/cotizacion"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl px-4 py-3 shadow-2xl shadow-teal-500/30 transition-all duration-300 hover:shadow-teal-500/50 hover:-translate-y-0.5 glow-teal group"
    >
      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline font-medium text-sm">Cotización</span>
      {cantidad > 0 && (
        <span className="bg-red-500 text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
          {cantidad > 9 ? '9+' : cantidad}
        </span>
      )}
    </Link>
  );
}
