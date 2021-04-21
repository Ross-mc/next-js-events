import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../dummy-data";

const Events = () => {

  const allEvents = getAllEvents();

  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={allEvents}/>
    </>
  )
}

export default Events