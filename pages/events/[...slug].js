import {useRouter} from "next/router"
import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../API";
import ResultsTitle from "../../components/events/results-title"
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/events/error-alert"
import { useState } from "react";


const FilteredEvents = (props) => {
  const router = useRouter();
  // const [filteredEvents, setFilteredEvents] = useState([])

  const filterData = router.query.slug;

  //array

  if (!filterData){
    return <p className="center">Loading...</p>
  }

  const [filteredYear, filteredMonth] = filterData;

  const numYear = parseInt(filteredYear);
  const numMonth = parseInt(filteredMonth);

  // if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12){
  //   return (
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

  if (props.hasError){
        return (
      <>
        <ErrorAlert>
        <p>Invalid Filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>    
      </>
    )
  }

  // getFilteredEvents({year: numYear,month: numMonth}).then(res => setFilteredEvents(res))
  const filteredEvents = props.events

  if (!filteredEvents || filteredEvents.length === 0){
    return (
      <>
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


  return (
    <>
    <ResultsTitle date={date}/>
      <EventList items={filteredEvents}/>
    </>
  )
}

export const getServerSideProps = async (context) => {

  const {params} = context;

  const [filteredYear, filteredMonth] = params.slug;

  const numYear = parseInt(filteredYear);
  const numMonth = parseInt(filteredMonth);

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12){
    return {
      // notFound: true,
      //redirect: {
      //   destination: "/error"
      // }
      props: {
        hasError: true
      }
    }
  }

  //with notFound true, our 404 page is show. we could also redirect to a predefined error page or use our own defined props to determine there was an error
  // and handle that on the front end

  const events = await getFilteredEvents({year: numYear,month: numMonth})


  
  return {
    props:{
      events
    }
  }
}

export default FilteredEvents