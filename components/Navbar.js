import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logoMejorado.png';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-teal-500 to-teal-700 shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" width={100} height={100} />
          <span className="text-white text-2xl font-semibold">Conectando tu Mundo</span>
        </div>
        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-teal-200 transition duration-300">Inicio</Link>
          <Link href="/catalogo" className="text-white hover:text-teal-200 transition duration-300">Catálogo</Link>
          <Link href="/servicios" className="text-white hover:text-teal-200 transition duration-300">Servicios</Link>
          <Link href="/sobre-nosotros" className="text-white hover:text-teal-200 transition duration-300">Sobre Nosotros</Link>
          <Link href="/contacto" className="text-white hover:text-teal-200 transition duration-300">Contacto</Link>
          <Link href="/cotizacion" className="text-white hover:text-teal-200 transition duration-300">Cotización</Link>
        </div>
      </div>
    </nav>
  );
}


      

