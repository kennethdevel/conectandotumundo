import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/logo-conectando.jpg'; // Asegúrate de que la ruta del logo sea correcta

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo y Nombre de la Empresa */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo Conectando tu Mundo"
              width={80}
              height={50}
              className="mr-3"
            />
          </Link>
          <Link href="/" className="text-2xl font-bold text-teal-600">
            Conectando tu Mundo
          </Link>
        </div>

        {/* Menú de navegación */}
        <div className="space-x-4">
          <Link
            href="/"
            className="text-md font-medium text-gray-700 hover:text-teal-600"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="text-md font-medium text-gray-700 hover:text-teal-600"
          >
            Catálogo
          </Link>
          <Link
            href="/servicios"
            className="text-md font-medium text-gray-700 hover:text-teal-600"
          >
            Servicios
          </Link>
          <Link
            href="/sobre-nosotros"
            className="text-md font-medium text-gray-700 hover:text-teal-600"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/contacto"
            className="text-md font-medium text-gray-700 hover:text-teal-600"
          >
            Contacto
          </Link>
          <Link
            href="/cotizacion"
            className="text-md font-medium text-gray-700 hover:text-teal-600"
          >
            Cotización
          </Link>
        </div>
      </div>
    </nav>
  );
}

      

