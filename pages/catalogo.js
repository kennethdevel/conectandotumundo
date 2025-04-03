import { useState } from 'react';
import productos from '../data/productos.json';

export default function Catalogo() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  // Filtrar los productos según la categoría seleccionada
  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? productos
    : productos.filter((producto) => producto.categoria === categoriaSeleccionada);

  // Obtener las categorías únicas para el filtro
  const categorias = ['Todos', ...new Set(productos.map((producto) => producto.categoria))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-teal-600 mb-8 text-center">Catálogo de Productos</h1>

      {/* Filtro de categorías */}
      <div className="mb-6 text-center">
        <label htmlFor="categoria" className="mr-4">Filtrar por categoría:</label>
        <select
          id="categoria"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="px-4 py-2 rounded border"
        >
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>
      </div>

      {/* Productos filtrados */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.9))',
        }}
      >
        {productosFiltrados.map((producto, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-contain bg-white"
            />
            <div className="p-4 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{producto.nombre}</h2>
                <p className="text-gray-600 text-base mt-1">{producto.descripcion}</p>
                <p className="text-teal-700 font-bold mt-4">{producto.precio}</p>
              </div>
              <a
                href={`https://wa.me/50684894314?text=Hola%2C%20me%20interesa%20el%20producto%20${encodeURIComponent(producto.nombre)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
              >
                Agregar a cotización
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
