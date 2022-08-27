import '../styles/globals.css';
// next - react
import Head from 'next/head';
import { Fragment } from 'react';
// own components
import Layout from '../components/layout/Layout';
// context
import { ContextProvider } from '../context/Context';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Head>
          <title>Codeyful</title>
          <meta
            name="description"
            content="Connect with the coding community"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
