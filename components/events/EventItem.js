import Image from "next/image";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
import classes from "./EventItem.module.css"

const EventItem = (props) => {
  const {title, image, date, location, id} = props;
  
  const newDate = new Date(date)
  const parsedDate = newDate.toLocaleDateString("en-US", {
   day: "numeric",
   month: "long",
   year: "numeric"
  });

  const parsedAddress = location.replace(", ", "\n")

  const link = `/events/${id}`

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{parsedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{parsedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={link}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem