import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../dummy-data"

const Events = () => {

  const allEvents = getAllEvents();
  return (
    <>
      <EventsSearch />
      <EventList items={allEvents}/>
    </>
  )
}

export default Events