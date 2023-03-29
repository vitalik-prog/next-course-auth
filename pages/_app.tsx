import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Layout from "../src/layout/Layout";
import { NotificationContextProvider } from "../src/context/Notification/NotificationContext";
import { AuthContextProvider } from "../src/context/Auth/AuthContext";
import "../src/pages/App/css/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <AuthContextProvider>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </AuthContextProvider>
  </SessionProvider>
);

export default MyApp;
