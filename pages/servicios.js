export default function Servicios() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-teal-600 mb-8 text-center">Nuestros Servicios</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Servicio 1: Asesoría tecnológica */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <img
              src="/AsesoriaT.jpg" // Asegúrate de tener la imagen en /public
              alt="Asesoría tecnológica"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">Asesoría Tecnológica</h2>
              <p className="text-gray-600 mt-2">Te ayudamos a elegir la mejor solución para tu hogar o empresa.</p>
              <a
                href="/contacto"
                className="inline-block mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
              >
                Más información
              </a>
            </div>
          </div>
  
          {/* Servicio 2: Instalación de equipos */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <img
              src="/IntalacionT.jpg" // Asegúrate de tener la imagen en /public
              alt="Instalación de equipos"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">Instalación de Equipos</h2>
              <p className="text-gray-600 mt-2">Instalamos cámaras de seguridad, routers, y más.</p>
              <a
                href="/contacto"
                className="inline-block mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
              >
                Más información
              </a>
            </div>
          </div>
  
          {/* Servicio 3: Soporte técnico */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <img
              src="/Soport.jpg" // Asegúrate de tener la imagen en /public
              alt="Soporte técnico"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">Soporte Técnico</h2>
              <p className="text-gray-600 mt-2">Mantenimiento y soporte para todos tus dispositivos.</p>
              <a
                href="/contacto"
                className="inline-block mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
              >
                Más información
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  