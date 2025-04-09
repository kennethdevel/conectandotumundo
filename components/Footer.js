import Image from 'next/image';
import sinpe from '../public/SINPE.jpg'; // Asegúrate de que el archivo está en la carpeta 'public'
import tarjetaCredito from '../public/tasa0BAC.jpg'; // Corrige la ruta de la imagen de la tarjeta
import bac from '../public/BAC.png'; // Asegúrate de que el archivo está en la carpeta 'public'

export default function FormasDePago() {
  return (
    <div className="bg-white py-12 px-6 sm:px-12 md:px-24">
      <h2 className="text-2xl font-semibold text-center mb-8">Métodos de Pago</h2>
      
      <div className="flex justify-center gap-8 flex-wrap">
        {/* SINPE Móvil */}
        <div className="flex flex-col items-center">
          <Image 
            src={sinpe} 
            alt="SINPE" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          />
          <span className="text-sm mt-2">SINPE Móvil</span>
        </div>
        
        {/* Tarjeta de Crédito */}
        <div className="flex flex-col items-center">
          <Image 
            src={tarjetaCredito} 
            alt="Tarjeta de Crédito" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          />
          <span className="text-sm mt-2">Tarjeta de Crédito</span>
        </div>
        
        {/* BAC Tasa 0 */}
        <div className="flex flex-col items-center">
          <Image 
            src={bac} 
            alt="BAC Tasa 0" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          />
          <span className="text-sm mt-2">BAC: 3 o 6 meses tasa 0</span>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Las opciones de pago disponibles son SINPE Móvil, tarjeta de crédito o débito, y financiamiento con BAC.</p>
        <p>Financiamiento de 3 o 6 meses a tasa 0, o 12, 18, 24 meses con 2.9% de interés (minicuotas).</p>
      </div>
    </div>
  );
}

