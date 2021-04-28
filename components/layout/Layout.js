import { useContext } from "react"
import NotificationContext from "../../store/notification-context"
import Notification from "../notification/notification"
import MainHeader from "./MainHeader"


const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  
  return (
    <>
    <MainHeader />
    <main>
      {props.children}
    </main>
    <Notification title={"Test"} status={"pending"} message={"Test Notification"}/>
    </>
  )
}

export default Layout