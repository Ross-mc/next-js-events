import {useRouter} from "next/router"
import { useEffect, useState } from "react";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/events/error-alert"
import { getEventById } from "../../API";

const Event = () => {
  const router = useRouter();
  // const [eventInState, setEventInState] = useState([])
  // console.log(eventInState)

  // useEffect(() => {
  //   const eventById = getEventById(router.query.eventid);
  //   setEventInState(eventById)
  //     console.log(eventInState)
  // }, [])

  const [event, setEvent] = useState([]);

  getEventById(router.query.eventid).then((res) => setEvent(res));

  if (!event || event.length === 0){
    return <>
    <ErrorAlert>
    <p>No events found</p>
    </ErrorAlert>
    </>
  }

  return (
    <>
      <EventSummary title={event.title}/>
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export default Event