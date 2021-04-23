import { useState } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummy-data"

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  getFeaturedEvents().then(res => setFeaturedEvents(res))
  
  // const featuredEvents = getFeaturedEvents();



  return (
    <div>
      <h1>Featured Events</h1>
      {featuredEvents.length > 0 ? <EventList items={featuredEvents}/> : <h1>Loading...</h1>}
      
    </div>
  )
}

export default Home