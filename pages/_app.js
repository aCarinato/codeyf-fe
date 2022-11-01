import '../styles/globals.css';
// next - react
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
// own components
import Layout from '../components/layout/Layout';
// own functions
import * as ga from '../lib/ga';
// context
import { useMainContext } from '../context/Context';
import { ContextProvider } from '../context/Context';
// import { useMainContext } from '../context/Context';
// packages
import io from 'socket.io-client';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // const { authState } = useMainContext();

  // console.log(authState);
  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     console.log(
  //       `App is changing to ${url} ${
  //         shallow ? 'with' : 'without'
  //       } shallow routing`
  //     );
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
