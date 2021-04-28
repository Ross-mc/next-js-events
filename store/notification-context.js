import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import { createContext } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  return (
    <NotificationContext.Provider>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
