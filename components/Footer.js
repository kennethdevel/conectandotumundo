export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="text-lg font-semibold mb-2">Conectando tu Mundo</h3>
          <p>
            Soluciones tecnológicas para hogares, empresas y personas. Productos, asesoría y soporte con garantía.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contacto</h3>
          <p>📞 WhatsApp: <a href="https://wa.me/50684894314" target="_blank" className="text-teal-400">+506 8489 4314</a></p>
          <p>📧 Correo: <a href="mailto:kendav7-08@hotmail.com" className="text-teal-400">kendav7-08@hotmail.com</a></p>
          <p>📍 Costa Rica</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Información</h3>
          <ul className="space-y-1">
            <li>✔️ Precios incluyen IVA</li>
            <li>✔️ Productos sujetos a disponibilidad</li>
            <li>✔️ Envío con costo adicional</li>
            <li>✔️ Factura electrónica disponible</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} Conectando tu Mundo. Todos los derechos reservados.
      </div>

      {/* Información de formas de pago con estilo */}
      <div className="bg-teal-700 p-4 mt-6 rounded-lg text-center">
        <p className="text-white text-lg font-semibold mb-2">Formas de Pago</p>
        <div className="flex justify-center items-center space-x-4">
          {/* Iconos de las formas de pago */}
          <div className="flex items-center space-x-2">
            <img src="SINPE.jpg" alt="SINPE" className="w-10 h-10" />
            <span className="text-white">SINPE Móvil</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="BAC.png" alt="Tarjeta" className="w-10 h-10" />
            <span className="text-white">Tarjeta de Crédito/Débito</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="tasa0BAC.jpg" alt="BAC" className="w-10 h-10" />
            <span className="text-white">Tasa 0% con BAC (3 o 6 meses)</span>
          </div>
        </div>
        <p className="text-white text-sm mt-2">
          12, 18 y 24 meses con 2.9% de interés (minicuotas).
        </p>
      </div>
    </footer>
  );
}
