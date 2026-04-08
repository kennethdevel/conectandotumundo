import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingCart, MessageCircle, FileDown, X, Package } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function formatearPrecio(precio) {
  if (!precio) return '';
  const num = parseInt(precio.replace(/[^\d]/g, ''), 10);
  if (isNaN(num)) return precio;
  return `₡ ${num.toLocaleString('es-CR')}`;
}

export default function Cotizacion() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('cotizacion')) || [];
      setProductos(items);
    } catch {
      setProductos([]);
    }
  }, []);

  const eliminarProducto = (index) => {
    const copia = [...productos];
    copia.splice(index, 1);
    setProductos(copia);
    localStorage.setItem('cotizacion', JSON.stringify(copia));
  };

  const limpiarCotizacion = () => {
    if (confirm('¿Seguro que querés limpiar toda la cotización?')) {
      localStorage.removeItem('cotizacion');
      setProductos([]);
    }
  };

  const mensajeWhatsApp = encodeURIComponent(
    '¡Hola! Quiero cotizar los siguientes productos:\n\n' +
    productos.map((p, i) => `${i + 1}. ${p.nombre} – ${formatearPrecio(p.precio)}${p.color && p.color !== 'N/A' ? ` (${p.color})` : ''}`).join('\n')
  );

  const exportarPDF = () => {
    const doc  = new jsPDF();
    const fecha = new Date().toLocaleDateString('es-CR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // Cabecera
    doc.setFillColor(13, 148, 136);
    doc.rect(0, 0, 220, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Conectando tu Mundo', 14, 19);

    // Info empresa
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Fecha: ${fecha}`,                         14, 40);
    doc.text('WhatsApp: +506 8489-4314',               14, 47);
    doc.text('Correo: kendav7-08@hotmail.com',         14, 54);
    doc.text('Sitio: conectandotumundo.vercel.app',    14, 61);

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(13, 148, 136);
    doc.text('Cotización de Productos', 14, 74);

    const tabla = productos.map((p, i) => [
      i + 1,
      p.nombre,
      formatearPrecio(p.precio),
      p.descripcion || '–',
      (p.color && p.color !== 'N/A') ? p.color : '–',
    ]);

    autoTable(doc, {
      startY: 80,
      head:  [['#', 'Producto', 'Precio', 'Descripción', 'Color']],
      body:   tabla,
      styles:      { fontSize: 9, cellPadding: 3 },
      headStyles:  { fillColor: [13, 148, 136], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 250, 249] },
      columnStyles: {
        0: { halign: 'center', cellWidth: 10 },
        2: { halign: 'right' },
      },
    });

    // Pie
    const y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text('Precios pueden variar. Esta cotización es válida por 7 días.', 14, y);

    doc.save(`cotizacion-${fecha.replaceAll('/', '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-teal-400" />
            Tu <span className="text-teal-400 ml-1">Cotización</span>
          </h1>
          <p className="text-gray-400">
            {productos.length === 0
              ? 'Tu cotización está vacía'
              : `${productos.length} producto(s) en tu cotización`}
          </p>
        </motion.div>

        {productos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-gray-800 border border-gray-700 rounded-2xl"
          >
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl mb-2">No hay productos aún</p>
            <p className="text-gray-600 text-sm mb-6">Explorá el catálogo y agregá productos</p>
            <a href="/catalogo" className="btn-primary inline-flex items-center gap-2">
              Ir al catálogo
            </a>
          </motion.div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="space-y-3 mb-6">
              {productos.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-start gap-4 hover:border-gray-600 transition"
                >
                  {/* Número */}
                  <span className="w-7 h-7 bg-teal-500/15 text-teal-400 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-snug">{p.nombre}</p>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{p.descripcion}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-teal-400 font-bold">{formatearPrecio(p.precio)}</span>
                      {p.color && p.color !== 'N/A' && (
                        <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded-full">{p.color}</span>
                      )}
                    </div>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => eliminarProducto(i)}
                    className="text-gray-600 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                    title="Eliminar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Acciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <a
                href={`https://wa.me/50684894314?text=${mensajeWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar por WhatsApp
              </a>

              <button
                onClick={exportarPDF}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <FileDown className="w-5 h-5" />
                Descargar PDF
              </button>
            </div>

            <button
              onClick={limpiarCotizacion}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500/40 text-gray-400 hover:text-red-400 font-medium py-3 rounded-xl transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar cotización
            </button>
          </>
        )}
      </div>
    </div>
  );
}
