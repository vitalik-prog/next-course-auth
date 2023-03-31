import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import Layout from "../src/layout/Layout";
import { NotificationContextProvider } from "../src/context/Notification/NotificationContext";
import { AuthContextProvider } from "../src/context/Auth/AuthContext";
import "../src/pages/App/css/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthContextProvider>
    <NotificationContextProvider>
      <Layout>
        <NextNProgress />
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  </AuthContextProvider>
);

export default MyApp;
