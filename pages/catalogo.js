import productos from '../data/productos.json';

export default function Catalogo() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-teal-600 mb-8 text-center">
        Catálogo de Productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-4 sm:p-6"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-contain mx-auto"
            />

            <div className="mt-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{producto.nombre}</h2>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">{producto.descripcion}</p>
              <p className="text-teal-700 font-bold mt-4">{producto.precio}</p>

              <a
                href={`https://wa.me/50684894314?text=Hola%2C%20me%20interesa%20el%20producto%20${encodeURIComponent(producto.nombre)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
