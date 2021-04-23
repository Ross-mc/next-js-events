import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../API";
import { useState } from "react";

const Events = (props) => {

  //the commented out code is my version with client side rendering
  //the exported func is for server side static rendering
  // const [allEvents, setAllEvents] = useState([])

  // getAllEvents().then((res) => setAllEvents(res))

  const allEvents = props.events

  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler}/>
      {allEvents.length > 0 ? <EventList items={allEvents}/> : <h1 className="center">No Events. Please add some!</h1>}
    </>
  )
}
//the return above will display the error if there are no events or display the events if there are any
//because this is serverside rendered we do not need a loading phase
//however if we had some server side rendering and some client rendering we may
//need a loading phase

export const getStaticProps = async () => {
  
  const events = await getAllEvents();

  if (!events){
    return {
      props: {
        events: []
      }
    }
  }

  return {
    props: {
      events
    },
    revalidate: 1800
    //revalidate tells the server how often to regenerate pages for a new request
    //if it has been at least 30 minutes (1800 seconds) since/
    //the last request then a regeneration of this page will occur and
    //the events will be updated with the latest
  }

}


export default Events