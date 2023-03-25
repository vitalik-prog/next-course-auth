import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notificationContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
