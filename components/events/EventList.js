import EventItem from "./EventItem";

const EventList = (props) => {
  const { items } = props;
  return (
    <ul>
      {items.map((event) => (
        <EventItem
          id={event.id}
          title={event.title}
          location={event.location}
          image={event.image}
          key={event.id}
          date={event.date}
        />
      ))}
    </ul>
  );
};

export default EventList;
