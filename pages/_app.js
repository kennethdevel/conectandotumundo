import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BotonCotizacion from '../components/BotonCotizacion';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Head>
        <title>Conectando tu Mundo</title>
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
