import '../styles/globals.css';
import Navbar           from '../components/Navbar';
import Footer           from '../components/Footer';
import BotonCotizacion  from '../components/BotonCotizacion';
import Head             from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Conectando tu Mundo</title>
        <meta name="description" content="Tecnología para hogares y empresas en Costa Rica. Laptops, celulares, cámaras, redes y más." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow">
        <Component {...pageProps} />
        <BotonCotizacion />
      </main>

      <Footer />
    </div>
  );
}
