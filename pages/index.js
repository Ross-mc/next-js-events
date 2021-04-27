import { useState } from "react";
import Head from "next/head";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../API"
import NewsletterRegistration from "../components/input/newsletter-registration";

const Home = (props) => {

  //*******************************************************
  // the commented out code was my version for getting it on the client end which worked fine. But
  // the tutorial was about using get static props which is what i have done below

  // const [featuredEvents, setFeaturedEvents] = useState([]);

  // getFeaturedEvents().then(res => setFeaturedEvents(res))




  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="find programming events"/>
      </Head>
      <h1>Featured Events</h1>
      <NewsletterRegistration />
      {props.events.length > 0 ? <EventList items={props.events}/> : <h1>Loading...</h1>}
      
    </div>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
    //revalidate tells the server how often to regenerate pages for a new request
    //if it has been at least 30 minutes (1800 seconds) since/
    //the last request then a regeneration of this page will occur and
    //the events will be updated with the latest
  }

}

export default Home