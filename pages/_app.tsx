import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Layout from "../src/layout/Layout";
import { NotificationContextProvider } from "../src/context/layout/NotificationContext";
import "../src/pages/App/css/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  </SessionProvider>
);

export default MyApp;
