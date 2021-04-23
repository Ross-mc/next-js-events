const getEventsFromFirebase = async () => {
  const res = await fetch("https://next-js-events-a3fc2-default-rtdb.firebaseio.com/events2.json");
  const data = await res.json();
  if (!data){
    return []
  }
  const events = [];
  for (const [key, value] of Object.entries(data)){
    events.push({...value, id: key})
  };

  return events
}


export async function getFeaturedEvents() {
  const events = await getEventsFromFirebase()
  return events.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
  return await getEventsFromFirebase();
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const events = await getEventsFromFirebase();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const events = await getEventsFromFirebase()
  return events.find((event) => event.id === id);
}