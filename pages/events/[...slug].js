import {useRouter} from "next/router"
import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../dummy-data";


const FilteredEvents = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  //array

  if (!filterData){
    return <p className="center">Loading...</p>
  }

  const [filteredYear, filteredMonth] = filterData;

  const numYear = parseInt(filteredYear);
  const numMonth = parseInt(filteredMonth);

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12){
    return <p>Invalid filter</p>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth
  })

  if (!filteredEvents || filteredEvents.length === 0){
    return <p>No events found</p>
  }


  return (
    <div>
      <EventList items={filteredEvents}/>
    </div>
  )
}

export default FilteredEvents