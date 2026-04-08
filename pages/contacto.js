import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const infoItems = [
  { icon: Phone,     label: 'Teléfono / WhatsApp', value: '+506 8489-4314' },
  { icon: Mail,      label: 'Correo electrónico',  value: 'kendav7-08@hotmail.com' },
  { icon: MapPin,    label: 'Ubicación',            value: 'San José, Costa Rica' },
  { icon: Clock,     label: 'Horario de atención',  value: 'Lun–Sáb: 8am – 7pm' },
];

export default function Contacto() {
  const [nombre,  setNombre]  = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarWhatsApp = () => {
    if (!nombre.trim()) {
      alert('Por favor ingresá tu nombre.');
      return;
    }
    const texto = `Hola, mi nombre es ${nombre}. ${mensaje}`;
    const url = `https://wa.me/50684894314?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700 py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Ponete en <span className="text-teal-400">Contacto</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Estamos listos para ayudarte con lo que necesités. Escribinos y te respondemos rápido.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Info de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Información de contacto</h2>
            <div className="space-y-4 mb-8">
              {infoItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-gray-800 border border-gray-700 p-4 rounded-xl">
                  <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp directo */}
            <a
              href="https://wa.me/50684894314"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Abrir WhatsApp directo
            </a>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Send className="w-5 h-5 text-teal-400" />
              Envianos un mensaje por WhatsApp
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1.5">Tu nombre *</label>
                <input
                  type="text"
                  placeholder="ej: María García"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="input-dark"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1.5">Mensaje</label>
                <textarea
                  placeholder="Describí en qué podemos ayudarte..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={5}
                  className="input-dark resize-none"
                />
              </div>

              <button
                onClick={enviarWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar por WhatsApp
              </button>
            </div>

            <p className="text-gray-600 text-xs text-center mt-4">
              Al presionar el botón se abrirá WhatsApp con tu mensaje listo para enviar.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
