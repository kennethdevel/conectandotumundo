import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/">
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logo.jpg"
            alt="Logo Conectando tu Mundo"
            className="h-8 w-auto"// ajustamos la altura del logo
          />
          <span className="text-teal-600 font-bold text-xl hidden sm:inline">
            Conectando tu Mundo
          </span>
        </div>
      </Link>

      <div className="space-x-6 text-sm text-gray-700 font-medium">
        <Link href="/" className="hover:text-teal-600">Inicio</Link>
        <Link href="/catalogo" className="hover:text-teal-600">Catálogo</Link>
        <Link href="/servicios" className="hover:text-teal-600">Servicios</Link>
        <Link href="/sobre-nosotros" className="hover:text-teal-600">Sobre Nosotros</Link>
        <Link href="/contacto" className="hover:text-teal-600">Contacto</Link>
        <Link href="/cotizacion" className="hover:text-teal-600">Cotización</Link>
      </div>
    </nav>
  );
}

