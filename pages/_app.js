import 'tailwindcss/tailwind.css'
import { AuthProvider } from "../context/Auth";
import Head from "next/head";
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Firebase Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}

export default MyApp
