import {useRouter} from "next/router"
import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../API";
import ResultsTitle from "../../components/events/results-title"
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/events/error-alert"
import { useState, useEffect } from "react";
import useSWR from "swr"
import Head from "next/head";


const FilteredEvents = (props) => {
  const router = useRouter();
  // const [filteredEvents, setFilteredEvents] = useState([]);
  const [loadedEvents, setLoadedEvents] = useState([])

  const filterData = router.query.slug;

  //array

  const { data, error } = useSWR("https://next-js-events-a3fc2-default-rtdb.firebaseio.com/events.json");

  useEffect(() => {
    if (data){
      const events = [];
      for (const [key, value] of Object.entries(data)){
        events.push({...value, id: key})
      };
      setLoadedEvents(events)
    }

  }, [data])


  if (!filterData){
    return <p className="center">Loading...</p>
  }

  const [filteredYear, filteredMonth] = filterData;

  const numYear = parseInt(filteredYear);
  const numMonth = parseInt(filteredMonth);

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12 || error){
    return (
      <>
        <Head>
          <title>{`NextJS Events`}</title>
          <meta name="description" content={`Invalid filter`}/>
        </Head>
        <ErrorAlert>
        <p>Invalid Filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>    
      </>
    )
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });



  // if (props.hasError){
  //       return (
  //     <>
  //       <ErrorAlert>
  //       <p>Invalid Filter</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>    
  //     </>
  //   )
  // }

  // getFilteredEvents({year: numYear,month: numMonth}).then(res => setFilteredEvents(res))
  // const filteredEvents = props.events

  if (!filteredEvents || filteredEvents.length === 0){
    return (
      <>
        <Head>
          <title>{`NextJS Events`}</title>
          <meta name="description" content={`No events found for the query`}/>
        </Head>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>    
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1);
  const humanReadableDate = date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });


  return (
    <>
      <Head>
        <title>{`NextJS Events in ${humanReadableDate}`}</title>
        <meta name="description" content={`All NextJS events in ${humanReadableDate}`}/>
      </Head>
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents}/>
    </>
  )
}

// ###########################################################################

//we are using client side fetching, so we have removed the server side props for now

// export const getServerSideProps = async (context) => {

//   const {params} = context;

//   const [filteredYear, filteredMonth] = params.slug;

//   const numYear = parseInt(filteredYear);
//   const numMonth = parseInt(filteredMonth);

//   if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12){
//     return {
//       // notFound: true,
//       //redirect: {
//       //   destination: "/error"
//       // }
//       props: {
//         hasError: true
//       }
//     }
//   }

//   //with notFound true, our 404 page is show. we could also redirect to a predefined error page or use our own defined props to determine there was an error
//   // and handle that on the front end

//   const events = await getFilteredEvents({year: numYear,month: numMonth})


  
//   return {
//     props:{
//       events,
//       numYear,
//       numMonth
//     }
//   }
// }

export default FilteredEvents