import { motion } from 'framer-motion';
import { Heart, Award, Users, Globe } from 'lucide-react';
import Link from 'next/link';

const valores = [
  { icon: Heart,  titulo: 'Compromiso',    desc: 'Nos comprometemos a dar el mejor servicio y soporte en cada interacción.' },
  { icon: Award,  titulo: 'Calidad',       desc: 'Solo trabajamos con productos y marcas de confianza respaldados con garantía.' },
  { icon: Users,  titulo: 'Comunidad',     desc: 'Conectamos personas y empresas con la tecnología que necesitan para crecer.' },
  { icon: Globe,  titulo: 'Innovación',    desc: 'Siempre actualizados con las últimas tendencias tecnológicas del mercado.' },
];

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700 py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="badge mb-4 inline-block">Quiénes somos</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Sobre <span className="text-teal-400">Nosotros</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            <strong className="text-white">Conectando tu Mundo</strong> es un emprendimiento costarricense
            dedicado a brindar soluciones tecnológicas integrales que conectan personas, hogares e instituciones
            con herramientas modernas, seguras y eficientes.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

        {/* Misión */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Nuestra misión</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Ofrecemos productos tecnológicos, instalación de sistemas de seguridad y soporte técnico confiable,
            siempre con <span className="text-teal-400 font-medium">factura electrónica</span> y{' '}
            <span className="text-teal-400 font-medium">garantía de calidad</span> en todo lo que hacemos.
            Creemos que la tecnología debe ser accesible para todos.
          </p>
        </motion.div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Nuestros valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {valores.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-teal-500/40 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{v.titulo}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-teal-900/30 to-gray-800 border border-teal-500/20 rounded-2xl p-10 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">¿Querés ser parte de nuestra comunidad?</h3>
          <p className="text-gray-400 mb-6">Contactanos para conocer cómo podemos ayudarte.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <button className="btn-primary">Contactar</button>
            </Link>
            <Link href="/catalogo">
              <button className="btn-outline">Ver catálogo</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
