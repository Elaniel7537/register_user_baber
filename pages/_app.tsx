import type { AppProps } from "next/app";
import Head from "next/head";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/es_ES";
import "moment/locale/es";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Registro Barber</title>
        <meta name="description" content="Registro de citas de barberia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider locale={locale}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}

export default MyApp;
