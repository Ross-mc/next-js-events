import {useRouter} from "next/router"
import { useEffect, useState } from "react";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import { getEventById } from "../../dummy-data";

const Event = () => {
  const router = useRouter();
  // const [eventInState, setEventInState] = useState([])
  // console.log(eventInState)

  // useEffect(() => {
  //   const eventById = getEventById(router.query.eventid);
  //   setEventInState(eventById)
  //     console.log(eventInState)
  // }, [])

  const event = getEventById(router.query.eventid);

  if (!event){
    return <p>No events found</p>
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