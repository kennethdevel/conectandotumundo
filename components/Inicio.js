import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Inicio() {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('/FondosinLetras.png')", // ← nueva imagen
        backgroundSize: "cover", // Asegura que la imagen cubra todo el fondo
        backgroundPosition: "center center", // Centra la imagen en el contenedor
      }}
    >
      {/* Capa oscura encima del fondo */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Contenido animado */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow">
          Tecnología a tu alcance para hogares y empresas
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Te asesoramos, instalamos y damos soporte. ¡Conectamos personas con innovación!
        </p>

        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link href="/catalogo">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded transition">
              Ver Catálogo
            </button>
          </Link>
          <Link href="/cotizacion">
            <button className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded transition">
              Cotizar Ahora
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
