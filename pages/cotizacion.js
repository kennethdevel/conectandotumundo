import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Cotizacion() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cotizacion')) || [];
    setProductos(items);
  }, []);

  const eliminarProducto = (index) => {
    const copia = [...productos];
    copia.splice(index, 1);
    setProductos(copia);
    localStorage.setItem('cotizacion', JSON.stringify(copia));
  };

  const limpiarCotizacion = () => {
    localStorage.removeItem('cotizacion');
    setProductos([]);
  };

  const mensajeWhatsApp = encodeURIComponent(
    productos.map((p, i) => `${i + 1}. ${p.nombre} - ${p.precio} - Color: ${p.color}`).join('\n')
  );

  const formatearPrecio = (precio) => {
    const num = parseInt(precio.replace(/[^\d]/g, ''), 10);
    return `CRC ${num.toLocaleString('es-CR')}`;
  };

  const exportarPDF = () => {
    const doc = new jsPDF();

    const fecha = new Date().toLocaleDateString('es-CR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    doc.setFontSize(16);
    doc.text('Cotización - Conectando tu Mundo', 14, 20);
    doc.setFontSize(10);
    doc.text(`Fecha: ${fecha}`, 14, 28);
    doc.text('WhatsApp: +506 8489 4314', 14, 34);
    doc.text('Correo: kendav7-08@hotmail.com', 14, 40);
    doc.text('Sitio: conectandotumundo.vercel.app', 14, 46);

    const tabla = productos.map((p, i) => [
      i + 1,
      p.nombre,
      formatearPrecio(p.precio),
      p.descripcion,
      p.color, // Agregar color a la tabla
    ]);

    autoTable(doc, {
      startY: 52,
      head: [['#', 'Producto', 'Precio', 'Descripción', 'Color']],
      body: tabla,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [13, 148, 136] },
    });

    doc.save(`cotizacion-${fecha.replaceAll('/', '-')}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-teal-600 mb-6 text-center">Tu Cotización</h1>

      {productos.length === 0 ? (
        <p className="text-center text-gray-600">No has agregado productos aún.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {productos.map((p, i) => (
              <li
                key={i}
                className="border p-4 rounded shadow text-gray-800 bg-white flex justify-between items-start"
              >
                <div>
                  <strong>{p.nombre}</strong> — {formatearPrecio(p.precio)}
                  <p className="text-sm text-gray-600">{p.descripcion}</p>
                  <p className="text-sm text-gray-600">Color: {p.color}</p> {/* Mostrar color */}
                </div>
                <button
                  onClick={() => eliminarProducto(i)}
                  className="text-red-500 hover:text-red-700 ml-4 mt-1"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/50684894314?text=Hola,%20quiero%20cotizar:%0A${mensajeWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded text-center transition"
            >
              Enviar por WhatsApp
            </a>

            <button
              onClick={exportarPDF}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded transition"
            >
              Descargar PDF
            </button>

            <button
              onClick={limpiarCotizacion}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded transition"
            >
              Limpiar cotización
            </button>
          </div>
        </>
      )}
    </div>
  );
}

