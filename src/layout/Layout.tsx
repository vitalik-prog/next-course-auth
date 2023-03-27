import { useContext } from "react";
import NotificationContext from "../context/layout/NotificationContext";
import Notification from "../components/Notification/Notification";
import MainNavigation from "../components/Header/Header";
import ILayout from './interfaces/ILayout';

const Layout = (props: ILayout) => {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
};

export default Layout;
