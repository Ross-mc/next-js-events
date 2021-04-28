import { useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../notification/notification";
import MainHeader from "./MainHeader";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          status={activeNotification.status}
          message={activeNotification.message}
        />
      )}
    </>
  );
};

export default Layout;
