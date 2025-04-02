import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow text-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold text-teal-600">Conectando tu Mundo</span>
        </Link>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/catalogo">Catálogo</Link></li>
          <li><Link href="/servicios">Servicios</Link></li>
          <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>
          <li><Link href="/contacto">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}
