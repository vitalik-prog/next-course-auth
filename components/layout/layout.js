import { useContext } from "react";
import NotificationContext from "../../store/notificationContext";
import Notification from "../notification/notification";
import MainNavigation from "./main-navigation";

const Layout = (props) => {
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
