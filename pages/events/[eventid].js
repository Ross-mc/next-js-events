import {useRouter} from "next/router"
import { useEffect, useState } from "react";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/events/error-alert"
import { getEventById, getAllEvents } from "../../API";
import Head from "next/head"

const Event = (props) => {
  // const router = useRouter();
  // const [eventInState, setEventInState] = useState([])
  // console.log(eventInState)

  // useEffect(() => {
  //   const eventById = getEventById(router.query.eventid);
  //   setEventInState(eventById)
  //     console.log(eventInState)
  // }, [])

    //*******************************************************
  // the commented out code was my version for getting it on the client end which worked fine. But
  // the tutorial was about using get static props which is what i have done below

  // const [event, setEvent] = useState([]);

  // getEventById(router.query.eventid).then((res) => setEvent(res));
  const {event} = props

  if (!event || event.length === 0){
    return <>
          <Head>
        <title>{`NextJS Events`}</title>
        <meta name="description" content="Error: No events found for that query"/>
      </Head>
    <div className="center">
    <p>No Events found</p>
    </div>
    </>
  }

  return (
    <>
      <Head>
        <title>{`NextJS Events: ${event.title}`}</title>
        <meta name="description" content={event.description}/>
      </Head>
      <EventSummary title={event.title}/>
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export const getStaticProps = async (context) => {
  //context is a obj that is passed to get static props, one property of which
  //is params which includes the dynamic params. the eventid is so called because of the file name [eventid].js
  const eventId = context.params.eventid;
  const event = await getEventById(eventId);
  if (!event){
    return {
      props: {
        event: null // if there is an error, we must return null
        //as json cannot serialise undefined. the null value gets handled by showing the error
      }
    }
  }
  return {
    props: {
      event
    },
    revalidate: 600
    //see ../index.js for revalidation comments
  }
}

//in order to server side render dynamic path pages, we provide the function
//get static paths
// this must return a object with a paths and a fallback
//paths are the paths we want to prerender (maybe because they are highly frequented)
//and the data does not change often
//the fallback property determines what to do if we dont have the id
// with false, the 404 page will be returned
//however, this may not be ideal when we have valid data but we dont want
// to prerender
//fallback: true will attempt to load the page
//and we use the static props to render the data, after a short fetching cycle
//this usecase is good for pages which has user defined data for example
// and therefore we would not want to pre render all those pages
// in this example, we would probably pass all the events as paths
//however I want to demonstrate to future Ross what happens
//with fallback for valid data that doesnt have a path

//the fallback can also be set to blocking, what this does it allows a page to fully render
//before displaying
//This means a slight hit to speed but if there are no events it will display
//the no events message


export const getStaticPaths = async () => {
  //we can also construct a paths array as so
  //const events = await getAllEvents();
  //const paths = events.map(event => {
  //   return {params: {eventid: event.id}}
  // })

  //for example, we could use getFeaturedEvents() instead and
  //only pre generate featuredEvents with the above map

  return {
    paths: [
      {params: {eventid: "e1"}},
      {params: {eventid: "e2"}},
    ],
    fallback: "blocking"
  }
}

export default Event