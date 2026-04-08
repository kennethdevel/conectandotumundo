import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Headphones, Star } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Tecnología Premium',
    desc: 'Los mejores productos del mercado a precios competitivos.',
  },
  {
    icon: Shield,
    title: 'Garantía y Confianza',
    desc: 'Todos nuestros productos incluyen factura electrónica.',
  },
  {
    icon: Headphones,
    title: 'Soporte Técnico',
    desc: 'Siempre disponibles para instalación y soporte.',
  },
];

const stats = [
  { value: '500+', label: 'Productos disponibles' },
  { value: '100%', label: 'Clientes satisfechos' },
  { value: '3-6', label: 'Meses tasa 0 BAC' },
];

export default function Inicio() {
  return (
    <>
      {/* ── Hero ── */}
      <div
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/FondosinLetras.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/85 via-gray-900/70 to-gray-900" />

        {/* Partículas decorativas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-teal-500/15 text-teal-300 border border-teal-500/25 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          >
            <Star className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
            Tecnología para hogares y empresas en Costa Rica
          </motion.div>

          {/* Título */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Conectamos el mundo
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300 mt-1">
              a tu alcance
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Asesoría personalizada, instalación profesional y soporte técnico confiable.
            Todo lo que necesitás en tecnología, en un solo lugar.
          </p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Link href="/catalogo">
              <button className="group flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-1 text-lg">
                Ver Catálogo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/cotizacion">
              <button className="flex items-center gap-2 border-2 border-teal-500/60 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400 font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-lg backdrop-blur-sm">
                Cotizar Ahora
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-gray-400 text-xs uppercase tracking-widest">Explorar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-teal-400 to-transparent"
          />
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="bg-gray-800 border-y border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-extrabold text-teal-400 mb-1">{s.value}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-extrabold text-white mb-3">¿Por qué elegirnos?</h2>
            <p className="text-gray-400 text-lg">Comprometidos con tu satisfacción en cada paso</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-teal-500/40 hover:bg-gray-750 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-teal-500/20 transition-colors">
                  <f.icon className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Final ── */}
      <div className="bg-gradient-to-r from-teal-900/30 to-gray-800 border-y border-gray-700 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              ¿Listo para conectar tu mundo?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Contactanos por WhatsApp o explorá nuestro catálogo ahora mismo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/catalogo">
                <button className="btn-primary text-lg">Explorar catálogo</button>
              </Link>
              <Link href="/contacto">
                <button className="btn-outline text-lg">Contactar</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
