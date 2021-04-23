import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../API";
import { useState } from "react";

const Events = () => {

  const [allEvents, setAllEvents] = useState([])

  getAllEvents().then((res) => setAllEvents(res))

  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <>
      <EventsSearch onSearch={findEventsHandler}/>
      {allEvents.length > 0 ? <EventList items={allEvents}/> : <h1>Loading...</h1>}
    </>
  )
}

export default Events