import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import sinpe from '../public/SINPE.jpg';
import bac   from '../public/BAC.png';

const navLinks = [
  { href: '/',               label: 'Inicio' },
  { href: '/catalogo',       label: 'Catálogo' },
  { href: '/servicios',      label: 'Servicios' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/contacto',       label: 'Contacto' },
  { href: '/cotizacion',     label: 'Cotización' },
];

const metodosPago = [
  { src: sinpe, alt: 'SINPE Móvil', label: 'SINPE Móvil / Transferencia' },
  { src: bac,   alt: 'BAC Tasa 0',  label: 'BAC 3-6 meses tasa 0' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-auto">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-teal-500/30">
                <Image src="/logoMejorado.png" alt="Logo" width={40} height={40} className="object-cover w-full h-full" unoptimized />
              </div>
              <span className="text-white font-bold text-lg">
                Conectando tu <span className="text-teal-400">Mundo</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Soluciones tecnológicas para hogares y empresas en Costa Rica. Asesoría, instalación y soporte.
            </p>
            <a
              href="https://wa.me/50684894314"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600/20 hover:bg-green-600 border border-green-600/30 hover:border-green-600 text-green-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: +506 8489-4314
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+506 8489-4314</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">San José, Costa Rica</span>
              </li>
            </ul>
          </div>

          {/* Métodos de pago */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Métodos de Pago</h3>
            <div className="space-y-3">
              {metodosPago.map((m, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                    <Image src={m.src} alt={m.alt} width={36} height={36} className="object-contain w-full h-full" />
                  </div>
                  <span className="text-gray-300 text-xs font-medium">{m.label}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-3 leading-relaxed">
              3 o 6 meses tasa 0 • 12, 18, 24 meses al 2.9%
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700/60 py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            © {year} Conectando tu Mundo · Todos los derechos reservados
          </p>
          <p className="text-gray-600 text-xs">
            Hecho con ❤ en Costa Rica 🇨🇷
          </p>
        </div>
      </div>
    </footer>
  );
}
