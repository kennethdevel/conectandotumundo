import { useState } from 'react';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarWhatsApp = () => {
    const url = `https://wa.me/50684894314?text=Hola,%20mi%20nombre%20es%20${encodeURIComponent(nombre)}.%20${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">Contacto</h1>
      <p className="text-gray-700 mb-4 text-center">
        Si querés más información sobre nuestros productos o servicios, escribinos por alguno de estos medios:
      </p>
      <ul className="text-gray-800 space-y-2 text-center mb-10">
        <li><strong>Email:</strong> info@conectandotumundo.com</li>
        <li><strong>Teléfono:</strong> +506 8888-8888</li>
        <li><strong>WhatsApp:</strong> +506 7000-0000</li>
        <li><strong>Ubicación:</strong> San José, Costa Rica</li>
      </ul>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-teal-700 mb-4 text-center">Escribinos directamente por WhatsApp</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          placeholder="Escribí tu mensaje"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 h-28"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button
          onClick={enviarWhatsApp}
          className="bg-green-500 text-white px-6 py-2 rounded w-full hover:bg-green-600 transition"
        >
          Enviar por WhatsApp
        </button>
      </div>
    </div>
  );
}
