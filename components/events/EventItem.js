import Link from "next/link";
import classes from "./EventItem.module.css"

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
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{parsedDate}</time>
          </div>
          <div className={classes.address}>
            <address>{parsedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={link}>Explore Event</Link>
        </div>
      </div>
    </li>
  )
}

export default EventItem