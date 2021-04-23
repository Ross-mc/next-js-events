import { useState } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../API"

const Home = (props) => {

  //*******************************************************
  // the commented out code was my version for getting it on the client end which worked fine. But
  // the tutorial was about using get static props which is what i have done below

  // const [featuredEvents, setFeaturedEvents] = useState([]);

  // getFeaturedEvents().then(res => setFeaturedEvents(res))




  return (
    <div>
      <h1>Featured Events</h1>
      {props.events.length > 0 ? <EventList items={props.events}/> : <h1>Loading...</h1>}
      
    </div>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    }
  }

}

export default Home