import { createContext, useState, useEffect, ReactNode } from "react";
import INotification from "../../common/interfaces/INotification";
import INotificationContextProvider from "./interfaces/INotificationContextProvider";
import INotificationContext from "./interfaces/INotificationContext";

const NotificationContext = createContext<INotificationContext>({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = ({
  children,
}: INotificationContextProvider) => {
  const [activeNotification, setActiveNotification] =
    useState<INotification | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => setActiveNotification(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: INotification) =>
    setActiveNotification(notificationData);
  const hideNotificationHandler = () => setActiveNotification(null);

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
