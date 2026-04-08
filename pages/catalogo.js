import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, SlidersHorizontal, CheckCircle } from 'lucide-react';
import productosBase from '../data/productos.json';

const STORAGE_KEY = 'productos_catalogo';

function getImageSrc(imagen) {
  if (!imagen) return '/logoMejorado.png';
  const trimmed = imagen.trim();
  if (trimmed.startsWith('data:') || trimmed.startsWith('http')) return trimmed;
  return `/${trimmed}`;
}

export default function Catalogo() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [colorSeleccionado, setColorSeleccionado]         = useState({});
  const [busqueda, setBusqueda]                           = useState('');
  const [todosProductos, setTodosProductos]               = useState(productosBase);
  const [agregado, setAgregado]                           = useState(null);

  useEffect(() => {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY);
      // Si el admin ya inicializó el catálogo, usarlo; si no, usar el base
      setTodosProductos(guardados ? JSON.parse(guardados) : productosBase);
    } catch {
      setTodosProductos(productosBase);
    }
  }, []);

  const categorias = ['Todos', ...new Set(todosProductos.map((p) => p.categoria).filter(Boolean))];

  const productosFiltrados = todosProductos
    .filter((p) => categoriaSeleccionada === 'Todos' || p.categoria === categoriaSeleccionada)
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const agregarACotizacion = (producto) => {
    const color     = colorSeleccionado[producto.nombre] || 'N/A';
    const cotizacion = JSON.parse(localStorage.getItem('cotizacion')) || [];
    cotizacion.push({ ...producto, color });
    localStorage.setItem('cotizacion', JSON.stringify(cotizacion));
    setAgregado(producto.nombre);
    setTimeout(() => setAgregado(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Catálogo de <span className="text-teal-400">Productos</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {todosProductos.length} productos disponibles para vos
          </p>
        </motion.div>

        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 placeholder-gray-500 transition"
            />
          </div>

          {/* Filtro categoría */}
          <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 min-w-[180px]">
            <SlidersHorizontal className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="bg-transparent text-white text-sm focus:outline-none cursor-pointer flex-1"
            >
              {categorias.map((cat, i) => (
                <option key={i} value={cat} className="bg-gray-800">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chips de categorías */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                categoriaSeleccionada === cat
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contador */}
        <p className="text-gray-500 text-sm mb-6">
          Mostrando <span className="text-gray-300 font-medium">{productosFiltrados.length}</span> producto(s)
        </p>

        {/* Grilla de productos */}
        {productosFiltrados.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-xl mb-2">No se encontraron productos</p>
            <p className="text-gray-600 text-sm">Intentá con otra búsqueda o categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {productosFiltrados.map((producto, index) => (
              <motion.div
                key={`${producto.nombre}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
                className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden
                           hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10
                           transition-all duration-300 group flex flex-col"
              >
                {/* Imagen */}
                <div className="relative h-44 bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={getImageSrc(producto.imagen)}
                    alt={producto.nombre}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = '/logoMejorado.png'; }}
                  />
                  {producto.categoria && (
                    <span className="absolute top-2 right-2 badge text-xs">
                      {producto.categoria}
                    </span>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2">
                    {producto.nombre}
                  </h2>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
                    {producto.descripcion}
                  </p>
                  <p className="text-teal-400 font-bold text-xl mb-3">{producto.precio}</p>

                  {/* Selector de color */}
                  {producto.colores && (
                    <select
                      className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-xl px-3 py-2 mb-3
                                 focus:outline-none focus:border-teal-500 transition cursor-pointer"
                      value={colorSeleccionado[producto.nombre] || ''}
                      onChange={(e) =>
                        setColorSeleccionado({ ...colorSeleccionado, [producto.nombre]: e.target.value })
                      }
                    >
                      <option value="" className="bg-gray-800">Elegir color</option>
                      {producto.colores.map((c, i) => (
                        <option key={i} value={c} className="bg-gray-800">{c}</option>
                      ))}
                    </select>
                  )}

                  {/* Botón agregar */}
                  <button
                    onClick={() => agregarACotizacion(producto)}
                    className={`w-full flex items-center justify-center gap-2 font-medium py-2.5 rounded-xl transition-all duration-200 text-sm ${
                      agregado === producto.nombre
                        ? 'bg-green-600 text-white'
                        : 'bg-teal-600 hover:bg-teal-500 text-white hover:shadow-lg hover:shadow-teal-500/25'
                    }`}
                  >
                    {agregado === producto.nombre ? (
                      <><CheckCircle className="w-4 h-4" /> Agregado!</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4" /> Agregar a cotización</>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
