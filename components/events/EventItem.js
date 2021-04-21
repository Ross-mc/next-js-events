import Link from "next/link"

const EventItem = (props) => {
  const {title, image, date, location, id} = props;
  
  const newDate = new Date(date)
  const parsedDate = newDate.toLocaleDateString(undefined, {
   day: "numeric",
   month: "long",
   year: "numeric"
  });

  const parsedAddress = location.replace(", ", "\n")

  const link = `/events/${id}`

  return (
    <li>
      <img src={"/" + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{parsedDate}</time>
          </div>
          <div>
            <address>{parsedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={link}>Explore Event</Link>
        </div>
      </div>
    </li>
  )
}

export default EventItem