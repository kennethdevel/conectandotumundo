import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ShoppingCart, Settings } from 'lucide-react';
import logo from '../public/logoMejorado.png';

const links = [
  { href: '/',              label: 'Inicio' },
  { href: '/catalogo',      label: 'Catálogo' },
  { href: '/servicios',     label: 'Servicios' },
  { href: '/sobre-nosotros',label: 'Nosotros' },
  { href: '/contacto',      label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cantidadCotizacion, setCantidadCotizacion] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cotizacion = JSON.parse(localStorage.getItem('cotizacion')) || [];
    setCantidadCotizacion(cotizacion.length);
  }, [router.asPath]);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  const isActive = (href) => router.pathname === href;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-gray-900/95 backdrop-blur-md shadow-xl shadow-black/30 border-b border-gray-700/50'
        : 'bg-gray-900 border-b border-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-teal-500/30 group-hover:border-teal-400 transition-colors">
              <Image src={logo} alt="Logo" width={40} height={40} className="object-cover w-full h-full" />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">
              Conectando tu <span className="text-teal-400">Mundo</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(l.href)
                    ? 'text-teal-400 bg-teal-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Cotización */}
            <Link
              href="/cotizacion"
              className="relative flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/25"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:block">Cotizar</span>
              {cantidadCotizacion > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cantidadCotizacion}
                </span>
              )}
            </Link>

            {/* Admin */}
            <Link
              href="/admin"
              title="Panel Admin"
              className="p-2 rounded-xl text-gray-400 hover:text-teal-400 hover:bg-gray-800 transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(l.href)
                  ? 'text-teal-400 bg-teal-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-teal-400 hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" /> Panel Admin
          </Link>
        </div>
      )}
    </nav>
  );
}
