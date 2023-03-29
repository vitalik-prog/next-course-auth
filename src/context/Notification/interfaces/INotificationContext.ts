import INotification from "../../../common/interfaces/INotification";

interface INotificationContext {
  notification: INotification | null;
  showNotification: (notificationData: INotification) => void;
  hideNotification: () => void;
}

export default INotificationContext;
