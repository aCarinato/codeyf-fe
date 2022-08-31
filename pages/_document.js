import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <div id="overlays"></div>
        {/* <div id="portale" /> */}
        <NextScript />
      </body>
    </Html>
  );
}
