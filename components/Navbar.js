import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-teal-600 font-bold text-xl">Conectando tu Mundo</span>

        {/* Botón hamburguesa solo en móvil */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuAbierto ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        {/* Menú de navegación */}
        <div className={`md:flex space-x-6 ${menuAbierto ? 'block' : 'hidden'} md:block`}>
          <Link href="/" className="text-gray-700 hover:text-teal-600 block mt-2 md:mt-0">
            Inicio
          </Link>
          <Link href="/catalogo" className="text-gray-700 hover:text-teal-600 block mt-2 md:mt-0">
            Catálogo
          </Link>
          <Link href="/servicios" className="text-gray-700 hover:text-teal-600 block mt-2 md:mt-0">
            Servicios
          </Link>
          <Link href="/sobre-nosotros" className="text-gray-700 hover:text-teal-600 block mt-2 md:mt-0">
            Sobre Nosotros
          </Link>
          <Link href="/contacto" className="text-gray-700 hover:text-teal-600 block mt-2 md:mt-0">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
