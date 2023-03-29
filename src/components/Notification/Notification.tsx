import ReactDOM from "react-dom";
import { useContext } from "react";
import NotificationContext from "../../context/Notification/NotificationContext";
import INotification from "../../common/interfaces/INotification";
import classes from "./css/Notification.module.css";

const Notification: React.FC<INotification> = ({ title, message, status }) => {
  const { hideNotification } = useContext(NotificationContext);

  let statusClasses = "";
  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("overlays")!
  );
};

export default Notification;
