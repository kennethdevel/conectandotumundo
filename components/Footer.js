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
    </footer>
  );
}
