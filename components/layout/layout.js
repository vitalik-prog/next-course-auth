import { useContext } from "react";
import NotificationContext from "../../store/notificationContext";
import Notification from "../notification/notification";

import MainNavigation from "./main-navigation";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
