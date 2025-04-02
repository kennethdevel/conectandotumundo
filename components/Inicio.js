export default function Home() {
  return (
    <main
      className="h-screen bg-cover bg-center text-white flex flex-col justify-center items-center px-4"
      style={{ backgroundImage: "url('/FondoConecMundo.jpg')" }}
    >
      <div className="bg-black/60 p-8 rounded-xl text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Conectando tu Mundo</h1>
        <p className="text-lg mb-6">
          Soluciones tecnológicas para hogares y empresas. ¡Conectamos personas con innovación!
        </p>
        <a
          href="/catalogo"
          className="bg-teal-600 text-white px-6 py-3 rounded shadow hover:bg-teal-700 hover:shadow-lg transition"
        >
          Ver Catálogo
        </a>
      </div>
    </main>
  );
}

