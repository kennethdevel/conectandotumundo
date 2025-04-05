import { useState } from 'react';
import productos from '../data/productos.json';

export default function Catalogo() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [colorSeleccionado, setColorSeleccionado] = useState({});

  // Filtrar los productos según la categoría seleccionada
  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? productos
    : productos.filter((producto) => producto.categoria === categoriaSeleccionada);

  // Obtener las categorías únicas para el filtro
  const categorias = ['Todos', ...new Set(productos.map((producto) => producto.categoria))];

  // Función para agregar productos a la cotización
  const agregarACotizacion = (producto) => {
    // Obtener el color seleccionado del producto
    const color = colorSeleccionado[producto.nombre] || 'No seleccionado'; // Si no se selecciona un color, se asigna "No seleccionado"

    const cotizacion = JSON.parse(localStorage.getItem('cotizacion')) || [];
    const productoConColor = {
      ...producto,
      color, // Guardamos el color seleccionado
    };

    cotizacion.push(productoConColor);
    localStorage.setItem('cotizacion', JSON.stringify(cotizacion));

    alert(`${producto.nombre} agregado a cotización con el color ${color}`);
  };

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
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-4 sm:p-6"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-contain mx-auto"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">{producto.nombre}</h2>
              <p className="text-gray-600 mt-2">{producto.descripcion}</p>
              <p className="text-teal-700 font-bold mt-4">{producto.precio}</p>

              {/* Selección de colores (solo si el producto tiene la propiedad colores) */}
              {producto.colores && (
                <div className="mt-4">
                  <label className="block text-sm text-gray-700">Elige un color:</label>
                  <select
                    className="mt-2 px-4 py-2 rounded border"
                    value={colorSeleccionado[producto.nombre] || ''}
                    onChange={(e) =>
                      setColorSeleccionado({ ...colorSeleccionado, [producto.nombre]: e.target.value })
                    }
                  >
                    {producto.colores.map((color, idx) => (
                      <option key={idx} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Botón de agregar a cotización */}
              <button
                onClick={() => agregarACotizacion(producto)}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Agregar a cotización
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
