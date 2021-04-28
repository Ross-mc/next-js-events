import {createContext} from "react";

const notificationContext = createContext({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {}
});

export default notificationContext;