import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Camera, Wifi, Monitor, HelpCircle, Cpu, Settings } from 'lucide-react';

const servicios = [
  {
    titulo: 'Asesoría Tecnológica',
    descripcion: 'Te ayudamos a elegir la mejor solución tecnológica para tu hogar o empresa, adaptada a tus necesidades y presupuesto.',
    imagen: '/AsesoriaT.jpg',
    icon: HelpCircle,
    color: 'from-teal-900/40 to-gray-800',
  },
  {
    titulo: 'Instalación de Equipos',
    descripcion: 'Instalamos cámaras de seguridad, routers, access points, switches y toda la infraestructura de red que necesités.',
    imagen: '/IntalacionT.jpg',
    icon: Wifi,
    color: 'from-blue-900/40 to-gray-800',
  },
  {
    titulo: 'Soporte Técnico',
    descripcion: 'Mantenimiento preventivo y correctivo para todos tus dispositivos. Rápido, confiable y a domicilio.',
    imagen: '/Soport.jpg',
    icon: Settings,
    color: 'from-purple-900/40 to-gray-800',
  },
];

const adicionales = [
  { icon: Camera,  label: 'Cámaras CCTV' },
  { icon: Wifi,    label: 'Redes WiFi' },
  { icon: Monitor, label: 'Monitores' },
  { icon: Cpu,     label: 'Hardware' },
];

export default function Servicios() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700 py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge mb-4 inline-block">¿Qué hacemos?</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Nuestros <span className="text-teal-400">Servicios</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Soluciones tecnológicas integrales para personas y empresas en Costa Rica.
          </p>
        </motion.div>
      </div>

      {/* Servicios principales */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicios.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden
                         hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-500/10
                         transition-all duration-300 group flex flex-col"
            >
              {/* Imagen */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.imagen}
                  alt={s.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/logoMejorado.png'; }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-60`} />
                <div className="absolute bottom-4 left-4">
                  <div className="w-10 h-10 bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 rounded-xl flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-teal-400" />
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-white font-bold text-xl mb-3">{s.titulo}</h2>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{s.descripcion}</p>
                <Link href="/contacto">
                  <button className="mt-5 w-full flex items-center justify-center gap-2 border border-teal-500/40 text-teal-400 hover:bg-teal-500 hover:text-white hover:border-teal-500 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium">
                    Consultar <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chips adicionales */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-6">También trabajamos con</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {adicionales.map((a, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2.5 rounded-xl">
                <a.icon className="w-4 h-4 text-teal-400" />
                <span className="text-gray-300 text-sm">{a.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-teal-900/30 to-gray-800 border border-teal-500/20 rounded-2xl p-10 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">¿Necesitás un servicio personalizado?</h3>
          <p className="text-gray-400 mb-6">Contactanos y coordinamos una visita o consulta sin costo.</p>
          <Link href="/contacto">
            <button className="btn-primary">Contactar ahora</button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
